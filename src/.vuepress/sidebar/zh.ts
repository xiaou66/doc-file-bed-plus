import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/guide/": [
    "",
    {
      text: '快速开始',
      prefix: 'quickly/',
      children: "structure"
    }
  ]
});
