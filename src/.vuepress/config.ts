import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {redirectPlugin} from "vuepress-plugin-redirect";

export default defineUserConfig({
  base: "/",
  locales: {
    "/zh/": {
      lang: "zh-CN",
      title: "文档演示",
      description: "vuepress-theme-hope 的文档演示",
    },
    "/en/": {
      lang: "en-US",
      title: "Docs Demo",
      description: "A docs demo for vuepress-theme-hope",
    },
  },

  plugins: [
    redirectPlugin({
      autoLocale: true,
      defaultLocale: 'zh'
    }),
  ],
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
