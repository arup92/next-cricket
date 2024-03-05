import prismaClient from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

export const getLastMatchesBattingSum = async (matchFormat: string, numMatches: number, limit: number, teamId?: string) => {
  const where = Prisma.sql`AND "teamId" = ${teamId}`
  const defaultWhere = Prisma.sql`AND "teamId" NOT iLike '%-u19' AND "teamId" NOT iLike '%-w'`

  const result = await prismaClient.$queryRaw`
    WITH RankedBatting AS (
      SELECT
          "userId",
          "playerId",
          "teamId",
          "matchFormat",
          "f11points",
          ROW_NUMBER() OVER (PARTITION BY "playerId" ORDER BY "matchDate" DESC) AS rnk
      FROM "Batting"
      WHERE "matchFormat" = ${matchFormat} ::"MatchFormat"
      ${teamId ? where : defaultWhere}
    )
    SELECT pl."playerId", pl."playerName", "teamId", "matchFormat", SUM("f11points")::int AS total_points
    FROM RankedBatting JOIN public."Player" as pl ON pl."playerId" = RankedBatting."playerId"
    WHERE rnk <= ${numMatches}
    GROUP BY pl."playerId", "teamId", "matchFormat"
    ORDER BY total_points DESC limit ${limit};`

  return result;
}

export const getLastMatchesBowlingSum = async (matchFormat: string, numMatches: number, limit: number, teamId?: string) => {
  const where = Prisma.sql`AND "teamId" = ${teamId}`
  const defaultWhere = Prisma.sql`AND "teamId" NOT iLike '%-u19' AND "teamId" NOT iLike '%-w'`

  const result = await prismaClient.$queryRaw`
    WITH RankedBowling AS (
      SELECT
          "userId",
          "playerId",
          "teamId",
          "matchFormat",
          "f11points",
          ROW_NUMBER() OVER (PARTITION BY "playerId" ORDER BY "matchDate" DESC) AS rnk
      FROM "Bowling"
      WHERE "matchFormat" = ${matchFormat} ::"MatchFormat" AND "teamId" NOT iLike '%-u19' AND "teamId" NOT iLike '%-w'
      ${teamId ? where : defaultWhere}
    )
    SELECT pl."playerId", pl."playerName", "teamId", "matchFormat", SUM("f11points")::int AS total_points
    FROM RankedBowling JOIN public."Player" as pl ON pl."playerId" = RankedBowling."playerId"
    WHERE rnk <= ${numMatches}
    GROUP BY pl."playerId", "teamId", "matchFormat"
    ORDER BY total_points DESC limit ${limit};`

  return result;
}