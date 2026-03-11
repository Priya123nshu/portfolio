export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  coverImage: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-llm-from-scratch-gpt-style-decoder",
    title: "Building an LLM from Scratch: From Embeddings to a GPT-Style Decoder",
    category: "LLM ARCHITECTURE",
    excerpt:
      "How I built five progressive PyTorch notebooks that evolve from a tiny embedding-plus-linear language model into a full decoder-only transformer with causal attention.",
    publishDate: "Mar 12, 2026",
    readTime: "9 min read",
    coverImage: "/images/llm-model5-architecture.png",
  },
  {
    slug: "project-nexus-multi-agent-hiring",
    title: "Project Nexus: Building a Multi-Agent Intelligence Architecture",
    category: "AGENTIC SYSTEMS",
    excerpt:
      "How I engineered a modular multi-agent architecture where specialized agents collaborate, reason, retrieve memory, and self-correct.",
    publishDate: "Mar 11, 2026",
    readTime: "12 min read",
    coverImage: "/images/nexus-hero.png",
  },
  {
    slug: "job-share-hub-student-job-automation",
    title: "Reclaiming Time: Why (and How) I Built Job Share Hub for Students",
    category: "PLATFORM ENGINEERING",
    excerpt:
      "How I built an automated LinkedIn job intelligence platform that saves students 10+ hours weekly through scraping, enrichment, and static data delivery.",
    publishDate: "Mar 10, 2026",
    readTime: "10 min read",
    coverImage: "/images/jobshare-dashboard.png",
  },
  {
    slug: "production-grade-url-shortener",
    title: "Building a Production-Grade URL Shortener: Architecture, Metrics, and Motivation",
    category: "SYSTEM DESIGN",
    excerpt:
      "How I engineered a low-latency URL shortener with collision-safe IDs, indexed lookups, async analytics, and stateless auth.",
    publishDate: "Mar 09, 2026",
    readTime: "8 min read",
    coverImage: "/images/url-shortener-dashboard.png",
  },
  {
    slug: "rag-memory-systems-pinecone-chromadb",
    title: "Designing Memory-First RAG Systems with Pinecone and ChromaDB",
    category: "RAG ARCHITECTURE",
    excerpt:
      "A practical look at short-term and long-term memory design for production LLM systems.",
    publishDate: "Feb 21, 2026",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
  },
];

export function getBlogBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
