import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/partials/Navbar";
import Footer from "@/components/partials/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { BackgroundAnimation } from "@/components/shared/BackgroundAnimation";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Labify",
  description: "Generate labs from video lectures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <div className="mb-20"></div>
          <Footer />
          {/* <BackgroundAnimation /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
