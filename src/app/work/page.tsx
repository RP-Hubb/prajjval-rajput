"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";
import { useCursor } from "@/context/CursorContext";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export default function Work() {
  const { setCursorType } = useCursor();
  
  const getProjectsByCategory = (category: string) => projects.filter(p => p.category === category);
  
  const flagship = getProjectsByCategory("Flagship")[0];
  const featured = getProjectsByCategory("Featured")[0];
  const quantLab = getProjectsByCategory("Collection")[0];
  const supporting = getProjectsByCategory("Supporting")[0];
  const learning = getProjectsByCategory("Learning")[0];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 flex flex-col gap-16">
      
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } }
        }}
        className="max-w-4xl"
      >
        <motion.h1 variants={FADE_UP} className="text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] text-foreground mb-6">
          SELECTED <span className="text-outline-accent">WORK</span>
        </motion.h1>
        <motion.p variants={FADE_UP} className="text-lg text-muted leading-relaxed font-mono mt-4">
          A selection of projects demonstrating rigorous backend architecture, interactive frontend development, and analytical problem-solving.
        </motion.p>
      </motion.div>

      <div className="flex flex-col gap-24">
        
        {/* Primary Case Studies */}
        <section className="flex flex-col gap-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted border-b-4 border-border pb-4">Major Projects</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[flagship, featured].map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col bg-card border-4 border-border p-8 hover:border-accent hover:brutalist-shadow-white transition-all duration-300 h-full"
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
              >
                <div className="flex flex-col gap-2 mb-6">
                  <div className="font-mono text-xs font-bold text-accent uppercase tracking-widest bg-black px-2 py-1 w-max border-2 border-accent mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">{project.title}</h3>
                </div>
                
                <p className="text-muted font-mono text-sm leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-col gap-6 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-xs font-mono font-bold bg-muted/10 text-foreground px-2 py-1 border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:text-accent transition-colors">
                    Read Case Study <ArrowRight size={16} />
                  </div>
                </div>
                
                <Link href={`/work/${project.id}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View {project.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quant Collection */}
        <section className="flex flex-col gap-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted border-b-4 border-border pb-4">Quantitative Experimentation</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative bg-card border-4 border-border p-8 lg:p-12 hover:border-accent hover:brutalist-shadow-white transition-all duration-300"
          >
            <div className="max-w-2xl flex flex-col gap-6">
              <h3 className="text-4xl font-bold uppercase tracking-tight text-foreground">{quantLab.title}</h3>
              <p className="text-muted font-mono text-sm leading-relaxed">
                {quantLab.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quantLab.technologies.map(tech => (
                  <span key={tech} className="text-xs font-mono font-bold bg-muted/10 text-foreground px-2 py-1 border border-border">
                    {tech}
                  </span>
                ))}
              </div>
              <a 
                href={quantLab.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-accent transition-colors w-max bg-foreground text-background px-4 py-2 border-2 border-foreground hover:bg-background hover:brutalist-shadow"
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
              >
                <FaGithub size={16} /> View on GitHub
              </a>
            </div>
          </motion.div>
        </section>

        {/* Supporting & Learning */}
        <section className="flex flex-col gap-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted border-b-4 border-border pb-4">Other Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[supporting, learning].map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col gap-4 border-l-4 border-border pl-6 hover:border-accent transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-foreground">{project.title}</h3>
                </div>
                <p className="text-sm text-muted font-mono">
                  {project.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-muted">
                    {project.technologies.slice(0, 3).map(t => <span key={t} className="bg-muted/10 px-1 border border-border">{t}</span>)}
                  </div>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted hover:text-accent p-2 -mr-2 transition-colors"
                    onMouseEnter={() => setCursorType("hover")}
                    onMouseLeave={() => setCursorType("default")}
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
