import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import { MetricEvaluation, SummaryStats } from '../types/metrics';
import { ChevronDown, CheckCircle, AlertCircle, ArrowUpRight, PieChart as PieIcon, BarChart2 } from 'lucide-react';

interface ChartsSectionProps {
  evaluations: MetricEvaluation[];
  stats: SummaryStats;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ evaluations, stats }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cuantitativa' | 'cualitativa'>('all');

  // Filter evaluations for Bar Chart
  const filteredData = evaluations
    .filter(e => selectedCategory === 'all' || e.type === selectedCategory)
    .map(e => ({
      name: e.metricName.length > 16 ? e.metricName.substring(0, 14) + '..' : e.metricName,
      fullName: e.metricName,
      valor: e.measuredValue,
      unit: e.unit,
      status: e.status,
      component: e.component,
      rule: e.parameterRule
    }));

  // Pie Chart Data: Aceptable vs No Aceptable
  const pieData = [
    { name: 'Aceptable', value: stats.acceptableCount, color: '#ccff00', percentage: stats.complianceRate },
    { name: 'No Aceptable', value: stats.notAcceptableCount, color: '#f43f5e', percentage: 100 - stats.complianceRate }
  ];

  // Component Breakdown Progress
  const componentsList: Array<'Entrada de datos' | 'Tablas' | 'Listas' | 'Botones y Acciones' | 'Navegación general'> = [
    'Entrada de datos',
    'Tablas',
    'Botones y Acciones',
    'Listas',
    'Navegación general'
  ];

  const componentStats = componentsList.map(comp => {
    const items = evaluations.filter(e => e.component === comp);
    const acceptable = items.filter(e => e.status === 'Aceptable').length;
    const total = items.length;
    const percentage = total > 0 ? Math.round((acceptable / total) * 100) : 100;
    return {
      name: comp,
      total,
      acceptable,
      percentage,
      onTrack: percentage >= 75
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Upper Grid: Bar Chart & Donut Chart (Exact FinWise Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Chart: Cash Flow style Overview */}
        <div className="lg:col-span-7 bg-[#14171f] p-5 lg:p-6 rounded-3xl border border-[#232836] shadow-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Rendimiento de Métricas de Usabilidad</h3>
              <p className="text-xs text-gray-400">Valores medidos en pruebas de interacción por componente</p>
            </div>

            {/* Filter Pill Selector */}
            <div className="flex items-center bg-[#0e1015] p-1 rounded-xl border border-[#222735]">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === 'all' ? 'bg-[#ccff00] text-black shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setSelectedCategory('cuantitativa')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === 'cuantitativa' ? 'bg-[#ccff00] text-black shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                Cuantitativas
              </button>
              <button
                onClick={() => setSelectedCategory('cualitativa')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === 'cualitativa' ? 'bg-[#ccff00] text-black shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                Cualitativas
              </button>
            </div>
          </div>

          {/* Key Stat pill on top of chart */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#1e2515] text-[#ccff00] font-bold text-xs border border-[#3e4f20] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
              {stats.acceptableCount} Métricas en rango óptimo
            </span>
            <span className="text-xs text-gray-400">
              Parámetros evaluados según ISO 9241-11 & SUS
            </span>
          </div>

          {/* Bar Chart with gradient */}
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <defs>
                  <linearGradient id="neonBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ccff00" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#4d7c0f" stopOpacity={0.25} />
                  </linearGradient>
                  <linearGradient id="roseBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#881337" stopOpacity={0.25} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2430" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false}
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const isAcceptable = data.status === 'Aceptable';
                      return (
                        <div className="bg-[#10131a] p-3 rounded-xl border border-[#232836] shadow-xl text-xs space-y-1 z-50">
                          <p className="font-bold text-white">{data.fullName}</p>
                          <p className="text-gray-400">Componente: <span className="text-gray-200">{data.component}</span></p>
                          <p className="text-gray-400">Valor obtenido: <span className="text-[#ccff00] font-bold">{data.valor} {data.unit}</span></p>
                          <p className="text-gray-400">Parámetro: <span className="text-gray-300">{data.rule}</span></p>
                          <div className="pt-1">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              isAcceptable ? 'bg-[#1b2a1a] text-[#a3e635]' : 'bg-[#2a141b] text-rose-400'
                            }`}>
                              {data.status}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="valor" 
                  radius={[6, 6, 0, 0]}
                >
                  {filteredData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.status === 'Aceptable' ? 'url(#neonBarGradient)' : 'url(#roseBarGradient)'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Donut Breakdown (like FinWise Total Spending) */}
        <div className="lg:col-span-5 bg-[#14171f] p-5 lg:p-6 rounded-3xl border border-[#232836] shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Estado de Conformidad</h3>
              <p className="text-xs text-gray-400">Distribución de pruebas aceptables vs no aceptables</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#1b202c] text-gray-300 border border-[#283144] font-medium">
              Total: {stats.totalEvaluations}
            </span>
          </div>

          {/* Donut Chart with Center Text */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 my-2">
            <div className="sm:col-span-7 h-[210px] relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={88}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Overlay Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Aceptación</span>
                <span className="text-2xl font-black text-white">{stats.complianceRate}%</span>
                <span className="text-[10px] text-[#a3e635] font-semibold">Saludable</span>
              </div>
            </div>

            {/* Right Legend Breakdown (like FinWise list) */}
            <div className="sm:col-span-5 space-y-3">
              <div className="p-2.5 rounded-xl bg-[#0f1218] border border-[#202533]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00]" />
                    <span className="text-xs font-semibold text-gray-200">Aceptable</span>
                  </div>
                  <span className="text-xs font-bold text-white">{stats.acceptableCount}</span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1 flex justify-between">
                  <span>En rango</span>
                  <span className="text-[#ccff00] font-bold">{stats.complianceRate}%</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0f1218] border border-[#202533]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="text-xs font-semibold text-gray-200">No Aceptable</span>
                  </div>
                  <span className="text-xs font-bold text-rose-400">{stats.notAcceptableCount}</span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1 flex justify-between">
                  <span>Fuera de norma</span>
                  <span className="text-rose-400 font-bold">{100 - stats.complianceRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Summary Note */}
          <div className="p-3 rounded-2xl bg-[#10131a] border border-[#222735] flex items-center justify-between text-xs">
            <span className="text-gray-400">Recomendación General:</span>
            <span className="text-[#a3e635] font-semibold">Reducir pasos en formularios</span>
          </div>

        </div>

      </div>

      {/* Lower Grid: Component Breakdown Cards (like Emergency Fund / Europe Trip) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {componentStats.slice(0, 3).map((comp, idx) => (
          <div key={idx} className="bg-[#14171f] p-5 rounded-3xl border border-[#232836] shadow-card kpi-card-hover">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1b222d] text-[#ccff00] flex items-center justify-center">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{comp.name}</h4>
                  <p className="text-[11px] text-gray-400">{comp.acceptable} de {comp.total} tareas aprobadas</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-white">{comp.percentage}%</span>
            </div>

            {/* Glowing progress bar */}
            <div className="w-full bg-[#0f1218] h-2 rounded-full overflow-hidden p-0.5 border border-[#202636]">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  comp.percentage >= 75 ? 'bg-[#ccff00] shadow-[0_0_8px_#ccff00]' : 'bg-rose-500'
                }`}
                style={{ width: `${comp.percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-3 text-[11px]">
              <span className="text-gray-400">Meta: ≥ 75% conformidad</span>
              <span className={`font-semibold ${comp.onTrack ? 'text-[#a3e635]' : 'text-rose-400'}`}>
                {comp.onTrack ? '● En norma' : '▲ Revisar UI'}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
