import React from "react";

const AnalysisResult: React.FC<{ text: string }> = ({ text }) => (
  <div className="p-6 rounded-xl border border-gray-300 bg-white/80 dark:bg-gray-900/50 shadow-md mt-8">
    <h3 className="text-lg font-semibold mb-3 text-indigo-500">
      📊 AI Analysis Output
    </h3>
    <p className="whitespace-pre-line text-sm leading-relaxed">{text}</p>
  </div>
);

export default AnalysisResult;
