import type { DatasetPayload, Student } from './types';

export async function fetchStudents(): Promise<DatasetPayload> {
  // On the server, read from the filesystem to avoid relative URL issues.
  if (typeof window === 'undefined') {
    try {
      const { readFile } = await import('fs/promises');
      const path = (await import('path')).default;
      const filePath = path.join(process.cwd(), 'public', 'students.json');
      const file = await readFile(filePath, 'utf-8');
      const raw = JSON.parse(file);
      if (Array.isArray(raw)) {
        return { students: raw as Student[] } as DatasetPayload;
      }
      return raw as DatasetPayload;
    } catch {
      // Fallback to client-style fetch in case filesystem read fails
    }
  }

  const res = await fetch('/students.json', { cache: 'no-store' });
  const raw = await res.json();
  if (Array.isArray(raw)) {
    return { students: raw as Student[] } as DatasetPayload;
  }
  return raw as DatasetPayload;
}

