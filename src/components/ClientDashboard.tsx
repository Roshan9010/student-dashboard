"use client";
import * as React from "react";
import type { Student, DatasetPayload } from "@/lib/types";
import CSVUpload from "./CSVUpload";
import Overview from "./Overview";
import Charts from "./Charts";
import StudentTable from "./StudentTable";
import Insights from "./Insights";
import Filters from "./Filters";
import MLPredictor from "./MLPredictor";
import ModelComparison from "./ModelComparison";
import PersonaAnalysis from "./PersonaAnalysis";
import AdvancedAnalytics from "./AdvancedAnalytics";

type Props = {
  initialData: DatasetPayload;
};

export default function ClientDashboard({ initialData }: Props) {
  const [students, setStudents] = React.useState<Student[]>(initialData.students ?? []);
  const [filteredStudents, setFilteredStudents] = React.useState<Student[]>(students);
  const [data, setData] = React.useState<DatasetPayload>(initialData);

  const handleDataChange = (newStudents: Student[]) => {
    setStudents(newStudents);
    setFilteredStudents(newStudents);
    // Update the data payload with new students
    setData(prev => ({ ...prev, students: newStudents }));
  };

  const handleFilter = (filtered: Student[]) => {
    setFilteredStudents(filtered);
  };

  return (
    <div className="space-y-8">
      {/* CSV Upload Section */}
      <CSVUpload onDataChange={handleDataChange} currentStudents={students} />
      
      {/* ML Predictor */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">🤖 Machine Learning Tools</h2>
        <MLPredictor students={students} onPrediction={() => {}} />
      </div>

      {/* Model Comparison */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Model Performance</h2>
        <ModelComparison data={data} />
      </div>

      {/* Persona Analysis */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Learning Personas</h2>
        <PersonaAnalysis students={students} data={data} />
      </div>

      {/* Advanced Analytics */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Advanced Analytics</h2>
        <AdvancedAnalytics students={students} />
      </div>
      
      {/* Overview Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Overview Statistics</h2>
        <Overview students={students} />
      </div>

      {/* Filters */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filter Data</h2>
        <div className="rounded-lg border p-4">
          <Filters students={students} onFilter={handleFilter} />
        </div>
      </div>

      {/* Charts */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Data Visualizations</h2>
        <Charts students={filteredStudents} />
      </div>

      {/* Student Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Student Data Table</h2>
        <StudentTable students={filteredStudents} />
      </div>

      {/* Insights */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Analysis Insights</h2>
        <Insights data={data} />
      </div>
    </div>
  );
}
