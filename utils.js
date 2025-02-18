import {
  FONT_DIR,
  IGNORE_FILES,
  IMAGE_DIR,
  OUTPUT_DIR,
  STATIC_PATH,
} from "./constants.js";
import { promises as fs } from "fs";

export function getConstants(options) {
  let { staticPath, outputDir, ignoreFiles, fontDir, imageDir } = options || {};
  // eslint-disable-next-line no-undef
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

export async function checkPath(path) {
  try {
    await fs.access(path);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    throw new Error("The path does not exist.");
  }
}

export function showUsageIntructions() {
  console.error(
    "\x1b[31m%s\x1b[0m", // Red color start
    "\nUsage Instructions for Vite Config Package\n"
      + "=========================================\n"
      + "To use this package, you need to create a Vite configuration (vite.config.js) for static file builds.\n"
      + "Use the following code to get started:\n"
      + "\n"
      + 'const staticPath = "static";\n'
      + "export default createViteConfig({ staticPath });\n"
      + "\n"
      + "Explanation:\n"
      + " - `staticPath`: The path to your static assets.\n"
      + " - `createViteConfig`: This function generates a Vite config object for static file builds.\n"
      + "=========================================\n"
      + "If you need additional customization, refer to the documentation or source code.\n"
  );
}
