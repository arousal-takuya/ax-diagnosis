import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)]">
            <Header />
            <main className="flex-1 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl w-full">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
