"use client";
import * as React from "react";
import type { DatasetPayload } from "@/lib/types";

type Props = {
  data: DatasetPayload;
};

export default function ModelComparison({ data }: Props) {
  const metrics = data.metrics || {};
  const models = Object.entries(metrics);
  
  if (models.length === 0) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border">
        <p className="text-yellow-800 dark:text-yellow-200">
          No model metrics available. Run the Jupyter notebook to generate model performance data.
        </p>
      </div>
    );
  }

  const bestModel = models.reduce((best, current) => 
    current[1].r2 > best[1].r2 ? current : best
  );

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        🤖 Model Performance Comparison
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map(([modelName, metrics]) => (
          <div 
            key={modelName}
            className={`p-4 rounded-lg border ${
              modelName === bestModel[0] 
                ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700' 
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800 dark:text-white capitalize">
                {modelName.replace('_', ' ')}
              </h4>
              {modelName === bestModel[0] && (
                <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  Best
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">R² Score</span>
                <span className="font-mono text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {metrics.r2.toFixed(3)}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(0, metrics.r2 * 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">RMSE</span>
                <span className="font-mono text-lg font-semibold text-red-600 dark:text-red-400">
                  {metrics.rmse.toFixed(2)}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {metrics.r2 > 0.8 ? 'Excellent fit' :
                 metrics.r2 > 0.6 ? 'Good fit' :
                 metrics.r2 > 0.4 ? 'Moderate fit' : 'Poor fit'}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Model Insights</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• <strong>R² Score:</strong> Proportion of variance explained (0-1, higher is better)</li>
          <li>• <strong>RMSE:</strong> Root Mean Square Error (lower is better)</li>
          <li>• <strong>Best Model:</strong> {bestModel[0].replace('_', ' ')} with R² = {bestModel[1].r2.toFixed(3)}</li>
          <li>• <strong>Prediction Accuracy:</strong> {bestModel[1].r2 > 0.7 ? 'High' : bestModel[1].r2 > 0.5 ? 'Moderate' : 'Low'}</li>
        </ul>
      </div>
    </div>
  );
}
