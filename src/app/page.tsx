"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/Magnetic";
import { useCursor } from "@/context/CursorContext";

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function Home() {
  const flagshipProject = projects.find(p => p.id === "asthma-v2");
  const featuredProject = projects.find(p => p.id === "dsa-visualizer");
  const { setCursorType, setCursorText } = useCursor();

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32">
        <motion.div 
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-8">
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-center gap-2 text-muted font-mono text-sm uppercase tracking-wider">
              <Terminal size={16} />
              <span>Prajjval Rajput</span>
            </motion.div>
            
            <motion.h1 
              variants={FADE_UP_ANIMATION_VARIANTS} 
              className="text-4xl sm:text-5xl lg:text-7xl font-serif font-medium leading-[1.1] text-foreground"
            >
              Python developer who ships full pipelines.
            </motion.h1>
            
            <motion.p 
              variants={FADE_UP_ANIMATION_VARIANTS} 
              className="text-lg lg:text-xl text-muted max-w-2xl leading-relaxed"
            >
              From complex data to deployed interfaces — I build rigorous, analytical, and interactive software. Not just notebooks.
            </motion.p>
            
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-wrap gap-4 pt-4">
              <Magnetic strength={20}>
                <Button asChild size="lg" className="rounded-none">
                  <Link href="/work">
                    View My Work
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic strength={20}>
                <Button asChild variant="outline" size="lg" className="rounded-none">
                  <Link href="/about">About Me</Link>
                </Button>
              </Magnetic>
            </motion.div>
          </div>
          
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="col-span-1 lg:col-span-5 relative flex justify-center lg:justify-end">
            <div 
              className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[30rem]"
              onMouseEnter={() => {
                setCursorType("view");
                setCursorText("ME");
              }}
              onMouseLeave={() => setCursorType("default")}
            >
              {/* Decorative offset background */}
              <div className="absolute inset-0 bg-accent/10 translate-x-4 translate-y-4 -z-10" />
              <div className="absolute inset-0 border border-border bg-card overflow-hidden">
                <Image
                  src="/photo.png"
                  alt="Prajjval Rajput"
                  fill
                  priority
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Work Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-baseline justify-between mb-12 border-b border-border pb-4">
            <h2 className="text-3xl font-serif text-foreground">Selected Work</h2>
            <Link 
              href="/work" 
              className="text-sm font-mono text-muted hover:text-foreground hover:underline underline-offset-4 flex items-center gap-1"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Flagship Project */}
            {flagshipProject && (
              <div 
                className="group relative flex flex-col gap-6 bg-card border border-border p-6 lg:p-8 hover:border-accent/50 transition-colors"
                onMouseEnter={() => {
                  setCursorType("view");
                  setCursorText("READ");
                }}
                onMouseLeave={() => setCursorType("default")}
              >
                <div className="flex flex-col gap-2">
                  <div className="font-mono text-xs text-accent uppercase tracking-wider">{flagshipProject.category}</div>
                  <h3 className="text-2xl font-serif font-medium text-foreground group-hover:text-accent transition-colors">
                    {flagshipProject.title}
                  </h3>
                </div>
                
                <p className="text-muted leading-relaxed flex-1">
                  {flagshipProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-6">
                  {flagshipProject.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="text-xs font-mono bg-muted/10 text-foreground px-2 py-1 border border-border/50">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link href={`/work/${flagshipProject.id}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View {flagshipProject.title}</span>
                </Link>
              </div>
            )}

            {/* Featured Project */}
            {featuredProject && (
              <div 
                className="group relative flex flex-col gap-6 bg-card border border-border p-6 lg:p-8 hover:border-accent/50 transition-colors"
                onMouseEnter={() => {
                  setCursorType("view");
                  setCursorText("READ");
                }}
                onMouseLeave={() => setCursorType("default")}
              >
                <div className="flex flex-col gap-2">
                  <div className="font-mono text-xs text-muted uppercase tracking-wider">{featuredProject.category}</div>
                  <h3 className="text-2xl font-serif font-medium text-foreground group-hover:text-accent transition-colors">
                    {featuredProject.title}
                  </h3>
                </div>
                
                <p className="text-muted leading-relaxed flex-1">
                  {featuredProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-6">
                  {featuredProject.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="text-xs font-mono bg-muted/10 text-foreground px-2 py-1 border border-border/50">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link href={`/work/${featuredProject.id}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View {featuredProject.title}</span>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
