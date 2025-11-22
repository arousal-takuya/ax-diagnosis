import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center animate-fade-in">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-4xl font-bold text-white shadow-lg shadow-blue-500/30">
          AX
        </div>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
          AX Diagnosis
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mt-2">
            AI Transformation
          </span>
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-[var(--secondary-foreground)]">
          あなたの組織のAI活用状況を診断し、次のステップを明確にします。<br />
          わずか数分で完了する無料の診断ツールです。
        </p>
        <div className="flex gap-4">
          <Link href="/diagnosis">
            <Button size="lg" className="text-lg px-8">
              診断を開始する
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-lg px-8">
              詳細を見る
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
