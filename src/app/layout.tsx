import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "캠퍼스 캘린더",
  description: "캠퍼스 일정을 한곳에서",
  manifest: "/manifest.json",
  themeColor: "#111827",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "캠퍼스 캘린더",
  },
  openGraph: {
    title: "캠퍼스 캘린더",
    description: "캠퍼스 일정을 한곳에서",
    siteName: "캠퍼스 캘린더",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
