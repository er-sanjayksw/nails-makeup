import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "KSWNails& Makeups",
  description: "Book your luxury nail and makeup services or shop our jewelry and beauty products.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  
  return (
    <html lang="en">
      <body>
        <Navbar session={session} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
