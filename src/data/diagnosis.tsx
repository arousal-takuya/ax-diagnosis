import React from 'react';
import {
    Building2,
    ShieldCheck,
    Users,
    Target
} from 'lucide-react';

// --- データ定義: 業界リスト ---
export const INDUSTRIES = [
    "会計", "航空会社／航空業界", "代替紛争解決", "代替医療", "アニメーション", "衣料・ファッション",
    "建築・計画", "芸術・工芸", "自動車", "航空・宇宙", "銀行業", "バイオテクノロジー", "放送メディア",
    "建築資材", "ビジネス用品・機器", "資本市場", "化学品", "市民・社会組織", "土木工学",
    "商業用不動産", "コンピュータ・ネットワークセキュリティ", "コンピュータゲーム", "コンピュータハードウェア",
    "コンピュータネットワーク", "コンピュータソフトウェア", "インターネット", "建設業", "家電", "消費財",
    "消費者サービス", "化粧品", "乳製品", "防衛・宇宙", "デザイン", "教育管理", "電子学習",
    "電気・電子製造業", "エンターテインメント", "環境サービス", "イベントサービス", "経営管理部門",
    "施設管理サービス", "農業", "金融サービス", "美術", "漁業", "食品・飲料", "食品製造", "資金調達活動",
    "家具", "ギャンブル・カジノ", "ガラス・セラミックス・コンクリート", "政府行政", "政府関係",
    "グラフィックデザイン", "健康・ウェルネス・フィットネス", "高等教育", "病院・医療", "ホスピタリティ",
    "人事", "輸出入", "個人・家族サービス", "産業オートメーション", "情報サービス", "情報技術・サービス",
    "保険", "国際関係", "国際貿易・開発", "投資銀行業務", "投資運用", "司法", "法執行", "法律業務",
    "法律サービス", "立法機関", "レジャー・旅行・観光", "図書館", "物流・サプライチェーン",
    "高級品・ジュエリー", "機械", "経営コンサルティング", "海運業", "市場調査", "マーケティング・広告",
    "機械・産業工学", "メディア制作", "医療機器", "医療業務", "メンタルヘルスケア", "軍事", "鉱業・金属",
    "映画・映像", "博物館・施設", "音楽", "ナノテクノロジー", "新聞", "非営利組織運営", "石油・エネルギー",
    "オンラインメディア", "アウトソーシング／オフショアリング", "小包・貨物配送", "パッケージング・容器",
    "紙・木材製品", "舞台芸術", "製薬", "慈善活動", "写真", "プラスチック", "政治団体", "初等・中等教育",
    "印刷", "専門研修・コーチング", "プログラム開発", "公共政策", "広報・コミュニケーション", "公共安全",
    "出版", "鉄道車両製造", "畜産業", "不動産", "レジャー施設・サービス", "宗教施設",
    "再生可能エネルギー・環境", "研究", "レストラン", "小売業", "セキュリティ・調査", "半導体", "造船",
    "スポーツ用品", "スポーツ", "人材派遣・採用", "スーパーマーケット", "通信", "繊維", "シンクタンク",
    "タバコ", "翻訳・ローカライゼーション", "輸送／トラック運送／鉄道", "公共事業",
    "ベンチャーキャピタル・プライベートエクイティ", "獣医", "倉庫業", "卸売業", "ワイン・スピリッツ",
    "ワイヤレス", "ライティング・編集", "モバイルゲーム", "その他"
];

export interface Question {
    id: string;
    type: 'select' | 'search-select' | 'checkbox' | 'text' | 'textarea';
    label: string;
    options?: string[];
    placeholder?: string;
    note?: string;
    scoreMap?: Record<string, number>;
    exclusiveOptions?: string[];
    exclusivePairs?: string[][];
}

export interface Step {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    questions: Question[];
}

