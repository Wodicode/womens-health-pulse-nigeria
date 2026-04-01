import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Women's Health Pulse Nigeria | RenewHER Intelligence Platform",
  description: "AI-powered social listening, trend intelligence, and content opportunity dashboard for women\'s health in Nigeria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#080616] text-white antialiased">{children}</body>
    </html>
  );
}
