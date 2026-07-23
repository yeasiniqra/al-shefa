/**
 * "Latest Blogs" home section — mock list shaped for the future blog API.
 * Swap for `getLatestBlogs()` (fetch) later; BlogCard reads this shape as-is.
 *
 * Each post: { id, slug, title, excerpt, image, date:{ day, month }, href }
 */
export const BLOGS = [
  {
    id: 1,
    slug: "vitamins-supplements-guide",
    title: "Vitamins & Supplements: Which Ones Do You Really Need?",
    excerpt: "A complete guide to essential vitamins and supplements for a healthier life.",
    image: "/images/blogs/blog-1.png",
    date: { day: "20", month: "May" },
    href: "/blog/vitamins-supplements-guide",
  },
  {
    id: 2,
    slug: "manage-diabetes-naturally",
    title: "How to Manage Diabetes Naturally?",
    excerpt: "Lifestyle changes and natural tips to help manage diabetes effectively.",
    image: "/images/blogs/blog-2.png",
    date: { day: "18", month: "May" },
    href: "/blog/manage-diabetes-naturally",
  },
  {
    id: 3,
    slug: "boost-immunity-this-season",
    title: "Boost Your Immunity This Season",
    excerpt: "Best foods, habits, and supplements to strengthen your immune system.",
    image: "/images/blogs/blog-3.png",
    date: { day: "16", month: "May" },
    href: "/blog/boost-immunity-this-season",
  },
];

export const BLOGS_CTA = { label: "View All Blogs", href: "/blog" };
