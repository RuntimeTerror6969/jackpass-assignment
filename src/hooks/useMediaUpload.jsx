import { useState } from "react";

export const useMediaUpload = () => {
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type.startsWith("image/") ? "image" : "video";
    setMediaType(type);

    const reader = new FileReader();
    reader.onload = () => {
      if (type === "image") {
        resizeImage(reader.result, setMediaPreview);
      } else {
        setMediaPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return { mediaPreview, handleMediaUpload, mediaType };
};

// Image resizing function
const resizeImage = (src, callback) => {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const targetRatio = 4 / 5;

    let width = img.width;
    let height = img.height;

    if (width / height > targetRatio) {
      width = height * targetRatio;
    } else {
      height = width / targetRatio;
    }

    canvas.width = 800; // Fixed width for better quality
    canvas.height = 1000; // 4:5 ratio

    ctx.drawImage(img, 0, 0, width, height, 0, 0, 800, 1000);
    callback(canvas.toDataURL("image/jpeg", 0.9));
  };
  img.src = src;
};
