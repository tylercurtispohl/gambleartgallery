import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "./ui/nav";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kirsten Gamble - San Francisco Bay Area Painter",
  description:
    "Kirsten Gamble is a San Francisco Bay Area based painter living in Marin County, California and Ashland, Oregon. she paints acrylics on canvas. Her focus is on color and texture. She produces abstracts and abstract landscapes of all sizes. She also paints still life and portraits on request. Her work has been shown at Marin Open Studios, Ashland Open Studios, and A Taste of Ashland. She has been juried into shows at the Marin County Fair, the Arc Gallery in San Francisco, and others. Commissioned pieces possible.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          <Nav></Nav>
          <main className="flex justify-center">
            <div className="flex justify-center flex-wrap w-full max-w-[1280px] px-4 md:px-6 xl:px-0">
              {children}
            </div>
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
