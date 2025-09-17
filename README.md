# Student Performance Dashboard

An interactive dashboard for cognitive skills and student performance analysis. This project includes synthetic data generation, ML modeling, persona clustering, and a modern Next.js dashboard.

## 🚀 Live Demo

- [Live Vercel Deployment](https://student-dashboard-opal.vercel.app/)

## 📦 Repository Structure

- `data/` — Synthetic datasets (`students.csv`, `students.json`, `students_enriched.json`)
- `scripts/` — Data generator (`generate_students.py`) and enricher (`enrich_students.py`)
- `notebooks/` — Jupyter notebook for analysis (`student_analysis.ipynb`)
- `dashboard/` — Next.js dashboard (App Router, TypeScript, TailwindCSS)

## 🏁 Quick Start

1. Generate data:
   ```bash
   python scripts/generate_students.py
   ```
2. (Optional) Run notebook for enriched data:
   - Open `notebooks/student_analysis.ipynb` and run all cells.
   - Outputs: `students_enriched.json`, `model_metrics.json`, `cluster_summary.json`
3. Start dashboard:
   ```bash
   cd dashboard
   npm install
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 📊 Dashboard Features

- Overview stats: student count, average assessment, engagement, skills
- Charts: bar, scatter, radar
- Student table: searchable, sortable
- Insights: key findings, model metrics, cluster summary
- CSV upload: validate headers, ingest custom datasets
- ML score predictor: interactive sliders
- Model comparison: R², RMSE, best-model badge
- Persona analysis: cluster sizes, recommendations
- Advanced analytics: performance distribution, class comparison, trends
- Student detail page: `/student/[id]`

## 📈 Analysis & Modeling

- EDA: summary stats, correlation heatmap
- Modeling: Linear Regression, Random Forest
- Feature importance: Random Forest importances
- Clustering: KMeans personas (k=4)
- Export: enriched JSON payloads

## 🛠️ Tech Stack

- Data & ML: Python, pandas, scikit-learn, seaborn, matplotlib, Jupyter
- Dashboard: Next.js (App Router), TypeScript, TailwindCSS, Recharts, TanStack Table

## 📝 CSV Format

Required columns:

```
student_id,name,class,comprehension,attention,focus,retention,assessment_score,engagement_time
```

Example:

```
S0001,Alex Smith,A,0.65,0.62,0.60,0.67,72,210
```

## 🌐 Deployment

- Vercel: Framework preset Next.js, root directory `dashboard`, build command `npm run build`, output `.next`
- Ensure `dashboard/public/students.json` exists (copy from `data/students_enriched.json` for full insights)

## 📚 GitHub Repository

- All code, data, notebooks, and dashboard are tracked in this repo.
- To contribute, fork and submit a pull request.

## 📖 Project Details

This dashboard enables:

- Data exploration and visualization
- ML model comparison and prediction
- Persona clustering and recommendations
- CSV upload for custom datasets
- Advanced analytics for educators and students

## 👨‍🎓 Assignment Deliverables

- Jupyter notebook with analysis and ML
- Next.js dashboard deployed on Vercel
- GitHub repository with all code
- README summarizing setup and key findings

---

For questions or issues, open an issue on GitHub or contact the maintainer.
