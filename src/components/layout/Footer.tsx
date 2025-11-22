export default function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-[var(--background)] py-8 mt-auto">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <p className="text-sm text-[var(--secondary-foreground)]">
                    &copy; {new Date().getFullYear()} AX Diagnosis. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
