import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MetricEvaluation, SummaryStats } from '../types/metrics';

export async function exportDashboardToPDF(
  evaluations: MetricEvaluation[],
  stats: SummaryStats,
  reportElementId: string = 'dashboard-content'
): Promise<void> {
  const element = document.getElementById(reportElementId);
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Header Bar (Dark Navy/Black with Neon Lime accent)
  doc.setFillColor(12, 14, 18);
  doc.rect(0, 0, pageWidth, 38, 'F');
  
  // Neon green accent line
  doc.setFillColor(204, 255, 0);
  doc.rect(0, 37, pageWidth, 1.5, 'F');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(204, 255, 0);
  doc.setFontSize(14);
  doc.text('REPORTE DE MÉTRICAS DE USABILIDAD Y ACCESIBILIDAD', margin, 12);

  // Student & Academic Info
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.text('Estudiante: ', margin, 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(220, 230, 245);
  doc.text('Alonso Bailon Kevin Joel', margin + 18, 19);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Curso: ', margin + 95, 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(220, 230, 245);
  doc.text('6to "A"', margin + 107, 19);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Materia: ', margin, 26);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(220, 230, 245);
  doc.text('Usabilidad y Accesibilidad', margin + 14, 26);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Fecha: ', margin + 95, 26);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(220, 230, 245);
  doc.text(new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' }), margin + 107, 26);

  doc.setFont('helvetica', 'italic');
  doc.setTextColor(170, 180, 195);
  doc.setFontSize(7.5);
  doc.text('Normas aplicadas: ISO 9241-11, SUS (Brooke, 1996), NASA-TLX, Escala Likert, Net Promoter Score (NPS)', margin, 33);

  let currentY = 46;

  // Resumen Ejecutivo Cards
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, currentY, contentWidth, 26, 3, 3, 'F');
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(margin, currentY, contentWidth, 26, 3, 3, 'S');

  // Card stats in columns
  const colW = contentWidth / 4;
  
  // Stat 1
  doc.setFontSize(8);
  doc.setTextColor(100, 110, 125);
  doc.text('CUMPLIMIENTO GLOBAL', margin + 6, currentY + 7);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(stats.complianceRate >= 75 ? 34 : 220, stats.complianceRate >= 75 ? 150 : 40, 50);
  doc.text(`${stats.complianceRate}%`, margin + 6, currentY + 16);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 125, 135);
  doc.text(`${stats.acceptableCount} Aceptables / ${stats.totalEvaluations} Total`, margin + 6, currentY + 22);

  // Stat 2
  doc.setFontSize(8);
  doc.setTextColor(100, 110, 125);
  doc.text('MÉTRICAS CUANTITATIVAS', margin + colW + 6, currentY + 7);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${stats.quantitativeCompliance}%`, margin + colW + 6, currentY + 16);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 125, 135);
  doc.text('Tiempos, errores y eficacia', margin + colW + 6, currentY + 22);

  // Stat 3
  doc.setFontSize(8);
  doc.setTextColor(100, 110, 125);
  doc.text('MÉTRICAS CUALITATIVAS', margin + colW * 2 + 6, currentY + 7);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${stats.qualitativeCompliance}%`, margin + colW * 2 + 6, currentY + 16);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 125, 135);
  doc.text('SUS, Likert, NPS y NASA-TLX', margin + colW * 2 + 6, currentY + 22);

  // Stat 4
  doc.setFontSize(8);
  doc.setTextColor(100, 110, 125);
  doc.text('ESTADO CRÍTICO', margin + colW * 3 + 6, currentY + 7);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(stats.notAcceptableCount > 0 ? 225 : 34, stats.notAcceptableCount > 0 ? 29 : 150, 50);
  doc.text(`${stats.notAcceptableCount} Puntos`, margin + colW * 3 + 6, currentY + 16);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 125, 135);
  doc.text('Requieren optimización UI', margin + colW * 3 + 6, currentY + 22);

  currentY += 34;

  // Section Header: Tabla de Resultados
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text('Tabla Consolidada de Resultados de Usabilidad', margin, currentY);

  currentY += 5;

  // Table Headers
  const headers = [
    { text: 'Métrica / Tarea Evaluada', width: 62 },
    { text: 'Componente UI', width: 33 },
    { text: 'Tipo', width: 22 },
    { text: 'Valor Medido', width: 22 },
    { text: 'Parámetro', width: 22 },
    { text: 'Estado', width: 19 },
  ];

  // Draw table header background
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, currentY, contentWidth, 7.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');

  let headerX = margin + 2;
  headers.forEach(h => {
    doc.text(h.text, headerX, currentY + 5);
    headerX += h.width;
  });

  currentY += 7.5;

  // Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);

  evaluations.forEach((evalItem, index) => {
    // Check if new page is needed
    if (currentY + 10 > pageHeight - 15) {
      doc.addPage();
      currentY = 20;

      // Repeat table header
      doc.setFillColor(15, 23, 42);
      doc.rect(margin, currentY, contentWidth, 7.5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');

      let rx = margin + 2;
      headers.forEach(h => {
        doc.text(h.text, rx, currentY + 5);
        rx += h.width;
      });

      currentY += 7.5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
    }

    // Row zebra background
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, currentY, contentWidth, 8, 'F');
    }

    // Border line bottom
    doc.setDrawColor(235, 240, 245);
    doc.line(margin, currentY + 8, margin + contentWidth, currentY + 8);

    let rowX = margin + 2;
    doc.setTextColor(20, 25, 35);
    
    // Métrica & task (truncated if needed)
    const metricNameTrunc = evalItem.metricName.length > 34 
      ? evalItem.metricName.substring(0, 32) + '...' 
      : evalItem.metricName;
    doc.setFont('helvetica', 'bold');
    doc.text(metricNameTrunc, rowX, currentY + 3.5);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(100, 110, 125);
    const taskTrunc = evalItem.taskDescription.length > 42 
      ? evalItem.taskDescription.substring(0, 40) + '...' 
      : evalItem.taskDescription;
    doc.text(taskTrunc, rowX, currentY + 6.5);
    doc.setFontSize(7);

    rowX += headers[0].width;

    // Component
    doc.setTextColor(50, 60, 75);
    doc.text(evalItem.component, rowX, currentY + 5);
    rowX += headers[1].width;

    // Type
    doc.setTextColor(90, 100, 115);
    doc.text(evalItem.type === 'cuantitativa' ? 'Cuantitativa' : 'Cualitativa', rowX, currentY + 5);
    rowX += headers[2].width;

    // Measured value + unit
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`${evalItem.measuredValue} ${evalItem.unit}`, rowX, currentY + 5);
    doc.setFont('helvetica', 'normal');
    rowX += headers[3].width;

    // Parameter Rule
    doc.setTextColor(80, 90, 105);
    doc.text(evalItem.parameterRule, rowX, currentY + 5);
    rowX += headers[4].width;

    // Status Pill
    const isAcceptable = evalItem.status === 'Aceptable';
    if (isAcceptable) {
      doc.setFillColor(220, 252, 231); // Light green
      doc.setDrawColor(134, 239, 172);
      doc.roundedRect(rowX - 1, currentY + 1.5, 17, 5, 1.5, 1.5, 'FD');
      doc.setTextColor(21, 128, 61); // Green
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.text('Aceptable', rowX + 1.2, currentY + 4.8);
    } else {
      doc.setFillColor(255, 228, 230); // Light red
      doc.setDrawColor(253, 164, 175);
      doc.roundedRect(rowX - 1, currentY + 1.5, 17, 5, 1.5, 1.5, 'FD');
      doc.setTextColor(190, 18, 60); // Red
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6);
      doc.text('No Aceptable', rowX + 0.4, currentY + 4.8);
    }

    currentY += 8;
  });

  // Footer on last page
  currentY += 10;
  if (currentY + 25 < pageHeight) {
    doc.setFillColor(240, 244, 248);
    doc.roundedRect(margin, currentY, contentWidth, 18, 2, 2, 'F');
    doc.setFontSize(7.5);
    doc.setTextColor(70, 80, 95);
    doc.setFont('helvetica', 'italic');
    doc.text('Nota metodológica: Las métricas cuantitativas evalúan eficacia y eficiencia según Tullis & Albert (2013).', margin + 5, currentY + 6);
    doc.text('Las métricas cualitativas evalúan satisfacción y carga cognitiva mediante escalas validadas (SUS, Likert, NASA-TLX, NPS).', margin + 5, currentY + 12);
  }

  // Save the PDF
  doc.save(`Reporte_Metricas_Usabilidad_${new Date().toISOString().slice(0,10)}.pdf`);
}
