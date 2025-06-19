import type { Metadata } from "next";
import { alex, nunito, roboto } from "@/components/fonts";
import "./globals.css";


export const metadata: Metadata = {
  title: "Tabula Rasa",
  description: "A transformative experience app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alex.variable} ${nunito.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
