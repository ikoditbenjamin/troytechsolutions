// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterV2 from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import ChatBot from "@/components/ChatBot";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-[#020617] text-slate-100`}
        style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
      >
        {/* Global cyber grid texture */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Global ambient glow — top-left */}
        <div className="pointer-events-none fixed top-0 left-0 w-[700px] h-[500px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan-500/5 blur-[120px] z-0" />
        {/* Global ambient glow — bottom-right */}
        <div className="pointer-events-none fixed bottom-0 right-0 w-[600px] h-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/4 blur-[100px] z-0" />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative z-10">
            <Header />
            {children}
          </div>
        </ThemeProvider>
        <div className="relative z-10">
          <FooterV2 />
        </div>
        <ChatBot />
      </body>
    </html>
  );
}
