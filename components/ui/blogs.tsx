import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blogs";

type BlogsProps = {
  sectionId?: string;
  limit?: number;
  showViewAll?: boolean;
  caption?: string;
  title?: string;
  className?: string;
};

export default function Blogs({
  sectionId,
  limit,
  showViewAll = true,
  caption = "KNOWLEDGE SPACE",
  title = "Blog Articles",
  className = "",
}: BlogsProps) {
  const articles = typeof limit === "number" ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;

  return (
    <section id={sectionId} className={`px-4 py-12 sm:py-16 md:py-20 ${className}`.trim()}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-3 text-xs font-medium tracking-wider text-neutral-400 uppercase sm:mb-4">{caption}</p>
          <h2 className="text-2xl font-normal tracking-tight text-neutral-100 sm:text-3xl md:text-5xl">{title}</h2>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              className="group border border-white/15 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30"
              key={article.slug}
            >
              <div className="relative mb-4 overflow-hidden sm:mb-6">
                <Image
                  alt={article.title}
                  className="aspect-square h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72 md:h-80"
                  height={1080}
                  src={article.coverImage}
                  width={1920}
                />
                <p className="absolute left-3 top-3 rounded-full border border-[#C3E41D]/35 bg-black/70 px-3 py-1 text-[10px] font-medium text-[#C3E41D] uppercase backdrop-blur-sm sm:text-xs">
                  #{article.category}
                </p>
              </div>

              <div className="px-3 pb-4 sm:px-4 sm:pb-5">
                <h3 className="mb-2 text-base font-normal tracking-tight text-neutral-100 sm:text-lg md:text-2xl">
                  {article.title}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-neutral-400 sm:mb-6 sm:text-sm">{article.excerpt}</p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    className="group/link relative flex items-center overflow-hidden text-xs font-medium text-neutral-100 transition-colors hover:text-neutral-300 sm:text-sm"
                    href={`/blogs/${article.slug}`}
                  >
                    <span className="mr-2 overflow-hidden rounded-md border border-white/20 p-2 transition-colors duration-300 ease-in group-hover/link:bg-[#C3E41D] group-hover/link:text-black sm:p-3">
                      <ArrowRight className="h-3 w-3 translate-x-0 opacity-100 transition-all duration-500 ease-in group-hover/link:translate-x-8 group-hover/link:opacity-0 sm:h-4 sm:w-4" />
                      <ArrowRight className="absolute -left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover/link:left-2 sm:-left-5 sm:h-4 sm:w-4 sm:group-hover/link:left-3" />
                    </span>
                    Read article
                  </Link>

                  <span className="flex items-center gap-2 text-[10px] text-neutral-500 sm:gap-3 sm:text-xs">
                    {article.publishDate}
                    <span className="w-6 border-t border-neutral-600 sm:w-10" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-10 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-2.5 text-sm text-neutral-100 transition-colors hover:border-[#C3E41D]/60 hover:text-[#C3E41D]"
            >
              View All Blogs
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
