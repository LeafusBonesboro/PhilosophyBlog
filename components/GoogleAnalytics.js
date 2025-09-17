"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-RVVXF2XV75"
  strategy="afterInteractive"
/>
<Script id="ga-script" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-RVVXF2XV75');
  `}
</Script>

    </>
  );
}
