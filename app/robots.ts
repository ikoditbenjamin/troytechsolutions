// /**
//  * app/robots.ts
//  *
//  * Generates /robots.txt via the Next.js MetadataRoute API.
//  * Tells crawlers what to index and points them to the sitemap.
//  *
//  * Served automatically at https://www.troytech.xyz/robots.txt
//  */

// import type { MetadataRoute } from "next";

// const BASE_URL = "https://troytech.xyz";

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: [
//       {
//         // Allow all well-behaved crawlers to index everything
//         userAgent: "*",
//         allow: "/",
//         // Disallow internal/utility paths that have no SEO value
//         disallow: [
//           "/api/",        // API routes — not for indexing
//           "/_next/",      // Next.js build artefacts
//         ],
//       },
//     ],
//     // Point Google (and other crawlers) directly to the sitemap
//     sitemap: `${BASE_URL}/sitemap.xml`,
//     // Canonical host — helps Search Console understand the preferred domain
//     host: BASE_URL,
//   };
// }

import type { MetadataRoute } from "next";

const BASE_URL = "https://www.troytech.xyz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
      ],
    },

    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}