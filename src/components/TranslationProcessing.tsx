
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Clock, Loader2 } from "lucide-react";

interface TranslationProcessingProps {
  isProcessing: boolean;
  totalVideos: number;
  totalLanguages: number;
  onComplete: () => void;
}

const TranslationProcessing: React.FC<TranslationProcessingProps> = ({
  isProcessing,
  totalVideos,
  totalLanguages,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Preparing videos...");
  const [elapsedTime, setElapsedTime] = useState(0);
  const totalTasks = totalVideos * totalLanguages;

  // Format elapsed time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Update progress over time
  useEffect(() => {
    if (!isProcessing) {
      setProgress(0);
      setCurrentStatus("Preparing videos...");
      setElapsedTime(0);
      return;
    }

    // Reset progress when starting
    setProgress(0);

    // Status messages to cycle through
    const statusMessages = [
      "Preparing videos...",
      "Extracting audio...",
      "Processing source language...",
      "Transcribing content...",
      "Translating content...",
      "Generating speech...",
      "Syncing audio with video...",
      "Finalizing videos...",
    ];

    // Timer for elapsed time
    const timeInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    // Progress simulation
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      // Randomly increment progress, weighted to slow down as it gets closer to 100%
      const increment = Math.random() * (1 - currentProgress / 120);
      currentProgress = Math.min(currentProgress + increment, 99);
      setProgress(currentProgress);

      // Update status message based on progress
      const statusIndex = Math.min(
        Math.floor((currentProgress / 100) * statusMessages.length),
        statusMessages.length - 1
      );
      setCurrentStatus(statusMessages[statusIndex]);

      // If we're close to completion (simulated completion)
      if (currentProgress > 95 && Math.random() > 0.95) {
        clearInterval(progressInterval);
        clearInterval(timeInterval);
        
        // Finish up
        setTimeout(() => {
          setProgress(100);
          setCurrentStatus("All videos translated!");
          
          // Notify parent component of completion
          setTimeout(() => {
            onComplete();
          }, 1500);
        }, 1000);
      }
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(timeInterval);
    };
  }, [isProcessing, totalVideos, totalLanguages, onComplete]);

  if (!isProcessing) return null;

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4 max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <h3 className="text-lg font-medium">Translating Videos</h3>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>{currentStatus}</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-muted-foreground">Videos</p>
          <p className="text-xl font-medium">{totalVideos}</p>
        </div>
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-muted-foreground">Languages</p>
          <p className="text-xl font-medium">{totalLanguages}</p>
        </div>
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-muted-foreground">Total Tasks</p>
          <p className="text-xl font-medium">{totalTasks}</p>
        </div>
        <div className="bg-muted/30 p-3 rounded-lg flex items-center">
          <div>
            <p className="text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" /> Elapsed Time
            </p>
            <p className="text-xl font-medium">{formatTime(elapsedTime)}</p>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground text-center pt-2">
        Please wait while we process your videos. This may take several minutes
        depending on video length and number of languages.
      </p>
    </div>
  );
};

export default TranslationProcessing;
