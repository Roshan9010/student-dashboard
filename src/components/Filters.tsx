"use client";
import * as React from "react";
import type { Student } from "@/lib/types";

type Props = {
  students: Student[];
  onFilter: (filtered: Student[]) => void;
};

export default function Filters({ students, onFilter }: Props) {
  const classes = React.useMemo(() => Array.from(new Set(students.map(s => s.class))).sort(), [students]);
  const personas = React.useMemo(() => Array.from(new Set(students.map(s => s.persona_label).filter(v => v !== undefined))) as number[], [students]);

  const [selectedClass, setSelectedClass] = React.useState<string | "">("");
  const [selectedPersona, setSelectedPersona] = React.useState<string | "">("");

  React.useEffect(() => {
    let data = students;
    if (selectedClass) data = data.filter(s => s.class === selectedClass);
    if (selectedPersona !== "") data = data.filter(s => String(s.persona_label ?? "") === selectedPersona);
    onFilter(data);
  }, [students, selectedClass, selectedPersona, onFilter]);

  return (
    <div className="flex gap-3 items-end bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-zinc-900 dark:to-zinc-900/60 p-3 rounded-lg">
      <div>
        <label className="block text-sm text-zinc-600">Class</label>
        <select suppressHydrationWarning value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="border rounded-md px-3 py-2 bg-white dark:bg-zinc-900">
          <option value="">All</option>
          {classes.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-zinc-600">Persona</label>
        <select suppressHydrationWarning value={selectedPersona} onChange={e => setSelectedPersona(e.target.value)} className="border rounded-md px-3 py-2 bg-white dark:bg-zinc-900">
          <option value="">All</option>
          {personas.map(p => (
            <option key={p} value={String(p)}>{p}</option>
          ))}
        </select>
      </div>
      <button suppressHydrationWarning onClick={() => { setSelectedClass(""); setSelectedPersona(""); }} className="h-[38px] px-3 rounded-md border bg-indigo-600 text-white hover:bg-indigo-500 transition">Reset</button>
    </div>
  );
}
