import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogBySlug } from "@/lib/blogs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type DetailBlock = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  metric?: string;
};

const URL_SHORTENER_STACK = [
  "Backend: Node.js and Express.js",
  "Database and ORM: Drizzle ORM + SQLite (migrated from PostgreSQL)",
  "Authentication: Stateless JWT + bcryptjs",
  "Validation: Zod schema validation",
  "Frontend: React (Vite) + Tailwind CSS",
];

const URL_SHORTENER_ARCH = [
  "Transport/Routing Layer: HTTP handling, CORS setup, and endpoint mapping.",
  "Controller Layer: request parsing, strict validation with Zod, and response shaping.",
  "Service Layer: core business logic (NanoID generation, retries, hashing, orchestration).",
  "Data Access Layer: Drizzle ORM for secure and structured persistence operations.",
];

const URL_SHORTENER_ENGINEERING: DetailBlock[] = [
  {
    title: "1) Retry Pattern for Collision Resistance",
    paragraphs: [
      "Short codes are generated with a 7-character NanoID from a 62-character alphabet (~3.52 trillion combinations).",
      "On uniqueness conflict, a retry loop regenerates the code up to 5 attempts to maintain reliability.",
    ],
    metric: "Metric: Generation latency under 1ms, with near-zero collision failure rate.",
  },
  {
    title: "2) Indexed Lookups with B-Tree",
    paragraphs: [
      "The redirection endpoint is the critical performance path. A B-Tree index on short_code avoids O(N) scans as data grows.",
      "This keeps lookup time stable and protects redirect performance under increasing traffic.",
    ],
    metric: "Metric: End-to-end redirect latency under 50ms.",
  },
  {
    title: "3) Asynchronous Write-Behind Analytics",
    paragraphs: [
      "Click analytics updates are dispatched asynchronously so redirects return immediately without waiting for database writes.",
      "This preserves user-perceived speed while still recording engagement data in the background.",
    ],
    metric: "Metric: Analytics adds near-zero perceived redirect latency.",
  },
  {
    title: "4) Stateless Authentication",
    paragraphs: [
      "JWT-based stateless auth avoids centralized session bottlenecks.",
      "Any backend node can verify requests, enabling cleaner horizontal scale-out.",
    ],
  },
];

const JOBSHARE_PIPELINE = [
  {
    step: "Discovery - collect_job_urls_unique.py",
    detail:
      "Loops through a matrix of job keywords and locations, buckets jobs by TTL (1h/24h), and performs O(1) URL deduplication using set-based logic.",
  },
  {
    step: "Extraction - fetch_job_details.py",
    detail:
      "Consumes deduplicated URLs, fetches raw job pages, and parses DOM structures via BeautifulSoup to extract meaningful role context.",
  },
  {
    step: "AI Enhancement - enhance_job_roles.py",
    detail:
      "Uses LangChain + Azure OpenAI with typed Pydantic output parsing to enrich listings with clean role labels, skill tags, and stipend/salary fields.",
  },
  {
    step: "Garbage Collection - cleanup_24h.py",
    detail:
      "Prunes stale entries every 24 hours so the feed remains lightweight, current, and fully self-maintaining.",
  },
];

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return { title: "Blog Not Found" };
  }

  return {
    title: `${post.title} | Priyanshu Kumar`,
    description: post.excerpt,
  };
}

function GenericPostLayout({ excerpt }: { excerpt: string }) {
  return (
    <div className="space-y-6 text-neutral-200">
      <p className="text-lg leading-8">{excerpt}</p>
      <div className="rounded-xl border border-white/15 bg-black/25 p-6 leading-8 text-neutral-300">
        Detailed article content for this post is being prepared and will be published soon.
      </div>
    </div>
  );
}

