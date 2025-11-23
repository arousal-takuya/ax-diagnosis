import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <MainLayout>
      <main className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4 animate-fade-in">
        {/* Logo/Icon */}
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-5xl font-bold text-white shadow-2xl shadow-sky-500/30 hover:scale-105 transition-transform duration-300">
          AX
        </div>

        {/* Hero Section */}
        <section className="mb-20">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-6xl md:text-7xl lg:text-8xl">
            AX Diagnosis
          </h1>
          <p className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
            AI Transformation Assessment
          </p>

          <p className="mb-12 max-w-3xl text-lg sm:text-xl text-[var(--foreground-muted)] leading-relaxed">
            あなたの組織のAI活用状況を診断し、次のステップを明確にします。<br />
            わずか数分で完了する無料の診断ツールです。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/diagnosis" className="w-full sm:w-auto">
              <Button size="lg" className="text-xl px-10 py-4 w-full sm:w-auto shadow-xl">
                診断を開始する →
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="text-xl px-10 py-4 w-full sm:w-auto">
                詳細を見る
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section aria-labelledby="features-heading" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          <h2 id="features-heading" className="sr-only">主な特徴</h2>
          <article className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-[var(--border-light)] hover:shadow-lg transition-all duration-200">
            <div className="text-4xl mb-3" aria-hidden="true">⚡</div>
            <h3 className="font-bold text-lg mb-2">迅速な診断</h3>
            <p className="text-sm text-[var(--foreground-muted)]">わずか5分で完了</p>
          </article>
          <article className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-[var(--border-light)] hover:shadow-lg transition-all duration-200">
            <div className="text-4xl mb-3" aria-hidden="true">📊</div>
            <h3 className="font-bold text-lg mb-2">視覚的なレポート</h3>
            <p className="text-sm text-[var(--foreground-muted)]">グラフで分かりやすく</p>
          </article>
          <article className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-[var(--border-light)] hover:shadow-lg transition-all duration-200">
            <div className="text-4xl mb-3" aria-hidden="true">🎯</div>
            <h3 className="font-bold text-lg mb-2">具体的な提案</h3>
            <p className="text-sm text-[var(--foreground-muted)]">次のアクションが明確に</p>
          </article>
        </section>
      </main>
    </MainLayout>
  );
}
