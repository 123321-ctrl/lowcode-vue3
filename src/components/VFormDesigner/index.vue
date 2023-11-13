<template>
  <el-container>
    <el-header>
      <div class="float-left">111</div>
      <div class="float-right">
        222
        <!-- <el-dropdown
          v-if="showLink('languageMenu')"
          :hide-timeout="2000"
          @command="handleLanguageChanged"
        >
          <span class="el-dropdown-link"
            >{{ curLangName }}<svg-icon icon-class="el-arrow-down"
          /></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="zh-CN">{{
                i18nt("application.zh-CN")
              }}</el-dropdown-item>
              <el-dropdown-item command="en-US">{{
                i18nt("application.en-US")
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
      </div>
    </el-header>

    <el-container>
      <el-aside class="side-panel">
        <widget-panel :designer="designer" />
      </el-aside>

      <!-- 中间工作台部分 -->
      <el-container>
        <el-header> </el-header>
        <el-main>
          <el-scrollbar :style="{ height: scrollerHeight }">
            <VFormWidget></VFormWidget>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import widgetPanel from "./widget-panel/index.vue";
import VFormWidget from './form-widget/index.vue'
import { addWindowResizeHandler } from "@/utils/util.js";
import { ref, provide, onMounted, nextTick } from "vue";

const prop = defineProps({
  /* 禁止显示的组件名称数组 */
  bannedWidgets: {
    type: Array,
    default: () => [],
  },
});

const designer = ref(null);

const scrollerHeight = ref("0px");
onMounted(() => {
  scrollerHeight.value = window.innerHeight - 56 - 36 + "px";
  addWindowResizeHandler(() => {
    nextTick(() => {
      scrollerHeight.value = window.innerHeight - 56 - 36 + "px";
    });
  });
});

provide("getBannedWidgets", () => prop.bannedWidgets);
</script>

<style scoped lang="scss"></style>
