import React, { useState } from 'react';
import { METRIC_DEFINITIONS } from '../data/defaultMetrics';
import { MetricEvaluation } from '../types/metrics';
import { 
  Timer, 
  CheckCircle2, 
  AlertOctagon, 
  MousePointer2, 
  UserX, 
  GraduationCap, 
  Clock, 
  Footprints, 
  HelpCircle, 
  ListChecks,
  Calculator,
  ArrowRight
} from 'lucide-react';

interface QuantitativeViewProps {
  evaluations: MetricEvaluation[];
  onOpenModal: () => void;
}

export const QuantitativeView: React.FC<QuantitativeViewProps> = ({ evaluations, onOpenModal }) => {
  // Mini interactive calculator state
  const [calcSuccessExits, setCalcSuccessExits] = useState(46);
  const [calcSuccessTotal, setCalcSuccessTotal] = useState(50);

  const [calcErrorErrors, setCalcErrorErrors] = useState(12);
  const [calcErrorTasks, setCalcErrorTasks] = useState(60);

  const [calcAbandAband, setCalcAbandAband] = useState(15);
  const [calcAbandTotal, setCalcAbandTotal] = useState(60);

  const quantDefs = METRIC_DEFINITIONS.filter(m => m.type === 'cuantitativa');

  const iconsMap: Record<string, any> = {
    tiempo_tarea: Timer,
    tasa_exito: CheckCircle2,
    tasa_error: AlertOctagon,
    numero_clics: MousePointer2,
    tasa_abandono: UserX,
    tiempo_aprendizaje: GraduationCap,
    tiempo_entre_errores: Clock,
    numero_pasos: Footprints,
    porcentaje_ayuda: HelpCircle,
    tareas_completadas_sesion: ListChecks
  };

  return (
    <div className="space-y-8">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#14171f] p-6 rounded-3xl border border-[#232836]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1c2738] text-blue-400 font-bold text-xs border border-[#283c58]">
              Eficacia & Eficiencia
            </span>
            <span className="text-xs text-gray-400">Tullis & Albert (2013)</span>
          </div>
          <h2 className="text-xl font-black text-white">Métricas Cuantitativas de Usabilidad</h2>
          <p className="text-xs text-gray-400 max-w-2xl mt-1">
            Miden de forma numérica y objetiva el rendimiento del usuario frente a tareas específicas (Listas, Tablas, Entrada de datos, Botones y Navegación).
          </p>
        </div>

        <button
          onClick={onOpenModal}
          className="px-4 py-2.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold shadow-lime-glow transition-all whitespace-nowrap"
        >
          + Medir Tarea Cuantitativa
        </button>
      </div>

      {/* Grid of 10 Quantitative Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {quantDefs.map(def => {
          const Icon = iconsMap[def.id] || Timer;
          const relatedEvals = evaluations.filter(e => e.metricId === def.id);
          const acceptableEvals = relatedEvals.filter(e => e.status === 'Aceptable');
          const lastEval = relatedEvals[relatedEvals.length - 1];

          return (
            <div 
              key={def.id} 
              className="bg-[#14171f] hover:bg-[#171b24] p-5 rounded-3xl border border-[#232836] shadow-card transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#0f1218] text-[#ccff00] flex items-center justify-center border border-[#232836] group-hover:border-[#ccff00]/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm group-hover:text-[#ccff00] transition-colors">{def.name}</h3>
                      <span className="text-[10px] text-gray-400 font-mono">{def.benchmarkSource}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-[#0e1117] text-[#ccff00] font-mono text-xs font-bold border border-[#283245]">
                    {def.parameterRule}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-300 mb-3">{def.description}</p>

                {/* Formula Box */}
                <div className="p-3 rounded-xl bg-[#0d1017] border border-[#202533] text-xs space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400 font-semibold">Fórmula / Unidad:</span>
                    <span className="text-gray-300 font-mono">{def.unit}</span>
                  </div>
                  <p className="text-blue-300 font-mono text-[11px]">{def.formula}</p>
                  <p className="text-[10px] text-gray-400 pt-1 border-t border-[#1c2230]">
                    <span className="text-gray-300">Ejemplo:</span> {def.exampleValues}
                  </p>
                </div>
              </div>

              {/* Status in current evaluation session */}
              <div className="pt-3 border-t border-[#1f2432] flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400 text-[11px] block">Última medición:</span>
                  {lastEval ? (
                    <span className="font-extrabold text-white text-sm">
                      {lastEval.measuredValue} <span className="text-gray-400 text-xs font-normal">{lastEval.unit}</span>
                    </span>
                  ) : (
                    <span className="text-gray-500 italic text-[11px]">Sin registros</span>
                  )}
                </div>

                {lastEval && (
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                    lastEval.status === 'Aceptable'
                      ? 'bg-[#1b2a1a] text-[#84cc16] border-[#2e5025]'
                      : 'bg-[#2a131a] text-rose-400 border-[#52202c]'
                  }`}>
                    {lastEval.status}
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Interactive Quick Formulas Calculator Section */}
      <div className="bg-[#14171f] p-6 rounded-3xl border border-[#232836] shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#ccff00] text-black flex items-center justify-center font-black">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Calculadoras Rápidas de Fórmulas Cuantitativas</h3>
            <p className="text-xs text-gray-400">Verifica instantáneamente si los valores de tu prueba alcanzan los parámetros de usabilidad</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Calc 1: Tasa de Éxito */}
          <div className="p-4 rounded-2xl bg-[#0e1117] border border-[#202533] space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">1. Tasa de Éxito</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#1c2415] text-[#ccff00] font-mono">Meta: ≥ 90%</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-gray-400 block">Tareas Exitosas</label>
                <input
                  type="number"
                  value={calcSuccessExits}
                  onChange={e => setCalcSuccessExits(Number(e.target.value))}
                  className="w-full p-1.5 rounded bg-[#14171f] border border-[#283245] text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 block">Tareas Totales</label>
                <input
                  type="number"
                  value={calcSuccessTotal}
                  onChange={e => setCalcSuccessTotal(Number(e.target.value))}
                  className="w-full p-1.5 rounded bg-[#14171f] border border-[#283245] text-white"
                />
              </div>
            </div>

            {(() => {
              const res = calcSuccessTotal > 0 ? ((calcSuccessExits / calcSuccessTotal) * 100).toFixed(1) : '0';
              const ok = Number(res) >= 90;
              return (
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#14171f] border border-[#232836]">
                  <span className="text-xs text-gray-400">Resultado: <strong className="text-white">{res}%</strong></span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ok ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                    {ok ? 'Aceptable (≥90%)' : 'No Aceptable'}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Calc 2: Tasa de Error */}
          <div className="p-4 rounded-2xl bg-[#0e1117] border border-[#202533] space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">2. Tasa de Error</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#1c2415] text-[#ccff00] font-mono">Meta: ≤ 0.5</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-gray-400 block">Errores Totales</label>
                <input
                  type="number"
                  value={calcErrorErrors}
                  onChange={e => setCalcErrorErrors(Number(e.target.value))}
                  className="w-full p-1.5 rounded bg-[#14171f] border border-[#283245] text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 block">Tareas Completas</label>
                <input
                  type="number"
                  value={calcErrorTasks}
                  onChange={e => setCalcErrorTasks(Number(e.target.value))}
                  className="w-full p-1.5 rounded bg-[#14171f] border border-[#283245] text-white"
                />
              </div>
            </div>

            {(() => {
              const res = calcErrorTasks > 0 ? (calcErrorErrors / calcErrorTasks).toFixed(2) : '0';
              const ok = Number(res) <= 0.5;
              return (
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#14171f] border border-[#232836]">
                  <span className="text-xs text-gray-400">Resultado: <strong className="text-white">{res} err/t</strong></span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ok ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                    {ok ? 'Aceptable (≤0.5)' : 'No Aceptable'}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Calc 3: Tasa de Abandono */}
          <div className="p-4 rounded-2xl bg-[#0e1117] border border-[#202533] space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">3. Tasa de Abandono</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#1c2415] text-[#ccff00] font-mono">Meta: ≤ 20%</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-gray-400 block">Abandonos</label>
                <input
                  type="number"
                  value={calcAbandAband}
                  onChange={e => setCalcAbandAband(Number(e.target.value))}
                  className="w-full p-1.5 rounded bg-[#14171f] border border-[#283245] text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 block">Usuarios Totales</label>
                <input
                  type="number"
                  value={calcAbandTotal}
                  onChange={e => setCalcAbandTotal(Number(e.target.value))}
                  className="w-full p-1.5 rounded bg-[#14171f] border border-[#283245] text-white"
                />
              </div>
            </div>

            {(() => {
              const res = calcAbandTotal > 0 ? ((calcAbandAband / calcAbandTotal) * 100).toFixed(1) : '0';
              const ok = Number(res) <= 20;
              return (
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#14171f] border border-[#232836]">
                  <span className="text-xs text-gray-400">Resultado: <strong className="text-white">{res}%</strong></span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ok ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                    {ok ? 'Aceptable (≤20%)' : 'No Aceptable'}
                  </span>
                </div>
              );
            })()}
          </div>

        </div>
      </div>

    </div>
  );
};
