import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aditivashishtha.com"),
  title: "Aditi Vashishtha | Full-stack & Applied AI Engineer",
  description:
    "Full-stack and applied AI engineer. Five things live in production, all solo from architecture through deploy.",
  openGraph: {
    title: "Aditi Vashishtha",
    description:
      "Full-stack and applied AI engineer. Five things live in production, all solo from architecture through deploy.",
    url: "https://aditivashishtha.com",
    siteName: "Aditi Vashishtha",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aditi Vashishtha — I build full-stack and applied AI systems.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditi Vashishtha",
    description:
      "Full-stack and applied AI engineer. Five things live in production, all solo from architecture through deploy.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plexMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
