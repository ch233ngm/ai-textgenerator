'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  // 如果不是生产环境，返回空组件
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3FJLZH73QV"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-3FJLZH73QV');
        `}
      </Script>
      {/* PageView 统计 */}
      <Script
        id="pageview-analytics"
        strategy="afterInteractive"  // 与 defer 效果等价
        data-domain="ai-textgenerator.net"
        src="https://app.pageview.app/js/script.js"
      />
    </>
  );
}