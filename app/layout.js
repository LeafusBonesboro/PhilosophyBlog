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
        <meta name="google-site-verification" content="TYCNtl6D83lNVahtj9d4J0RS7TUqFmC-Nm1XD4f54L8" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MNQTVCEF9M"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MNQTVCEF9M');
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
