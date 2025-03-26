
import React from "react";

interface ResultsSummaryProps {
  filesCount: number;
  languagesCount: number;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ filesCount, languagesCount }) => {
  return (
    <div className="bg-muted/30 rounded-xl p-4 border">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Ready to translate</h3>
          <p className="text-sm text-muted-foreground">
            {filesCount} video{filesCount !== 1 ? "s" : ""} × {languagesCount || "0"} language{languagesCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="text-2xl font-semibold">
          {filesCount * (languagesCount || 0)}
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
