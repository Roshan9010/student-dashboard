"use client";
import type { Student } from "@/lib/types";

type Props = { students: Student[] };

export default function Overview({ students }: Props) {
  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const avgScore = Math.round(avg(students.map(s => s.assessment_score)));
  const avgEngage = Math.round(avg(students.map(s => s.engagement_time)));
  const avgComp = avg(students.map(s => s.comprehension));
  const avgAttn = avg(students.map(s => s.attention));
  const avgFocus = avg(students.map(s => s.focus));
  const avgRet = avg(students.map(s => s.retention));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <StatCard title="Students" value={students.length.toString()} />
      <StatCard title="Avg Score" value={`${avgScore}`} />
      <StatCard title="Avg Engagement (min/wk)" value={`${avgEngage}`} />
      <StatCard title="Avg Comprehension" value={avgComp.toFixed(2)} />
      <StatCard title="Avg Attention" value={avgAttn.toFixed(2)} />
      <StatCard title="Avg Focus" value={avgFocus.toFixed(2)} />
      <StatCard title="Avg Retention" value={avgRet.toFixed(2)} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-zinc-900/70">
      <div className="text-sm text-zinc-500 dark:text-zinc-400">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-indigo-700 dark:text-indigo-300">{value}</div>
    </div>
  );
}


