import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects | TroyTech Solutions Portfolio — Uganda",
  description:
    "Explore TroyTech Solutions' portfolio of completed projects including banking systems, e-commerce platforms, school management systems and more.",
  keywords: [
    "TroyTech projects",
    "software portfolio Uganda",
    "web development portfolio",
    "banking system Uganda",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/projects",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Our Projects | TroyTech Solutions Portfolio — Uganda",
    description:
      "Explore TroyTech Solutions' portfolio of completed projects including banking systems, e-commerce platforms, school management systems and more.",
    url: "https://www.troytech.xyz/projects",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TroyTech Solutions Projects" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Projects | TroyTech Solutions Portfolio — Uganda",
    description:
      "Explore TroyTech Solutions' portfolio of completed projects including banking systems, e-commerce platforms, school management systems and more.",
    images: ["/og-image.png"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
