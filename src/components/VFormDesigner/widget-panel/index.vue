<template>
  <el-scrollbar :style="{ height: scrollerHeight }">
    <el-tabs>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><calendar /></el-icon>
            <span>组件库</span>
          </span>
        </template>
        <!-- tab内容 -->
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="容器" name="1">
            <draggable
              tag="ul"
              :list="containers"
              item-key="key"
              :group="{ name: 'dragGroup', pull: 'clone', put: false }"
              ghost-class="ghost"
              :sort="false"
            >
              {{ containers }}
              <template #item="{ element: ctn }">
                <li class="container-widget-item" :title="ctn.displayName">
                  <span> {{ ctn.type }}</span>
                </li>
              </template>
            </draggable>
          </el-collapse-item>

          <el-collapse-item title="基础字段" name="2">
            <draggable
              tag="ul"
              :list="basicFields"
              item-key="key"
              :group="{ name: 'dragGroup', pull: 'clone', put: false }"
              ghost-class="ghost"
              :sort="false"
            >
              {{ containers }}
              <template #item="{ element: fld }">
                <li class="field-widget-item" :title="fld.displayName">
                  <span> {{ fld.type }}</span>
                </li>
              </template>
            </draggable>
          </el-collapse-item>

          <el-collapse-item title="高级字段" name="3">
            <draggable
              tag="ul"
              :list="advancedFields"
              item-key="key"
              :group="{ name: 'dragGroup', pull: 'clone', put: false }"
              ghost-class="ghost"
              :sort="false"
            >
              <template #item="{ element: fld }">
                <li class="field-widget-item" :title="fld.displayName">
                  <span> {{ fld.type }}</span>
                </li>
              </template>
            </draggable>
          </el-collapse-item>

          <el-collapse-item title="自定义扩展字段" name="4">
            <draggable
              tag="ul"
              :list="customFields"
              item-key="key"
              :group="{ name: 'dragGroup', pull: 'clone', put: false }"
              ghost-class="ghost"
              :sort="false"
            >
              <template #item="{ element: fld }">
                <li class="field-widget-item" :title="fld.displayName">
                  <span> {{ fld.type }}</span>
                </li>
              </template>
            </draggable>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><calendar /></el-icon>
            <span>模板</span>
          </span>
        </template>
        <!-- tab内容 -->
      </el-tab-pane>
    </el-tabs>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, nextTick } from "vue";

import {
  containers as CONS,
  basicFields as BFS,
  advancedFields as AFS,
  customFields as CFS,
} from "@/config/templatesConfig.js";
import { generateId,addWindowResizeHandler } from "@/utils/util.js";

const scrollerHeight = ref("0px");
onMounted(() => {
  scrollerHeight.value = window.innerHeight - 56 + "px";
  addWindowResizeHandler(() => {
    nextTick(() => {
      scrollerHeight.value = window.innerHeight - 56 + "px";
    });
  });
});

const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  console.log(val);
};

const containers: any = ref([]);
const basicFields: any = ref([]);
const advancedFields: any = ref([]);
const customFields: any = ref([]);
const getBannedWidgets: any = inject("getBannedWidgets");

loadWidgets();

function isBanned(wName: any) {
  return getBannedWidgets().indexOf(wName) > -1;
}
function loadWidgets(this: any) {
  containers.value = CONS.map((con: { type: any }) => {
    return {
      key: generateId(),
      ...con,
      displayName: con.type,
    };
  }).filter((con: any) => {
    return !con.internal && !isBanned(con.type);
  });

  basicFields.value = BFS.map((fld: { type: any }) => {
    return {
      key: generateId(),
      ...fld,
      displayName: fld.type,
    };
  }).filter((fld: { type: any }) => {
    return !isBanned(fld.type);
  });

  advancedFields.value = AFS.map((fld: { type: any }) => {
    return {
      key: generateId(),
      ...fld,
      displayName: fld.type,
    };
  }).filter((fld: { type: any }) => {
    return !isBanned(fld.type);
  });

  customFields.value = CFS.map((fld: { type: any }) => {
    return {
      key: generateId(),
      ...fld,
      displayName: fld.type,
    };
  }).filter((fld: { type: any }) => {
    return !isBanned(fld.type);
  });
}
</script>

<style lang="scss" scoped>
$--color-primary: #409eff;
ul {
  padding-left: 10px; /* 重置IE11默认样式 */
  margin: 0; /* 重置IE11默认样式 */
  margin-block-start: 0;
  margin-block-end: 0.25em;
  padding-inline-start: 10px;

  &:after {
    content: "";
    display: block;
    clear: both;
  }

  .container-widget-item,
  .field-widget-item {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    width: 98px;
    float: left;
    margin: 2px 6px 6px 0;
    cursor: move;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background: #fff;
    border: 1px solid #e8e9eb;
    border-radius: 4px;
    padding: 0 8px;
  }

  .container-widget-item:hover,
  .field-widget-item:hover {
    background: #f1f2f3;
    border-color: $--color-primary;

    .color-svg-icon {
      color: $--color-primary;
    }
  }

  .drag-handler {
    position: absolute;
    top: 0;
    left: 160px;
    background-color: #dddddd;
    border-radius: 5px;
    padding-right: 5px;
    font-size: 11px;
    color: #666666;
  }
}
</style>
