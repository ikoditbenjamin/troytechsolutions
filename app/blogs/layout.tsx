import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Blog Uganda | TroyTech Solutions — IT & Web Dev Insights",
  description:
    "Read the latest tech articles from TroyTech Solutions in Uganda. Web development, React, Next.js, IT security, digital transformation tips for Ugandan businesses.",
  keywords: [
    "tech blog Uganda",
    "IT blog Kampala",
    "web development Uganda",
    "Next.js tutorials Uganda",
    "React tips Uganda",
    "software development blog Uganda",
    "technology articles Uganda",
    "digital transformation Uganda",
    "IT insights East Africa",
    "coding blog Uganda",
    "web design tips Uganda",
    "TroyTech blog",
    "Uganda developer blog",
    "tech news Uganda",
    "IT education Uganda",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/blogs",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tech Blog Uganda | TroyTech Solutions — IT & Web Dev Insights",
    description:
      "Read the latest tech articles from TroyTech Solutions in Uganda. Web development, React, Next.js, IT security, and digital transformation tips for Ugandan businesses.",
    url: "https://www.troytech.xyz/blogs",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TroyTech Solutions Tech Blog Uganda" }],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog Uganda | TroyTech Solutions — IT & Web Dev Insights",
    description:
      "Read the latest tech articles from TroyTech Solutions in Uganda. Web development, React, Next.js, IT security, and digital transformation tips.",
    images: ["/og-image.png"],
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
