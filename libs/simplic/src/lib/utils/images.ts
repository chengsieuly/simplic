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
