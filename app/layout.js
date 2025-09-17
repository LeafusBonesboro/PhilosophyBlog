import "./globals.css";
import Topbar from "@/components/Topbar";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata = {
  title: "Philosophy Blog",
  description: "Weekly quote deep dives and niche takes on philosophy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="TYCNtl6D83lNVahtj9d4J0RS7TUqFmC-Nm1XD4f54L8"
        />
      </head>
      <body className="bg-white text-black">
        <GoogleAnalytics />
        <Topbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
