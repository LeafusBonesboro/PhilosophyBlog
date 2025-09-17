import "./globals.css";
import Topbar from "@/components/Topbar";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <Topbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
