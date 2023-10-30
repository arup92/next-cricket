import prismaClient from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
   const id = params.id
   console.log(request);

   // const userSession = await getCurrentUser()
   // console.log(userSession);

   // // Check if user is authenticated
   // if (!userSession) {
   //    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })
   // }

   try {
      const userProfile = await prismaClient.user.findUnique({
         where: {
            id: id
         },
         include: {
            progressions: {
               select: {
                  result: true,
                  id: true,

                  trades: {
                     select: {
                        pair: true,
                        result: true,
                        risk: true
                     }
                  }
               }
            }
         }
      })

      const { hashedPassword, updatedAt, ...restOfUserProfile } = { ...userProfile };

      return NextResponse.json(restOfUserProfile, { status: 200 })
   } catch (error: any) {
      if (error?.code === 'P2023') {
         return NextResponse.json({ error: 'User not found!' }, { status: 404 })
      }

      return NextResponse.json({ error: 'Invalid Server Error.' }, { status: 500 })
   }
}