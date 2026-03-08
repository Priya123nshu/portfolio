import Link from "next/link";
import Blogs from "@/components/ui/blogs";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_-10%,rgba(180,180,180,0.28),rgba(32,32,32,1)_46%)] pt-24 text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">All Blogs</h1>
        <Link
          href="/#blogs"
          className="rounded-md border border-white/20 px-4 py-2 text-sm text-neutral-200 transition-colors hover:border-[#C3E41D]/60 hover:text-[#C3E41D]"
        >
          Back to Portfolio
        </Link>
      </div>
      <Blogs sectionId="blogs-list" showViewAll={false} caption="ARTICLE LIBRARY" />
    </main>
  );
}
