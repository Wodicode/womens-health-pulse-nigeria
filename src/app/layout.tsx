import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Women's Health Pulse Nigeria | RenewHER",
  description: "Real-time social listening, trend intelligence, and content opportunities for women's health in Nigeria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#f9fafb] text-gray-900 antialiased">{children}</body>
    </html>
  );
}
