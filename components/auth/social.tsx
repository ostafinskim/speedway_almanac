'use client';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';

export const Social = ({}) => {
    return (
        <div className="flex flex-col items-center w-full gap-4">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => {}}
            >
                <FcGoogle className="w-6 h-6 mr-4" />
                Sign in with Google
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => {}}
            >
                <FaGithub className="w-6 h-6 mr-4" />
                Sign in with Github
            </Button>
        </div>
    );
};
