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
  maxSize = 512,
  quality = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return reject(new Error('Canvas context not available'));

      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      tempCtx.drawImage(img, 0, 0);

      const imgData = tempCtx.getImageData(0, 0, img.width, img.height);
      const pixels = imgData.data;

      let top = img.height,
        bottom = 0,
        left = img.width,
        right = 0;

      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          const index = (y * img.width + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const a = pixels[index + 3];

          const isWhite = r > 240 && g > 240 && b > 240 && a > 0;

          if (!isWhite) {
            if (x < left) left = x;
            if (x > right) right = x;
            if (y < top) top = y;
            if (y > bottom) bottom = y;
          }
        }
      }

      const cropWidth = right - left + 1;
      const cropHeight = bottom - top + 1;

      if (cropWidth <= 0 || cropHeight <= 0) {
        return reject(new Error('Image is blank or all white'));
      }

      const cropCanvas = document.createElement('canvas');
      const cropCtx = cropCanvas.getContext('2d');
      if (!cropCtx) return reject(new Error('Canvas context not available'));

      cropCanvas.width = cropWidth;
      cropCanvas.height = cropHeight;
      cropCtx.drawImage(
        img,
        left,
        top,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      // Resize only if necessary
      let finalWidth = cropWidth;
      let finalHeight = cropHeight;

      const scale = Math.min(1, maxSize / cropWidth, maxSize / cropHeight); // scale = 1 if already within bounds

      if (scale < 1) {
        finalWidth = Math.round(cropWidth * scale);
        finalHeight = Math.round(cropHeight * scale);
      }

      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = finalWidth;
      finalCanvas.height = finalHeight;

      const finalCtx = finalCanvas.getContext('2d');
      if (!finalCtx) return reject(new Error('Canvas context not available'));

      finalCtx.drawImage(cropCanvas, 0, 0, finalWidth, finalHeight);

      finalCanvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Compression failed'));
          URL.revokeObjectURL(url);
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
