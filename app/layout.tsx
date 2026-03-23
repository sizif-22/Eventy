import type { Metadata } from 'next';
import { Cinzel, Newsreader, Noto_Serif, Inter, Geist } from 'next/font/google';
import './globals.css';
import { ConvexClientProvider } from '@/components/ConvexClientProvider';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700'],
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-newsreader',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-notoserif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'EVNETY — Premium Event Platform',
  description: 'Create and share your event website effortlessly.',
  icons: {
    icon: '/convex.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { accessToken } = await withAuth();
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${cinzel.variable} ${newsreader.variable} ${notoSerif.variable} ${inter.variable} font-inter antialiased bg-background text-foreground`}
      >
        <ConvexClientProvider expectAuth={!!accessToken}>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}

