import "./globals.css";
import Topbar from "@/components/Topbar";
import Script from "next/script";

export const metadata = {
  title: "Philosophy Blog",
  description: "Weekly quote deep dives and niche takes on philosophy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RWVXF2XV75"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RWVXF2XV75');
          `}
        </Script>
      </head>
      <body className="bg-white text-black">
        <Topbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
