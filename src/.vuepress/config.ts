import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {redirectPlugin} from "vuepress-plugin-redirect";
import { path, getDirname } from "@vuepress/utils";

// @ts-ignore
const __dirname = getDirname(import.meta.url)
export default defineUserConfig({
  base: "/",
  locales: {
    "/zh/": {
      lang: "zh-CN",
    },
    /*"/en/": {
      lang: "en-US",
    },*/
  },

  plugins: [
    redirectPlugin({
      autoLocale: true,
      defaultLocale: 'zh'
    }),
  ],
  alias: {
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue",
    ),
  },
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