function ProjectNexusArticle() {
  const architectureLayers = [
    {
      title: "User Interaction Layer",
      detail:
        "Handles user prompts, structured requests, metadata attachment, and session setup before handing control to orchestration.",
    },
    {
      title: "Agent Orchestration Layer",
      detail:
        "Routes tasks to the right specialists, controls execution order, and coordinates inter-agent messaging.",
    },
    {
      title: "Reasoning Layer",
      detail:
        "Runs specialized agents such as Planner, Research, Execution, and Critic to solve complex requests collaboratively.",
    },
    {
      title: "Memory and Knowledge Layer",
      detail:
        "Supports retrieval-augmented reasoning using embeddings, vector databases, and semantic recall pipelines.",
    },
    {
      title: "Infrastructure Layer",
      detail:
        "Backs the system with FastAPI services, vector storage, relational metadata stores, and async execution patterns.",
    },
  ];

  const orchestrationMap = [
    { task: "coding", agent: "Code Agent" },
    { task: "analysis", agent: "Research Agent" },
    { task: "evaluation", agent: "Critic Agent" },
  ];

  const lessons = [
    "Structure beats clever prompts.",
    "Memory is essential for context continuity.",
    "Multi-agent systems require strict orchestration.",
    "Structured outputs improve debugging and trust.",
  ];

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">The Motivation Behind Nexus</h2>
        <div className="space-y-5 text-neutral-300">
          <p className="leading-8">
            Large language models are powerful, but most AI applications still follow a single-agent pattern: one
            prompt in, one output out. That pattern fails when we move into real production complexity.
          </p>
          <p className="leading-8">
            Complex systems like autonomous workflows, research assistants, hiring systems, coding agents, and decision
            engines are solved by teams of specialists, not a single mind. Project Nexus was built from that idea.
          </p>
          <p className="leading-8">
            Core question: what would an AI system look like if it behaved like a collaborative team instead of a single model?
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">What is Project Nexus?</h2>
        <p className="leading-8 text-neutral-300">
          Project Nexus is a multi-agent intelligence architecture where specialized agents communicate, share context,
          retrieve memory, and self-correct through a validation loop. It behaves less like a chatbot and more like an
          autonomous cognitive network.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { title: "Specialization", text: "Each agent has a clear and scoped responsibility." },
            { title: "Coordination", text: "An orchestrator manages sequence, routing, and delegation." },
            { title: "Memory", text: "Retrieval systems give the architecture continuity beyond a single prompt." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-black/25 p-5">
              <h3 className="mb-2 text-lg font-semibold text-neutral-100">{item.title}</h3>
              <p className="text-neutral-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-5 text-2xl font-semibold tracking-tight text-[#C3E41D]">Project Nexus Visuals</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <figure className="overflow-hidden rounded-xl border border-white/15 bg-black/30 md:col-span-2">
            <Image src="/images/nexus-hero.png" alt="Nexus AI hero interface" width={1536} height={768} className="h-auto w-full" />
            <figcaption className="px-4 py-3 text-sm text-neutral-400">Nexus interface with customizable multi-agent architecture.</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl border border-white/15 bg-black/30">
            <Image src="/images/nexus-architecture.png" alt="Nexus architecture detail" width={1366} height={768} className="h-auto w-full" />
            <figcaption className="px-4 py-3 text-sm text-neutral-400">Reasoning concepts and autonomous agent narrative.</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl border border-white/15 bg-black/30">
            <Image src="/images/nexus-pipeline.png" alt="Nexus orchestrator pipeline" width={1690} height={884} className="h-auto w-full" />
            <figcaption className="px-4 py-3 text-sm text-neutral-400">Pipeline execution, orchestration feedback, and summary stages.</figcaption>
          </figure>
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">High-Level System Architecture</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {architectureLayers.map((layer) => (
            <article key={layer.title} className="rounded-xl border border-white/10 bg-black/30 p-5">
              <h3 className="mb-2 text-lg font-semibold text-neutral-100">{layer.title}</h3>
              <p className="leading-7 text-neutral-300">{layer.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5 rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-[#C3E41D]">Agent Orchestration Layer</h2>
        <p className="leading-8 text-neutral-300">
          The orchestrator controls task routing, communication, sequencing, and decomposition. It keeps the agent
          network deterministic and transparent.
        </p>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/30 text-neutral-300">
              <tr>
                <th className="px-4 py-3">Task</th>
                <th className="px-4 py-3">Agent</th>
              </tr>
            </thead>
            <tbody>
              {orchestrationMap.map((row) => (
                <tr key={row.task} className="border-t border-white/10 text-neutral-200">
                  <td className="px-4 py-3">{row.task}</td>
                  <td className="px-4 py-3">{row.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4 text-xs text-[#C3E41D] sm:text-sm">{`{
  "agent": "research_agent",
  "task": "information_retrieval",
  "context": "...",
  "memory_refs": []
}`}</pre>
        <div className="grid gap-2 md:grid-cols-2">
          {[
            "Data inspection",
            "Feature analysis",
            "Pattern detection",
            "Summary generation",
          ].map((step) => (
            <div key={step} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-neutral-200">
              {step}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5 rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-[#C3E41D]">Reasoning, Memory, and Infrastructure</h2>
        <p className="leading-8 text-neutral-300">
          Planner, Research, Execution, and Critic agents form a self-correcting loop. Memory runs through a pipeline
          of ingestion, chunking, embeddings, vector storage, and semantic retrieval. The infrastructure combines
          FastAPI, vector databases (Pinecone/Weaviate/Chroma), relational metadata, and asynchronous execution.
        </p>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">Communication Flow</h2>
        <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4 text-xs text-neutral-200 sm:text-sm">{`User Query
  ->
Request Parser
  ->
Agent Orchestrator
  ->
Planner Agent
  ->
Research Agent -> Memory Retrieval
  ->
Execution Agent
  ->
Critic Agent
  ->
Final Response`}</pre>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">Lessons Learned and Future Direction</h2>
        <ul className="mb-4 space-y-3 text-neutral-300">
          {lessons.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
        <p className="leading-8 text-neutral-300">
          Future work includes stronger communication protocols, persistent long-term memory, better evaluation
          benchmarks, and dynamic agent creation. The long-term vision is clear: AI systems will be networks of
          intelligent agents working together.
        </p>
      </section>
    </div>
  );
}
function UrlShortenerArticle() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">The Motivation</h2>
        <div className="space-y-5 text-neutral-200">
          <p className="leading-8">
            Have you ever wondered how services like Bitly or TinyURL handle millions of redirects with near-zero
            latency? I set out to build a production-grade URL Shortener platform to solve high-throughput challenges:
            unique ID generation, scalable database access, and sub-50ms redirect paths.
          </p>
          <p className="leading-8 text-neutral-300">
            Long URLs are unwieldy. They break in emails, look messy in social posts, and are hard to remember. A URL
            shortener creates a clean interface while also enabling analytics: who clicked, when, and from where.
          </p>
          <p className="leading-8 text-neutral-300">
            The goal was to build a system that not only works, but is structurally sound for horizontal scaling,
            stateless authentication, and fast lookups.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Code Space", value: "3.52 Trillion" },
          { label: "Redirect Latency", value: "< 50ms" },
          { label: "Code Generation", value: "< 1ms" },
          { label: "Architecture", value: "4-Layer N-Tier" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-white/15 bg-black/25 p-5">
            <p className="text-xs tracking-wide text-neutral-400 uppercase">{item.label}</p>
            <p className="mt-2 text-xl font-semibold text-[#C3E41D]">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">Technology Stack</h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {URL_SHORTENER_STACK.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-neutral-200">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-5 text-2xl font-semibold tracking-tight text-[#C3E41D]">A Look at the Platform</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <figure className="overflow-hidden rounded-xl border border-white/15 bg-black/30">
            <Image
              src="/images/url-shortener-login.png"
              alt="URL Shortener login screen"
              width={1240}
              height={700}
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-sm text-neutral-400">Authentication screen for secure access.</figcaption>
          </figure>

          <figure className="overflow-hidden rounded-xl border border-white/15 bg-black/30">
            <Image
              src="/images/url-shortener-dashboard.png"
              alt="URL Shortener dashboard"
              width={1536}
              height={768}
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-sm text-neutral-400">Dashboard for shortening, tracking, and link management.</figcaption>
          </figure>
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">High-Level System Architecture</h2>
        <div className="space-y-3">
          {URL_SHORTENER_ARCH.map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-neutral-200">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[#C3E41D]">Core Engineering Decisions and Metrics</h2>
        <div className="space-y-4">
          {URL_SHORTENER_ENGINEERING.map((block) => (
            <article key={block.title} className="rounded-xl border border-white/10 bg-black/25 p-5">
              <h3 className="mb-3 text-lg font-semibold text-neutral-100">{block.title}</h3>
              <div className="space-y-3 text-neutral-300">
                {block.paragraphs?.map((text) => (
                  <p key={text} className="leading-8">
                    {text}
                  </p>
                ))}
                {block.bullets && (
                  <ul className="space-y-2">
                    {block.bullets.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                )}
                {block.metric && (
                  <p className="rounded-md border border-[#C3E41D]/25 bg-[#C3E41D]/10 px-3 py-2 text-sm text-[#C3E41D]">
                    {block.metric}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">Final Thoughts</h2>
        <p className="leading-8 text-neutral-300">
          Building this URL shortener was a deep architecture exercise. The migration from Docker PostgreSQL to SQLite
          proved how resilient layered design can be: data-engine changes were isolated without rewriting core business
          logic. The result is a fast, robust platform ready for real-world usage.
        </p>
      </section>
    </div>
  );
}

function JobShareHubArticle() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">The Motivation</h2>
        <div className="space-y-5 text-neutral-200">
          <p className="leading-8">
            In my early student days, the hardest part of breaking into tech was not coding itself. It was the exhausting
            job hunt. I watched peers spend hours every day scrolling LinkedIn, filtering irrelevant posts, and manually
            tracking opportunities.
          </p>
          <p className="leading-8 text-neutral-300">
            That time should have gone into learning, building projects, and interview prep. I wanted to automate the
            most tedious parts of discovery so students could reclaim time and focus.
          </p>
          <p className="leading-8 text-neutral-300">
            That idea became Job Share Hub: a centralized, automated platform that surfaces relevant opportunities in a
            clean and distraction-free interface.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Daily Active Users", value: "60+" },
          { label: "Time Saved", value: "10+ hrs/week" },
          { label: "Jobs Curated", value: "1,000+" },
          { label: "Maintenance", value: "100% Automated" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-white/15 bg-black/25 p-5">
            <p className="text-xs tracking-wide text-neutral-400 uppercase">{item.label}</p>
            <p className="mt-2 text-xl font-semibold text-[#C3E41D]">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">How I Built It</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-white/10 bg-black/25 p-5">
            <h3 className="mb-2 text-lg font-semibold text-neutral-100">Data Engine</h3>
            <p className="leading-7 text-neutral-300">
              Python scripts such as collect_job_urls_unique.py and fetch_job_details.py use Selenium + BeautifulSoup
              to discover opportunities, enrich details, and remove expired listings every 24 hours.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-black/25 p-5">
            <h3 className="mb-2 text-lg font-semibold text-neutral-100">Frontend Experience</h3>
            <p className="leading-7 text-neutral-300">
              Built with Next.js and Tailwind CSS for a fast, minimal, and student-friendly interface where the value is
              visible immediately after login.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-black/25 p-5">
            <h3 className="mb-2 text-lg font-semibold text-neutral-100">Secure Access</h3>
            <p className="leading-7 text-neutral-300">
              Clerk authentication and authorization secure sessions and gate access while keeping sign-in smooth and
              frictionless.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-5 text-2xl font-semibold tracking-tight text-[#C3E41D]">A Look at Job Share Hub</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <figure className="overflow-hidden rounded-xl border border-white/15 bg-black/30">
            <Image
              src="/images/jobshare-landing.png"
              alt="Job Share Hub landing page"
              width={1440}
              height={810}
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-sm text-neutral-400">Public landing interface designed for focused entry into the feed.</figcaption>
          </figure>

          <figure className="overflow-hidden rounded-xl border border-white/15 bg-black/30">
            <Image
              src="/images/jobshare-dashboard.png"
              alt="Job Share Hub job categories dashboard"
              width={1366}
              height={768}
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-sm text-neutral-400">Authenticated dashboard with categorized opportunities and freshness signals.</figcaption>
          </figure>
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">Architecture: Under the Hood</h2>
        <div className="space-y-5 text-neutral-300">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-neutral-100">1) MCP Server Core</h3>
            <p className="leading-8">
              The scraping core is built around an MCP server (linkedin_server.py) using FastMCP. This converts tools
              like get_job_details and search_jobs into modular callable APIs instead of a single monolithic scraper.
            </p>
            <p className="leading-8">
              It manages LinkedIn access with persistent session cookies and a dual fallback strategy: try lightweight
              public SEO pages first, then switch to authenticated requests.Session when needed.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-neutral-100">2) Unidirectional Data Pipeline</h3>
            <div className="space-y-3">
              {JOBSHARE_PIPELINE.map((stage) => (
                <article key={stage.step} className="rounded-xl border border-white/10 bg-black/25 p-4">
                  <h4 className="mb-1 font-semibold text-neutral-100">{stage.step}</h4>
                  <p className="leading-7 text-neutral-300">{stage.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-neutral-100">3) Frontend + Deployment Strategy</h3>
            <p className="leading-8">
              The Next.js 16 + React 19 frontend is fully decoupled from scraping. Instead of live database queries,
              pipeline output is compiled into static JSON files (jobs_data.json and job_details.json) consumed by the
              frontend from /public.
            </p>
            <p className="leading-8">
              The pipeline is orchestrated through sequential scripts and Git-based publishing, enabling fast delivery
              to hosted environments with minimal runtime infrastructure cost.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">Why This Project Matters</h2>
        <ul className="space-y-3 text-neutral-300">
          <li>- Demonstrates modern AI-native architecture with MCP-driven tooling.</li>
          <li>- Applies practical CS depth: O(1) deduplication, DOM parsing, and stateless JWT security.</li>
          <li>- Shows production tradeoff maturity: static JSON serving for low latency, low cost, and operational simplicity.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#C3E41D]">Looking Forward</h2>
        <p className="leading-8 text-neutral-300">
          Job Share Hub started from empathy for students and grew into a production-ready automation system. It keeps
          proving a simple idea: the best products often solve the pains your friends face every day.
        </p>
      </section>
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_-10%,rgba(180,180,180,0.28),rgba(32,32,32,1)_46%)] px-4 pb-20 pt-24 text-white">
      <article className="mx-auto max-w-5xl space-y-8">
        <header className="overflow-hidden rounded-2xl border border-white/15 bg-black/30">
          <div className="relative">
            <Image src={post.coverImage} alt={post.title} width={1600} height={900} className="h-[260px] w-full object-cover sm:h-[320px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-neutral-300 sm:text-sm">
                <span className="rounded-full border border-[#C3E41D]/35 bg-[#C3E41D]/10 px-3 py-1 text-[#C3E41D]">
                  #{post.category}
                </span>
                <span>{post.publishDate}</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
            </div>
          </div>
        </header>

        {slug === "project-nexus-multi-agent-hiring" ? (
          <ProjectNexusArticle />
        ) : slug === "production-grade-url-shortener" ? (
          <UrlShortenerArticle />
        ) : slug === "job-share-hub-student-job-automation" ? (
          <JobShareHubArticle />
        ) : (
          <div className="rounded-2xl border border-white/15 bg-black/25 p-6 sm:p-8">
            <GenericPostLayout excerpt={post.excerpt} />
          </div>
        )}

        <footer className="border-t border-white/15 pt-6">
          <Link
            href="/blogs"
            className="rounded-md border border-white/20 px-4 py-2 text-sm text-neutral-200 transition-colors hover:border-[#C3E41D]/60 hover:text-[#C3E41D]"
          >
            Back to all blogs
          </Link>
        </footer>
      </article>
    </main>
  );
}
