import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TroyTech Solutions | IT Company in Kampala, Uganda",
  description:
    "TroyTech Solutions is a leading IT company in Kampala, Uganda. Meet our team of developers, designers, and financial experts dedicated to transforming businesses across Uganda.",
  keywords: [
    "about TroyTech Solutions",
    "IT company Uganda",
    "software company Kampala",
    "tech company Uganda",
    "IT firm Kampala Uganda",
    "web developers Uganda",
    "software developers Kampala",
    "tech team Uganda",
    "Ugandan IT professionals",
    "technology company East Africa",
    "IT solutions provider Uganda",
    "digital agency Kampala",
    "Kireka tech company",
    "Uganda software house",
    "best IT company Uganda",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/about",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About TroyTech Solutions | IT Company in Kampala, Uganda",
    description:
      "TroyTech Solutions is a leading IT company in Kampala, Uganda. Meet our team of developers, designers, and financial experts dedicated to transforming businesses across Uganda.",
    url: "https://www.troytech.xyz/about",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About TroyTech Solutions Uganda" }],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About TroyTech Solutions | IT Company in Kampala, Uganda",
    description:
      "TroyTech Solutions is a leading IT company in Kampala, Uganda. Meet our team of developers, designers, and financial experts dedicated to transforming businesses across Uganda.",
    images: ["/og-image.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
