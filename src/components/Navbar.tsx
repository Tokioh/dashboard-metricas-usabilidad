import React from 'react';
import { Download, Plus, RotateCcw, Activity, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenModal: () => void;
  onExportPDF: () => void;
  onResetData: () => void;
  complianceRate: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenModal,
  onExportPDF,
  onResetData,
  complianceRate
}) => {
  const navTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cuantitativas', label: 'Métricas Cuantitativas' },
    { id: 'cualitativas', label: 'Métricas Cualitativas' },
    { id: 'tabla', label: 'Tabla de Resultados' },
    { id: 'teoria', label: 'Fundamentos & Fórmulas' },
  ];

  return (
    <header className="w-full bg-[#0c0e12]/90 backdrop-blur-md border-b border-[#1c202a] sticky top-0 z-40 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ccff00] text-black flex items-center justify-center font-black text-xl shadow-lime-glow">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                UX<span className="text-[#ccff00]">Metrics</span>
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1b202c] text-[#a3e635] font-semibold border border-[#2b3345]">
                6to "A" • Usabilidad y Accesibilidad
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">
              Alonso Bailon Kevin Joel • Dashboard de Usabilidad
            </p>
          </div>
        </div>

        {/* Navigation Pills (FinWise Capsule style) */}
        <nav className="flex items-center bg-[#14171f] p-1.5 rounded-full border border-[#232836] overflow-x-auto max-w-full">
          {navTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.35)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onResetData}
            title="Restablecer datos de ejemplo"
            className="p-2 rounded-xl bg-[#14171f] text-gray-400 hover:text-white border border-[#232836] hover:bg-[#1a1e28] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#14171f] hover:bg-[#1a1e28] text-white text-xs font-semibold border border-[#2e3547] hover:border-[#ccff00]/40 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#ccff00]" />
            <span>Nueva Medición</span>
          </button>

          <button
            onClick={onExportPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold shadow-lime-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Descargar PDF</span>
          </button>
        </div>

      </div>
    </header>
  );
};
