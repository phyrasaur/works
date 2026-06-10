export type ThemeImage = {
  light: ImageMetadata;
  dark: ImageMetadata;
};

export function themeImage(
  light: ImageMetadata,
  dark: ImageMetadata,
): ThemeImage {
  return { light, dark };
}
