import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import { PageWrapper } from "@/components/PageWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Noise } from "@/components/Noise";
import { CursorProvider } from "@/context/CursorContext";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Prajjval Rajput | Python Developer",
  description: "Portfolio of Prajjval Rajput, a Python developer shipping full pipelines.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} font-sans antialiased bg-background text-foreground selection:bg-accent selection:text-white`}
    >
      <body className="min-h-screen flex flex-col cursor-none bg-background relative overflow-x-hidden">
        {/* Ambient Glows */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px] pointer-events-none -z-20" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none -z-20" />
        
        <CursorProvider>
          <SmoothScroll>
            <Noise />
            <CustomCursor />
            <PageWrapper>{children}</PageWrapper>
          </SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
