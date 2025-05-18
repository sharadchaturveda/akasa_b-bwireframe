'use client';

import { memo } from 'react';
import Script from 'next/script';

/**
 * FacebookPixel Component
 * 
 * Implements Facebook Pixel tracking code for the website.
 * This component should be included in the root layout or _app.tsx
 * to ensure tracking is available across all pages.
 * 
 * Facebook Pixel ID: 1062892492087271
 * 
 * @returns {JSX.Element} The Facebook Pixel tracking code
 */
const FacebookPixel = memo(function FacebookPixel() {
  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1062892492087271');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1062892492087271&ev=PageView&noscript=1"
          alt="facebook pixel"
        />
      </noscript>
    </>
  );
});

export default FacebookPixel;
