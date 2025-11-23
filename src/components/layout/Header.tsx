import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[var(--header-bg)] text-[var(--header-text)] shadow-md">
            <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 font-bold text-white text-sm">
                        AX
                    </div>
                    <span className="text-lg font-semibold tracking-tight">
                        AX Diagnosis
                    </span>
                </Link>
                <nav className="hidden md:flex items-center gap-1">
                    <Link href="/" className="px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors">
                        ダッシュボード
                    </Link>
                    <Link href="/diagnosis" className="px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors">
                        診断開始
                    </Link>
                    <Link href="/about" className="px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors">
                        設定
                    </Link>
                </nav>
            </div>
        </header>
    );
}