// --- データ定義: 診断ステップと質問 ---
export const STEPS: Step[] = [
    {
        id: 'step1',
        title: 'Step 1: 基本プロファイル',
        description: '組織の基本情報を入力してください',
        icon: <Building2 className="w-6 h-6" />,
        questions: [
            {
                id: 'q1',
                type: 'select',
                label: '診断組織対象',
                options: ['全社', '部署']
            },
            {
                id: 'q2',
                type: 'select',
                label: '所属従業員規模',
                options: ['〜10', '11–50', '51–100', '101–300', '301-500', '501-1,000', '1,001-2,000', '2,001+']
            },
            {
                id: 'q3',
                type: 'search-select',
                label: '業界',
                options: INDUSTRIES
            },
            {
                id: 'q4',
                type: 'select',
                label: 'AI推進部署',
                options: ['不明', 'なし', 'プロジェクトチーム', 'DX推進室', '経営企画室', '情報システム部', 'デジタル企画部', '人事部', 'その他']
            },
            {
                id: 'q5',
                type: 'checkbox',
                label: '推進方針',
                note: '「全社展開」と「部署限定」は排他です',
                options: ['全社展開', '部署限定', '段階展開', 'トップダウン', '現場主導', '役職・階層限定', '希望者のみ'],
                exclusivePairs: [['全社展開', '部署限定']]
            }
        ]
    },
    {
        id: 'step2',
        title: 'Step 2: 導入状況・ガバナンス・人材',
        description: 'AI導入の現状と体制について教えてください',
        icon: <ShieldCheck className="w-6 h-6" />,
        questions: [
            {
                id: 'q6',
                type: 'select',
                label: '生成AIの導入ステータス',
                options: ['未実施', '検討中', 'トライアル', '部門本番', '全社本番'],
                scoreMap: { '未実施': 0, '検討中': 1, 'トライアル': 2, '部門本番': 4, '全社本番': 5 }
            },
            {
                id: 'q7',
                type: 'checkbox',
                label: '主な利用ツール',
                options: ['未導入', 'Gemini for Google Workspace', 'Microsoft Copilot', 'ChatGPT（Enterprise/Teams）', 'Claude', 'SaaS（法人GAI/exaBase/ChatAIなど）', '独自環境', 'その他'],
                exclusiveOptions: ['未導入']
            },
            {
                id: 'q8',
                type: 'select',
                label: '生成AI環境の導入時期',
                options: ['未導入', '2021以前', '2022', '2023', '2024', '2025']
            },
            {
                id: 'q9',
                type: 'select',
                label: '利用ガイドライン／ポリシー',
                options: ['なし', 'ドラフト', '施行済（年1改定未満）', '施行+定期改定（四半期〜年1回以上）'],
                scoreMap: { 'なし': 0, 'ドラフト': 1, '施行済（年1改定未満）': 3, '施行+定期改定（四半期〜年1回以上）': 5 }
            },
            {
                id: 'q10',
                type: 'select',
                label: '利用率の取得',
                options: ['不明', 'なし', 'あり'],
                scoreMap: { '不明': 0, 'なし': 0, 'あり': 5 }
            },
            {
                id: 'q11',
                type: 'checkbox',
                label: 'AI活用研修の実施',
                options: ['未実施', '社内実施', '外部活用', 'eラーニング（社内）', 'eラーニング（他社）', 'その他'],
                exclusiveOptions: ['未実施']
            },
            {
                id: 'q12',
                type: 'select',
                label: 'AIエキスパート／エバンジェリスト制度',
                options: ['不明', 'なし', 'あり'],
                scoreMap: { '不明': 0, 'なし': 0, 'あり': 5 }
            }
        ]
    },
    {
        id: 'step3',
        title: 'Step 3: 利用・浸透 / ユースケース',
        description: '具体的な活用状況と成果について',
        icon: <Users className="w-6 h-6" />,
        questions: [
            {
                id: 'q13',
                type: 'select',
                label: '週3回以上の有効利用者率',
                options: ['未利用', '0-5%', '5-10%', '10-30%', '30-50%', '50-70%', '70-90%', '90%以上'],
                scoreMap: { '未利用': 0, '0-5%': 1, '5-10%': 2, '10-30%': 3, '30-50%': 4, '50-70%': 4, '70-90%': 5, '90%以上': 5 }
            },
            {
                id: 'q14',
                type: 'checkbox',
                label: '浸透している部門',
                options: ['なし', '経営', '営業', 'マーケ', 'CS', '開発', 'コーポレート', '人事', '財務', '現場（店舗/倉庫/工場等)', 'その他'],
                exclusiveOptions: ['なし']
            },
            {
                id: 'q15',
                type: 'checkbox',
                label: '測定指標',
                options: ['なし', '利用率', 'プロンプト数', '自動化本数', 'コスト', '削減時間', '品質指標（CSAT/NPS/不良率等）'],
                exclusiveOptions: ['なし']
            },
            {
                id: 'q16',
                type: 'select',
                label: '成果の計測運用',
                options: ['なし', '一部', '定常'],
                scoreMap: { 'なし': 0, '一部': 3, '定常': 5 }
            },
            {
                id: 'q17',
                type: 'select',
                label: 'RAG（社内データ連携）',
                options: ['なし', '一部ファイル', '限定領域で本番', '主要領域で本番'],
                scoreMap: { 'なし': 0, '一部ファイル': 2, '限定領域で本番': 4, '主要領域で本番': 5 }
            },
            {
                id: 'q18',
                type: 'checkbox',
                label: 'ワークフロー/ツール連携',
                options: ['なし', 'WinActor', 'UiPath', 'Power Automate', 'Zapier', 'Make', 'Dify', 'n8n', '内製（API/Functions）', 'その他'],
                exclusiveOptions: ['なし']
            }
        ]
    },
    {
        id: 'step4',
        title: 'Step 4: 競合/目標（TO-BE）',
        description: '目指す姿と現在の課題',
        icon: <Target className="w-6 h-6" />,
        questions: [
            {
                id: 'q19',
                type: 'select',
                label: '主要競合の想定成熟度',
                options: ['低', '中', '高', '不明']
            },
            {
                id: 'q20',
                type: 'text',
                label: '参考ベンチマーク企業（任意）',
                placeholder: '例：株式会社〇〇'
            },
            {
                id: 'q21',
                type: 'textarea',
                label: '主要課題（任意）',
                placeholder: '現在抱えている課題を自由に記述してください'
            },
            {
                id: 'q22',
                type: 'checkbox',
                label: '目標KGI',
                options: ['削減時間', 'コスト削減', '売上貢献', '品質改善', 'リードタイム短縮', '顧客体験', '新規事業創造']
            },
            {
                id: 'q23',
                type: 'text',
                label: '目標KPI（具体値）',
                placeholder: '例：月間1000時間の削減'
            },
            {
                id: 'q24',
                type: 'select',
                label: '期間',
                options: ['90日', '6ヶ月', '12ヶ月']
            },
            {
                id: 'q25',
                type: 'select',
                label: 'AI推進にかける年間予算規模',
                options: ['〜100万円', '100–500万', '501–1,000万', '1,001万-3,000万', '3,001-5,000万', '5,000万以上']
            }
        ]
    }
];
