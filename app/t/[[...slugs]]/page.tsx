import NotFound404 from '@/app/not-found';
import prismaClient from '@/libs/prismadb';
import { redirect } from 'next/navigation';

export default async function Home({ params }: { params: { slugs: string } }) {
  if (!params.slugs)
    return <NotFound404 />

  const savedTeam = await prismaClient.savedTeam.findUnique({
    where: {
      shortUrl: params.slugs[0]
    }
  })

  if (!!savedTeam) {
    const redirectPath = `${process.env.NEXT_PUBLIC_APP_URL}/view/create-new-11/${savedTeam.teamAId}/${savedTeam.teamBId}/${savedTeam.matchFormat}/${!!savedTeam.venueId ? savedTeam.venueId : 'undefined'}/${savedTeam.shortUrl}`
    return redirect(redirectPath)
  }

  return <NotFound404 />
}