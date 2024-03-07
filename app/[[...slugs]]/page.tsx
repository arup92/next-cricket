import HomePage from '@/components/HomePage';
import Script from 'next/script';

export default async function Home({ params }: { params: { slugs: string } }) {

  return (
    <>
      <Script id="gtm-script" async src="https://www.googletagmanager.com/gtag/js?id=G-5H0Z2H7XJ6" />
      <Script id="gtm-script-code">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-5H0Z2H7XJ6');
        `}
      </Script>

      <HomePage slugs={params.slugs} />
    </>
  )
}