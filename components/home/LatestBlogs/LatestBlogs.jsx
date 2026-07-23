import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import BlogCard from "./BlogCard";
import { BLOGS, BLOGS_CTA } from "@/data/blogs";

/**
 * "Latest Blogs" home section — reuses the existing <SectionTitle>, maps posts
 * to <BlogCard>, and shows a "View All Blogs" CTA. Data-driven (ready for a
 * `fetch` swap). No extra subtitle/decoration added.
 */
export default function LatestBlogs({ posts = BLOGS, cta = BLOGS_CTA }) {
  if (!posts?.length) return null;

  return (
    <section className="blogs" aria-label="Latest blogs">
      <div className="container">
        <SectionTitle title="Latest Blogs" />

        <div className="blogs__grid">
          {posts.map((post) => (
            <BlogCard key={post.id} blog={post} />
          ))}
        </div>

        {cta ? (
          <div className="blogs__cta-wrap">
            <Link href={cta.href} className="blogs__cta">
              {cta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
