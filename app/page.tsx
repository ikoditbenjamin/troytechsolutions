import type { Metadata } from "next";
import FeatureSectionThree from '@/components/featured-sec'
import HeroSectionThree from '@/components/herosection'
import LoansPage from '@/components/loans'
import React from 'react'

export const metadata: Metadata = {
  title: "TroyTech Solutions | IT Services & Loans in Kampala, Uganda",
  description:
    "TroyTech Solutions — Uganda's trusted IT company in Kampala. Software development, computer training, graphics design, CCTV installation, IT security, and loan services across Uganda.",
  keywords: [
    "IT company Uganda",
    "IT company Kampala",
    "software development Uganda",
    "software development Kampala",
    "web development Uganda",
    "web developer Kampala",
    "computer training Uganda",
    "computer training Kampala",
    "graphics design Uganda",
    "graphics design Kampala",
    "CCTV installation Uganda",
    "network setup Uganda",
    "IT security Uganda",
    "loan services Uganda",
    "personal loans Uganda",
    "business loans Kampala",
    "IT solutions Uganda",
    "tech company Uganda",
    "mobile app development Uganda",
    "website design Uganda",
    "website design Kampala",
    "TroyTech Solutions",
    "TroyTech Uganda",
    "best IT company Uganda",
    "affordable software Uganda",
    "digital services Uganda",
    "IT support Uganda",
    "data recovery Uganda",
    "computer repair Uganda",
    "printing services Uganda",
    "IT consultancy Uganda",
    "technology company Kampala",
    "East Africa software company",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "TroyTech Solutions | IT Services & Loans in Kampala, Uganda",
    description:
      "TroyTech Solutions — Uganda's trusted IT company in Kampala. Software development, computer training, graphics design, CCTV, IT security, and loan services across Uganda.",
    url: "https://www.troytech.xyz",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TroyTech Solutions — IT Services Uganda" }],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TroyTech Solutions | IT Services & Loans in Kampala, Uganda",
    description:
      "Uganda's trusted IT company. Software development, computer training, graphics design, CCTV, and loans in Kampala.",
    images: ["/og-image.png"],
  },
};

export default function page() {
  return (
    <div>
      <HeroSectionThree />
      <FeatureSectionThree/>
      <LoansPage/>
    </div>
  )
}
