import { Provider } from '@/components/provider';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajarprotocol.org'),
  title: {
    default: 'Ajar Protocol',
    template: '%s | Ajar Protocol',
  },
  description: 'Open websites to AI agents under owner-controlled policy.',
  openGraph: {
    title: 'Ajar Protocol',
    description: 'Open websites to AI agents under owner-controlled policy.',
    url: 'https://ajarprotocol.org',
    siteName: 'Ajar Protocol',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajar Protocol',
    description: 'Open websites to AI agents under owner-controlled policy.',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
