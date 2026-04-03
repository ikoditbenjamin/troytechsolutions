// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterV2 from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Full SEO / Open Graph / Twitter Metadata
export const metadata: Metadata = {
  title: {
    default: "TroyTech Solutions | IT Services & Loan Solutions",
    template: "%s | IT Services & Loan Solutions",
  },

  description:
    "We offer IT services, app development, graphics design, computer training, and reliable loan & finance solutions.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "TroyTech Solution",
    description:
      "Professional software solutions by TroyTech. Web, mobile, and custom apps for your business.",
    url: "https://sings-beta.vercel.app/", // replace with your domain
    siteName: "TroyTech Solution",
    images: [
      {
        url: "/og-image.png", // preview image in public folder
        width: 1200,
        height: 630,
        alt: "TroyTech Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TroyTech Solution",
    description:
      "Professional software solutions by TroyTech. Web, mobile, and custom apps.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
        <FooterV2 />
      </body>
    </html>
  );
}
