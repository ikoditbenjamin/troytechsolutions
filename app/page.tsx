import type { Metadata } from "next";
import FeatureSectionThree from '@/components/featured-sec'
import HeroSectionThree from '@/components/herosection'
import LoansPage from '@/components/loans'
import React from 'react'

export const metadata: Metadata = {
  title: "TroyTech Solutions | IT Services & Loans in Uganda",
  description:
    "TroyTech Solutions offers professional IT services, software development, computer training, graphics design, and loan services in Kampala, Uganda.",
  keywords: [
    "IT services Uganda",
    "software development Kampala",
    "computer training Uganda",
    "web development",
    "loans Uganda",
    "graphics design",
  ],
  alternates: {
    canonical: "https://www.troytech.xyz",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "TroyTech Solutions | IT Services & Loans in Uganda",
    description:
      "TroyTech Solutions offers professional IT services, software development, computer training, graphics design, and loan services in Kampala, Uganda.",
    url: "https://www.troytech.xyz",
    siteName: "TroyTech Solutions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TroyTech Solutions" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TroyTech Solutions | IT Services & Loans in Uganda",
    description:
      "TroyTech Solutions offers professional IT services, software development, computer training, graphics design, and loan services in Kampala, Uganda.",
    images: ["/og-image.png"],
  },
};


export default function page() {
  return (
    <div>
      <HeroSectionThree />
      <FeatureSectionThree/>
      <LoansPage/>
     
      {/* <ServicesPage/> */}
 
    </div>
   )
}
