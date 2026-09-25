import React, { useState } from 'react';
import { METRIC_DEFINITIONS } from '../data/defaultMetrics';
import { MetricEvaluation, UIComponentCategory, MetricType } from '../types/metrics';
import { calculateMetricStatus } from '../utils/evaluator';
import { X, Sparkles, CheckCircle2, AlertTriangle, Calculator, HelpCircle } from 'lucide-react';

interface MetricRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvaluation: (evaluation: MetricEvaluation) => void;
}

export const MetricRegistrationModal: React.FC<MetricRegistrationModalProps> = ({
  isOpen,
  onClose,
  onAddEvaluation
}) => {
  if (!isOpen) return null;

  const [selectedMetricId, setSelectedMetricId] = useState<string>(METRIC_DEFINITIONS[0].id);
  const [component, setComponent] = useState<UIComponentCategory>('Entrada de datos');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [measuredValue, setMeasuredValue] = useState<number>(1.5);
  const [sampleSize, setSampleSize] = useState<number>(50);
  const [notes, setNotes] = useState<string>('');

  const selectedDef = METRIC_DEFINITIONS.find(m => m.id === selectedMetricId) || METRIC_DEFINITIONS[0];
  const previewStatus = calculateMetricStatus(selectedMetricId, measuredValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvaluation: MetricEvaluation = {
      id: `eval-${Date.now()}`,
      metricId: selectedDef.id,
      metricName: selectedDef.name,
      type: selectedDef.type,
      component: component,
      taskDescription: taskDescription.trim() || `Evaluación de ${selectedDef.name} en ${component}`,
      measuredValue: Number(measuredValue),
      unit: selectedDef.unit,
      parameterRule: selectedDef.parameterRule,
      status: previewStatus,
      sampleSize: Number(sampleSize) || 30,
      evaluatorDate: new Date().toISOString().slice(0, 10),
      notes: notes.trim()
    };

    onAddEvaluation(newEvaluation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#14171f] border border-[#232836] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#202533] flex items-center justify-between bg-[#0e1117]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ccff00] text-black flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Registrar Nueva Evaluación de Usabilidad</h3>
              <p className="text-xs text-gray-400">Ingresa los parámetros medidos en tus pruebas de usuario</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#1a1e28] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          
          {/* Metric Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Seleccionar Métrica de Usabilidad
            </label>
            <select
              value={selectedMetricId}
              onChange={e => {
                const id = e.target.value;
                setSelectedMetricId(id);
                const def = METRIC_DEFINITIONS.find(m => m.id === id);
                if (def) {
                  setComponent(def.defaultComponent);
                  setMeasuredValue(def.parameterThreshold);
                }
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0e12] border border-[#283042] text-white text-sm focus:outline-none focus:border-[#ccff00]"
            >
              <optgroup label="── MÉTRICAS CUANTITATIVAS (Rendimiento Numérico) ──">
                {METRIC_DEFINITIONS.filter(m => m.type === 'cuantitativa').map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} (Parámetro: {m.parameterRule})
                  </option>
                ))}
              </optgroup>
              <optgroup label="── MÉTRICAS CUALITATIVAS (Percepción Subjetiva) ──">
                {METRIC_DEFINITIONS.filter(m => m.type === 'cualitativa').map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} (Parámetro: {m.parameterRule})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Metric Definition Card Info */}
          <div className="p-4 rounded-2xl bg-[#0e1117] border border-[#202533] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider">
                Fórmula & Regla Aplicada
              </span>
              <span className="text-[11px] text-gray-400 font-mono">
                {selectedDef.benchmarkSource}
              </span>
            </div>
            <p className="text-xs text-gray-300">{selectedDef.description}</p>
            <div className="text-xs text-gray-400 bg-[#14171f] p-2.5 rounded-xl border border-[#232836]">
              <span className="text-gray-300 font-semibold">Fórmula: </span> {selectedDef.formula}
              <br />
              <span className="text-gray-300 font-semibold">Ejemplo: </span> {selectedDef.exampleValues}
            </div>
          </div>

          {/* Component & Sample Size in Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Component */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Componente UI Evaluado
              </label>
              <select
                value={component}
                onChange={e => setComponent(e.target.value as UIComponentCategory)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0c0e12] border border-[#283042] text-white text-sm focus:outline-none focus:border-[#ccff00]"
              >
                <option value="Entrada de datos">Entrada de datos (Formularios / Inputs)</option>
                <option value="Tablas">Tablas de datos (Filtros / Columnas)</option>
                <option value="Listas">Listas interactivas (Paginación / Lote)</option>
                <option value="Botones y Acciones">Botones y Acciones críticas</option>
                <option value="Navegación general">Navegación general (Menús / Breadcrumbs)</option>
              </select>
            </div>

            {/* Sample size */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Tamaño de Muestra (Usuarios)
              </label>
              <input
                type="number"
                min="1"
                value={sampleSize}
                onChange={e => setSampleSize(parseInt(e.target.value) || 1)}
                placeholder="Ej. 50 usuarios"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0c0e12] border border-[#283042] text-white text-sm focus:outline-none focus:border-[#ccff00]"
              />
            </div>

          </div>

          {/* Task Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Descripción de la Tarea Específica
            </label>
            <input
              type="text"
              value={taskDescription}
              onChange={e => setTaskDescription(e.target.value)}
              placeholder="Ej. Filtrado por rango de fecha en tabla, Envío de formulario..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0e12] border border-[#283042] text-white text-sm focus:outline-none focus:border-[#ccff00]"
              required
            />
          </div>

          {/* Measured Value Input & Live Status Badge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Valor Obtenido ({selectedDef.unit})
              </label>
              <input
                type="number"
                step="0.01"
                value={measuredValue}
                onChange={e => setMeasuredValue(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0c0e12] border border-[#283042] text-white font-extrabold text-lg focus:outline-none focus:border-[#ccff00]"
                required
              />
            </div>

            {/* Live Result Preview */}
            <div className="p-3.5 rounded-2xl bg-[#0e1117] border border-[#202533] flex flex-col justify-center">
              <span className="text-[11px] text-gray-400 font-semibold mb-1">
                Resultado vs Parámetro ({selectedDef.parameterRule}):
              </span>
              <div className="flex items-center gap-2">
                {previewStatus === 'Aceptable' ? (
                  <div className="flex items-center gap-1.5 text-[#84cc16] font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#84cc16]" />
                    <span>Aceptable (Dentro de Parámetro)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-400 font-extrabold text-sm">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <span>No Aceptable (Requiere Optimización)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Observaciones Cualitativas / Causa Raíz
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Ej. Los usuarios manifestaron confusión en el botón de confirmación secundario..."
              className="w-full px-4 py-2 rounded-xl bg-[#0c0e12] border border-[#283042] text-white text-xs focus:outline-none focus:border-[#ccff00]"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#202533]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#181c26] hover:bg-[#202636] text-gray-300 text-xs font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold shadow-lime-glow transition-all"
            >
              Guardar Evaluación
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
