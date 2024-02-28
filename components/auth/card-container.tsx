'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import { BackButton } from '@/components/auth/back-button';

interface CardContainerProps {
    children: React.ReactNode;
    header_label: string;
    back_button_label: string;
    back_button_href: string;
    show_social?: boolean;
}

export const CardContainer = ({
    children,
    header_label,
    back_button_label,
    back_button_href,
    show_social,
}: CardContainerProps) => {
    return (
        <Card className="max-w-2xl w-full mx-auto bg-white rounded-lg shadow-lg">
            <CardHeader>
                <Header label={header_label} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {show_social && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={back_button_label} href={back_button_href} />
            </CardFooter>
        </Card>
    );
};
