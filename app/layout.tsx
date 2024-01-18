import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classNames from "classnames";
import Link from "next/link";
import { Providers } from "./providers";

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
        <div className="hidden py-4 sm:flex sm:justify-around">
          <div className="flex w-11/12 md:w-3/4 xl:w-3/5 xl:flex-wrap text-blue-900 font-serif">
            <div className="flex-grow xl:w-full xl:text-center xl:h-10 font-medium text-xl tracking-wider">
              <Link href="/">Kirsten Gamble</Link>
            </div>
            <div className="flex justify-center xl:w-full tracking-wide">
              <div className="px-5">
                <Link href="/">Gallery</Link>
              </div>
              <div className="px-5">
                <Link href="/about">About</Link>
              </div>
              <div className="px-5">
                <Link href="/events">Events</Link>
              </div>
              <div className="px-5">
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
