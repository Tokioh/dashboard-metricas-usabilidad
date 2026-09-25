import React from 'react';
import { BookOpen, ExternalLink, GraduationCap, Award, CheckCircle2, FileText } from 'lucide-react';

export const TheorySection: React.FC = () => {
  const references = [
    {
      title: "Escala Likert",
      desc: "Metodología psicométrica para medir actitudes, niveles de satisfacción y percepción de usabilidad en escalas ordinales de 1 a 5.",
      url: "https://www.questionpro.com/blog/es/que-es-la-escala-de-likert-y-como-utilizarla/",
      category: "Satisfacción & Actitud"
    },
    {
      title: "Cuestionario SUS (System Usability Scale)",
      desc: "Estándar de la industria creado por John Brooke (1996) compuesto por 10 ítems para calcular un score de 0 a 100.",
      url: "https://www.teacuplab.com/es/blog/que-es-la-escala-sus-y-como-usarla-para-medir-la-usabilidad/",
      category: "Facilidad Global"
    },
    {
      title: "Escala NASA-TLX adaptada",
      desc: "Instrumento multidimensional para evaluar carga cognitiva percibida, esfuerzo mental, nivel de exigencia temporal y frustración.",
      url: "https://speckle.inaoep.mx/~tecnologia_salud/2017/Resumenes/MyT2017_053_E.pdf",
      category: "Carga Cognitiva"
    },
    {
      title: "Escala NPS (Net Promoter Score)",
      desc: "Indicador de fidelidad y recomendación neta basado en la pregunta: '¿Qué tan probable es que recomiende este producto a un colega?'.",
      url: "https://www.qualtrics.com/es/gestion-de-la-experiencia/cliente/net-promoter-score/",
      category: "Lealtad & Recomendación"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#14171f] p-6 rounded-3xl border border-[#232836] shadow-card">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-5 h-5 text-[#ccff00]" />
          <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider">Marco Metodológico</span>
        </div>
        <h2 className="text-xl font-black text-white">Fundamentos Científicos de Métricas de Usabilidad</h2>
        <blockquote className="my-3 p-4 rounded-2xl bg-[#0c0e12] border-l-4 border-[#ccff00] text-xs text-gray-300 italic">
          “Las métricas de usabilidad permiten cuantificar la experiencia del usuario, guiando mejoras continuas en el diseño de interfaces digitales.”
          <footer className="mt-1 text-gray-400 font-semibold not-italic">— Tullis & Albert (2013, p. 5), Measuring the User Experience.</footer>
        </blockquote>
      </div>

      {/* Component Heuristic Guidelines */}
      <div className="bg-[#14171f] p-6 rounded-3xl border border-[#232836] shadow-card space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-[#ccff00]" />
          <span>Parámetros de Usabilidad por Componente UI</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-[#0e1117] border border-[#202533] space-y-2">
            <h4 className="font-bold text-[#ccff00]">1. Entrada de Datos / Formularios</h4>
            <ul className="space-y-1.5 text-gray-400 text-[11px]">
              <li>• Tiempo de llenado: ≤ 2.0 min en tareas simples.</li>
              <li>• Tasa de error: ≤ 0.5 errores/tarea con validación inline.</li>
              <li>• Tasa de abandono: ≤ 20% en embudos de registro.</li>
              <li>• Pasos totales: ≤ 6 pasos guiados (stepper).</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1117] border border-[#202533] space-y-2">
            <h4 className="font-bold text-[#ccff00]">2. Tablas de Datos</h4>
            <ul className="space-y-1.5 text-gray-400 text-[11px]">
              <li>• Tiempo de aprendizaje: ≤ 10 min para nuevos usuarios.</li>
              <li>• Solicitud de ayuda: ≤ 15% mediante tooltips claros.</li>
              <li>• Carga cognitiva: ≤ 2.5 / 5 en escala NASA-TLX.</li>
              <li>• Confianza en cálculos: ≥ 75% de aceptación.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1117] border border-[#202533] space-y-2">
            <h4 className="font-bold text-[#ccff00]">3. Botones y Acciones</h4>
            <ul className="space-y-1.5 text-gray-400 text-[11px]">
              <li>• Tasa de éxito: ≥ 90% en la acción principal.</li>
              <li>• Número de clics: ≤ 5 clics para confirmar acción.</li>
              <li>• Consistencia visual: ≥ 4.0 / 5 (primario vs secundario).</li>
              <li>• NPS de recomendación: ≥ +30 score.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1117] border border-[#202533] space-y-2">
            <h4 className="font-bold text-[#ccff00]">4. Listas y Navegación</h4>
            <ul className="space-y-1.5 text-gray-400 text-[11px]">
              <li>• Tiempo entre errores: ≥ 5 min de flujo continuo.</li>
              <li>• Tareas por sesión: ≥ 3 tareas completadas.</li>
              <li>• Claridad de menús: ≥ 80% de percepción positiva.</li>
              <li>• Intención de uso futuro: ≥ 70% de adopción.</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Academic Bibliographic Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {references.map((ref, idx) => (
          <a
            key={idx}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-3xl bg-[#14171f] hover:bg-[#181c26] border border-[#232836] hover:border-[#ccff00]/40 transition-all shadow-card group flex items-start justify-between gap-3"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1b222d] text-blue-400 border border-[#28364b]">
                {ref.category}
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors flex items-center gap-1.5">
                <span>{ref.title}</span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">{ref.desc}</p>
            </div>
            <div className="p-2 rounded-xl bg-[#0e1117] text-gray-400 group-hover:text-[#ccff00] group-hover:bg-[#1a2010] transition-colors shrink-0">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>

    </div>
  );
};
