import "@unocss/reset/sanitize/sanitize.css";
import "@unocss/reset/tailwind.css";
import "@/styles/reset.css";
import "@/styles/uno.css"; // compiled styles from unocss cli // unocss only create styles for icons (svg-in-css icons with unocss icon preset), other calsses are handled with tailwind
import "@/styles/globals.css";
// import "@/public/fonts/iransans/css/iransans.css";
// import "@/public/fonts/azarmehr/css/azarmehr.css";
// import "@/public/fonts/rubik/css/rubik.css";
import "@/public/fonts/nohemi/css/nohemi.css";
import "@/public/fonts/geist/css/geist.css";
import "@/public/fonts/space-mono/css/space-mono.css";

import type { Metadata } from "next";
import AppLayout from "@/components/AppLayout";


const title = "Hamid K.";
const description = "A Developer with Design Superpowers";

export const metadata: Metadata = {
  title: {
    template: "%s | Hamid K.",
    default: "Hamid K.",
  },
  alternates: {
    // canonical: '/blog',
},
  description: description,
  metadataBase: new URL("https://awww.dev"),
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description ,
    creator: title,
    images: ["https://awww.dev/opengraph-image.jpg"], // Must be an absolute URL
  },
  openGraph: {
    title: title,
    description: description ,
    url: "",
    siteName: "Next.js",
    images: [
      // {
      //   url: "https://awww.dev/opengraph-image.jpg", // Must be an absolute URL
      //   width: 800,
      //   height: 600,
      // },
      {
        url: "https://awww.dev/opengraph-image.jpg", // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark-theme style-scroll-bar" lang='en'>
      <head></head>
      <body className={`dark-theme bg-base1 c-base12 relative isolate`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
