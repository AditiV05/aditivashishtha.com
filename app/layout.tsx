import type { Metadata, Viewport } from "next";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aditivashishtha.com"),
  title: "Aditi Vashishtha | Full-stack & Applied AI Engineer",
  description:
    "Full-stack and applied AI engineer. Four live products, all built solo from architecture through deploy.",
  openGraph: {
    title: "Aditi Vashishtha",
    description:
      "Full-stack and applied AI engineer. Four live products, all built solo from architecture through deploy.",
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
      "Full-stack and applied AI engineer. Four live products, all built solo from architecture through deploy.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f0e4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/pattern3.webp" fetchPriority="high" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
