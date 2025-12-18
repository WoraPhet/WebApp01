import type { Metadata } from "next";
import { Sriracha } from "next/font/google";
import "./globals.css";


const pacificoFont = Sriracha({
  weight: "400",
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Zeen, My Beloved.",
  description: "For Zeen, My Beloved.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pacificoFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
