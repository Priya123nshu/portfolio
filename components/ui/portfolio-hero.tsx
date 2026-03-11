"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import Blogs from "@/components/ui/blogs";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

const projects = [
  {
    title: "Project Nexus - Multi-Agent Intelligence Architecture",
    stack: "Python, LangChain, FastAPI, Vector DB, RAG",
    points: [
      "Built a modular multi-agent architecture with planner, research, execution, and critic agents.",
      "Implemented structured orchestration, task decomposition, and inter-agent communication.",
      "Integrated retrieval-augmented memory to enable long-context reasoning and self-correcting outputs.",
    ],
  },
  {
    title: "Building an LLM from Scratch - GPT Style Decoder Progression",
    stack: "PyTorch, Transformers, Attention, Tokenization, Jupyter",
    points: [
      "Built five progressive language-model notebooks, starting from token embeddings plus GELU and ending with a full decoder-only transformer stack.",
      "Implemented positional embeddings, layer normalization, tied input-output weights, causal attention, residual connections, and transformer blocks from first principles.",
      "Structured the final model as a GPT-style 12-block decoder with multi-head self-attention and autoregressive next-token generation.",
    ],
  },  {
    title: "Job Share Hub - Automated Student Job Platform",
    stack: "Next.js, Python, Selenium, BeautifulSoup, Clerk, MCP",
    points: [
      "Built a centralized platform that automates LinkedIn job discovery for students.",
      "Engineered an MCP-driven scraping pipeline with role enrichment and 24h cleanup jobs.",
      "Reduced manual job-hunt effort by 10+ hours/week for active users.",
    ],
  },
  {
    title: "Authentify (Fakefy) - Multi-Modal Fake Detection",
    stack: "Python, Flask, NLP, Computer Vision",
    points: [
      "Built full-stack system to detect fake news, synthetic text, and deepfakes.",
      "Integrated backend APIs to connect ML models with frontend workflows.",
      "Enabled real-time inference with deployed model pipelines.",
    ],
  },
  {
    title: "TruthScan - Deepfake Detection System",
    stack: "Python, TensorFlow, OpenCV",
    points: [
      "Built CNN-based deepfake detector with 88% validation accuracy.",
      "Designed video frame extraction and noise reduction pipeline.",
      "Implemented end-to-end training, evaluation, and inference flow.",
    ],
  },
  {
    title: "URL Shortener",
    stack: "Node.js, Express.js, MongoDB",
    points: [
      "Designed scalable URL shortening and redirection APIs.",
      "Added analytics for clicks, geolocation, and device metadata.",
      "Structured modular backend for performance and maintainability.",
    ],
  },
];

