
import React from "react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  sourceLanguage: string;
  onSourceLanguageChange: (language: string) => void;
  targetLanguages: string[];
  onTargetLanguagesChange: (languages: string[]) => void;
}

// Language data
const languages = [
  { code: "auto", name: "Auto Detect" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "pa", name: "Punjabi" },
  { code: "te", name: "Telugu" },
  { code: "tr", name: "Turkish" },
  { code: "vi", name: "Vietnamese" },
  { code: "th", name: "Thai" },
  { code: "id", name: "Indonesian" },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  sourceLanguage,
  onSourceLanguageChange,
  targetLanguages,
  onTargetLanguagesChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSourceChange = (value: string) => {
    onSourceLanguageChange(value);
  };

  const handleTargetToggle = (code: string) => {
    if (targetLanguages.includes(code)) {
      onTargetLanguagesChange(targetLanguages.filter((lang) => lang !== code));
    } else {
      onTargetLanguagesChange([...targetLanguages, code]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <label htmlFor="source-language" className="text-sm font-medium">
          Source Language
        </label>
        <Select value={sourceLanguage} onValueChange={handleSourceChange}>
          <SelectTrigger id="source-language" className="w-full">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          Select the language of your uploaded videos or choose "Auto Detect"
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Target Languages</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-auto min-h-10 py-2"
            >
              {targetLanguages.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {targetLanguages.map((code) => (
                    <Badge key={code} variant="secondary" className="mr-1 mb-1">
                      {languages.find((lang) => lang.code === code)?.name || code}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground">Select languages...</span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search languages..." className="h-9" />
              <CommandList>
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                  {languages
                    .filter((lang) => lang.code !== "auto" && lang.code !== sourceLanguage)
                    .map((language) => (
                      <CommandItem
                        key={language.code}
                        value={language.code}
                        onSelect={() => handleTargetToggle(language.code)}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            targetLanguages.includes(language.code)
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50"
                          )}
                        >
                          {targetLanguages.includes(language.code) && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        {language.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <p className="text-xs text-muted-foreground mt-1">
          Select one or more target languages for translation
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
