import { MetricDefinition, MetricEvaluation, EvaluationStatus, SummaryStats } from '../types/metrics';
import { METRIC_DEFINITIONS } from '../data/defaultMetrics';

export function calculateMetricStatus(metricId: string, measuredValue: number): EvaluationStatus {
  const definition = METRIC_DEFINITIONS.find(m => m.id === metricId);
  if (!definition) return 'Aceptable';

  const threshold = definition.parameterThreshold;
  switch (definition.operator) {
    case '<=':
      return measuredValue <= threshold ? 'Aceptable' : 'No Aceptable';
    case '<':
      return measuredValue < threshold ? 'Aceptable' : 'No Aceptable';
    case '>=':
      return measuredValue >= threshold ? 'Aceptable' : 'No Aceptable';
    case '>':
      return measuredValue > threshold ? 'Aceptable' : 'No Aceptable';
    default:
      return 'Aceptable';
  }
}

export function computeSummaryStats(evaluations: MetricEvaluation[]): SummaryStats {
  const totalEvaluations = evaluations.length;
  if (totalEvaluations === 0) {
    return {
      totalEvaluations: 0,
      acceptableCount: 0,
      notAcceptableCount: 0,
      complianceRate: 0,
      quantitativeCompliance: 0,
      qualitativeCompliance: 0,
      criticalIssuesCount: 0
    };
  }

  const acceptableCount = evaluations.filter(e => e.status === 'Aceptable').length;
  const notAcceptableCount = totalEvaluations - acceptableCount;
  const complianceRate = Math.round((acceptableCount / totalEvaluations) * 100);

  const quantEvals = evaluations.filter(e => e.type === 'cuantitativa');
  const quantAcceptable = quantEvals.filter(e => e.status === 'Aceptable').length;
  const quantitativeCompliance = quantEvals.length > 0 ? Math.round((quantAcceptable / quantEvals.length) * 100) : 0;

  const qualEvals = evaluations.filter(e => e.type === 'cualitativa');
  const qualAcceptable = qualEvals.filter(e => e.status === 'Aceptable').length;
  const qualitativeCompliance = qualEvals.length > 0 ? Math.round((qualAcceptable / qualEvals.length) * 100) : 0;

  return {
    totalEvaluations,
    acceptableCount,
    notAcceptableCount,
    complianceRate,
    quantitativeCompliance,
    qualitativeCompliance,
    criticalIssuesCount: notAcceptableCount
  };
}
