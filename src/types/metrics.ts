export type MetricType = 'cuantitativa' | 'cualitativa';

export type UIComponentCategory = 
  | 'Listas' 
  | 'Tablas' 
  | 'Entrada de datos' 
  | 'Botones y Acciones' 
  | 'Navegación general';

export type EvaluationStatus = 'Aceptable' | 'No Aceptable';

export interface MetricDefinition {
  id: string;
  name: string;
  type: MetricType;
  description: string;
  parameterRule: string; // e.g. "≤ 2 min", "≥ 90%", "≤ 0.5 errores/tarea"
  parameterThreshold: number;
  operator: '<=' | '>=' | '<' | '>';
  unit: string;
  formula: string;
  benchmarkSource?: string;
  defaultComponent: UIComponentCategory;
  exampleValues: string;
}

export interface MetricEvaluation {
  id: string;
  metricId: string;
  metricName: string;
  type: MetricType;
  component: UIComponentCategory;
  taskDescription: string; // e.g., "Filtrar por rango de fechas en tabla", "Validación de formulario de registro"
  measuredValue: number;
  unit: string;
  parameterRule: string;
  status: EvaluationStatus;
  notes?: string;
  evaluatorDate: string;
  sampleSize?: number; // e.g. 50 usuarios
}

export interface SummaryStats {
  totalEvaluations: number;
  acceptableCount: number;
  notAcceptableCount: number;
  complianceRate: number; // Percentage
  quantitativeCompliance: number;
  qualitativeCompliance: number;
  criticalIssuesCount: number;
}
