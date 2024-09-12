import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Notify from "@/components/shared/Notify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barba Brutal",
  description: "Barbearia mais brutal da cidade!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Notify />
      </body>
    </html>
  );
}
