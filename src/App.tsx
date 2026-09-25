import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { KPICards } from './components/KPICards';
import { ChartsSection } from './components/ChartsSection';
import { ResultsTable } from './components/ResultsTable';
import { QuantitativeView } from './components/QuantitativeView';
import { QualitativeView } from './components/QualitativeView';
import { TheorySection } from './components/TheorySection';
import { MetricRegistrationModal } from './components/MetricRegistrationModal';
import { INITIAL_EVALUATIONS } from './data/defaultMetrics';
import { MetricEvaluation } from './types/metrics';
import { computeSummaryStats } from './utils/evaluator';
import { exportDashboardToPDF } from './utils/pdfExport';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  // Load from localStorage or default
  const [evaluations, setEvaluations] = useState<MetricEvaluation[]>(() => {
    const saved = localStorage.getItem('ux_metrics_evaluations_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_EVALUATIONS;
      }
    }
    return INITIAL_EVALUATIONS;
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('ux_metrics_evaluations_v2', JSON.stringify(evaluations));
  }, [evaluations]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const stats = computeSummaryStats(evaluations);

  const handleAddEvaluation = (newEval: MetricEvaluation) => {
    setEvaluations(prev => [newEval, ...prev]);
    showToast(`Métrica "${newEval.metricName}" registrada exitosamente`);
  };

  const handleUpdateEvaluation = (updated: MetricEvaluation) => {
    setEvaluations(prev => prev.map(e => e.id === updated.id ? updated : e));
    showToast(`Evaluación actualizada`);
  };

  const handleDeleteEvaluation = (id: string) => {
    setEvaluations(prev => prev.filter(e => e.id !== id));
    showToast(`Métrica eliminada`);
  };

  const handleResetData = () => {
    if (window.confirm('¿Deseas restaurar todas las métricas de ejemplo iniciales?')) {
      setEvaluations(INITIAL_EVALUATIONS);
      showToast('Conjunto de datos inicial restaurado');
    }
  };

  const handleExportPDF = async () => {
    try {
      showToast('Generando reporte PDF...');
      await exportDashboardToPDF(evaluations, stats);
      showToast('¡Reporte PDF descargado con éxito!');
    } catch (err) {
      console.error(err);
      showToast('Error al generar el PDF');
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#f1f3f7] flex flex-col selection:bg-[#ccff00] selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161a24] text-white px-4 py-3 rounded-2xl border border-[#2d374d] shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#ccff00]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenModal={() => setIsModalOpen(true)}
        onExportPDF={handleExportPDF}
        onResetData={handleResetData}
        complianceRate={stats.complianceRate}
      />

      {/* Main Layout (Sidebar + Content) */}
      <div className="flex flex-1 max-w-[1700px] w-full mx-auto">
        
        {/* Left Vertical Icon Bar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenModal={() => setIsModalOpen(true)}
        />

        {/* Dashboard Main Workspace */}
        <main id="dashboard-content" className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-full overflow-x-hidden">
          
          {/* Header Greeting & Overview Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                  Overview Dashboard
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#182012] text-[#ccff00] font-bold border border-[#2d3f1a] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Métricas UX/UI
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Monitoreo cuantitativo y cualitativo de usabilidad en componentes de interfaz (Listas, Tablas, Formularios, Botones y Navegación).
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="flex items-center gap-3 bg-[#14171f] px-4 py-2 rounded-2xl border border-[#232836] self-start sm:self-auto">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-xs text-gray-300 font-semibold">
                Estado General: <strong className="text-[#ccff00]">{stats.complianceRate}% Aceptable</strong>
              </span>
            </div>
          </div>

          {/* KPI Cards Row (Always on top for high overview) */}
          <KPICards stats={stats} />

          {/* Dynamic Tab Switcher Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* FinWise-styled Charts (Bar + Donut + Component cards) */}
              <ChartsSection evaluations={evaluations} stats={stats} />

              {/* Results Table Section */}
              <ResultsTable
                evaluations={evaluations}
                onDeleteEvaluation={handleDeleteEvaluation}
                onUpdateEvaluation={handleUpdateEvaluation}
                onOpenModal={() => setIsModalOpen(true)}
              />
            </div>
          )}

          {activeTab === 'cuantitativas' && (
            <QuantitativeView
              evaluations={evaluations}
              onOpenModal={() => setIsModalOpen(true)}
            />
          )}

          {activeTab === 'cualitativas' && (
            <QualitativeView
              evaluations={evaluations}
              onOpenModal={() => setIsModalOpen(true)}
            />
          )}

          {activeTab === 'tabla' && (
            <div className="space-y-6">
              <ResultsTable
                evaluations={evaluations}
                onDeleteEvaluation={handleDeleteEvaluation}
                onUpdateEvaluation={handleUpdateEvaluation}
                onOpenModal={() => setIsModalOpen(true)}
              />
              <ChartsSection evaluations={evaluations} stats={stats} />
            </div>
          )}

          {activeTab === 'teoria' && (
            <TheorySection />
          )}

        </main>

      </div>

      {/* Modal for adding new evaluation */}
      <MetricRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEvaluation={handleAddEvaluation}
      />

    </div>
  );
};
