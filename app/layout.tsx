import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import { Mulish } from "next/font/google";
import RevealObserver from "@/components/ui/RevealObserver";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Сайт для самозанятых — заявки прямо в Telegram",
  description: "Делаю простые сайты для мастеров. Показывают работы, отвечают на вопросы и собирают заявки без лишних переписок.",
  openGraph: {
    title: "Сайт для самозанятых",
    description: "Заявки без лишних переписок",
    url: "https://your-site.com",
    siteName: "Кирилл Тарачов",
    images: [
      {
        url: "https://your-site.com/og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`h-full antialiased ${unbounded.className} ${mulish.className}`}
    >
      <body className="flex min-h-full flex-col">
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
