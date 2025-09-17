import "./globals.css";
import Topbar from "@/components/Topbar";

export const metadata = {
  title: "Philosophy Blog",
  description: "Weekly quote deep dives and niche takes on philosophy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
