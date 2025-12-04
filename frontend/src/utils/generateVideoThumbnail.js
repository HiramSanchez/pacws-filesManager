export function generateVideoThumbnail(file) {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.crossOrigin = "anonymous";
      video.muted = true;
  
      video.addEventListener("loadeddata", () => {
        video.currentTime = 0.1;
      });
  
      video.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);
        canvas.toBlob(
          (blob) => resolve(URL.createObjectURL(blob)),
          "image/jpeg"
        );
      });
    });
  }