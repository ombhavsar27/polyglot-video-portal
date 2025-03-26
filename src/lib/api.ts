
// API client for interacting with the translation backend

import { LanguageCode, TranslationRequest, TranslationResponse } from "./types";

// Base URL for the FastAPI backend
const API_BASE_URL = "http://localhost:8000"; // Change this to your actual backend URL

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
    
    // For development & testing without an actual backend
    const useMockResponse = true; // Set to false when connecting to a real backend
    
    if (!useMockResponse) {
      // Make the actual API call to the FastAPI backend
      const response = await fetch(`${API_BASE_URL}/translate`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } else {
      // Simulate API delay for demo
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Create a mock response that matches the FastAPI format
      const mockResponse: TranslationResponse = {
        id: `job-${Math.random().toString(36).substring(2, 9)}`,
        message: "Translation completed",
        processing_time: "00:05:23",
        translated_videos: []
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
          
          mockResponse.translated_videos.push({
            filename: `${videoTitle}_${lang}.mp4`,
            download_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Sample video URL
            originalFileName: video.name,
            title: `${videoTitle} (${langName})`,
            language: lang
          });
        });
      });
      
      return mockResponse;
    }
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
  // Use the actual backend URL for downloads
  return useMockResponse ? `/download/${filename}` : `${API_BASE_URL}/download/${filename}`;
};

// Flag to determine if we're using mock data or real API
const useMockResponse = true; // Set to false when connecting to a real backend
