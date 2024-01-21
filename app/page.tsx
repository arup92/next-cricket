import Matches from "./view/matches/page";
import Script from 'next/script';

export default function Home() {

  // console.log([{
  //   url: ``,
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly',
  //   priority: 1,
  // },
  // {
  //   url: `/view/create-new-11`,
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly',
  //   priority: 1,
  // }, ...matchesArray]);

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

      <Matches />
    </>
  )
}