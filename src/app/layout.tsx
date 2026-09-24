import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import { person } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Backdrop } from "@/components/site/Backdrop";
import "./globals.css";

// Hangul: Pretendard (self-hosted from the npm package). Latin/numbers: Geist.
const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const defaultTitle = `${person.name}, ${person.role}`;

/**
 * Absolute base for og:image and other URL metadata. Set NEXT_PUBLIC_SITE_URL once the real domain is
 * known; on Vercel the production domain is picked up automatically. Never a placeholder host.
 */
function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: {
    template: `%s | ${person.name}`,
    default: defaultTitle,
  },
  description: person.lede,
  openGraph: {
    title: defaultTitle,
    description: person.lede,
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceef1" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1013" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${geist.variable} ${geistMono.variable} antialiased`}>
      <body>
        <Backdrop />
        <a href="#main" className="skip-link">
          본문으로 건너뛰기
        </a>
        <Nav name={person.name} email={person.email} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
