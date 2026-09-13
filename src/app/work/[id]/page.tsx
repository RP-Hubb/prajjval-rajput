import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Define specific content based on project ID to tell a technical story
  let content = null;

  if (id === "asthma-v2") {
    content = (
      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mt-16">
        <h2>Context & Problem</h2>
        <p>
          Asthma risk screening often relies on fragmented clinical surveys. Under the mentorship of Dr. Lokesh Sharma at the ICMR–National Institute of Occupational Health (NIOH), the goal was to develop a preliminary clinical decision support tool that leverages machine learning to assess asthma risk effectively, providing clear explanations for its predictions.
        </p>
        
        <h2>Architecture & Technical Decisions</h2>
        <p>
          The architecture needed to be split into a rigorous backend capable of handling ML models and a responsive, interactive frontend.
        </p>
        <ul>
          <li><strong>Backend (FastAPI):</strong> Chosen for its speed, automatic interactive API documentation, and native async support in Python. It serves the XGBoost model efficiently.</li>
          <li><strong>Machine Learning Pipeline (Python, XGBoost, SHAP):</strong> After extensive EDA and model comparison, XGBoost was selected for its performance on tabular data. SHAP (SHapley Additive exPlanations) was integrated to ensure the model wasn&apos;t a &quot;black box,&quot; outputting summary and bar plots to explain feature importance to clinicians.</li>
          <li><strong>Frontend (React + Vite):</strong> Provides a fast, interactive user interface for data input and visualization of the risk screening results.</li>
        </ul>

        <h2>Implementation & Result</h2>
        <p>
          The resulting V2 tool successfully processes patient features through the preprocessor (<code>xgb_preprocessor.py</code>), queries the <code>xgboost_model.pkl</code>, and returns both a risk assessment and a SHAP explanation. This project demonstrated the ability to ship a complete ML pipeline—from <code>DatasetML.ipynb</code> exploration to a deployed React interface.
        </p>

        <div className="bg-muted/10 p-6 border-l-4 border-accent mt-8">
          <p className="text-sm font-mono text-muted mb-0">
            <strong>Note:</strong> This is a preliminary asthma risk screening / clinical decision support tool. It is NOT a medical diagnosis system.
          </p>
        </div>
      </div>
    );
  } else if (id === "dsa-visualizer") {
    content = (
      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mt-16">
        <h2>Context</h2>
        <p>
          Understanding Data Structures and Algorithms requires more than just reading code. It requires visualization. The DSA Visualizer was built to provide an interactive, real-time educational tool for sorting algorithms and graph traversals.
        </p>

        <h2>Engineering the Visuals</h2>
        <p>
          The core challenge was state management and rendering performance. React 19 and Zustand were selected to manage complex algorithm states without prop-drilling or excessive re-renders.
        </p>
        <ul>
          <li><strong>State Management:</strong> Zustand provided a lightweight, fast global store to manage the step-by-step execution of algorithms.</li>
          <li><strong>Animations:</strong> Framer Motion handles the smooth transitions of sorting bars and draggable graph nodes, making the algorithm&apos;s execution tangible.</li>
          <li><strong>Interactive Graphs:</strong> Implementing BFS and DFS visualizers required a custom node/edge system where nodes are draggable, and edges dynamically update their positions.</li>
        </ul>

        <h2>Features & Impact</h2>
        <p>
          The visualizer includes an algorithm race mode for direct comparisons and a quiz mode to test understanding. It demonstrates strong frontend engineering, focusing on user interaction, state complexity, and animation performance.
        </p>
      </div>
    );
  } else {
    content = (
      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mt-16">
        <p>{project.description}</p>
        <p>Explore the repository on GitHub for full implementation details.</p>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 max-w-4xl">
      <Link href="/work" className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-foreground transition-colors mb-12">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Work
      </Link>

      <div className="flex flex-col gap-6 border-b border-border pb-12">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-1">
            {project.category}
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-medium leading-[1.1] text-foreground">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-xs font-mono bg-muted/10 text-foreground px-3 py-1.5 border border-border/50">
              {tech}
            </span>
          ))}
        </div>

        {project.github && (
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View ${project.title} repository on GitHub (opens in new tab)`}
              >
                <FaGithub size={16} aria-hidden="true" className="mr-2" />
                View Repository
              </a>
            </Button>
          </div>
        )}
      </div>

      {content}
    </article>
  );
}
