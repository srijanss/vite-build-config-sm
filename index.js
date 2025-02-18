import { checkPath, getConstants, showUsageIntructions } from "./utils.js";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
// eslint-disable-next-line import/no-unresolved
import globPkg from "glob";
import legacy from "@vitejs/plugin-legacy";
import path from "node:path";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import postcssImport from "postcss-import";
import postcssMixins from "postcss-mixins";
import postcssNested from "postcss-nested";
import postcssPresetEnv from "postcss-preset-env";
import postcssUrl from "postcss-url";

const { glob } = globPkg;

export default function createViteConfig(options) {
  const { staticPath, outputDir, ignoreFiles, fontDir, imageDir } =
    getConstants(options);
  const staticFiles = glob.sync(`${staticPath}/**/*.{js,css}`, {
    ignore: ignoreFiles,
  });

  checkPath(staticPath).catch(() => {
    showUsageIntructions();
  });

  return defineConfig({
    base: "",
    plugins: [
      legacy({
        targets: ["defaults", "not IE 11"],
        modernPolyfills: ["es.promise.finally"],
        renderLegacyChunks: false,
      }),
    ],
    css: {
      postcss: {
        plugins: [
          postcssFlexbugsFixes,
          postcssImport,
          postcssNested,
          postcssMixins,
          postcssPresetEnv({ stage: 1 }),
          autoprefixer,
          cssnano({ preset: "default" }),
          postcssUrl({
            url: "rebase",
            assetsPath: "",
            useHash: true,
            filter: `**/${fontDir}/**`,
          }),
          postcssUrl({
            url: "rebase",
            assetsPath: "",
            useHash: true,
            filter: `**/${imageDir}/**`,
          }),
        ],
      },
    },
    build: {
      manifest: true,
      rollupOptions: {
        input: {
          ...Object.fromEntries(
            staticFiles.map((file) => [
              path.basename(file, path.extname(file)),
              fileURLToPath(new URL(file, import.meta.url)),
            ])
          ),
        },
        output: [
          {
            dir: `${staticPath}/${outputDir}`,
            format: "es",
            entryFileNames: "js/[name]-[hash].js",
            assetFileNames: (assetInfo) => {
              const isCSS = assetInfo.name.endsWith(".css");
              if (isCSS) {
                return `css/[name]-[hash].css`;
              }
              return `assets/[name]-[hash][extname]`;
            },
          },
        ],
      },
    },
  });
}
