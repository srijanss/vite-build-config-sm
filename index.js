import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";
import path from "node:path";
import globPkg from "glob";
import { fileURLToPath } from "node:url";
import postcssPresetEnv from "postcss-preset-env";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import postcssNested from "postcss-nested";
import postcssMixins from "postcss-mixins";
import cssnano from "cssnano";
import postcssUrl from "postcss-url";
import { getConstants } from "./utils";

const { glob } = globPkg;

export default function createViteConfig(options) {
  const { staticPath, outputDir, ignoreFiles, fontDir, imageDir } =
    getConstants(options);
  const staticFiles = glob.sync(`${staticPath}/**/*.{js,css}`, {
    ignore: ignoreFiles,
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
          postcssPresetEnv({
            stage: 1,
          }),
          postcssFlexbugsFixes,
          autoprefixer,
          postcssImport,
          postcssNested,
          postcssMixins,
          cssnano({
            preset: "default",
          }),
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
              if (isCSS) return `css/[name]-[hash].css`;
              return `assets/[name]-[hash][extname]`;
            },
          },
        ],
      },
    },
  });
}
