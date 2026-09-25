# Dashboard de Métricas de Usabilidad y Accesibilidad 📊✨

> **Materia:** Usabilidad y Accesibilidad  
> **Curso:** 6to "A"  
> **Estudiante:** Alonso Bailon Kevin Joel  
> **Universidad:** Universidad Laica Eloy Alfaro de Manabí (ULEAM)

---

## 🌟 Descripción del Proyecto

Aplicación web interactiva desarrollada en **React + Vite + TypeScript + Tailwind CSS** (ejecutada con **Bun**), diseñada bajo la estética moderna *FinWise* (Dark Obsidian `#0c0e12` con acentos verde neón `#ccff00`).

Permite formular, registrar, evaluar y analizar estadísticamente **métricas cuantitativas y cualitativas de usabilidad** en base a tareas sobre componentes clave de interfaz:
- **Entrada de Datos / Formularios**
- **Tablas de Datos**
- **Botones y Acciones Críticas**
- **Listas Interactivas**
- **Navegación General y Menús**

---

## 🚀 Características Principales

1. **20 Métricas Formuladas con Parámetros Específicos:**
   - **10 Métricas Cuantitativas:** Tiempo de tarea, Tasa de éxito, Tasa de error, Clics/interacción, Tasa de abandono, Tiempo de aprendizaje, Tiempo entre errores (MTBE), Número de pasos, Porcentaje de ayuda usada y Tareas por sesión.
   - **10 Métricas Cualitativas:** Satisfacción CSAT, Escala SUS (0-100), Confianza, Nivel de frustración (NASA-TLX), Estética percibida, Claridad de navegación, Consistencia UI/UX, Carga cognitiva (NASA-TLX), Intención de uso (TAM) y Recomendación NPS.

2. **Tabla Consolidada de Resultados y Gráficas:**
   - Indicadores de conformidad: `Aceptable` (Verde Neón) vs `No Aceptable` (Rojo Coral).
   - Filtros por componente, tipo y estado; buscador en tiempo real y edición inline.
   - Gráfico de barras con degradados neón y gráfico de dona con métricas de aceptación.
   - Simuladores interactivos de la **Escala SUS** y calculadora de **Net Promoter Score (NPS)**.

3. **Exportación de Reportes en PDF:**
   - Generación instantánea de reportes formateados profesionalmente con resumen ejecutivo, tabla consolidada y membrete académico.

---

## 🛠️ Instalación y Ejecución Local

### Prerrequisitos
Tener instalado [Bun](https://bun.sh/) (o Node.js).

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Tokioh/dashboard-metricas-usabilidad.git
   cd dashboard-metricas-usabilidad
   ```

2. Instalar dependencias:
   ```bash
   bun install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   bun run dev
   ```

4. Abrir en el navegador:
   ```
   http://localhost:3000/
   ```

---

## 📚 Marco Metodológico & Referencias
- **Tullis, T., & Albert, B. (2013).** *Measuring the User Experience: Collecting, Analyzing, and Presenting Usability Metrics.* Morgan Kaufmann.
- **Brooke, J. (1996).** *SUS: A 'quick and dirty' usability scale.* Usability Evaluation in Industry.
- **Hart, S. G., & Staveland, L. E. (1988).** *Development of NASA-TLX (Task Load Index).*
- **ISO 9241-11:** Ergonomic requirements for office work with visual display terminals — Guidance on usability.
- **Net Promoter Score (NPS):** Bain & Company / Qualtrics.
