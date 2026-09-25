import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Smile, 
  Table2, 
  BookOpen, 
  PlusCircle, 
  Sparkles, 
  Layers
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenModal
}) => {
  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'cuantitativas', icon: BarChart3, label: 'Métricas Cuantitativas' },
    { id: 'cualitativas', icon: Smile, label: 'Métricas Cualitativas' },
    { id: 'tabla', icon: Table2, label: 'Tabla de Resultados' },
    { id: 'teoria', icon: BookOpen, label: 'Fundamentos' },
  ];

  return (
    <aside className="hidden lg:flex flex-col items-center justify-between py-6 w-20 bg-[#0c0e12] border-r border-[#1c202a] min-h-[calc(100vh-65px)] sticky top-[65px]">
      
      {/* Top action / Home */}
      <div className="flex flex-col items-center gap-5 w-full">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`relative p-3.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? 'bg-[#ccff00] text-black shadow-lime-glow scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-[#181c25]'
              }`}
            >
              <Icon className="w-5 h-5" />
              
              {/* Tooltip on hover */}
              <span className="absolute left-20 ml-2 px-2.5 py-1 rounded-lg bg-[#14171f] text-white text-[11px] font-semibold border border-[#232836] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-xl">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Add Button at bottom */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onOpenModal}
          title="Registrar nueva métrica"
          className="p-3.5 rounded-2xl bg-[#14171f] text-gray-300 hover:text-[#ccff00] hover:bg-[#1a1e28] border border-[#232836] hover:border-[#ccff00]/40 transition-all group"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="absolute left-20 ml-2 px-2.5 py-1 rounded-lg bg-[#14171f] text-[#ccff00] text-[11px] font-semibold border border-[#232836] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-xl">
            Añadir Medición
          </span>
        </button>

        <div className="w-8 h-8 rounded-full bg-[#181c25] border border-[#282f40] flex items-center justify-center text-xs font-bold text-gray-400" title="Evaluador Activo">
          UX
        </div>
      </div>

    </aside>
  );
};
