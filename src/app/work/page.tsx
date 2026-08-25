"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function Work() {
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
        className="max-w-3xl"
      >
        <motion.h1 variants={FADE_UP} className="text-4xl sm:text-5xl lg:text-7xl font-serif font-medium leading-[1.1] text-foreground mb-6">
          Selected Work
        </motion.h1>
        <motion.p variants={FADE_UP} className="text-lg text-muted leading-relaxed font-sans">
          A selection of projects demonstrating rigorous backend architecture, interactive frontend development, and analytical problem-solving.
        </motion.p>
      </motion.div>

      <div className="flex flex-col gap-24">
        
        {/* Primary Case Studies */}
        <section className="flex flex-col gap-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted border-b border-border pb-4">Major Projects</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[flagship, featured].map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col bg-card border border-border p-8 hover:bg-muted/5 transition-colors h-full"
              >
                <div className="flex flex-col gap-3 mb-6">
                  <h3 className="text-3xl font-serif text-foreground group-hover:text-accent transition-colors">{project.title}</h3>
                </div>
                
                <p className="text-muted leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-col gap-6 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-xs font-mono bg-muted/10 text-foreground px-2 py-1 border border-border/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/work/${project.id}`} className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                    Read Case Study <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quant Collection */}
        <section className="flex flex-col gap-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted border-b border-border pb-4">Quantitative Experimentation</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative bg-card border border-border p-8 lg:p-12"
          >
            <div className="max-w-2xl flex flex-col gap-6">
              <h3 className="text-3xl font-serif text-foreground">{quantLab.title}</h3>
              <p className="text-muted leading-relaxed">
                {quantLab.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quantLab.technologies.map(tech => (
                  <span key={tech} className="text-xs font-mono bg-muted/10 text-foreground px-2 py-1 border border-border/50">
                    {tech}
                  </span>
                ))}
              </div>
              <a href={quantLab.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                <FaGithub size={16} /> View on GitHub
              </a>
            </div>
          </motion.div>
        </section>

        {/* Supporting & Learning */}
        <section className="flex flex-col gap-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted border-b border-border pb-4">Other Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[supporting, learning].map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col gap-4 border-l-2 border-border pl-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif text-foreground">{project.title}</h3>
                  <span className="text-xs font-mono text-muted uppercase tracking-wider">{project.category}</span>
                </div>
                <p className="text-sm text-muted">
                  {project.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2 text-xs font-mono text-muted">
                    {project.technologies.slice(0, 2).map(t => <span key={t}>{t}</span>)}
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground">
                    <FaGithub size={16} />
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