export default function PortfolioHero() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileSrc, setProfileSrc] = useState("/images/priyanshu-portrait.jpg");
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const menuItems = [
    { label: "HOME", href: "#home", highlight: true },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "BLOGS", href: "#blogs" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "EDUCATION", href: "#education" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-foreground transition-colors"
      style={{
        background: isDark
          ? "radial-gradient(circle at 50% -10%, rgba(180,180,180,0.28), rgba(32,32,32,1) 46%)"
          : "radial-gradient(circle at 50% -10%, rgba(205,205,205,0.55), rgba(236,236,236,1) 46%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <header className="fixed left-0 right-0 top-0 z-50 px-6 py-6 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-screen-2xl items-center justify-between">
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="z-50 p-2 text-neutral-500 transition-colors duration-300 hover:text-black dark:hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-8 w-8" strokeWidth={2} /> : <Menu className="h-8 w-8" strokeWidth={2} />}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute left-0 top-full z-[100] ml-4 mt-2 w-[220px] rounded-lg p-4 shadow-2xl md:w-[260px]"
                style={{ backgroundColor: isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 96%)" }}
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-2 py-1.5 text-lg font-bold tracking-tight transition-colors duration-300 md:text-xl"
                    style={{ color: item.highlight ? "#C3E41D" : isDark ? "#fff" : "#111" }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="text-4xl" style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
            PK
          </div>

          <Button
            type="button"
            onClick={toggleTheme}
            className="relative h-8 w-16 rounded-full p-0"
            style={{ backgroundColor: isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 85%)" }}
            aria-label="Toggle theme"
          >
            <div
              className="absolute left-1 top-1 h-6 w-6 rounded-full transition-transform duration-300"
              style={{
                backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
              }}
            />
          </Button>
        </nav>
      </header>

      <main>
        <section id="home" className="relative flex min-h-screen flex-col justify-center px-4 pt-24">
          <div className="mx-auto w-full max-w-6xl text-center">
            <BlurText
              text="PRIYANSHU"
              delay={90}
              animateBy="letters"
              direction="top"
              className="justify-center whitespace-nowrap font-bold uppercase leading-[0.8] tracking-tighter text-[48px] sm:text-[80px] md:text-[120px] lg:text-[150px]"
              style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
            />
            <BlurText
              text="KUMAR"
              delay={90}
              animateBy="letters"
              direction="top"
              className="justify-center whitespace-nowrap font-bold uppercase leading-[0.8] tracking-tighter text-[48px] sm:text-[80px] md:text-[120px] lg:text-[150px]"
              style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
            />

            <div className="mx-auto my-4 h-[160px] w-[120px] overflow-hidden rounded-3xl border border-white/20 shadow-2xl sm:h-[220px] sm:w-[164px]">
              <img
                src={profileSrc}
                alt="Priyanshu Kumar"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 50%" }}
                onError={() => setProfileSrc("/images/priyanshu-source.png")}
              />
            </div>

            <BlurText
              text="Designing autonomous multi-agent platforms, memory-driven RAG systems, and production AI infrastructure."
              delay={120}
              animateBy="words"
              direction="top"
              className="mx-auto justify-center text-center text-[14px] text-neutral-300 sm:text-[16px] md:text-[18px]"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />

            <a href="#about" className="mt-8 inline-flex text-neutral-400 hover:text-white" aria-label="Scroll down">
              <ChevronDown className="h-7 w-7" />
            </a>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-6 text-3xl font-bold text-[#C3E41D] md:text-4xl">About</h2>
          <div className="max-w-5xl space-y-5 text-base leading-8 text-neutral-200 md:text-lg">
            <p>
              I design and deploy production-grade AI systems, including a live multi-agent hiring platform with autonomous agent creation,
              vector memory (Pinecone, ChromaDB), and real-time agent communication.
            </p>
            <p>
              Built and shipped across AWS, Vercel, and Netlify, my systems go beyond prototypes. They are architected for scale,
              memory persistence, and multi-tenant interaction. My core project, Project Nexus, unifies AI agents, job automation pipelines,
              and an AI-powered coding evaluation environment in one architecture.
            </p>
            <p>I operate across backend, memory systems, and deployment layers.</p>
            <p className="text-neutral-100">
              <span className="font-semibold text-[#C3E41D]">Focus Areas:</span> Machine Learning, AI Agents, RAG Architectures, System Design.
            </p>
            <p className="text-neutral-100">Seeking high-impact AI/ML and System Architecture roles where technical depth matters.</p>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-8 text-3xl font-bold text-[#C3E41D] md:text-4xl">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.title} className="rounded-xl border border-white/15 bg-black/20 p-6 backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-3 text-sm text-neutral-300">{project.stack}</p>
                <ul className="space-y-2 text-sm leading-6 text-neutral-200">
                  {project.points.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Blogs sectionId="blogs" limit={3} showViewAll />

        <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-6 text-3xl font-bold text-[#C3E41D] md:text-4xl">Experience</h2>
          <div className="rounded-xl border border-dashed border-white/25 bg-black/20 p-8 text-neutral-300">Experience section will be added soon.</div>
        </section>

        <section id="education" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-8 text-3xl font-bold text-[#C3E41D] md:text-4xl">Education</h2>
          <div className="space-y-5">
            <div className="rounded-xl border border-white/15 bg-black/20 p-6">
              <h3 className="text-xl font-semibold">B.Tech in Computer Science & Engineering</h3>
              <p className="text-neutral-300">Pranveer Singh Institute of Technology, Kanpur (2023-2027)</p>
              <p className="text-neutral-300">CGPA: 8.5+</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/20 p-6">
              <h3 className="text-xl font-semibold">Senior Secondary (CBSE)</h3>
              <p className="text-neutral-300">Kendriya Vidyalaya IIT Kanpur</p>
              <p className="text-neutral-300">Percentage: 95%</p>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 pb-24 pt-20">
          <h2 className="mb-8 text-3xl font-bold text-[#C3E41D] md:text-4xl">Contact</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <a href="mailto:priyanshu.altruist@gmail.com" className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 p-4 text-neutral-100">
              <Mail className="h-5 w-5 text-[#C3E41D]" /> priyanshu.altruist@gmail.com
            </a>
            <a href="tel:+919129746736" className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 p-4 text-neutral-100">
              <Phone className="h-5 w-5 text-[#C3E41D]" /> +91 91297 46736
            </a>
            <a href="https://github.com/Priya123nshu" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 p-4 text-neutral-100">
              <Github className="h-5 w-5 text-[#C3E41D]" /> github.com/Priya123nshu
            </a>
            <a href="https://www.linkedin.com/in/priyanshu-kumar-980b50179/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 p-4 text-neutral-100">
              <Linkedin className="h-5 w-5 text-[#C3E41D]" /> linkedin.com/in/priyanshu-kumar-980b50179
            </a>
            <a href="https://portfolio-vert-two-73.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 p-4 text-neutral-100 md:col-span-2">
              <Globe className="h-5 w-5 text-[#C3E41D]" /> portfolio-vert-two-73.vercel.app
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

