"use client";

import { motion, Variants } from "framer-motion";
import { Terminal, GraduationCap, Briefcase, Code } from "lucide-react";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function About() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 max-w-4xl">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="flex flex-col gap-16"
      >
        {/* Header */}
        <div className="flex flex-col gap-6">
          <motion.div variants={FADE_UP} className="flex items-center gap-2 text-muted font-mono text-sm uppercase tracking-wider">
            <Terminal size={16} aria-hidden="true" />
            <span>About Me</span>
          </motion.div>
          <motion.h1 variants={FADE_UP} className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-foreground">
            Building rigorous software systems.
          </motion.h1>
        </div>

        {/* Story */}
        <motion.div variants={FADE_UP} className="prose prose-lg prose-neutral dark:prose-invert">
          <p className="text-muted leading-relaxed">
            I am a Python developer driven by a fascination with data, analytical problem-solving, and robust engineering. 
            My approach to development is holistic: I don&apos;t just write scripts or train models in isolation. I build full pipelines, 
            taking concepts from raw data and algorithms all the way to deployed, interactive interfaces.
          </p>
          <p className="text-muted leading-relaxed mt-4">
            Whether it&apos;s structuring a machine learning backend with FastAPI, experimenting with quantitative models, or 
            engineering an interactive frontend in React, I focus on the intersection of analytical rigor and human-centered design.
          </p>
        </motion.div>

        {/* Experience */}
        <motion.section variants={FADE_UP} className="flex flex-col gap-8 border-t border-border pt-12">
          <div className="flex items-center gap-3 text-2xl font-serif text-foreground">
            <Briefcase size={24} aria-hidden="true" className="text-accent" />
            <h2>Experience</h2>
          </div>
          
          <div className="flex flex-col gap-4 bg-card border border-border p-6 lg:p-8 relative hover:border-accent/50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h3 className="text-xl font-medium text-foreground">ICMR–National Institute of Occupational Health (NIOH)</h3>
              <span className="text-sm font-mono text-muted">July 13–24, 2026</span>
            </div>
            <div className="text-accent font-medium">Internship</div>
            <p className="text-muted leading-relaxed">
              Developed the <strong className="text-foreground">Asthma Risk Screening Tool V2</strong> under the mentorship of Dr. Lokesh Sharma (Scientist F & Head, IT). 
              Engineered a clinical decision support system integrating an XGBoost machine learning model, SHAP explainability, a FastAPI backend, and a React frontend.
            </p>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section variants={FADE_UP} className="flex flex-col gap-8 border-t border-border pt-12">
          <div className="flex items-center gap-3 text-2xl font-serif text-foreground">
            <GraduationCap size={24} aria-hidden="true" className="text-accent" />
            <h2>Education</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 p-6 bg-card border border-border hover:border-accent/50 transition-colors">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-medium text-foreground">Sal Institute of Technology & Engineering Research</h3>
              <span className="text-muted">B.Tech in Computer Science and Engineering</span>
            </div>
            <span className="text-sm font-mono text-muted border border-border px-2 py-1 rounded-sm mt-4 sm:mt-0">Class of 2027</span>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section variants={FADE_UP} className="flex flex-col gap-8 border-t border-border pt-12">
          <div className="flex items-center gap-3 text-2xl font-serif text-foreground">
            <Code size={24} aria-hidden="true" className="text-accent" />
            <h2>Capabilities</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4 bg-card p-6 border border-border hover:border-accent/50 transition-colors">
              <h3 className="font-mono text-sm uppercase tracking-wider text-muted border-b border-border pb-2">Core Stack</h3>
              <ul className="flex flex-col gap-2">
                <li className="text-foreground">Python (FastAPI, Pandas, Scikit-Learn)</li>
                <li className="text-foreground">TypeScript & React</li>
                <li className="text-foreground">Next.js & Vite</li>
                <li className="text-foreground">Tailwind CSS</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 bg-card p-6 border border-border hover:border-accent/50 transition-colors">
              <h3 className="font-mono text-sm uppercase tracking-wider text-muted border-b border-border pb-2">Domains</h3>
              <ul className="flex flex-col gap-2">
                <li className="text-foreground">Backend Architecture</li>
                <li className="text-foreground">Machine Learning & Data Science</li>
                <li className="text-foreground">Quantitative Experimentation</li>
                <li className="text-foreground">Interactive Frontend UI</li>
              </ul>
            </div>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
}
