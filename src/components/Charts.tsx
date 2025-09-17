"use client";
import type { Student } from "@/lib/types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

type Props = { students: Student[] };

export default function Charts({ students }: Props) {
  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const skillBarData = [
    { skill: "comprehension", score: avg(students.map(s => s.comprehension)) },
    { skill: "attention", score: avg(students.map(s => s.attention)) },
    { skill: "focus", score: avg(students.map(s => s.focus)) },
    { skill: "retention", score: avg(students.map(s => s.retention)) },
  ];

  const scatterData = students.map(s => ({ x: s.attention, y: s.assessment_score }));

  // Radar for the first student's profile as an example (could be selectable)
  const first = students[0];
  const radarData = first ? [
    { metric: "Comprehension", value: first.comprehension },
    { metric: "Attention", value: first.attention },
    { metric: "Focus", value: first.focus },
    { metric: "Retention", value: first.retention },
  ] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-lg border p-4 bg-white dark:bg-zinc-900/70">
        <h3 className="mb-2 font-medium">Avg Skill Levels</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border p-4 bg-white dark:bg-zinc-900/70">
        <h3 className="mb-2 font-medium">Attention vs Assessment</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="x" name="Attention" domain={[0, 1]} />
              <YAxis dataKey="y" name="Score" domain={[0, 100]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Students" data={scatterData} fill="#10b981" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border p-4 bg-white dark:bg-zinc-900/70">
        <h3 className="mb-2 font-medium">Student Radar (Sample)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis domain={[0, 1]} />
              <Radar name="Profile" dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


