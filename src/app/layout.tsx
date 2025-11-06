import type { Metadata } from "next";
import "./globals.css";
// import { Chatbot } from "@/components/shared/Chatbot";
import { ThemeProvider } from "@/contexts/theme-context";

export const metadata: Metadata = {
  title: "PalPaxAI - Payments for the AI Age",
  description:
    "PalPaxAI enables autonomous agents to transact with each other and humans — securely, seamlessly, and 24/7.",
  icons: {
    icon: "/logopalpaxai.png",
    shortcut: "/logopalpaxai.png",
    apple: "/logopalpaxai.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Enhanced font loading for better performance */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Optimize for PalPaxAI brand */}
        <meta name="theme-color" content="#4D63F6" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="">
        <ThemeProvider>
          {children}
          {/* <Chatbot /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
