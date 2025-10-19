import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
export const metadata: Metadata = { title: "KR Weekly Weather", description: "대한민국 1주일 예보 + 우산/의상 추천" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="ko"><body><ThemeRegistry>{children}</ThemeRegistry></body></html>);
}
