import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "RenewHER Women's Health Pulse",
  description: "Intelligence command centre for women's health in Nigeria. Real-time social listening, trend intelligence, and content strategy for RenewHER.",
  icons: { icon: '/favicon.png' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#f9fafb] text-gray-900 antialiased">{children}</body>
    </html>
  );
}
