
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploaderProps {
  onFilesChange: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesChange }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Filter for video files
      const videoFiles = acceptedFiles.filter((file) => 
        file.type.startsWith("video/") || 
        file.name.match(/\.(mp4|avi|mkv|mov|wmv)$/i)
      );

      if (videoFiles.length !== acceptedFiles.length) {
        toast.warning(`${acceptedFiles.length - videoFiles.length} files were not videos and were skipped.`);
      }

      if (videoFiles.length === 0) {
        toast.error("Please upload video files only.");
        return;
      }

      // Simulate upload progress
      const newFiles = [...files, ...videoFiles];
      setFiles(newFiles);
      onFilesChange(newFiles);

      // Simulate progress for each file
      videoFiles.forEach((file) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 10;
          if (progress > 100) {
            progress = 100;
            clearInterval(interval);
          }
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        }, 200);
      });

      toast.success(`${videoFiles.length} video${videoFiles.length === 1 ? "" : "s"} added`);
    },
    [files, onFilesChange]
  );

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesChange(newFiles);
    toast.info("File removed");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mkv', '.mov', '.wmv'],
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  });

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 text-center cursor-pointer ${
          isDragging || isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <Upload
            className={`h-12 w-12 transition-all duration-300 ${
              isDragging || isDragActive ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <div className="space-y-1">
            <h3 className="text-lg font-medium">
              {isDragging || isDragActive ? "Drop videos here" : "Upload Videos"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop video files or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports MP4, AVI, MKV, MOV, WMV
            </p>
          </div>
          <Button variant="secondary" size="sm" className="mt-2">
            Select Files
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="border rounded-xl overflow-hidden bg-card animate-slide-in">
          <div className="p-4 border-b bg-muted/30">
            <h3 className="font-medium">Uploaded Videos ({files.length})</h3>
          </div>
          <ul className="divide-y">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors animate-slide-in-right"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {uploadProgress[file.name] && uploadProgress[file.name] < 100 ? (
                    <div className="w-24">
                      <Progress value={uploadProgress[file.name]} className="h-1" />
                    </div>
                  ) : uploadProgress[file.name] === 100 ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : null}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
