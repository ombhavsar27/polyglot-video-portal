
import React from "react";
import FileUploader from "@/components/FileUploader";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { LanguageCode } from "@/lib/types";
import ResultsSummary from "./ResultsSummary";

interface TranslationFormProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  sourceLanguage: LanguageCode;
  onSourceLanguageChange: (language: string) => void;
  targetLanguages: LanguageCode[];
  onTargetLanguagesChange: (languages: string[]) => void;
  onTranslate: () => void;
  isProcessing: boolean;
}

const TranslationForm: React.FC<TranslationFormProps> = ({
  files,
  onFilesChange,
  sourceLanguage,
  onSourceLanguageChange,
  targetLanguages,
  onTargetLanguagesChange,
  onTranslate,
  isProcessing,
}) => {
  return (
    <div className="grid md:grid-cols-5 gap-8">
      <div className="md:col-span-3 space-y-6">
        <FileUploader onFilesChange={onFilesChange} />
      </div>
      
      <div className="md:col-span-2 space-y-6">
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Translation Settings</h2>
          <LanguageSelector
            sourceLanguage={sourceLanguage}
            onSourceLanguageChange={onSourceLanguageChange}
            targetLanguages={targetLanguages}
            onTargetLanguagesChange={onTargetLanguagesChange}
          />
          
          <div className="mt-8">
            <Button 
              onClick={onTranslate} 
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
          <ResultsSummary 
            filesCount={files.length} 
            languagesCount={targetLanguages.length} 
          />
        )}
      </div>
    </div>
  );
};

export default TranslationForm;
