import React, { useState } from 'react';
import { MetricEvaluation, UIComponentCategory, MetricType } from '../types/metrics';
import { 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  ArrowUpDown, 
  Sparkles,
  Edit2,
  Info,
  SlidersHorizontal
} from 'lucide-react';

interface ResultsTableProps {
  evaluations: MetricEvaluation[];
  onDeleteEvaluation: (id: string) => void;
  onUpdateEvaluation: (evaluation: MetricEvaluation) => void;
  onOpenModal: () => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  evaluations,
  onDeleteEvaluation,
  onUpdateEvaluation,
  onOpenModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<string>('Todos');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [sortField, setSortField] = useState<keyof MetricEvaluation>('metricName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  // Filter components list
  const componentsList = ['Todos', 'Listas', 'Tablas', 'Entrada de datos', 'Botones y Acciones', 'Navegación general'];

  // Handle inline edit
  const handleStartEdit = (item: MetricEvaluation) => {
    setEditingId(item.id);
    setEditValue(item.measuredValue);
  };

  const handleSaveEdit = (item: MetricEvaluation) => {
    // Recalculate status based on rule
    const updated: MetricEvaluation = {
      ...item,
      measuredValue: editValue,
      status: editValue >= 0 ? (
        item.parameterRule.includes('≤') 
          ? (editValue <= parseFloat(item.parameterRule.replace(/[^0-9.]/g, '')) ? 'Aceptable' : 'No Aceptable')
          : (editValue >= parseFloat(item.parameterRule.replace(/[^0-9.]/g, '')) ? 'Aceptable' : 'No Aceptable')
      ) : item.status
    };
    onUpdateEvaluation(updated);
    setEditingId(null);
  };

  // Filter and sort items
  const filteredItems = evaluations
    .filter(item => {
      const matchSearch = 
        item.metricName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.taskDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.component.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchComponent = selectedComponent === 'Todos' || item.component === selectedComponent;
      const matchType = selectedType === 'Todos' || item.type === selectedType;
      const matchStatus = selectedStatus === 'Todos' || item.status === selectedStatus;

      return matchSearch && matchComponent && matchType && matchStatus;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA === undefined || valB === undefined) return 0;
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const toggleSort = (field: keyof MetricEvaluation) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-[#14171f] rounded-3xl border border-[#232836] shadow-card overflow-hidden">
      
      {/* Table Header Controls */}
      <div className="p-5 lg:p-6 border-b border-[#202533] space-y-4">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Tabla Consolidada de Resultados</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1b222d] text-[#ccff00] font-semibold border border-[#283545]">
                {filteredItems.length} Registros
              </span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Comparativa paramétrica de métricas cuantitativas y cualitativas con clasificación de conformidad
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar métrica, tarea o componente..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0c0e12] border border-[#232836] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00]/60 transition-colors"
            />
          </div>
        </div>

        {/* Filter Badges Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          
          <div className="flex items-center gap-1.5 text-gray-400 mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="font-semibold text-[11px] uppercase tracking-wider">Filtros:</span>
          </div>

          {/* Component Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {componentsList.map(comp => (
              <button
                key={comp}
                onClick={() => setSelectedComponent(comp)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedComponent === comp
                    ? 'bg-[#ccff00] text-black font-bold shadow-sm'
                    : 'bg-[#0e1117] text-gray-400 hover:text-white border border-[#202533]'
                }`}
              >
                {comp}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-[#232836] mx-1 hidden sm:block" />

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-[#0e1117] border border-[#202533] text-gray-300 text-xs focus:outline-none focus:border-[#ccff00]"
          >
            <option value="Todos">Tipo: Todos</option>
            <option value="cuantitativa">Cuantitativas</option>
            <option value="cualitativa">Cualitativas</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-[#0e1117] border border-[#202533] text-gray-300 text-xs focus:outline-none focus:border-[#ccff00]"
          >
            <option value="Todos">Estado: Todos</option>
            <option value="Aceptable">Solo Aceptables (✓)</option>
            <option value="No Aceptable">Solo No Aceptables (✕)</option>
          </select>

        </div>

      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          
          <thead className="bg-[#0e1117] text-gray-400 uppercase text-[10px] tracking-wider border-b border-[#202533]">
            <tr>
              <th 
                className="py-3.5 px-4 font-bold cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('metricName')}
              >
                <div className="flex items-center gap-1">
                  <span>Métrica / Tarea Evaluada</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              
              <th 
                className="py-3.5 px-4 font-bold cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('component')}
              >
                <div className="flex items-center gap-1">
                  <span>Componente UI</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-3.5 px-4 font-bold">Tipo</th>
              <th className="py-3.5 px-4 font-bold">Valor Medido</th>
              <th className="py-3.5 px-4 font-bold">Parámetro Aplicado</th>
              
              <th 
                className="py-3.5 px-4 font-bold cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('status')}
              >
                <div className="flex items-center gap-1">
                  <span>Resultado</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-3.5 px-4 font-bold text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#1e2330]">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Info className="w-6 h-6 text-gray-400" />
                    <p className="text-sm font-semibold text-gray-400">No se encontraron evaluaciones con los filtros actuales</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedComponent('Todos');
                        setSelectedType('Todos');
                        setSelectedStatus('Todos');
                      }}
                      className="text-xs text-[#ccff00] hover:underline"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredItems.map(item => {
                const isAcceptable = item.status === 'Aceptable';
                const isEditing = editingId === item.id;

                return (
                  <tr 
                    key={item.id}
                    className="hover:bg-[#181c26] transition-colors group"
                  >
                    
                    {/* Metric Name & Task */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-white text-[13px] block group-hover:text-[#ccff00] transition-colors">
                          {item.metricName}
                        </span>
                        <span className="text-[11px] text-gray-400 block mt-0.5 line-clamp-1">
                          {item.taskDescription}
                        </span>
                      </div>
                    </td>

                    {/* Component */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#0e1117] text-gray-300 font-medium text-[11px] border border-[#232836]">
                        {item.component}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-4">
                      <span className={`text-[11px] font-semibold ${
                        item.type === 'cuantitativa' ? 'text-blue-400' : 'text-purple-400'
                      }`}>
                        {item.type === 'cuantitativa' ? 'Cuantitativa' : 'Cualitativa'}
                      </span>
                    </td>

                    {/* Value */}
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            step="0.1"
                            value={editValue}
                            onChange={e => setEditValue(parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 rounded bg-[#0c0e12] border border-[#ccff00] text-xs text-white focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(item)}
                            className="px-2 py-1 bg-[#ccff00] text-black font-bold text-[10px] rounded"
                          >
                            OK
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-[13px]">
                            {item.measuredValue}
                          </span>
                          <span className="text-[11px] text-gray-400">{item.unit}</span>
                        </div>
                      )}
                    </td>

                    {/* Parameter */}
                    <td className="py-3.5 px-4">
                      <div className="text-gray-300 font-mono text-[11px]">
                        {item.parameterRule}
                      </div>
                    </td>

                    {/* Status Pill Badge */}
                    <td className="py-3.5 px-4">
                      {isAcceptable ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1b2a1a] text-[#84cc16] font-bold text-[11px] border border-[#2d5025] shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#84cc16]" />
                          <span>Aceptable</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2a131a] text-rose-400 font-bold text-[11px] border border-[#52202c] shadow-sm">
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>No Aceptable</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleStartEdit(item)}
                          title="Editar valor medido"
                          className="p-1.5 rounded-lg bg-[#0e1117] hover:bg-[#202636] text-gray-400 hover:text-white border border-[#232836] transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteEvaluation(item.id)}
                          title="Eliminar registro"
                          className="p-1.5 rounded-lg bg-[#0e1117] hover:bg-rose-950/50 text-gray-400 hover:text-rose-400 border border-[#232836] hover:border-rose-800 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

      {/* Table Footer info */}
      <div className="p-4 bg-[#0e1117] border-t border-[#202533] flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-2">
        <span>Mostrando {filteredItems.length} de {evaluations.length} métricas registradas</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
            Aceptable: Cumple parámetro de usabilidad
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            No Aceptable: Requiere re-diseño
          </span>
        </div>
      </div>

    </div>
  );
};
