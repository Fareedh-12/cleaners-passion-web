import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cleaners Passion | Clean Homes, Happy Lives",
  description:
    "Cleaners Passion offers house cleaning, deep cleaning, specialized cleaning, and move in/out cleaning in Wallingford and Cholsey.",
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
