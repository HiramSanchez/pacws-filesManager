export function getFileType(file) {
    if (file.type.startsWith("image")) return "image";
    if (file.type.startsWith("video")) return "video";
  
    const ext = file.name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) return "image";
    if (["mp4", "mkv", "avi", "mov", "webm"].includes(ext)) return "video";
  
    return "unknown";
  }