import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/context/CursorContext";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { PageWrapper } from "@/components/PageWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Noise } from "@/components/Noise";
import { Footer } from "@/components/Footer";
import { TerminalOverlay } from "@/components/TerminalOverlay";
import { CommandPalette } from "@/components/CommandPalette";
import { ViewTransitions } from "next-view-transitions";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"]
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://prajjvalrajput.com"),
  title: {
    default: "Prajjval Rajput | Python Developer",
    template: "%s | Prajjval Rajput",
  },
  description: "Python developer specializing in data architecture and rigorous engineering.",
  openGraph: {
    title: "Prajjval Rajput | Python Developer",
    description: "Python developer specializing in data architecture and rigorous engineering.",
    url: "https://prajjvalrajput.com",
    siteName: "Prajjval Rajput Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prajjval Rajput | Python Developer",
    description: "Python developer specializing in data architecture and rigorous engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground selection:bg-accent selection:text-black overflow-x-hidden`}
        suppressHydrationWarning
      >
        <body className="min-h-screen flex flex-col bg-background relative overflow-x-hidden w-full" suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Noise />
            <CursorProvider>
              <CustomCursor />
              <SmoothScroll>
                <Navigation />
                <PageWrapper>
                  <main className="flex-1 w-full pt-16 z-10 relative">
                    {children}
                  </main>
                </PageWrapper>
                <Footer />
              </SmoothScroll>
              <TerminalOverlay />
              <CommandPalette />
            </CursorProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
