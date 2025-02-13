const STATIC_PATH = "src/static";
const OUTPUT_DIR = "dist";
const IGNORE_FILES = [
  `**/${OUTPUT_DIR}/**`,
  "**/__tests__/**",
  "**/_*.js",
  "**/_*.css",
];
const FONT_DIR = "fonts";
const IMAGE_DIR = "img";

export { FONT_DIR, IGNORE_FILES, IMAGE_DIR, OUTPUT_DIR, STATIC_PATH };
