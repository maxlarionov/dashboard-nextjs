import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: '--font-roboto-roboto' });
const roboto_condensed = Roboto_Condensed({ subsets: ["latin"], weight: ["400", "500", "700"], variable: '--font-roboto-cond' });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${roboto_condensed.variable}`}>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
