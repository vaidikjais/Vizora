import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "temp/uploads";
const GENERATED_DIR = process.env.GENERATED_DIR || "temp/generated";
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024; // 10MB

// Ensure directories exist
export async function ensureDirectories() {
  await fs.ensureDir(UPLOAD_DIR);
  await fs.ensureDir(GENERATED_DIR);
}

// Generate unique filename
export function generateUniqueFilename(originalName, prefix = "") {
  const ext = path.extname(originalName);
  const timestamp = Date.now();
  const uniqueId = uuidv4().substring(0, 8);
  return `${prefix}${timestamp}_${uniqueId}${ext}`;
}

// Save uploaded file
export async function saveUploadedFile(file, prefix = "upload") {
  await ensureDirectories();

  const filename = generateUniqueFilename(file.name, prefix);
  const filepath = path.join(UPLOAD_DIR, filename);

  await fs.writeFile(filepath, file.buffer);

  return {
    filename,
    filepath,
    originalName: file.name,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };
}

// Save generated thumbnail
export async function saveGeneratedThumbnail(
  imageBuffer,
  prompt,
  prefix = "thumbnail"
) {
  await ensureDirectories();

  const filename = generateUniqueFilename("thumbnail.png", prefix);
  const filepath = path.join(GENERATED_DIR, filename);

  await fs.writeFile(filepath, imageBuffer);

  return {
    filename,
    filepath,
    prompt,
    generatedAt: new Date().toISOString(),
  };
}

// Get file info
export async function getFileInfo(filepath) {
  try {
    const stats = await fs.stat(filepath);
    return {
      exists: true,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
    };
  } catch (error) {
    return { exists: false };
  }
}

// Clean up old files
export async function cleanupOldFiles(maxAgeHours = 24) {
  await ensureDirectories();

  const cutoffTime = Date.now() - maxAgeHours * 60 * 60 * 1000;
  const directories = [UPLOAD_DIR, GENERATED_DIR];

  for (const dir of directories) {
    try {
      const files = await fs.readdir(dir);

      for (const file of files) {
        const filepath = path.join(dir, file);
        const stats = await fs.stat(filepath);

        if (stats.mtime.getTime() < cutoffTime) {
          await fs.remove(filepath);
          console.log(`Cleaned up old file: ${filepath}`);
        }
      }
    } catch (error) {
      console.error(`Error cleaning up directory ${dir}:`, error);
    }
  }
}

// Delete specific file
export async function deleteFile(filepath) {
  try {
    await fs.remove(filepath);
    return true;
  } catch (error) {
    console.error(`Error deleting file ${filepath}:`, error);
    return false;
  }
}

// Get file size in human readable format
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Validate file
export function validateFile(file) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Only JPEG, PNG, and WebP images are allowed."
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}.`
    );
  }

  return true;
}
