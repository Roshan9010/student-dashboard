"use client";
import * as React from "react";
import type { Student, DatasetPayload } from "@/lib/types";

type Props = {
  students: Student[];
  data: DatasetPayload;
};

export default function PersonaAnalysis({ students, data }: Props) {
  const clusters = data.clusters;
  
  if (!clusters || !clusters.centers) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border">
        <p className="text-yellow-800 dark:text-yellow-200">
          No persona data available. Run the Jupyter notebook to generate clustering analysis.
        </p>
      </div>
    );
  }

  const personaNames = ['High Performers', 'Engaged Learners', 'Struggling Students', 'Average Achievers'];
  const personaColors = ['from-green-500 to-emerald-500', 'from-blue-500 to-cyan-500', 'from-red-500 to-pink-500', 'from-yellow-500 to-orange-500'];
  
  const getPersonaStats = (personaId: number) => {
    const personaStudents = students.filter(s => s.persona_label === personaId);
    if (personaStudents.length === 0) return null;
    
    const avgScore = personaStudents.reduce((sum, s) => sum + s.assessment_score, 0) / personaStudents.length;
    const avgEngagement = personaStudents.reduce((sum, s) => sum + s.engagement_time, 0) / personaStudents.length;
    
    return {
      count: personaStudents.length,
      avgScore: Math.round(avgScore),
      avgEngagement: Math.round(avgEngagement),
      percentage: Math.round((personaStudents.length / students.length) * 100)
    };
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        👥 Learning Personas Analysis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {clusters.centers.map((center, index) => {
          const stats = getPersonaStats(index);
          if (!stats) return null;
          
          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {personaNames[index] || `Persona ${index}`}
                </h4>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${personaColors[index]}`}></div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Students</span>
                  <span className="font-semibold">{stats.count} ({stats.percentage}%)</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Avg Score</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.avgScore}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Avg Engagement</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">{stats.avgEngagement}m</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Persona Characteristics</h4>
          <div className="space-y-3">
            {clusters.centers.map((center, index) => (
              <div key={index} className="border-l-4 border-indigo-400 pl-3">
                <div className="font-medium text-gray-800 dark:text-white mb-1">
                  {personaNames[index] || `Persona ${index}`}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>Comprehension: {(center.comprehension * 100).toFixed(1)}%</div>
                  <div>Attention: {(center.attention * 100).toFixed(1)}%</div>
                  <div>Focus: {(center.focus * 100).toFixed(1)}%</div>
                  <div>Retention: {(center.retention * 100).toFixed(1)}%</div>
                  <div>Engagement: {Math.round(center.engagement_time * 420)} min/week</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Recommendations</h4>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <strong>High Performers:</strong> Challenge with advanced materials and peer mentoring opportunities.
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <strong>Engaged Learners:</strong> Provide collaborative projects and interactive learning experiences.
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
              <strong>Struggling Students:</strong> Offer additional support, tutoring, and simplified learning paths.
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <strong>Average Achievers:</strong> Focus on skill-building and gradual difficulty increases.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
