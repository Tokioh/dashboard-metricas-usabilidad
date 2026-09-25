import React, { useState } from 'react';
import { METRIC_DEFINITIONS } from '../data/defaultMetrics';
import { MetricEvaluation } from '../types/metrics';
import { 
  Smile, 
  Sparkles, 
  ShieldCheck, 
  Frown, 
  Palette, 
  Compass, 
  Layers, 
  Brain, 
  Repeat, 
  ThumbsUp,
  ExternalLink,
  HelpCircle,
  Calculator
} from 'lucide-react';

interface QualitativeViewProps {
  evaluations: MetricEvaluation[];
  onOpenModal: () => void;
}

export const QualitativeView: React.FC<QualitativeViewProps> = ({ evaluations, onOpenModal }) => {
  // SUS Interactive Simulator
  const [susAnswers, setSusAnswers] = useState<number[]>([4, 2, 4, 1, 4, 2, 5, 1, 4, 1]); // 10 items (1 to 5)

  // Calculate SUS score: Odd items: (val - 1), Even items: (5 - val), sum * 2.5
  const calculateSUSScore = () => {
    let sum = 0;
    susAnswers.forEach((ans, idx) => {
      if (idx % 2 === 0) {
        sum += ans - 1;
      } else {
        sum += 5 - ans;
      }
    });
    return sum * 2.5;
  };

  const susScore = calculateSUSScore();
  const isSusAcceptable = susScore >= 70;

  // NPS Simulator
  const [promoters, setPromoters] = useState(60);
  const [passives, setPassives] = useState(25);
  const [detractors, setDetractors] = useState(15);

  const totalNPSUsers = promoters + passives + detractors;
  const npsScore = totalNPSUsers > 0 
    ? Math.round(((promoters - detractors) / totalNPSUsers) * 100)
    : 0;

  const qualDefs = METRIC_DEFINITIONS.filter(m => m.type === 'cualitativa');

  const iconsMap: Record<string, any> = {
    satisfaccion: Smile,
    facilidad_uso_sus: Sparkles,
    confianza: ShieldCheck,
    nivel_frustracion: Frown,
    estetica_diseno: Palette,
    claridad_navegacion: Compass,
    percepcion_consistencia: Layers,
    carga_cognitiva: Brain,
    intencion_uso: Repeat,
    recomendacion_nps: ThumbsUp
  };

  return (
    <div className="space-y-8">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#14171f] p-6 rounded-3xl border border-[#232836]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#2a1c38] text-purple-400 font-bold text-xs border border-[#442c5b]">
              Percepción & Experiencia Subjetiva
            </span>
            <span className="text-xs text-gray-400">Escalas Likert, SUS, NASA-TLX, NPS</span>
          </div>
          <h2 className="text-xl font-black text-white">Métricas Cualitativas de Usabilidad</h2>
          <p className="text-xs text-gray-400 max-w-2xl mt-1">
            Reflejan la percepción subjetiva, carga cognitiva, estética y nivel de confianza de los usuarios frente a la interfaz.
          </p>
        </div>

        <button
          onClick={onOpenModal}
          className="px-4 py-2.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold shadow-lime-glow transition-all whitespace-nowrap"
        >
          + Medir Tarea Cualitativa
        </button>
      </div>

      {/* Grid of 10 Qualitative Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {qualDefs.map(def => {
          const Icon = iconsMap[def.id] || Smile;
          const relatedEvals = evaluations.filter(e => e.metricId === def.id);
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

                {/* Formula & Reference Box */}
                <div className="p-3 rounded-xl bg-[#0d1017] border border-[#202533] text-xs space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400 font-semibold">Instrumento / Escala:</span>
                    <span className="text-purple-300 font-mono text-[11px]">{def.unit}</span>
                  </div>
                  <p className="text-gray-300 text-[11px]">{def.formula}</p>
                  <p className="text-[10px] text-gray-400 pt-1 border-t border-[#1c2230]">
                    <span className="text-gray-300">Ejemplo de medición:</span> {def.exampleValues}
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

      {/* Simulator Section for SUS & NPS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Simulator 1: Cuestionario Estandarizado SUS (System Usability Scale) */}
        <div className="bg-[#14171f] p-6 rounded-3xl border border-[#232836] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#ccff00] text-black flex items-center justify-center font-black">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Simulador de Escala SUS (0 - 100)</h3>
                <p className="text-[11px] text-gray-400">10 preguntas estandarizadas (Brooke, 1996)</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xl font-black text-white">{susScore.toFixed(0)}</span>
              <span className="text-xs text-gray-400 font-mono"> / 100</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs max-h-48 overflow-y-auto pr-1">
            {[
              "1. Me gustaría usar este sistema frecuentemente",
              "2. Encontré el sistema innecesariamente complejo",
              "3. Pensé que el sistema era fácil de usar",
              "4. Necesitaría asistencia técnica para usar el sistema",
              "5. Las funciones del sistema están bien integradas",
              "6. Había demasiada inconsistencia en el sistema",
              "7. La mayoría de personas aprendería a usarlo muy rápido",
              "8. Encontré el sistema muy engorroso de usar",
              "9. Me sentí muy confiado al usar el sistema",
              "10. Necesité aprender muchas cosas antes de poder usarlo"
            ].map((question, qIdx) => (
              <div key={qIdx} className="p-2 rounded-xl bg-[#0e1117] border border-[#202533] flex items-center justify-between gap-3">
                <span className="text-[11px] text-gray-300 truncate max-w-[260px]">{question}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      onClick={() => {
                        const next = [...susAnswers];
                        next[qIdx] = val;
                        setSusAnswers(next);
                      }}
                      className={`w-6 h-6 rounded text-[10px] font-bold transition-all ${
                        susAnswers[qIdx] === val
                          ? 'bg-[#ccff00] text-black shadow-sm scale-105'
                          : 'bg-[#181c26] text-gray-400 hover:text-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-[#0e1117] border border-[#202533] flex items-center justify-between text-xs">
            <span className="text-gray-400">Evaluación SUS (Meta ≥ 70 pts):</span>
            <span className={`font-bold px-2.5 py-0.5 rounded-full ${
              isSusAcceptable ? 'bg-[#1b2a1a] text-[#84cc16]' : 'bg-[#2a131a] text-rose-400'
            }`}>
              {isSusAcceptable ? '✓ Aceptable (Excelente Usabilidad)' : '✕ No Aceptable (< 70 pts)'}
            </span>
          </div>
        </div>

        {/* Simulator 2: Net Promoter Score (NPS) */}
        <div className="bg-[#14171f] p-6 rounded-3xl border border-[#232836] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#ccff00] text-black flex items-center justify-center font-black">
                <ThumbsUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Calculadora NPS (Recomendación)</h3>
                <p className="text-[11px] text-gray-400">% Promotores − % Detractores (Meta: NPS ≥ +30)</p>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-xl font-black ${npsScore >= 30 ? 'text-[#ccff00]' : 'text-rose-400'}`}>
                {npsScore >= 0 ? `+${npsScore}` : npsScore}
              </span>
              <span className="text-xs text-gray-400 font-mono"> NPS</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#a3e635] font-semibold">Promotores (Calificación 9-10):</span>
                <span className="text-white font-bold">{promoters} usuarios</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={promoters}
                onChange={e => setPromoters(Number(e.target.value))}
                className="w-full accent-[#ccff00]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-gray-300 font-semibold">Pasivos (Calificación 7-8):</span>
                <span className="text-white font-bold">{passives} usuarios</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={passives}
                onChange={e => setPassives(Number(e.target.value))}
                className="w-full accent-gray-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-rose-400 font-semibold">Detractores (Calificación 0-6):</span>
                <span className="text-white font-bold">{detractors} usuarios</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={detractors}
                onChange={e => setDetractors(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#0e1117] border border-[#202533] flex items-center justify-between text-xs">
            <span className="text-gray-400">Total Usuarios: <strong className="text-white">{totalNPSUsers}</strong></span>
            <span className={`font-bold px-2.5 py-0.5 rounded-full ${
              npsScore >= 30 ? 'bg-[#1b2a1a] text-[#84cc16]' : 'bg-[#2a131a] text-rose-400'
            }`}>
              {npsScore >= 30 ? '✓ Aceptable (NPS ≥ +30)' : '✕ No Aceptable (< +30)'}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
