import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import { PageWrapper } from "@/components/PageWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Prajjval Rajput | Python Developer",
  description: "Python developer who ships full pipelines — data to deployed interface.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} font-sans antialiased bg-background text-foreground selection:bg-accent selection:text-white`}
    >
      <body className="min-h-screen flex flex-col">
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
