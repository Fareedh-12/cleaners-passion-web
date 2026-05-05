import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cleaners-passion-web.vercel.app"),
  title: "Cleaners Passion | Clean Homes, Happy Lives",
  description:
    "Cleaners Passion offers commercial cleaning, Airbnb cleaning, house cleaning, move in/out cleaning, and specialized cleaning across the Oxfordshire area.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cleaners Passion | Clean Homes, Happy Lives",
    description:
      "Trusted cleaning support across the Oxfordshire area, including commercial cleaning, Airbnb cleaning, house cleaning, move in/out cleaning, and specialized cleaning.",
    url: "/",
    siteName: "Cleaners Passion",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cleaners Passion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaners Passion | Clean Homes, Happy Lives",
    description:
      "Trusted cleaning support across the Oxfordshire area for commercial spaces, homes, Airbnb turnovers, move in/out cleaning, and specialized jobs.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
