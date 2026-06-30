import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TroyTech Solutions | IT Company in Kampala Uganda",
  description:
    "Learn about TroyTech Solutions — our story, team, and mission to deliver innovative IT services and financial solutions across Uganda.",
  keywords: [
    "about TroyTech",
    "IT company Uganda",
    "software company Kampala",
    "tech team Uganda",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/about",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About TroyTech Solutions | IT Company in Kampala Uganda",
    description:
      "Learn about TroyTech Solutions — our story, team, and mission to deliver innovative IT services and financial solutions across Uganda.",
    url: "https://www.troytech.xyz/about",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About TroyTech Solutions" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About TroyTech Solutions | IT Company in Kampala Uganda",
    description:
      "Learn about TroyTech Solutions — our story, team, and mission to deliver innovative IT services and financial solutions across Uganda.",
    images: ["/og-image.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
