import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 font-bold text-white">
                        AX
                    </div>
                    <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                        AX Diagnosis
                    </span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-[var(--secondary-foreground)] hover:text-[var(--primary)] transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-[var(--secondary-foreground)] hover:text-[var(--primary)] transition-colors">
                        About
                    </Link>
                </nav>
            </div>
        </header>
    );
}
