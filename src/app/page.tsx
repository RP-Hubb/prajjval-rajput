"use client";

import { Link } from "next-view-transitions";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/Magnetic";
import { useCursor } from "@/context/CursorContext";
import { HeroPhoto } from "@/components/HeroPhoto";

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export default function Home() {
  const flagshipProject = projects.find(p => p.id === "asthma-v2");
  const featuredProject = projects.find(p => p.id === "dsa-visualizer");
  const { setCursorType, setCursorText } = useCursor();

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <div className="flex flex-col gap-24 pb-24 overflow-hidden">
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
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-[0.2em] font-bold">
              <Terminal size={14} aria-hidden="true" className="text-foreground" />
              <span>Prajjval Rajput</span>
            </motion.div>
            
            <motion.h1 
              variants={FADE_UP_ANIMATION_VARIANTS} 
              className="text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] text-foreground"
            >
              PYTHON DEVELOPER <span className="text-outline-accent">SHIPPING PIPELINES.</span>
            </motion.h1>
            
            <motion.p 
              variants={FADE_UP_ANIMATION_VARIANTS} 
              className="text-lg lg:text-xl text-muted max-w-2xl leading-relaxed font-mono mt-4"
            >
              From complex data to deployed interfaces — I build rigorous, analytical, and interactive software. Not just notebooks.
            </motion.p>
            
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-wrap gap-4 pt-8">
              <Magnetic strength={20}>
                <Button asChild size="lg">
                  <Link href="/work">
                    View My Work
                    <ArrowRight size={16} aria-hidden="true" className="ml-2" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic strength={20}>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">About Me</Link>
                </Button>
              </Magnetic>
            </motion.div>
          </div>
          
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="col-span-1 lg:col-span-5 relative flex justify-center lg:justify-end">
            <HeroPhoto />
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
          <div className="flex items-baseline justify-between mb-12 border-b-4 border-border pb-4">
            <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-foreground">Selected Work</h2>
            <Link 
              href="/work" 
              className="text-sm font-mono font-bold text-accent hover:text-white uppercase tracking-wider flex items-center gap-2"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              View all <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Flagship Project */}
            {flagshipProject && (
              <div 
                className="group relative flex flex-col gap-6 bg-card border-4 border-border p-6 lg:p-8 hover:border-accent hover:brutalist-shadow-hover transition-all duration-300 overflow-hidden"
                onMouseMove={handleCardMouseMove}
                onMouseEnter={() => {
                  setCursorType("hover");
                  setCursorText("VIEW");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                  setCursorText("");
                }}
              >
                <div className="project-card-spotlight" aria-hidden="true" />
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="font-mono text-xs font-bold text-accent uppercase tracking-widest bg-black px-2 py-1 w-max border-2 border-accent">
                    {flagshipProject.category}
                  </div>
                  <h3 className="text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-accent transition-colors mt-4">
                    {flagshipProject.title}
                  </h3>
                </div>
                
                <p className="relative z-10 text-muted leading-relaxed flex-1 font-mono text-sm">
                  {flagshipProject.description}
                </p>

                <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-6">
                  {flagshipProject.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="text-xs font-mono font-bold bg-muted/10 text-foreground px-2 py-1 border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link href={`/work/${flagshipProject.id}`} className="absolute inset-0 z-20">
                  <span className="sr-only">View {flagshipProject.title}</span>
                </Link>
              </div>
            )}

            {/* Featured Project */}
            {featuredProject && (
              <div 
                className="group relative flex flex-col gap-6 bg-card border-4 border-border p-6 lg:p-8 hover:border-accent hover:brutalist-shadow-hover transition-all duration-300 overflow-hidden"
                onMouseMove={handleCardMouseMove}
                onMouseEnter={() => {
                  setCursorType("hover");
                  setCursorText("VIEW");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                  setCursorText("");
                }}
              >
                <div className="project-card-spotlight" aria-hidden="true" />
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="font-mono text-xs font-bold text-muted uppercase tracking-widest bg-black px-2 py-1 w-max border-2 border-border group-hover:border-accent group-hover:text-accent transition-colors">
                    {featuredProject.category}
                  </div>
                  <h3 className="text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-accent transition-colors mt-4">
                    {featuredProject.title}
                  </h3>
                </div>
                
                <p className="relative z-10 text-muted leading-relaxed flex-1 font-mono text-sm">
                  {featuredProject.description}
                </p>

                <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-6">
                  {featuredProject.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="text-xs font-mono font-bold bg-muted/10 text-foreground px-2 py-1 border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link href={`/work/${featuredProject.id}`} className="absolute inset-0 z-20">
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
