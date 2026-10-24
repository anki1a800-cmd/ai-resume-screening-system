import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DemoBanner from '@/components/common/DemoBanner';

export const metadata: Metadata = {
  title: 'AI Resume Screening System — Enterprise Recruitment Platform',
  description:
    'Full-stack recruitment and automated resume screening platform built with Next.js, React, Tailwind CSS, and Java Spring Boot.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen text-slate-800 bg-slate-50 selection:bg-blue-600 selection:text-white">
        <AppProvider>
          <DemoBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
