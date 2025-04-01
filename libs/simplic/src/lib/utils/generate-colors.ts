import colors from 'tailwindcss/colors';

// Define the function to generate color scales
export function generateColors(prefix: string, color: keyof typeof colors) {
  const colorScale = colors[color] as Record<string, string>;
  const generatedColors: Record<string, Record<string, string>> = {
    [prefix]: {},
  };

  // Loop over the color scale and assign it to the new prefix
  Object.keys(colorScale).forEach((key) => {
    generatedColors[`${prefix}`][key] = colorScale[key];
  });

  return generatedColors;
}

export function getDefaultTheme() {
  return {
    ...generateColors('primary', 'blue'),
    ...generateColors('secondary', 'stone'),
    ...generateColors('success', 'emerald'),
  };
}
