export interface DiagnosisData {
    // Step 1: Basic Profile
    organizationTarget: string;
    employeeCount: string;
    industry: string;
    aiDepartment: string;
    policy: string[]; // Checkbox

    // Step 2: Status & Governance
    status: string;
    governance: string;
    tools: string[]; // Checkbox
    introductionYear: string;
    guidelines: string;
    usageRateTracking: string;
    training: string[]; // Checkbox
    expertSystem: string;
    talent: string;

    // Step 3: Usage & Impact
    usage: string;
    activeUserRate: string;
    departments: string[]; // Checkbox
    metrics: string[]; // Checkbox
    measurementOperation: string;
    rag: string;
    workflowTools: string[]; // Checkbox
    useCase: string[]; // Checkbox - Added missing property
    infrastructure: string; // Added missing property
    outcome: string; // Added missing property

    // Step 4: Competitors & Goals
    competitorMaturity: string;
    competitor: string; // Added missing property
    benchmark: string;
    issues: string;
    kgi: string[]; // Checkbox
    kpi: string;
    period: string;
    budget: string;
    goal: string; // Added missing property
}

export const initialDiagnosisData: DiagnosisData = {
    organizationTarget: '',
    employeeCount: '',
    industry: '',
    aiDepartment: '',
    policy: [],
    status: '',
    governance: '',
    tools: [],
    introductionYear: '',
    guidelines: '',
    usageRateTracking: '',
    training: [],
    expertSystem: '',
    talent: '',
    usage: '',
    activeUserRate: '',
    departments: [],
    metrics: [],
    measurementOperation: '',
    rag: '',
    workflowTools: [],
    useCase: [],
    infrastructure: '',
    outcome: '',
    competitorMaturity: '',
    competitor: '',
    benchmark: '',
    issues: '',
    kgi: [],
    kpi: '',
    period: '',
    budget: '',
    goal: '',
};
