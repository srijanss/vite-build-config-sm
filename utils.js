import {
  STATIC_PATH,
  OUTPUT_DIR,
  IGNORE_FILES,
  FONT_DIR,
  IMAGE_DIR,
} from "./constants";

export function getConstants(options) {
  let { staticPath, outputDir, ignoreFiles, fontDir, imageDir } = options || {};
  const projectRoot = process.cwd();

  if (!staticPath) {
    staticPath = STATIC_PATH;
  }
  staticPath = `${projectRoot}/${staticPath}`;

  if (!outputDir) {
    outputDir = OUTPUT_DIR;
  }

  if (!ignoreFiles) {
    ignoreFiles = IGNORE_FILES;
  }

  if (!fontDir) {
    fontDir = FONT_DIR;
  }

  if (!imageDir) {
    imageDir = IMAGE_DIR;
  }

  return { staticPath, outputDir, ignoreFiles, fontDir, imageDir };
}
