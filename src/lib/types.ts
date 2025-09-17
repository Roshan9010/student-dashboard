export type Student = {
  student_id: string;
  name: string;
  class: string;
  comprehension: number;
  attention: number;
  focus: number;
  retention: number;
  assessment_score: number;
  engagement_time: number;
  persona_label?: number;
};

export type DatasetPayload = {
  generated_at?: string;
  metrics?: Record<string, { r2: number; rmse: number }>;
  clusters?: { k: number; sizes: Record<string, number>; centers: Record<string, number>[] };
  students: Student[];
};

export const skillKeys: Array<keyof Student> = [
  'comprehension',
  'attention',
  'focus',
  'retention',
];

