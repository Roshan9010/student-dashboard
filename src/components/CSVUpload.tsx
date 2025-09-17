"use client";
import * as React from "react";
import type { Student } from "@/lib/types";

type Props = {
  onDataChange: (students: Student[]) => void;
  currentStudents: Student[];
};

export default function CSVUpload({ onDataChange, currentStudents }: Props) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const text = await file.text();
      const lines = text.split("\n").filter((line) => line.trim());
      const headers = lines[0]
        .split(",")
        .map((h) => h.trim().replace(/"/g, ""));

      // Expected headers
      const expectedHeaders = [
        "student_id",
        "name",
        "class",
        "comprehension",
        "attention",
        "focus",
        "retention",
        "assessment_score",
        "engagement_time",
      ];
      const hasValidHeaders = expectedHeaders.every((h) => headers.includes(h));

      if (!hasValidHeaders) {
        throw new Error(
          `Invalid CSV format. Expected headers: ${expectedHeaders.join(", ")}`
        );
      }

      const students: Student[] = lines.slice(1).map((line, index) => {
        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
        const student: Record<string, string> = {};
        headers.forEach((header, i) => {
          student[header] = values[i] || "";
        });

        return {
          student_id:
            student.student_id || `S${String(index + 1).padStart(4, "0")}`,
          name: student.name || "Unknown",
          class: student.class || "A",
          comprehension: parseFloat(student.comprehension) || 0,
          attention: parseFloat(student.attention) || 0,
          focus: parseFloat(student.focus) || 0,
          retention: parseFloat(student.retention) || 0,
          assessment_score: parseInt(student.assessment_score) || 0,
          engagement_time: parseInt(student.engagement_time) || 0,
        } as Student;
      });

      onDataChange(students);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse CSV");
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSampleCSV = () => {
    const headers = [
      "student_id",
      "name",
      "class",
      "comprehension",
      "attention",
      "focus",
      "retention",
      "assessment_score",
      "engagement_time",
    ];
    const csvContent = [
      headers.join(","),
      ...currentStudents
        .slice(0, 5)
        .map((s) =>
          [
            s.student_id,
            s.name,
            s.class,
            s.comprehension,
            s.attention,
            s.focus,
            s.retention,
            s.assessment_score,
            s.engagement_time,
          ].join(",")
        ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_students.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Upload Your Data
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload CSV File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {isUploading && (
            <p className="mt-2 text-sm text-blue-600">Processing...</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            suppressHydrationWarning
            onClick={downloadSampleCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors text-sm font-medium"
          >
            Download Sample CSV
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            (First 5 rows)
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>CSV Format:</strong> student_id, name, class, comprehension,
          attention, focus, retention, assessment_score, engagement_time
        </p>
      </div>
    </div>
  );
}
