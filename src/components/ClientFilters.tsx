"use client";
import type { Student } from "@/lib/types";
import Filters from "@/components/Filters";

export default function ClientFilters({ students }: { students: Student[] }) {
  return (
    <div className="rounded-lg border p-4">
      <Filters students={students} onFilter={() => {}} />
    </div>
  );
}


