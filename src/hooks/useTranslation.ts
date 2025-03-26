
import { useState } from "react";
import { batchTranslateVideos } from "@/lib/api";
import { LanguageCode } from "@/lib/types";
import { TranslatedVideo } from "@/components/TranslatedVideoGrid";
import { toast } from "sonner";

export const useTranslation = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>("auto");
  const [targetLanguages, setTargetLanguages] = useState<LanguageCode[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [translatedVideos, setTranslatedVideos] = useState<TranslatedVideo[]>([]);

  // Handle file upload
  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
    
    // Reset processing state if files change
    if (isProcessing) {
      setIsProcessing(false);
      setProcessComplete(false);
    }
  };

  // Handle source language change
  const handleSourceLanguageChange = (language: string) => {
    setSourceLanguage(language as LanguageCode);
  };

  // Handle target languages change
  const handleTargetLanguagesChange = (languages: string[]) => {
    setTargetLanguages(languages as LanguageCode[]);
  };

  // Helper function to get language name from code
  const getLanguageName = (code: LanguageCode): string => {
    const languageMap: Record<string, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ru: "Russian",
      zh: "Chinese",
      ja: "Japanese",
      ko: "Korean",
      ar: "Arabic",
      hi: "Hindi",
      bn: "Bengali",
      pa: "Punjabi",
      te: "Telugu",
      tr: "Turkish",
      vi: "Vietnamese",
      th: "Thai",
      id: "Indonesian",
      auto: "Auto-detected",
    };
    
    return languageMap[code] || code;
  };

  // Handle translation submission
  const handleTranslate = async () => {
    // Validate inputs
    if (files.length === 0) {
      toast.error("Please upload at least one video file");
      return;
    }

    if (targetLanguages.length === 0) {
      toast.error("Please select at least one target language");
      return;
    }

    // Start processing
    setIsProcessing(true);
    setProcessComplete(false);
    setTranslatedVideos([]);

    toast.info("Translation process started", {
      description: `Translating ${files.length} videos to ${targetLanguages.length} languages`,
    });

    try {
      // Call the API to translate videos
      const response = await batchTranslateVideos(
        files,
        sourceLanguage,
        targetLanguages
      );

      // Convert API response to TranslatedVideo format
      const videos: TranslatedVideo[] = response.translated_videos.map(video => ({
        id: `${video.filename}-${Math.random().toString(36).substring(2, 9)}`,
        title: video.title || video.filename,
        src: video.download_url,
        language: video.language ? getLanguageName(video.language) : "Unknown",
        originalFileName: video.originalFileName || video.filename,
        downloadUrl: video.download_url,
      }));

      setTranslatedVideos(videos);
      setProcessComplete(true);
      
      toast.success("Translation complete!", {
        description: `${videos.length} videos have been translated successfully`,
      });
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Translation failed", {
        description: "There was an error translating your videos. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset the application state
  const handleReset = () => {
    setFiles([]);
    setSourceLanguage("auto");
    setTargetLanguages([]);
    setIsProcessing(false);
    setProcessComplete(false);
    setTranslatedVideos([]);
  };

  // Make sure we expose setProcessComplete for the TranslationProcessing component
  const updateProcessComplete = (value: boolean) => {
    setProcessComplete(value);
  };

  return {
    files,
    sourceLanguage,
    targetLanguages,
    isProcessing,
    processComplete,
    translatedVideos,
    handleFilesChange,
    handleSourceLanguageChange,
    handleTargetLanguagesChange,
    handleTranslate,
    handleReset,
    setProcessComplete: updateProcessComplete
  };
};
