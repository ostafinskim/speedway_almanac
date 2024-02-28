export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full p-8">
            <div className="max-w-7xl w-full mx-auto my-14 flex flex-col items-center gap-5">
                {children}
            </div>
        </div>
    );
}