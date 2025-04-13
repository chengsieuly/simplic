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
