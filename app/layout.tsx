// app/layout.tsx
import type { Metadata } from "next";
import { Kufam, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterV2 from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";

const kufam = Kufam({
  variable: "--font-kufam",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.troytech.xyz"),
  title: {
    default: "TroyTech Solutions | IT Services Uganda",
    template: "%s | TroyTech Solutions",
  },
  description:
    "TroyTech Solutions — Uganda's trusted IT company. Software development, computer training, graphics design, CCTV, and IT security in Kampala.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "TroyTech Solutions",
    description:
      "Professional IT solutions by TroyTech. Web, mobile, and custom apps for your business.",
    url: "https://www.troytech.xyz",
    siteName: "TroyTech Solutions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TroyTech Solutions Logo",
      },
    ],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TroyTech Solutions",
    description:
      "Professional IT solutions by TroyTech. Web, mobile, and custom apps.",
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
        className={`${kufam.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
        style={{ fontFamily: "var(--font-kufam), system-ui, sans-serif" }}
      >
        {/* Global grid texture */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Global ambient glow — top-left */}
        <div className="pointer-events-none fixed top-0 left-0 w-[700px] h-[500px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-orange-500/5 blur-[120px] z-0" />
        {/* Global ambient glow — bottom-right */}
        <div className="pointer-events-none fixed bottom-0 right-0 w-[600px] h-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-amber-500/4 blur-[100px] z-0" />

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
        <WhatsAppButton />
      </body>
    </html>
  );
}
