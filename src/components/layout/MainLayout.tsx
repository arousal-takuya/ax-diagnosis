import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)]">
            <Header />
            <main className="flex-grow pt-14">
                <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
