import type { Metadata } from "next";
import { Inter, Spectral, Spectral_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spectral = Spectral({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-spectral" });
const spectralSC = Spectral_SC({ subsets: ["latin"], weight: ["500"], variable: "--font-spectral-sc" });

export const metadata: Metadata = {
  title: "Manohar Medical Agencies — Wholesale Medical Distributors Since the 1970s",
  description:
    "Manohar Medical Agencies is a wholesale medical distributor serving distributor partners since the 1970s, across three generations of the Ratnani family.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spectral.variable} ${spectralSC.variable} antialiased bg-paper-texture`}>
        {children}
      </body>
    </html>
  );
}
