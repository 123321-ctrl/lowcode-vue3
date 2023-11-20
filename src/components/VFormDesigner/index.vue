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
        <el-header>cnenter-header </el-header>
        <el-main>
          <el-scrollbar :style="{ height: scrollerHeight }">
            <VFormWidget :designer="designer"></VFormWidget>
          </el-scrollbar>
        </el-main>
      </el-container>

      <el-aside>
        <SettingPanel
          :designer="designer"
          :selected-widget="designer.selectedWidget"
        ></SettingPanel>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import widgetPanel from "./widget-panel/index.vue";
import VFormWidget from "./form-widget/index.vue";
import SettingPanel from "./setting-panel/index.vue";
import { designerType } from "@/components/api/type";
import { addWindowResizeHandler } from "@/utils/util.js";
import { ref, provide, onMounted, nextTick } from "vue";

const prop = defineProps({
  /* 禁止显示的组件名称数组 */
  bannedWidgets: {
    type: Array,
    default: () => [],
  },
});

const designer = ref<designerType>({
  widgetList: [],
  selectedWidget: null,
  setSelected: setSelected,
  hasConfig: hasConfig,
});
const selectedId = ref(null);
const selectedWidgetName = ref(null); //选中组件名称（唯一）

function setSelected(selected: any) {
  if (!selected) {
    clearSelected();
    return;
  }

  designer.value.selectedWidget = selected;
  if (!!selected.id) {
    selectedId.value = selected.id;
    selectedWidgetName.value = selected.options.name;
  }
}

function clearSelected() {
  selectedId.value = null;
  selectedWidgetName.value = null;
  designer.value.selectedWidget = null; //this.selectedWidget = null
}

function hasConfig(widget: any, configName: any) {
  // let originalWidget = null;
  // if (!!widget.category) {
  //   originalWidget = this.getContainerByType(widget.type);
  // } else {
  //   originalWidget = this.getFieldWidgetByType(widget.type);
  // }

  // if (!originalWidget || !originalWidget.options) {
  //   return false;
  // }

  return Object.keys(widget.options).indexOf(configName) > -1;
}

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
