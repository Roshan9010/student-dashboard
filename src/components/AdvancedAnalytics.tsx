"use client";
import * as React from "react";
import type { Student } from "@/lib/types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Props = {
  students: Student[];
};

export default function AdvancedAnalytics({ students }: Props) {
  const [selectedMetric, setSelectedMetric] = React.useState<
    "comprehension" | "attention" | "focus" | "retention"
  >("comprehension");

  // Performance distribution analysis
  const performanceRanges = [
    {
      range: "90-100",
      count: students.filter((s) => s.assessment_score >= 90).length,
      color: "#10b981",
    },
    {
      range: "80-89",
      count: students.filter(
        (s) => s.assessment_score >= 80 && s.assessment_score < 90
      ).length,
      color: "#3b82f6",
    },
    {
      range: "70-79",
      count: students.filter(
        (s) => s.assessment_score >= 70 && s.assessment_score < 80
      ).length,
      color: "#f59e0b",
    },
    {
      range: "60-69",
      count: students.filter(
        (s) => s.assessment_score >= 60 && s.assessment_score < 70
      ).length,
      color: "#ef4444",
    },
    {
      range: "Below 60",
      count: students.filter((s) => s.assessment_score < 60).length,
      color: "#dc2626",
    },
  ];

  // Class performance comparison
  const classPerformance = React.useMemo(() => {
    const classes = [...new Set(students.map((s) => s.class))].sort();
    return classes.map((cls) => {
      const classStudents = students.filter((s) => s.class === cls);
      const avgScore =
        classStudents.reduce((sum, s) => sum + s.assessment_score, 0) /
        classStudents.length;
      const avgEngagement =
        classStudents.reduce((sum, s) => sum + s.engagement_time, 0) /
        classStudents.length;
      return {
        class: cls,
        avgScore: Math.round(avgScore),
        avgEngagement: Math.round(avgEngagement),
        count: classStudents.length,
      };
    });
  }, [students]);

  // Skill correlation trends
  const skillTrends = React.useMemo(() => {
    const skillData = students
      .map((s) => ({
        score: s.assessment_score,
        comprehension: s.comprehension,
        attention: s.attention,
        focus: s.focus,
        retention: s.retention,
      }))
      .sort((a, b) => a.score - b.score);

    // Group into score ranges for trend analysis
    const ranges = [];
    for (
      let i = 0;
      i < skillData.length;
      i += Math.ceil(skillData.length / 10)
    ) {
      const chunk = skillData.slice(i, i + Math.ceil(skillData.length / 10));
      if (chunk.length > 0) {
        ranges.push({
          scoreRange: `${Math.round(chunk[0].score)}-${Math.round(
            chunk[chunk.length - 1].score
          )}`,
          avgComprehension:
            chunk.reduce((sum, s) => sum + s.comprehension, 0) / chunk.length,
          avgAttention:
            chunk.reduce((sum, s) => sum + s.attention, 0) / chunk.length,
          avgFocus: chunk.reduce((sum, s) => sum + s.focus, 0) / chunk.length,
          avgRetention:
            chunk.reduce((sum, s) => sum + s.retention, 0) / chunk.length,
        });
      }
    }
    return ranges;
  }, [students]);

  const skillColors = {
    comprehension: "#3b82f6",
    attention: "#10b981",
    focus: "#f59e0b",
    retention: "#ef4444",
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        📊 Advanced Analytics Dashboard
      </h3>

      {/* Performance Distribution */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
          Performance Distribution
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={performanceRanges}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ range, count, percent }) =>
                  `${range}: ${count} (${((percent as number) * 100).toFixed(
                    0
                  )}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {performanceRanges.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Class Performance Comparison */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
          Class Performance Comparison
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={classPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="avgScore"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Avg Score"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="avgEngagement"
                stackId="2"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                name="Avg Engagement (min)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill Correlation Trends */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-800 dark:text-white">
            Skill Correlation Trends
          </h4>
          <select
            suppressHydrationWarning
            value={selectedMetric}
            onChange={(e) =>
              setSelectedMetric(
                e.target.value as
                  | "comprehension"
                  | "attention"
                  | "focus"
                  | "retention"
              )
            }
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="comprehension">Comprehension</option>
            <option value="attention">Attention</option>
            <option value="focus">Focus</option>
            <option value="retention">Retention</option>
          </select>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={skillTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scoreRange" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={`avg${
                  selectedMetric.charAt(0).toUpperCase() +
                  selectedMetric.slice(1)
                }`}
                stroke={skillColors[selectedMetric]}
                strokeWidth={3}
                dot={{
                  fill: skillColors[selectedMetric],
                  strokeWidth: 2,
                  r: 4,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="text-2xl font-bold">{students.length}</div>
          <div className="text-blue-100">Total Students</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="text-2xl font-bold">
            {Math.round(
              students.reduce((sum, s) => sum + s.assessment_score, 0) /
                students.length
            )}
          </div>
          <div className="text-green-100">Average Score</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div className="text-2xl font-bold">
            {Math.round(
              students.reduce((sum, s) => sum + s.engagement_time, 0) /
                students.length
            )}
          </div>
          <div className="text-purple-100">Avg Engagement (min)</div>
        </div>
      </div>
    </div>
  );
}
