import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/context/CursorContext";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { PageWrapper } from "@/components/PageWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Noise } from "@/components/Noise";

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
  title: "Prajjval Rajput | Python Developer",
  description: "Python developer specializing in data architecture and rigorous engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground selection:bg-accent selection:text-black`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col cursor-none bg-background relative overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
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
            </SmoothScroll>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
