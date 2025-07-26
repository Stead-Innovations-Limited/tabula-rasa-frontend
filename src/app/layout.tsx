import type { Metadata } from "next";
import { alex, nunito, roboto } from "@/components/fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SessionProviders from "@/app/SessionProviders";
import { HeroUIProviders } from "./HeroUIProviders";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

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
    <html lang='en'>
      <body
        className={`${alex.variable} ${nunito.variable} ${roboto.variable} antialiased`}
      >
        <SessionProviders>
          <HeroUIProviders>
            <NuqsAdapter>{children}</NuqsAdapter>
          </HeroUIProviders>
        </SessionProviders>
        <Toaster />
      </body>
    </html>
  );
}
