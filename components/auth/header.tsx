interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 text-center">
            <h1 className="text-3xl">Speedway Almanac</h1>
            <p className="text-muted-foreground">{label}</p>
        </div>
    );
};
