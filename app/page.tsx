"use client";
import Image from 'next/image';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from 'next-themes';

export default function Home() {
    const { theme } = useTheme();
    const gm_img = theme === 'dark' ? '/gm-light.svg' : '/gm.svg';
    return (
        <main className="h-full p-8">
            <ThemeToggle />
            <div className="max-w-7xl w-full mx-auto my-14 flex flex-col items-center gap-5">
                <Image
                    src={gm_img}
                    alt="Speedway bike"
                    width={1440}
                    height={100}
                    priority
                />
                <h1 className="text-center text-4xl md:text-6xl lg:text-8xl drop-shadow-2xl">
                    Speedway Almanac
                </h1>
                <p className="max-w-4xl text-center">
                    Speedway almanac is a collection of data about speedway
                    riders, teams, and tournaments.
                </p>
                <div className="flex gap-5">
                    <Link href="/auth/register">
                        <Button variant="default">Register / Login</Button>
                    </Link>
                    <Link href="/free-ride">
                        <Button variant="secondary">Free Ride</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
