import { AreaChart, Plus, Bike } from 'lucide-react';

type NavLink = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

const links: NavLink[] = [
    {
        href: '/dashboard/new',
        label: 'new rider',
        icon: <Plus />,
    },
    {
        href: '/dashboard/all',
        label: 'riders',
        icon: <Bike />,
    },
    {
        href: '/dashboard/stats',
        label: 'stats',
        icon: <AreaChart />,
    },
];

export default links;
