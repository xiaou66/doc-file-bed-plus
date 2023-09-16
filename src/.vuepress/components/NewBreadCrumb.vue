<template>
  <nav class="vp-breadcrumb">
    <ol typeof="BreadcrumbList">
      <li v-for="(item, index) in config"
          :key="index"
          :class="index === config.length - 1 ? 'is-active' : ''"
          property="itemListElement"
          typeof="ListItem">
        <a property="item" typeof="WebPage"
           :class="item.disable ? 'vp-link no-link' : 'vp-link'"
           :href="item.disable ? 'javascript:;' : item.path">
          <HopeIcon v-if="iconEnable" :icon="item.icon" />
          <span property="name">
            {{ item.title }}
          </span>
        </a>
        <meta property="position" :content="index + 1" />
      </li>
    </ol>
  </nav>
</template>
<script lang="ts" setup>
import {usePageData, usePageFrontmatter, useRouteLocale,} from "@vuepress/client";
import type {ThemeNormalPageFrontmatter} from "vuepress-theme-hope";
import {useRouter} from "vue-router";
import {computed, onMounted, shallowRef, watch} from "vue";
import {getAncestorLinks, useThemeLocaleData} from "vuepress-theme-hope/client";
import {resolveRouteWithRedirect} from "vuepress-shared/client";
import 'vuepress-theme-hope/client/styles/breadcrumb.scss';
import {ArticleInfoType} from "vuepress-theme-hope/client";

// @ts-ignore
import HopeIcon from "vuepress-theme-hope/client/components/HopeIcon";

interface BreadCrumbConfig {
  title: string;
  icon?: string | undefined;
  path: string;
  disable: boolean;
}

const config = shallowRef<BreadCrumbConfig[]>([]);
const router = useRouter();
const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
const themeLocale = useThemeLocaleData();
const enable = computed(
    () =>
        (frontmatter.value.breadcrumb ||
            (frontmatter.value.breadcrumb !== false &&
                themeLocale.value.breadcrumb !== false)) &&
        config.value.length > 1,
);

const iconEnable = computed(
    () =>
        frontmatter.value.breadcrumbIcon ||
        (frontmatter.value.breadcrumbIcon !== false &&
            themeLocale.value.breadcrumbIcon !== false),
);

const page = usePageData();
const routeLocale = useRouteLocale();
const getBreadCrumbConfig = (): void => {
  const routes = router.getRoutes();

  const breadcrumbConfig = getAncestorLinks(
      page.value.path,
      routeLocale.value,
  ).map<BreadCrumbConfig | null>(({link, name}) => {
    const route = routes.find((route) => route.path === link);
    if (route) {
      const {meta, path} = resolveRouteWithRedirect(router, route.path);
      const title = (meta[ArticleInfoType.shortTitle] || meta[ArticleInfoType.title] || name) as string;
      const icon = meta[ArticleInfoType.icon] as string;
      const enable = meta[ArticleInfoType.order];
      return {
        title: title,
        icon,
        path,
        disable: enable === -99
      }
    }
    return null;
  }).filter((item): item is BreadCrumbConfig => item !== null)
  if (breadcrumbConfig.length > 1) {
    config.value = breadcrumbConfig;
  }
};

onMounted(() => {
  getBreadCrumbConfig();
  watch(() => page.value.path, getBreadCrumbConfig);
});
</script>
<style lang="scss" scoped>
.no-link {
  cursor: not-allowed;
  color: #c3c3c3;
  &:hover {
    color: #c3c3c3;
  }
}
</style>
