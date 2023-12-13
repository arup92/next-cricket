import prismaClient from "@/libs/prismadb";

export const getLastMatchesBattingSum = async (matchFormat: string, numMatches: number, teamId?: string) => {
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
      WHERE "matchFormat" = ${matchFormat}
      ${teamId ? 'AND "teamId" = ${teamId}' : ''}
    )
    SELECT "userId", "playerId", "teamId", "matchFormat", SUM("f11points") AS total_points
    FROM RankedBatting
    WHERE rnk <= ${numMatches}
    GROUP BY "userId", "playerId", "teamId", "matchFormat"
    ORDER BY total_points DESC;
  `;

    return result;
}