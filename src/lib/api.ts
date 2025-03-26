
// API client for interacting with the translation backend

import { LanguageCode, TranslationRequest, TranslationResponse } from "./types";

/**
 * Translates multiple videos from source language to multiple target languages
 * @param videos The video files to translate
 * @param sourceLanguage The source language code
 * @param targetLanguages The target language codes
 * @returns A promise resolving to the translation response
 */
export const batchTranslateVideos = async (
  videos: File[],
  sourceLanguage: LanguageCode,
  targetLanguages: LanguageCode[]
): Promise<TranslationResponse> => {
  try {
    // In a real implementation, this would make an actual API call
    // For this demo, we're returning mock results after a delay
    
    // Create a FormData object to send the videos and parameters
    const formData = new FormData();
    
    // Append each video file
    videos.forEach(video => {
      formData.append("videos", video);
    });
    
    // Append the source language
    formData.append("source_language", sourceLanguage);
    
    // Append each target language
    targetLanguages.forEach(lang => {
      formData.append("target_languages", lang);
    });
    
    // Simulate API delay for demo
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Create a mock response that matches the FastAPI format
    const mockResponse: TranslationResponse = {
      id: `job-${Math.random().toString(36).substring(2, 9)}`,
      videos: []
    };
    
    // Generate mock video entries for each combination of original video and target language
    videos.forEach(video => {
      targetLanguages.forEach(lang => {
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
          auto: "Auto-detected",
        };
        
        const langName = languageMap[lang] || lang;
        const videoTitle = video.name.split('.').slice(0, -1).join('.');
        
        mockResponse.videos.push({
          language: lang,
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Sample video URL
          originalFileName: video.name,
          title: `${videoTitle} (${langName})`,
        });
      });
    });
    
    return mockResponse;
  } catch (error) {
    console.error("Error batch translating videos:", error);
    throw new Error("Failed to batch translate videos");
  }
};

/**
 * Gets the download URL for a translated video
 * @param filename The filename of the translated video
 * @returns The download URL
 */
export const getVideoDownloadUrl = (filename: string): string => {
  // In a real implementation, this would use the actual backend URL
  // For this demo, we're using a mock URL
  return `/download/${filename}`;
};

