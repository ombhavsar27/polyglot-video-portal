
import React, { useState } from "react";
import Header from "@/components/Header";
import FileUploader from "@/components/FileUploader";
import LanguageSelector from "@/components/LanguageSelector";
import TranslationProcessing from "@/components/TranslationProcessing";
import TranslatedVideoGrid, { TranslatedVideo } from "@/components/TranslatedVideoGrid";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Globe, Upload } from "lucide-react";

const Index = () => {
  // State management
  const [files, setFiles] = useState<File[]>([]);
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguages, setTargetLanguages] = useState<string[]>([]);
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
    setSourceLanguage(language);
  };

  // Handle target languages change
  const handleTargetLanguagesChange = (languages: string[]) => {
    setTargetLanguages(languages);
  };

  // Handle translation submission
  const handleTranslate = () => {
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

    // In a real implementation, this would make API calls to the backend
    // For this demo, we'll simulate the process and generate mock results
    
    toast.info("Translation process started", {
      description: `Translating ${files.length} videos to ${targetLanguages.length} languages`,
    });
  };

  // Handle processing completion
  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setProcessComplete(true);
    
    // Generate mock translated videos
    const mockVideos: TranslatedVideo[] = [];
    
    // For each original file and target language, create a mock translated video
    files.forEach((file) => {
      targetLanguages.forEach((langCode) => {
        // Determine language name for display
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
        };
        
        const langName = languageMap[langCode] || langCode;
        
        // Create a mock video entry
        mockVideos.push({
          id: `${file.name}-${langCode}-${Math.random().toString(36).substring(2, 9)}`,
          title: `${file.name.split('.').slice(0, -1).join('.')}`,
          src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Sample video
          language: langName,
          originalFileName: file.name,
        });
      });
    });
    
    setTranslatedVideos(mockVideos);
    
    toast.success("Translation complete!", {
      description: `${mockVideos.length} videos have been translated successfully`,
    });
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-6xl px-4 sm:px-6 py-8">
        {/* Hero section */}
        {!processComplete && files.length === 0 && (
          <div className="text-center space-y-4 py-8 mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Video Translation Portal</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Translate your videos into multiple languages simultaneously with our
              advanced AI translation system.
            </p>
          </div>
        )}
        
        {/* Translation Form */}
        {!processComplete && (
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-6">
              <FileUploader onFilesChange={handleFilesChange} />
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Translation Settings</h2>
                <LanguageSelector
                  sourceLanguage={sourceLanguage}
                  onSourceLanguageChange={handleSourceLanguageChange}
                  targetLanguages={targetLanguages}
                  onTargetLanguagesChange={handleTargetLanguagesChange}
                />
                
                <div className="mt-8">
                  <Button 
                    onClick={handleTranslate} 
                    disabled={files.length === 0 || targetLanguages.length === 0 || isProcessing}
                    className="w-full h-12 text-base group"
                  >
                    <Upload className="mr-2 h-5 w-5 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
                    Translate Videos
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Videos will be processed and translated using our AI system
                  </p>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="bg-muted/30 rounded-xl p-4 border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Ready to translate</h3>
                      <p className="text-sm text-muted-foreground">
                        {files.length} video{files.length !== 1 ? "s" : ""} × {targetLanguages.length || "0"} language{targetLanguages.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="text-2xl font-semibold">
                      {files.length * (targetLanguages.length || 0)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Processing View */}
        <TranslationProcessing
          isProcessing={isProcessing}
          totalVideos={files.length}
          totalLanguages={targetLanguages.length}
          onComplete={handleProcessingComplete}
        />
        
        {/* Results View */}
        {processComplete && (
          <div className="space-y-10">
            <TranslatedVideoGrid videos={translatedVideos} />
            
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleReset}
                className="animate-fade-in"
              >
                Translate More Videos
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="border-t py-6 bg-muted/20">
        <div className="container max-w-6xl px-4 sm:px-6 text-center text-sm text-muted-foreground">
          Polyglot Video Translation System © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
