import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-light)] bg-white/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] font-bold text-white text-lg shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
                        AX
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                        AX Diagnosis
                    </span>
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-semibold text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors duration-200">
                        ホーム
                    </Link>
                    <Link href="/about" className="text-sm font-semibold text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors duration-200">
                        詳細
                    </Link>
                </nav>
            </div>
        </header>
    );
}
