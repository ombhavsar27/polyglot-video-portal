
// Common type definitions for the application

// Supported language codes
export type LanguageCode = 
  | "auto" // Automatic detection
  | "en"   // English
  | "es"   // Spanish
  | "fr"   // French
  | "de"   // German
  | "it"   // Italian
  | "pt"   // Portuguese
  | "ru"   // Russian
  | "zh"   // Chinese
  | "ja"   // Japanese
  | "ko"   // Korean
  | "ar"   // Arabic
  | "hi"   // Hindi
  | "bn"   // Bengali
  | "pa"   // Punjabi
  | "te"   // Telugu
  | "tr"   // Turkish
  | "vi"   // Vietnamese
  | "th"   // Thai
  | "id";  // Indonesian

// Language information
export interface Language {
  code: LanguageCode;
  name: string;
}

// Video file with metadata
export interface VideoFile {
  file: File;
  id: string;
  progress: number;
}

// Translation request
export interface TranslationRequest {
  videos: File[];
  sourceLanguage: LanguageCode;
  targetLanguages: LanguageCode[];
}

// Translation response
export interface TranslationResponse {
  id: string;
  videos: {
    language: LanguageCode;
    url: string;
    originalFileName: string;
    title: string;
  }[];
}

// Translation job status
export interface TranslationStatus {
  jobId: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  message?: string;
}
