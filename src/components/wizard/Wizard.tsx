"use client";

import React, { useState, useMemo } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle,
    BarChart2,
    Brain,
    Sparkles,
    Building2,
    ShieldCheck,
    Users,
    Target,
    ArrowRight,
    RefreshCcw
} from 'lucide-react';
import { STEPS, Question } from '@/data/diagnosis';
import SearchSelect from '@/components/ui/SearchSelect';
import { cn } from '@/lib/utils';

export default function Wizard() {
    const [currentStepIndex, setCurrentStepIndex] = useState(-1); // -1: Welcome
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // 診断の開始
    const handleStart = () => setCurrentStepIndex(0);

    // 前へ戻る
    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        } else {
            setCurrentStepIndex(-1);
        }
    };

    // 次へ進む
    const handleNext = () => {
        if (currentStepIndex < STEPS.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            setIsAnalyzing(true);
            setTimeout(() => {
                setIsAnalyzing(false);
                setCurrentStepIndex(STEPS.length); // Result
            }, 2000);
        }
    };

    // 回答の更新
    const handleAnswerChange = (questionId: string, value: any) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    // Checkbox用のトグルロジック（排他制御含む）
    const handleCheckboxChange = (questionId: string, option: string, question: Question) => {
        const currentValues: string[] = answers[questionId] || [];
        let newValues: string[] = [];

        // 排他オプション（「なし」「未実施」など）が選ばれた場合
        if (question.exclusiveOptions?.includes(option)) {
            if (currentValues.includes(option)) {
                // 解除する場合
                newValues = [];
            } else {
                // 選択する場合、他をクリアしてこれだけにする
                newValues = [option];
            }
        }
        // 通常オプションが選ばれた場合
        else {
            // 既存の排他オプションがあればクリアする
            const valuesWithoutExclusive = currentValues.filter(v => !question.exclusiveOptions?.includes(v));

            if (currentValues.includes(option)) {
                newValues = valuesWithoutExclusive.filter(v => v !== option);
            } else {
                newValues = [...valuesWithoutExclusive, option];
            }

            // ペアの排他制御（全社展開 vs 部署限定など）
            if (question.exclusivePairs) {
                question.exclusivePairs.forEach(pair => {
                    if (pair.includes(option)) {
                        // ペアの相手を削除
                        const other = pair.find(p => p !== option);
                        newValues = newValues.filter(v => v !== other);
                    }
                });
            }
        }

        setAnswers(prev => ({
            ...prev,
            [questionId]: newValues
        }));
    };

    // 現在のステップの完了判定
    const isCurrentStepComplete = () => {
        if (currentStepIndex < 0 || currentStepIndex >= STEPS.length) return false;
        const currentQuestions = STEPS[currentStepIndex].questions;

        // 必須チェック（今回は全て必須扱いだが、任意項目は除外）
        return currentQuestions.every(q => {
            // 任意項目はスキップ
            if (q.label.includes('（任意）')) return true;

            const val = answers[q.id];
            if (q.type === 'checkbox') return val && val.length > 0;
            return val && val !== '';
        });
    };

    // スコア計算（簡易ロジック）
    const resultData = useMemo(() => {
        if (currentStepIndex !== STEPS.length) return null;

        let totalScore = 0;
        let maxScore = 0;

        // スコアマップがある質問のみ計算対象
        STEPS.forEach(step => {
            step.questions.forEach(q => {
                if (q.scoreMap) {
                    maxScore += 5; // 各質問最大5点満点換算
                    const val = answers[q.id];
                    if (val && q.scoreMap[val] !== undefined) {
                        totalScore += q.scoreMap[val];
                    }
                }
            });
        });

        // スコアマップがない項目も多いため、補正（最低限の分母を確保）
        if (maxScore === 0) maxScore = 35; // 仮の分母

        const percentage = Math.round((totalScore / maxScore) * 100);

        let rank = '';
        let description = '';
        let color = '';

        if (percentage >= 80) {
            rank = 'AX Leader';
            description = 'トップクラスの推進体制と実績があります。業界をリードする存在です。';
            color = 'text-blue-600';
        } else if (percentage >= 60) {
            rank = 'AX Challenger';
            description = '本格的な導入が進み、成果が出始めています。全社展開への加速が鍵です。';
            color = 'text-indigo-600';
        } else if (percentage >= 40) {
            rank = 'Follower';
            description = '導入に着手し、基盤ができつつあります。具体的なユースケースの拡大が必要です。';
            color = 'text-yellow-600';
        } else {
            rank = 'Starter';
            description = 'これからが変革のスタートです。まずは方針策定と小さな成功体験を作りましょう。';
            color = 'text-gray-600';
        }

        return { percentage, rank, description, color, totalScore, maxScore };
    }, [currentStepIndex, answers]);


    // --- レンダリング ---

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-800 flex flex-col">

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <Sparkles size={18} />
                        </div>
                        <h1 className="font-bold text-lg tracking-tight text-slate-900">AX Compass 2.0</h1>
                    </div>
                    {currentStepIndex >= 0 && currentStepIndex < STEPS.length && (
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Progress
                            </div>
                            <div className="w-24 sm:w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                                    style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 pb-20">

                {/* Welcome Screen */}
                {currentStepIndex === -1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-8">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                            <div className="bg-indigo-600 p-10 text-white text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
                                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-inner">
                                    <BarChart2 size={40} className="text-white" />
                                </div>
                                <h2 className="text-3xl font-bold mb-2 relative z-10">AX Readiness Check</h2>
                                <p className="text-indigo-100 relative z-10">組織のAIトランスフォーメーション成熟度診断</p>
                            </div>
                            <div className="p-8 md:p-10">
                                <p className="text-slate-600 mb-8 leading-relaxed text-center text-lg">
                                    最新のAX（AI Transformation）指標に基づき、<br className="hidden md:block" />
                                    組織の「戦略」「ガバナンス」「人材」「活用度」を包括的に診断します。
                                </p>

                                <div className="grid grid-cols-1 gap-4 mb-10 max-w-lg mx-auto">
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                                            <Building2 size={20} />
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-bold block text-slate-900">Step 1: 基本プロファイル</span>
                                            <span className="text-slate-500">組織規模・業界・推進体制</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-bold block text-slate-900">Step 2: 導入状況・ガバナンス</span>
                                            <span className="text-slate-500">ツール導入・ルール策定・教育</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                                            <Users size={20} />
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-bold block text-slate-900">Step 3: 利用・浸透</span>
                                            <span className="text-slate-500">全部署への展開・具体的な成果</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                                            <Target size={20} />
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-bold block text-slate-900">Step 4: 目標設定</span>
                                            <span className="text-slate-500">KGI/KPI・予算・期間</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleStart}
                                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-lg"
                                >
                                    診断を開始する <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Steps */}
                {currentStepIndex >= 0 && currentStepIndex < STEPS.length && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* Step Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 text-indigo-600 mb-2">
                                {STEPS[currentStepIndex].icon}
                                <span className="font-bold tracking-wide text-sm uppercase">
                                    {STEPS[currentStepIndex].title}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">{STEPS[currentStepIndex].description}</h2>
                        </div>

                        {/* Questions Form */}
                        <div className="space-y-8">
                            {STEPS[currentStepIndex].questions.map((q) => (
                                <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="mb-4">
                                        <label className="block text-slate-900 font-bold mb-1">
                                            {q.label}
                                            {!q.label.includes('（任意）') && <span className="text-red-500 ml-1">*</span>}
                                        </label>
                                        {q.note && <p className="text-xs text-slate-500">{q.note}</p>}
                                    </div>

                                    {/* Input Types */}
                                    {q.type === 'select' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {q.options?.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleAnswerChange(q.id, opt)}
                                                    className={cn(
                                                        "px-4 py-3 text-left rounded-lg text-sm transition-all border",
                                                        answers[q.id] === opt
                                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200 ring-offset-1'
                                                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-indigo-300'
                                                    )}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {q.type === 'search-select' && q.options && (
                                        <SearchSelect
                                            options={q.options}
                                            value={answers[q.id]}
                                            onChange={(val) => handleAnswerChange(q.id, val)}
                                        />
                                    )}

                                    {q.type === 'checkbox' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {q.options?.map((opt) => {
                                                const isSelected = (answers[q.id] || []).includes(opt);
                                                return (
                                                    <button
                                                        key={opt}
                                                        onClick={() => handleCheckboxChange(q.id, opt, q)}
                                                        className={cn(
                                                            "px-4 py-3 text-left rounded-lg text-sm transition-all border flex items-center justify-between group",
                                                            isSelected
                                                                ? 'bg-indigo-50 text-indigo-900 border-indigo-500 font-semibold'
                                                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-indigo-300'
                                                        )}
                                                    >
                                                        <span>{opt}</span>
                                                        {isSelected ? (
                                                            <CheckCircle size={18} className="text-indigo-600" />
                                                        ) : (
                                                            <div className="w-4 h-4 rounded-full border border-slate-300 group-hover:border-indigo-400" />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {q.type === 'text' && (
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                            placeholder={q.placeholder}
                                            value={answers[q.id] || ''}
                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                        />
                                    )}

                                    {q.type === 'textarea' && (
                                        <textarea
                                            rows={3}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                                            placeholder={q.placeholder}
                                            value={answers[q.id] || ''}
                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="mt-8 flex items-center justify-between sticky bottom-4 z-10 bg-white/80 backdrop-blur p-4 rounded-2xl shadow-lg border border-white/50">
                            <button
                                onClick={handleBack}
                                className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors flex items-center gap-2"
                            >
                                <ChevronLeft size={20} /> 戻る
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!isCurrentStepComplete()}
                                className={cn(
                                    "px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center gap-2",
                                    isCurrentStepComplete()
                                        ? 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 hover:shadow-indigo-200'
                                        : 'bg-slate-300 cursor-not-allowed'
                                )}
                            >
                                {currentStepIndex === STEPS.length - 1 ? '診断結果を見る' : '次へ'}
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <div className="h-20" /> {/* Spacer for bottom nav */}
                    </div>
                )}

                {/* Analyzing Screen */}
                {isAnalyzing && (
                    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in duration-500">
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                            <Brain className="absolute inset-0 m-auto text-indigo-600 animate-pulse" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">診断結果を作成中...</h3>
                        <p className="text-slate-500">回答データを分析し、最適化レポートを生成しています</p>
                    </div>
                )}

                {/* Result Screen */}
                {currentStepIndex === STEPS.length && resultData && (
                    <div className="animate-in slide-in-from-bottom-8 duration-700 pb-10">
                        {/* Score Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mb-8">
                            <div className="p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />

                                <p className="text-slate-500 font-medium mb-4 uppercase tracking-wider text-xs">AX Maturity Score</p>
                                <div className="flex items-end justify-center gap-2 mb-4">
                                    <span className={cn("text-6xl font-black tracking-tighter", resultData.color)}>
                                        {resultData.percentage}
                                    </span>
                                    <span className="text-xl text-slate-400 font-bold mb-2">/ 100</span>
                                </div>

                                <div className={cn(
                                    "inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-white border shadow-sm mb-6 border-current",
                                    resultData.color
                                )}>
                                    {resultData.rank}
                                </div>

                                <p className="text-slate-700 max-w-lg mx-auto leading-relaxed">
                                    {resultData.description}
                                </p>
                            </div>

                            {/* Input Summary (Simple Version) */}
                            <div className="border-t border-slate-100 bg-slate-50/50 p-6 md:p-8">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Profile Summary</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                                        <span className="text-slate-500 block text-xs mb-1">業界</span>
                                        <span className="font-bold text-slate-800">{answers['q3'] || '-'}</span>
                                    </div>
                                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                                        <span className="text-slate-500 block text-xs mb-1">従業員規模</span>
                                        <span className="font-bold text-slate-800">{answers['q2'] || '-'}</span>
                                    </div>
                                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                                        <span className="text-slate-500 block text-xs mb-1">AI推進部署</span>
                                        <span className="font-bold text-slate-800">{answers['q4'] || '-'}</span>
                                    </div>
                                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                                        <span className="text-slate-500 block text-xs mb-1">目標期間</span>
                                        <span className="font-bold text-slate-800">{answers['q24'] || '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Next Actions */}
                        <div className="bg-indigo-900 rounded-2xl shadow-lg p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h4 className="font-bold text-lg mb-2">詳細な改善レポートを受け取る</h4>
                                <p className="text-indigo-200 text-sm opacity-90 max-w-md">
                                    今回の診断結果に基づき、{answers['q3']}業界におけるベンチマーク比較と、
                                    {answers['q22'] && answers['q22'].length > 0 ? answers['q22'].join('・') : 'KGI達成'}に向けた具体的なロードマップ案を作成します。
                                </p>
                            </div>
                            <button
                                className="whitespace-nowrap px-6 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-lg"
                                onClick={() => alert('デモアプリ: 問い合わせフォームへ遷移します')}
                            >
                                無料相談・レポート請求
                            </button>
                        </div>

                        <div className="mt-12 text-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="text-slate-400 hover:text-indigo-600 flex items-center gap-2 mx-auto transition-colors font-medium text-sm"
                            >
                                <RefreshCcw size={14} /> はじめからやり直す
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
