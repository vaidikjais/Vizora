"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import { getDisplayName } from "@/lib/utils";
import Image from "next/image";

export default function UploadPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    signOut(() => router.push("/"));
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleContinue = () => {
    if (selectedFile) {
      // Convert file to base64 before storing
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("uploadedImage", reader.result);
        router.push("/mode-select");
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-foreground font-semibold text-lg">Vizora</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground">
            Welcome, {getDisplayName(user)}
          </span>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-foreground border-border hover:bg-card"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Upload Your Image
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose an image to create your YouTube thumbnail
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-card border border-border rounded-xl p-8 backdrop-blur-sm">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 cursor-pointer ${
              dragActive
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 hover:shadow-sm"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden bg-background border border-border relative">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    {selectedFile.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setSelectedFile(null)}
                    variant="outline"
                    className="text-foreground border-border hover:bg-card"
                  >
                    Choose Different File
                  </Button>
                  <Button
                    onClick={handleContinue}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Continue to Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Drop your image here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-6 rounded-md transition-colors cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Supports: PNG, JPG, JPEG (Max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
