export type Project = {
  id: string;
  title: string;
  category: "Flagship" | "Featured" | "Supporting" | "Collection" | "Learning";
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "asthma-v2",
    title: "Asthma Risk Screening Tool V2",
    category: "Flagship",
    description: "A preliminary clinical decision support tool for asthma risk screening. Features machine learning preprocessing, EDA, and SHAP-based model explainability served via a FastAPI backend to a React interface.",
    technologies: ["React", "FastAPI", "XGBoost", "SHAP", "Vite", "Python"],
    github: "https://github.com/RP-Hubb/Asthma-risk-screening-tool-v2",
    featured: true,
  },
  {
    id: "dsa-visualizer",
    title: "DSA Visualizer",
    category: "Featured",
    description: "An interactive educational tool demonstrating algorithms in real-time. Features BFS/DFS graph visualizations with draggable nodes, algorithm race modes, and state-driven animations.",
    technologies: ["React 19", "Vite", "Tailwind CSS v4", "Framer Motion", "Zustand"],
    github: "https://github.com/RP-Hubb/DSA-Visualizer",
    featured: true,
  },
  {
    id: "quant-lab",
    title: "Quant Lab Collection",
    category: "Collection",
    description: "A repository of quantitative modeling and analytical experiments, focusing on financial concepts like Monte Carlo simulation, efficient frontiers, and volatility forecasting using synthetic data.",
    technologies: ["Python", "Pandas", "Numpy", "Scikit-Learn", "Matplotlib"],
    github: "https://github.com/RP-Hubb", // Link to profile as requested
  },
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    category: "Supporting",
    description: "A rigorous Python implementation of a recursive backtracking algorithm, built with typed and linted Python code.",
    technologies: ["Python", "Algorithms", "Testing"],
    github: "https://github.com/RP-Hubb",
  },
  {
    id: "e-waste",
    title: "E-Waste Classification",
    category: "Learning",
    description: "Coursework project developed as part of Skills4Future (Edunet).",
    technologies: ["Python", "Machine Learning"],
    github: "https://github.com/RP-Hubb",
  }
];
