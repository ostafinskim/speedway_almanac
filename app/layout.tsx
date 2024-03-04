import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter_Tight({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Speedway Almanac',
    description: 'The ultimate guide to the world of speedway racing.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
