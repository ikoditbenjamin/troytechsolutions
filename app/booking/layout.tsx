import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free IT Consultation | TroyTech Solutions Uganda",
  description:
    "Book a free consultation with TroyTech Solutions, Kampala Uganda. Discuss your software, website, IT security, computer training, or design needs with our expert team.",
  keywords: [
    "book IT consultation Uganda",
    "free software consultation Kampala",
    "hire developer Uganda",
    "IT consultation Kampala Uganda",
    "book web developer Uganda",
    "schedule IT meeting Uganda",
    "free tech consultation Uganda",
    "WhatsApp developer Uganda",
    "software quote Uganda",
    "IT project consultation East Africa",
    "book TroyTech Solutions",
    "website consultation Uganda",
    "app development consultation Uganda",
    "startup tech consultation Kampala",
    "book IT services Uganda",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz/booking",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Book a Free IT Consultation | TroyTech Solutions Uganda",
    description:
      "Book a free consultation with TroyTech Solutions, Kampala Uganda. Discuss your software, website, IT security, or design needs with our expert team.",
    url: "https://www.troytech.xyz/booking",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Book IT Consultation TroyTech Uganda" }],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free IT Consultation | TroyTech Solutions Uganda",
    description:
      "Book a free consultation with TroyTech Solutions, Kampala Uganda. Discuss your software, website, IT security, or design needs.",
    images: ["/og-image.png"],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
