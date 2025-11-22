export interface DiagnosisData {
    // Step 1: Basic Profile
    organizationTarget: string;
    employeeCount: string;
    industry: string;
    aiDepartment: string;
    policy: string[]; // Checkbox

    // Step 2: Status & Governance
    status: string;
    tools: string[]; // Checkbox
    introductionYear: string;
    guidelines: string;
    usageRateTracking: string;
    training: string[]; // Checkbox
    expertSystem: string;

    // Step 3: Usage & Impact
    activeUserRate: string;
    departments: string[]; // Checkbox
    metrics: string[]; // Checkbox
    measurementOperation: string;
    rag: string;
    workflowTools: string[]; // Checkbox

    // Step 4: Competitors & Goals
    competitorMaturity: string;
    benchmark: string;
    issues: string;
    kgi: string[]; // Checkbox
    kpi: string;
    period: string;
    budget: string;
}

export const initialDiagnosisData: DiagnosisData = {
    organizationTarget: '',
    employeeCount: '',
    industry: '',
    aiDepartment: '',
    policy: [],
    status: '',
    tools: [],
    introductionYear: '',
    guidelines: '',
    usageRateTracking: '',
    training: [],
    expertSystem: '',
    activeUserRate: '',
    departments: [],
    metrics: [],
    measurementOperation: '',
    rag: '',
    workflowTools: [],
    competitorMaturity: '',
    benchmark: '',
    issues: '',
    kgi: [],
    kpi: '',
    period: '',
    budget: '',
};
