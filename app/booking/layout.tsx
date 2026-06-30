import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation | TroyTech Solutions — Free Call",
  description:
    "Schedule a free consultation with TroyTech Solutions. Discuss your software, IT, design, or loan needs with our expert team via WhatsApp.",
  keywords: [
    "book consultation TroyTech",
    "free IT consultation Uganda",
    "schedule call developer Uganda",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/booking",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Book a Consultation | TroyTech Solutions — Free Call",
    description:
      "Schedule a free consultation with TroyTech Solutions. Discuss your software, IT, design, or loan needs with our expert team via WhatsApp.",
    url: "https://www.troytech.xyz/booking",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Book a TroyTech Consultation" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Consultation | TroyTech Solutions — Free Call",
    description:
      "Schedule a free consultation with TroyTech Solutions. Discuss your software, IT, design, or loan needs with our expert team via WhatsApp.",
    images: ["/og-image.png"],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
