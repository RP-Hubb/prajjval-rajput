"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Magnetic } from "@/components/Magnetic";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function Contact() {
  const links = [
    {
      name: "GitHub",
      url: "https://github.com/RP-Hubb",
      icon: <FaGithub size={24} />,
      handle: "@RP-Hubb"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/prajjval-rajput-b31b3a372/",
      icon: <FaLinkedin size={24} />,
      handle: "Prajjval Rajput"
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/rajput_prajjval/",
      icon: <Code2 size={24} />,
      handle: "rajput_prajjval"
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 max-w-4xl h-full flex flex-col justify-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="flex flex-col gap-12"
      >
        <div className="flex flex-col gap-6">
          <motion.h1 variants={FADE_UP} className="text-4xl sm:text-5xl lg:text-7xl font-serif font-medium leading-[1.1] text-foreground">
            Let&apos;s build something rigorous.
          </motion.h1>
          <motion.p variants={FADE_UP} className="text-xl text-muted leading-relaxed font-sans max-w-2xl">
            Interested in collaboration, have a question, or just want to connect? I&apos;m always open to discussing new engineering challenges.
          </motion.p>
        </div>

        <motion.div variants={FADE_UP} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
          {/* Email section */}
          <div className="flex flex-col gap-6">
            <h2 className="font-mono text-sm uppercase tracking-wider text-muted">Direct Contact</h2>
            <Magnetic strength={10}>
              <a 
                href="mailto:rraj21054@gmail.com"
                className="group flex flex-col gap-2 p-6 bg-card border border-border hover:border-accent transition-colors block w-full"
              >
                <Mail size={24} className="text-foreground group-hover:text-accent transition-colors mb-2" />
                <span className="text-lg font-medium text-foreground">rraj21054@gmail.com</span>
                <span className="text-sm text-muted flex items-center gap-2">
                  Send an email <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">→</span>
                </span>
              </a>
            </Magnetic>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-6">
            <h2 className="font-mono text-sm uppercase tracking-wider text-muted">Social Profiles</h2>
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Magnetic key={link.name} strength={5}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 bg-card border border-border hover:border-accent transition-colors block w-full"
                  >
                    <div className="flex items-center gap-4 text-foreground group-hover:text-accent transition-colors">
                      {link.icon}
                      <span className="font-medium">{link.name}</span>
                    </div>
                    <span className="text-sm font-mono text-muted">{link.handle}</span>
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
