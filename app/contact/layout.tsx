import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact TroyTech Solutions | Kampala Uganda IT Support",
  description:
    "Get in touch with TroyTech Solutions for IT services, software development, computer training, or loan inquiries. Based in Kireka, Kampala, Uganda.",
  keywords: [
    "contact TroyTech",
    "IT support Kampala",
    "hire developer Uganda",
    "tech company contact",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/contact",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact TroyTech Solutions | Kampala Uganda IT Support",
    description:
      "Get in touch with TroyTech Solutions for IT services, software development, computer training, or loan inquiries. Based in Kireka, Kampala, Uganda.",
    url: "https://www.troytech.xyz/contact",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact TroyTech Solutions" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TroyTech Solutions | Kampala Uganda IT Support",
    description:
      "Get in touch with TroyTech Solutions for IT services, software development, computer training, or loan inquiries. Based in Kireka, Kampala, Uganda.",
    images: ["/og-image.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
