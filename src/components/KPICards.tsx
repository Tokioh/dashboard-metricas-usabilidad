import React from 'react';
import { ArrowUpRight, CheckCircle2, AlertTriangle, Activity, Sparkles } from 'lucide-react';
import { SummaryStats } from '../types/metrics';

interface KPICardsProps {
  stats: SummaryStats;
}

export const KPICards: React.FC<KPICardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
      
      {/* Card 1: Cumplimiento Global (como Total Balance) */}
      <div className="bg-[#14171f] hover:bg-[#161a24] p-5 lg:p-6 rounded-3xl border border-[#232836] shadow-card kpi-card-hover relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Cumplimiento Global</span>
          <div className="w-8 h-8 rounded-full bg-[#1c202d] group-hover:bg-[#ccff00] group-hover:text-black text-gray-400 flex items-center justify-center transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
            <span>{stats.complianceRate}%</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#1b2a1a] text-[#84cc16] border border-[#2e5025]">
              {stats.acceptableCount}/{stats.totalEvaluations} OK
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-[#a3e635] font-semibold pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{stats.complianceRate >= 75 ? 'Estado Saludable (Aceptable)' : 'Requiere optimización'}</span>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="mt-4 w-full bg-[#1e2330] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#ccff00] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_#ccff00]"
            style={{ width: `${stats.complianceRate}%` }}
          />
        </div>
      </div>

      {/* Card 2: Eficacia Cuantitativa (como Net Worth) */}
      <div className="bg-[#14171f] hover:bg-[#161a24] p-5 lg:p-6 rounded-3xl border border-[#232836] shadow-card kpi-card-hover relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Métricas Cuantitativas</span>
          <div className="w-8 h-8 rounded-full bg-[#1c202d] group-hover:bg-[#ccff00] group-hover:text-black text-gray-400 flex items-center justify-center transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
            <span>{stats.quantitativeCompliance}%</span>
            <span className="text-xs font-medium text-gray-400">éxito</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-300 font-medium pt-1">
            <span>Tiempos ≤ 2min, Éxito ≥ 90%, Errores ≤ 0.5</span>
          </div>
        </div>

        <div className="mt-4 w-full bg-[#1e2330] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#84cc16] h-full rounded-full transition-all duration-500"
            style={{ width: `${stats.quantitativeCompliance}%` }}
          />
        </div>
      </div>

      {/* Card 3: Satisfacción Cualitativa (como Cash Available) */}
      <div className="bg-[#14171f] hover:bg-[#161a24] p-5 lg:p-6 rounded-3xl border border-[#232836] shadow-card kpi-card-hover relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Métricas Cualitativas</span>
          <div className="w-8 h-8 rounded-full bg-[#1c202d] group-hover:bg-[#ccff00] group-hover:text-black text-gray-400 flex items-center justify-center transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
            <span>{stats.qualitativeCompliance}%</span>
            <span className="text-xs font-medium text-[#a3e635]">Satisfactorio</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-300 font-medium pt-1">
            <span>SUS ≥ 70, Likert ≥ 4.0, NASA ≤ 2.5, NPS ≥ +30</span>
          </div>
        </div>

        <div className="mt-4 w-full bg-[#1e2330] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#a3e635] h-full rounded-full transition-all duration-500"
            style={{ width: `${stats.qualitativeCompliance}%` }}
          />
        </div>
      </div>

      {/* Card 4: Puntos No Aceptables / Requieren Atención (como Monthly Income) */}
      <div className="bg-[#14171f] hover:bg-[#161a24] p-5 lg:p-6 rounded-3xl border border-[#232836] shadow-card kpi-card-hover relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Puntos No Aceptables</span>
          <div className="w-8 h-8 rounded-full bg-[#1c202d] group-hover:bg-rose-500 group-hover:text-white text-gray-400 flex items-center justify-center transition-all">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
            <span className={stats.notAcceptableCount > 0 ? 'text-rose-400' : 'text-gray-100'}>
              {stats.notAcceptableCount}
            </span>
            <span className="text-xs font-medium text-gray-400">fuera de parámetro</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-rose-400/90 font-medium pt-1">
            {stats.notAcceptableCount > 0 ? (
              <span>Detectados en Clics, Abandono y Consistencia</span>
            ) : (
              <span className="text-[#a3e635]">¡Todos los parámetros en norma!</span>
            )}
          </div>
        </div>

        <div className="mt-4 w-full bg-[#1e2330] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-rose-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]"
            style={{ width: `${(stats.notAcceptableCount / (stats.totalEvaluations || 1)) * 100}%` }}
          />
        </div>
      </div>

    </div>
  );
};
