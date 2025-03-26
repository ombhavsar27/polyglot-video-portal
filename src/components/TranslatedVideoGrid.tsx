
import React from "react";
import VideoPlayer from "./VideoPlayer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export interface TranslatedVideo {
  id: string;
  title: string;
  src: string;
  language: string;
  originalFileName: string;
  downloadUrl?: string;
}

interface TranslatedVideoGridProps {
  videos: TranslatedVideo[];
}

const TranslatedVideoGrid: React.FC<TranslatedVideoGridProps> = ({ videos }) => {
  const handleDownload = (video: TranslatedVideo) => {
    if (video.downloadUrl) {
      // Create a temporary anchor element to trigger download
      const anchor = document.createElement('a');
      anchor.href = video.downloadUrl;
      anchor.download = `${video.title}.mp4`;
      anchor.target = '_blank';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      
      toast.success(`Downloading ${video.title}`);
    } else {
      toast.error(`Download URL not available for ${video.title}`);
    }
  };

  const handleDownloadAll = () => {
    toast.info("Downloading all videos...");
    
    // In a real implementation, we might use a zip library to bundle all videos
    // For this demo, we'll just trigger individual downloads with a small delay
    videos.forEach((video, index) => {
      setTimeout(() => {
        handleDownload(video);
      }, index * 1000); // 1 second delay between downloads
    });
  };

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Translated Videos</h2>
        <Button 
          variant="outline" 
          onClick={handleDownloadAll}
          className="group"
        >
          <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
          Download All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div 
            key={video.id} 
            className="space-y-3 animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <VideoPlayer 
              src={video.src} 
              language={video.language} 
              title={video.title} 
            />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium truncate">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.language}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-1 rounded-full hover:bg-primary/10 group"
                onClick={() => handleDownload(video)}
              >
                <Download className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-1" />
                <span className="text-primary">Download</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslatedVideoGrid;
