// /**
//  * app/sitemap.ts
//  *
//  * Production-ready XML sitemap for TroyTech Solutions.
//  * Uses the Next.js 15/16 MetadataRoute API — no deprecated packages needed.
//  * The file is served automatically at https://troytech.xyz/sitemap.xml
//  *
//  * SEO priority scheme:
//  *   1.0  →  Homepage          (entry point, highest crawl priority)
//  *   0.9  →  Services page     (core conversion page)
//  *   0.8  →  Main pages        (about, contact, projects, booking)
//  *   0.7  →  Blog posts        (content / long-tail SEO)
//  *   0.3  →  Legal / utility   (low SEO value)
//  */

// import type { MetadataRoute } from "next";

// /* ─── Site config ────────────────────────────────────────────────────────── */

// /** Canonical base URL — used as prefix for every entry. */
// const BASE_URL = "https://troytech.xyz";

// /**
//  * Shared "last modified" date.
//  * In a real CMS-backed site you would pull this from each page's content.
//  * Here we track the date of the last major site update.
//  */
// const SITE_UPDATED = new Date("2025-06-27");

// /* ─── Static route definitions ──────────────────────────────────────────── */

// /**
//  * Every route is described inline so the priorities and frequencies are
//  * explicit and reviewable in one place.  If you add a new page, add it here.
//  */
// const STATIC_ROUTES: MetadataRoute.Sitemap = [
//   // ── Homepage ──────────────────────────────────────────────────────────
//   {
//     url: BASE_URL,
//     lastModified: SITE_UPDATED,
//     changeFrequency: "weekly",
//     priority: 1.0,
//   },

//   // ── Services (core conversion page) ───────────────────────────────────
//   {
//     url: `${BASE_URL}/services`,
//     lastModified: SITE_UPDATED,
//     changeFrequency: "monthly",
//     priority: 0.9,
//   },

//   // ── Main pages ────────────────────────────────────────────────────────
//   {
//     url: `${BASE_URL}/about`,
//     lastModified: SITE_UPDATED,
//     changeFrequency: "monthly",
//     priority: 0.8,
//   },
//   {
//     url: `${BASE_URL}/projects`,
//     lastModified: SITE_UPDATED,
//     changeFrequency: "monthly",
//     priority: 0.8,
//   },
//   {
//     url: `${BASE_URL}/contact`,
//     lastModified: SITE_UPDATED,
//     changeFrequency: "yearly",
//     priority: 0.8,
//   },
//   {
//     url: `${BASE_URL}/booking`,
//     lastModified: SITE_UPDATED,
//     changeFrequency: "monthly",
//     priority: 0.8,
//   },

//   // ── Blog index ────────────────────────────────────────────────────────
//   // {
//   //   url: `${BASE_URL}/blogs`,
//   //   lastModified: SITE_UPDATED,
//   //   changeFrequency: "weekly",   // new articles added regularly
//   //   priority: 0.7,
//   // },
// ];

// /* ─── Dynamic blog post routes ──────────────────────────────────────────── */

// /**
//  * Blog post data.
//  *
//  * In production, replace this array with a database / CMS / MDX query so that
//  * new posts are automatically included without touching this file.
//  *
//  * Example CMS fetch:
//  *   const posts = await fetch('https://cms.example.com/api/posts').then(r => r.json());
//  */
// const BLOG_POSTS: { slug: string; updatedAt: Date }[] = [
//   { slug: "how-to-build-a-modern-nextjs-website",        updatedAt: new Date("2026-03-10") },
//   { slug: "designing-beautiful-ui-with-tailwind-css",    updatedAt: new Date("2026-03-05") },
//   { slug: "understanding-react-components",              updatedAt: new Date("2026-03-01") },
//   { slug: "building-a-portfolio-website",                updatedAt: new Date("2026-02-20") },
//   { slug: "deploying-nextjs-apps",                       updatedAt: new Date("2026-02-15") },
//   { slug: "optimizing-website-performance",              updatedAt: new Date("2026-02-10") },
//   { slug: "the-future-of-web-development",               updatedAt: new Date("2026-01-28") },
// ];

// /**
//  * Builds individual blog post entries.
//  * Each post gets priority 0.7 and a weekly changeFrequency
//  * (Google re-crawls recently modified content more often).
//  */
// function getBlogPostRoutes(): MetadataRoute.Sitemap {
//   return BLOG_POSTS.map(({ slug, updatedAt }) => ({
//     url: `${BASE_URL}/blogs/${slug}`,
//     lastModified: updatedAt,
//     changeFrequency: "weekly" as const,
//     priority: 0.7,
//   }));
// }

// /* ─── Dynamic project routes ─────────────────────────────────────────────── */

// /**
//  * Project portfolio data.
//  * Replace with a DB/CMS query in production.
//  */
// const PROJECTS: { slug: string; updatedAt: Date }[] = [
//   { slug: "online-banking-system",       updatedAt: SITE_UPDATED },
//   { slug: "election-data-collection-app", updatedAt: SITE_UPDATED },
//   { slug: "e-commerce-website",          updatedAt: SITE_UPDATED },
//   { slug: "portfolio-website",           updatedAt: SITE_UPDATED },
//   { slug: "school-management-system",    updatedAt: SITE_UPDATED },
//   { slug: "blog-platform",              updatedAt: SITE_UPDATED },
//   { slug: "movie-website",              updatedAt: SITE_UPDATED },
//   { slug: "investment-system",          updatedAt: SITE_UPDATED },
// ];

// /**
//  * Builds individual project detail entries.
//  * Priority 0.7 — good SEO value as case studies.
//  */
// function getProjectRoutes(): MetadataRoute.Sitemap {
//   return PROJECTS.map(({ slug, updatedAt }) => ({
//     url: `${BASE_URL}/projects/${slug}`,
//     lastModified: updatedAt,
//     changeFrequency: "monthly" as const,
//     priority: 0.7,
//   }));
// }

// /* ─── Sitemap export ─────────────────────────────────────────────────────── */

// /**
//  * Next.js calls this function at build time (or on-demand if revalidate is set)
//  * and serialises the return value to a valid XML sitemap at /sitemap.xml.
//  *
//  * The function is synchronous here; make it `async` if you need to fetch
//  * dynamic data from a CMS, database, or external API.
//  */
// export default function sitemap(): MetadataRoute.Sitemap {
//   return [
//     ...STATIC_ROUTES,
//     ...getBlogPostRoutes(),
//     ...getProjectRoutes(),
//   ];
// }

import type { MetadataRoute } from "next";

const BASE_URL = "https://www.troytech.xyz";

// Update SITE_UPDATED whenever content changes to signal crawlers to re-index
const SITE_UPDATED = new Date("2026-06-30");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/booking`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}