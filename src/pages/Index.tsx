
import React from "react";
import Header from "@/components/Header";
import TranslationProcessing from "@/components/TranslationProcessing";
import TranslatedVideoGrid from "@/components/TranslatedVideoGrid";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import TranslationForm from "@/components/TranslationForm";
import { useTranslation } from "@/hooks/useTranslation";

const Index = () => {
  // Use the custom hook for all translation-related logic and state
  const { 
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
    setProcessComplete
  } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-6xl px-4 sm:px-6 py-8">
        {/* Hero section */}
        {!processComplete && files.length === 0 && <HeroSection />}
        
        {/* Translation Form */}
        {!processComplete && (
          <TranslationForm 
            files={files}
            onFilesChange={handleFilesChange}
            sourceLanguage={sourceLanguage}
            onSourceLanguageChange={handleSourceLanguageChange}
            targetLanguages={targetLanguages}
            onTargetLanguagesChange={handleTargetLanguagesChange}
            onTranslate={handleTranslate}
            isProcessing={isProcessing}
          />
        )}
        
        {/* Processing View */}
        <TranslationProcessing
          isProcessing={isProcessing}
          totalVideos={files.length}
          totalLanguages={targetLanguages.length}
          onComplete={() => setProcessComplete(true)}
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
                className="animate-fade-in border-[#3046a5] text-[#3046a5] hover:bg-[#3046a5] hover:text-white"
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
