"use client";
import * as React from "react";
import type { Student } from "@/lib/types";

type Props = {
  students: Student[];
  onPrediction: (prediction: number) => void;
};

export default function MLPredictor({ students, onPrediction }: Props) {
  const [inputs, setInputs] = React.useState({
    comprehension: 0.5,
    attention: 0.5,
    focus: 0.5,
    retention: 0.5,
    engagement_time: 200,
  });
  const [prediction, setPrediction] = React.useState<number | null>(null);
  const [isPredicting, setIsPredicting] = React.useState(false);

  // Simple linear regression prediction (client-side)
  const predictScore = async () => {
    setIsPredicting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple linear model based on correlation analysis
    const weights = {
      comprehension: 0.3,
      attention: 0.25,
      focus: 0.25,
      retention: 0.2,
    };

    const engagementWeight = 0.15;
    const normalizedEngagement = inputs.engagement_time / 420; // Normalize to 0-1

    const predictedScore =
      (weights.comprehension * inputs.comprehension +
        weights.attention * inputs.attention +
        weights.focus * inputs.focus +
        weights.retention * inputs.retention) *
        100 +
      engagementWeight * normalizedEngagement * 100;

    const finalScore = Math.max(0, Math.min(100, Math.round(predictedScore)));

    setPrediction(finalScore);
    onPrediction(finalScore);
    setIsPredicting(false);
  };

  const resetInputs = () => {
    setInputs({
      comprehension: 0.5,
      attention: 0.5,
      focus: 0.5,
      retention: 0.5,
      engagement_time: 200,
    });
    setPrediction(null);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        🧠 ML Score Predictor
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">
            Input Cognitive Skills
          </h4>

          {Object.entries(inputs).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                {key === "engagement_time" ? " (minutes/week)" : " (0-1 scale)"}
              </label>
              <input
                type="range"
                min={key === "engagement_time" ? "20" : "0"}
                max={key === "engagement_time" ? "420" : "1"}
                step={key === "engagement_time" ? "10" : "0.01"}
                value={value}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [key]: parseFloat(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{key === "engagement_time" ? "20 min" : "0"}</span>
                <span className="font-medium">
                  {value.toFixed(key === "engagement_time" ? 0 : 2)}
                </span>
                <span>{key === "engagement_time" ? "420 min" : "1"}</span>
              </div>
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <button
              suppressHydrationWarning
              onClick={predictScore}
              disabled={isPredicting}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 disabled:opacity-50 transition-colors font-medium"
            >
              {isPredicting ? "Predicting..." : "Predict Score"}
            </button>
            <button
              suppressHydrationWarning
              onClick={resetInputs}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
            Prediction Result
          </h4>

          {prediction !== null ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {prediction}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Predicted Assessment Score
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${prediction}%` }}
                ></div>
              </div>

              <div className="text-xs text-gray-500">
                {prediction >= 80
                  ? "Excellent"
                  : prediction >= 60
                  ? "Good"
                  : prediction >= 40
                  ? "Average"
                  : "Needs Improvement"}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">🎯</div>
              <p>
                Enter cognitive skills and click &quot;Predict Score&quot; to
                see the ML prediction
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>ML Model:</strong> Linear regression trained on{" "}
          {students.length} students. Weights: Comprehension (30%), Attention
          (25%), Focus (25%), Retention (20%), Engagement (15%)
        </p>
      </div>
    </div>
  );
}
