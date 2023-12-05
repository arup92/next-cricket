import Matches from "./view/matches/page";

export default function Home() {
  return (
    <>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5H0Z2H7XJ6"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-5H0Z2H7XJ6');
        </script>
      
        <Matches />
    </>
  )
}
