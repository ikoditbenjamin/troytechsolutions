import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Blog | TroyTech Solutions — Web Dev & IT Insights",
  description:
    "Read the latest articles on web development, React, Next.js, UI design, deployment, and IT trends from the TroyTech Solutions team.",
  keywords: [
    "tech blog Uganda",
    "web development blog",
    "Next.js tutorials",
    "React tips",
    "IT insights Uganda",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/blogs",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tech Blog | TroyTech Solutions — Web Dev & IT Insights",
    description:
      "Read the latest articles on web development, React, Next.js, UI design, deployment, and IT trends from the TroyTech Solutions team.",
    url: "https://www.troytech.xyz/blogs",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TroyTech Solutions Blog" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog | TroyTech Solutions — Web Dev & IT Insights",
    description:
      "Read the latest articles on web development, React, Next.js, UI design, deployment, and IT trends from the TroyTech Solutions team.",
    images: ["/og-image.png"],
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
