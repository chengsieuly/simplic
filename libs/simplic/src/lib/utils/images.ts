export const blobToFile = (
  blob: Blob,
  fileName?: string,
  mimeType?: string
): File => {
  return new File([blob], fileName || 'image', {
    type: mimeType || blob.type,
    lastModified: Date.now(),
  });
};

export const imageUrlToFile = async (
  url: string,
  filename?: string,
  mimeType?: string
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const name = filename || 'image';
  const type = mimeType || blob.type || 'image/png';
  return new File([blob], name, { type });
};

export const blobToDataURL = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const isImageValid = (src: string) => {
  if (!src) {
    return Promise.resolve(false);
  }

  const promise = new Promise((resolve) => {
    let img = document.createElement('img');
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
    img.src = src;
  });

  return promise;
};

export const resizeAndCompressImage = async (
  file: File,
  maxSize = 256,
  quality = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      let { width, height } = img;

      // Calculate new size while maintaining aspect ratio
      const scale = Math.min(maxSize / width, maxSize / height);
      const newWidth = width * scale;
      const newHeight = height * scale;

      // Create canvas and draw the resized image
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Compress and output as Blob
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Compression failed'));
          URL.revokeObjectURL(url);
        },
        'image/webp', // or 'image/webp' if supported
        quality // compression quality: 0 (worst) to 1 (best)
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error('Image load failed'));
    };

    img.src = url;
  });
};
