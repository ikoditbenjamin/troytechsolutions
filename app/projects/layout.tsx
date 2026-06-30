import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Projects Portfolio Uganda | TroyTech Solutions",
  description:
    "Explore TroyTech Solutions' software projects built for Ugandan businesses — banking systems, e-commerce, school management, election apps, investment platforms and more.",
  keywords: [
    "software projects Uganda",
    "web development portfolio Uganda",
    "TroyTech projects",
    "IT portfolio Kampala",
    "banking software Uganda",
    "e-commerce website Uganda",
    "school management system Uganda",
    "mobile app Uganda",
    "custom software Uganda",
    "web application Kampala",
    "investment platform Uganda",
    "election app Uganda",
    "software portfolio East Africa",
    "Ugandan software developer portfolio",
    "tech projects Kampala Uganda",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/projects",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Software Projects Portfolio Uganda | TroyTech Solutions",
    description:
      "Explore TroyTech Solutions' software projects built for Ugandan businesses — banking systems, e-commerce, school management, election apps, investment platforms and more.",
    url: "https://www.troytech.xyz/projects",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TroyTech Solutions Projects Portfolio Uganda" }],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Projects Portfolio Uganda | TroyTech Solutions",
    description:
      "Explore TroyTech Solutions' software projects — banking systems, e-commerce, school management, and more, built for Ugandan businesses.",
    images: ["/og-image.png"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
