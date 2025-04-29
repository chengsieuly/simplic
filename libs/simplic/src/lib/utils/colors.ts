export const getBackgroundColorHex = (element: HTMLElement) => {
  const bgColor = window.getComputedStyle(element).backgroundColor;
  return bgColor;
};

export const getTextColorFromOklch = (
  oklchString: string,
  threshold = 0.6
): 'black' | 'white' => {
  const match = oklchString.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/
  );
  if (!match) {
    throw new Error('Invalid OKLCH string format');
  }

  const l = parseFloat(match[1]);
  return l < threshold ? 'white' : 'black';
};
