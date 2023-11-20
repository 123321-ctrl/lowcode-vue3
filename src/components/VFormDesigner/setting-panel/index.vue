<template>
  <el-container>
    <el-tabs v-model="activeTab">
      <el-tab-pane name="first" label="组件设置">
        <el-scrollbar
          class="setting-scrollbar"
          :style="{ height: scrollerHeight }"
        >
          <template v-if="selectedWidget && !selectedWidget.category">
            <el-form
              :model="optionModel"
              size="small"
              label-position="left"
              label-width="120px"
              class="setting-form"
            >
              <el-collapse v-model="widgetActiveCollapseNames">
                <el-collapse-item name="1" title="常见属性">
                  <div
                    v-for="(editorName, propName) in commonProps"
                    :key="propName"
                  >
                    <propItem
                      v-if="designer.hasConfig(selectedWidget, propName)"
                      :editorName="editorName"
                      :propName="propName"
                      :option-model="(optionModel as fieldType)"
                      :designer="designer"
                      :selected-widget="designer.selectedWidget"
                    ></propItem>
                  </div>
                </el-collapse-item>
                <el-collapse-item name="2" title="高级属性"> </el-collapse-item>
                <el-collapse-item name="3" title="事件属性"> </el-collapse-item>
              </el-collapse>
            </el-form>
          </template>
          <template v-else> 请点击选择 </template>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane name="second" label="表单设置"> 1 </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from "vue";
import WidgetProperties from "@/config/propertyRegister.js";
import { designerType, selectedType,fieldType } from "@/components/api/type";
import { addWindowResizeHandler } from "@/utils/util.js";

import propItem from "./propItem.vue";
const { COMMON_PROPERTIES } = WidgetProperties;

const scrollerHeight = ref("0px");
onMounted(() => {
  scrollerHeight.value = window.innerHeight - 56 - 48 + "px";
  addWindowResizeHandler(() => {
    nextTick(() => {
      scrollerHeight.value = window.innerHeight - 56 - 48 + "px";
    });
  });
});

const prop = defineProps<{
  designer: designerType;
  selectedWidget: selectedType | null;
}>();

const activeTab = ref("first");
const widgetActiveCollapseNames = ref(["1", "3"]);

const commonProps = ref(COMMON_PROPERTIES);

const optionModel = computed({
  get() {
    return (prop.selectedWidget as selectedType).options;
  },

  set(newValue) {
    console.log("newVal", newValue);
    (prop.selectedWidget as selectedType).options = newValue;
  },
});
</script>

<style scoped lang="scss"></style>
