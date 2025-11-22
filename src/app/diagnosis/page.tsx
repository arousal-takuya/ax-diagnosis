import MainLayout from '@/components/layout/MainLayout';
import Wizard from '@/components/wizard/Wizard';

export default function DiagnosisPage() {
    return (
        <MainLayout>
            <div className="py-8">
                <Wizard />
            </div>
        </MainLayout>
    );
}
