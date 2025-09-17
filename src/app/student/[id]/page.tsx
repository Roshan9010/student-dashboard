import { fetchStudents } from "@/lib/data";

export default async function StudentDetail({ params }: { params: { id: string } }) {
  const payload = await fetchStudents();
  const s = (payload.students ?? []).find(st => st.student_id === params.id);
  if (!s) {
    return <div className="p-6">Student not found.</div>;
  }
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">{s.name} ({s.student_id})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries({
          Class: s.class,
          Score: s.assessment_score,
          Engagement: s.engagement_time,
          Comprehension: s.comprehension,
          Attention: s.attention,
          Focus: s.focus,
          Retention: s.retention,
          Persona: s.persona_label ?? 'N/A',
        }).map(([k,v]) => (
          <div key={k} className="rounded-lg border p-4 bg-white/50 dark:bg-zinc-900/50">
            <div className="text-sm text-zinc-500">{k}</div>
            <div className="mt-1 text-lg font-medium">{String(v)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


