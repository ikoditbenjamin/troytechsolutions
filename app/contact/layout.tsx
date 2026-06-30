import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact TroyTech Solutions | IT Services Kampala, Uganda",
  description:
    "Contact TroyTech Solutions in Kireka, Kampala, Uganda for IT services, software development, computer training, graphics design, or loan inquiries. Call +256 747 447 447.",
  keywords: [
    "contact TroyTech Solutions",
    "IT company contact Uganda",
    "software developer contact Kampala",
    "hire IT company Uganda",
    "tech support Kampala Uganda",
    "web developer contact Uganda",
    "IT services Kireka Kampala",
    "call TroyTech Uganda",
    "WhatsApp IT company Uganda",
    "email IT company Kampala",
    "IT firm contact Uganda",
    "get quote software Uganda",
    "freelance developer Uganda",
    "digital agency contact Kampala",
    "Uganda tech company phone number",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/contact",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact TroyTech Solutions | IT Services Kampala, Uganda",
    description:
      "Contact TroyTech Solutions in Kireka, Kampala, Uganda for IT services, software development, computer training, graphics design, or loan inquiries. Call +256 747 447 447.",
    url: "https://www.troytech.xyz/contact",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact TroyTech Solutions Kampala Uganda" }],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TroyTech Solutions | IT Services Kampala, Uganda",
    description:
      "Contact TroyTech Solutions in Kireka, Kampala for IT services, software development, training, and loan inquiries. Call +256 747 447 447.",
    images: ["/og-image.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
