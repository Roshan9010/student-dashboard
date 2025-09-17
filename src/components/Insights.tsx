"use client";
import type { DatasetPayload, Student } from "@/lib/types";

type Props = { data: DatasetPayload };

export default function Insights({ data }: Props) {
  const students = data.students ?? [] as Student[];
  const n = students.length;
  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

  const corrDirection = () => {
    // simple monotonic check: split by median attention and compare mean scores
    const medianAttn = students.map(s => s.attention).sort((a,b)=>a-b)[Math.floor(n/2)] ?? 0;
    const hi = avg(students.filter(s => s.attention >= medianAttn).map(s => s.assessment_score));
    const lo = avg(students.filter(s => s.attention < medianAttn).map(s => s.assessment_score));
    if (hi - lo > 5) return 'positive';
    if (lo - hi > 5) return 'negative';
    return 'weak';
  };

  const rfBest = data.metrics ? Object.entries(data.metrics).sort((a,b)=> (b[1].r2 - a[1].r2))[0] : undefined;

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <h3 className="font-medium">Insights</h3>
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>
          Attention shows a {corrDirection()} relationship with assessment scores (see scatter).
        </li>
        <li>
          {rfBest ? (
            <>Best predictive model: <b>{rfBest[0]}</b> (R² {rfBest[1].r2.toFixed(2)}, RMSE {rfBest[1].rmse.toFixed(1)}).</>
          ) : (
            <>Model metrics not available in this dataset.</>
          )}
        </li>
        {data.clusters ? (
          <li>
            Identified {data.clusters.k} personas. Largest cluster size: {Math.max(...Object.values(data.clusters.sizes || {}))}.
          </li>
        ) : (
          <li>Run the notebook to generate personas for deeper insights.</li>
        )}
      </ul>
    </div>
  );
}


