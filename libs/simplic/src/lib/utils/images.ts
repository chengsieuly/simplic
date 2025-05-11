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
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const originalCanvas = document.createElement('canvas');
      const ctx = originalCanvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));

      originalCanvas.width = img.width;
      originalCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const { data, width, height } = imageData;

      let top = height,
        bottom = 0,
        left = width,
        right = 0;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const [r, g, b, a] = [
            data[idx],
            data[idx + 1],
            data[idx + 2],
            data[idx + 3],
          ];

          const isNotWhite = !(r > 250 && g > 250 && b > 250 && a > 250);
          if (isNotWhite) {
            if (x < left) left = x;
            if (x > right) right = x;
            if (y < top) top = y;
            if (y > bottom) bottom = y;
          }
        }
      }

      const croppedWidth = right - left + 1;
      const croppedHeight = bottom - top + 1;

      const croppedCanvas = document.createElement('canvas');
      const croppedCtx = croppedCanvas.getContext('2d');
      if (!croppedCtx)
        return reject(new Error('Cropped canvas context not available'));

      // Resize cropped canvas to fit content
      croppedCanvas.width = croppedWidth;
      croppedCanvas.height = croppedHeight;
      croppedCtx.drawImage(
        originalCanvas,
        left,
        top,
        croppedWidth,
        croppedHeight,
        0,
        0,
        croppedWidth,
        croppedHeight
      );

      // Resize if needed
      const scale = Math.min(
        maxSize / croppedWidth,
        maxSize / croppedHeight,
        1
      );
      const finalWidth = Math.round(croppedWidth * scale);
      const finalHeight = Math.round(croppedHeight * scale);

      const finalCanvas = document.createElement('canvas');
      const finalCtx = finalCanvas.getContext('2d');
      if (!finalCtx)
        return reject(new Error('Final canvas context not available'));

      finalCanvas.width = finalWidth;
      finalCanvas.height = finalHeight;
      finalCtx.drawImage(croppedCanvas, 0, 0, finalWidth, finalHeight);

      finalCanvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) resolve(blob);
          else reject(new Error('Compression failed'));
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image load failed'));
    };

    img.src = url;
  });
};
