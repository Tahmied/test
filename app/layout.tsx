import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Urbanist } from 'next/font/google';
import "./globals.css";

const plus = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['200', '400', '700'], variable: '--font-plus' })

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' })


export const metadata: Metadata = {
  title: "GimbalsInsider",
  description: "Developed By Tahmied",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plus.variable} ${urbanist.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
