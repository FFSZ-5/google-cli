import { URL, fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

import copy from "rollup-plugin-copy";
import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  let config = {};
  console.log("环境信息：", process.env.NODE_ENV, command, env, mode);
  config = {
    root: "src/",
    build: {
      outDir: path.resolve(__dirname, "dist"),
      rollupOptions: {
        input: {
          popup: path.resolve(__dirname, "src/popup/index.html"),
          contentPage: path.resolve(__dirname, "src/contentPage/index.html"),
          content: path.resolve(__dirname, "src/content/content.ts"),
          background: path.resolve(
            __dirname,
            "src/background/service-worker.tsx"
          ),
        },
        output: {
          assetFileNames: "assets/[name]-[hash].[ext]", // 静态资源
          chunkFileNames: "js/[name]-[hash].js", // 代码分割中产生的 chunk
          entryFileNames: (chunkInfo: {
            facadeModuleId: string;
            name: string;
          }) => {
            // 入口文件
            const baseName = path.basename(
              chunkInfo.facadeModuleId ?? "",
              path.extname(chunkInfo.facadeModuleId ?? "")
            );
            const saveArr = ["content", "service-worker"];
            return `[name]/${
              saveArr.includes(baseName) ? baseName : chunkInfo.name
            }.js`;
          },
          name: "[name].js",
        },
      },
    },
    plugins: [
      react(),
      copy({
        targets: [
          { src: "manifest.json", dest: "dist" },
          { src: "src/icons/**", dest: "dist/icons" },
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
  return config;
});
