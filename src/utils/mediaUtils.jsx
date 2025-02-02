export const resizeMedia = (file) => {
  return new Promise((resolve, reject) => {
    if (file.type.startsWith("image/")) {
      resizeImage(file).then(resolve).catch(reject);
    } else if (file.type.startsWith("video/")) {
      resizeVideoFrame(file).then(resolve).catch(reject);
    } else {
      reject(new Error("Unsupported file type"));
    }
  });
};

const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to 4:5 ratio
        const targetWidth = 400;
        const targetHeight = 500;
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Calculate source crop
        const sourceAspect = img.width / img.height;
        const targetAspect = targetWidth / targetHeight;

        let sx, sy, sw, sh;
        if (sourceAspect > targetAspect) {
          // Source is wider - crop horizontally
          sw = img.height * targetAspect;
          sh = img.height;
          sx = (img.width - sw) / 2;
          sy = 0;
        } else {
          // Source is taller - crop vertically
          sw = img.width;
          sh = img.width / targetAspect;
          sx = 0;
          sy = (img.height - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const resizeVideoFrame = (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      video.currentTime = 0.1;
    };

    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to 4:5 ratio
      canvas.width = 400;
      canvas.height = 500;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(video.src);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };

    video.onerror = reject;
  });
};
