import { DiagnosisData } from '@/types/diagnosis';

export interface ScoreResult {
    overall: number;
    adoption: number;
    usage: number;
    governance: number;
    measurement: number;
}

export interface CategoryScore {
    name: string;
    score: number;
}

/**
 * 診断データからスコアを計算
 */
export function calculateScores(data: DiagnosisData): ScoreResult {
    const adoption = calculateAdoptionScore(data);
    const usage = calculateUsageScore(data);
    const governance = calculateGovernanceScore(data);
    const measurement = calculateMeasurementScore(data);

    const overall = Math.round((adoption + usage + governance + measurement) / 4);

    return {
        overall,
        adoption,
        usage,
        governance,
        measurement,
    };
}

/**
 * 導入成熟度スコア (0-100)
 */
function calculateAdoptionScore(data: DiagnosisData): number {
    let score = 0;

    // Q6: 導入ステータス
    const statusScores: Record<string, number> = {
        '全社展開済み': 100,
        '部署限定で展開中': 70,
        'パイロット運用中': 50,
        '検討中': 20,
        '未導入': 0,
    };
    score += (statusScores[data.status] || 0) * 0.4;

    // Q7: 利用ツール数
    const toolCount = data.tools.filter((t: string) => t !== '未導入').length;
    score += Math.min(toolCount * 10, 40) * 0.3;

    // Q8: 導入時期
    const timingScores: Record<string, number> = {
        '2年以上前': 100,
        '1-2年前': 80,
        '半年-1年前': 60,
        '半年以内': 40,
        '未導入': 0,
    };
    score += (timingScores[data.introductionYear] || 0) * 0.3;

    return Math.round(score);
}

/**
 * 利用浸透度スコア (0-100)
 */
function calculateUsageScore(data: DiagnosisData): number {
    let score = 0;

    // Q13: 有効利用者率
    const usageRateScores: Record<string, number> = {
        '70%以上': 100,
        '50-70%': 80,
        '30-50%': 60,
        '10-30%': 40,
        '10%未満': 20,
        '不明': 0,
    };
    score += (usageRateScores[data.activeUserRate] || 0) * 0.5;

    // Q14: 浸透している部門数
    const deptCount = data.departments.filter((d: string) => d !== 'なし').length;
    score += Math.min(deptCount * 10, 30) * 0.3;

    // Q11: 研修実施状況
    const trainingCount = data.training.filter((t: string) => t !== '未実施').length;
    score += Math.min(trainingCount * 10, 20) * 0.2;

    return Math.round(score);
}

/**
 * ガバナンススコア (0-100)
 */
function calculateGovernanceScore(data: DiagnosisData): number {
    let score = 0;

    // Q9: ガイドライン整備
    const guidelineScores: Record<string, number> = {
        '整備済み・運用中': 100,
        '整備済み・未運用': 70,
        '策定中': 40,
        '未整備': 0,
    };
    score += (guidelineScores[data.guidelines] || 0) * 0.4;

    // Q10: 利用率取得
    const trackingScores: Record<string, number> = {
        '定期的に取得・分析': 100,
        '取得しているが分析していない': 60,
        '不定期に取得': 30,
        '取得していない': 0,
    };
    score += (trackingScores[data.usageRateTracking] || 0) * 0.3;

    // Q12: エキスパート制度
    const expertScores: Record<string, number> = {
        '制度化・運用中': 100,
        '制度化済み・未運用': 60,
        '検討中': 30,
        'なし': 0,
    };
    score += (expertScores[data.expertSystem] || 0) * 0.3;

    return Math.round(score);
}

/**
 * 成果測定スコア (0-100)
 */
function calculateMeasurementScore(data: DiagnosisData): number {
    let score = 0;

    // Q15: 測定指標数
    const metricCount = data.metrics.filter((m: string) => m !== 'なし').length;
    score += Math.min(metricCount * 15, 45) * 0.4;

    // Q16: 成果計測運用
    const operationScores: Record<string, number> = {
        '定期的に実施・改善': 100,
        '定期的に実施': 70,
        '不定期に実施': 40,
        '未実施': 0,
    };
    score += (operationScores[data.measurementOperation] || 0) * 0.3;

    // Q18: 成果事例
    if (data.issues && data.issues.trim().length > 20) {
        score += 30 * 0.3;
    }

    return Math.round(score);
}

/**
 * スコアレベルを取得
 */
export function getScoreLevel(score: number): {
    level: string;
    color: string;
    description: string;
} {
    if (score >= 80) {
        return {
            level: '優秀',
            color: '#10B981',
            description: 'AI活用が高度に成熟しています',
        };
    } else if (score >= 60) {
        return {
            level: '良好',
            color: '#0EA5E9',
            description: 'AI活用が順調に進んでいます',
        };
    } else if (score >= 40) {
        return {
            level: '発展途上',
            color: '#F59E0B',
            description: '改善の余地があります',
        };
    } else {
        return {
            level: '初期段階',
            color: '#EF4444',
            description: 'AI活用の強化が必要です',
        };
    }
}
