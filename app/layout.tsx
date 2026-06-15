import type { Metadata } from "next";
import { getContent } from "@/content";
import "./globals.css";

const content = getContent("en");

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={content.locale} dir={content.dir}>
      <body>{children}</body>
    </html>
  );
}
