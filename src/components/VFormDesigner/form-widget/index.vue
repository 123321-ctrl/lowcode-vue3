<template>
  <el-form label-position="right" label-width="100px">
    <div class="form-widget-list">
      <draggable
        :list="designer.widgetList"
        item-key="id"
        :group="{ name: 'dragGroup' }"
        tag="transition-group"
        :component-data="{ name: 'fade' }"
      >
        <template #item="{ element: widget }">
          <div>
            <template v-if="'container' === widget.category">
              <component :is="getWidgetName(widget)"></component>
            </template>
            <template v-else>
              <FormItemWrapper
                :widgetName="getWidgetName(widget)"
                :field="widget"
                :designer="designer"
              ></FormItemWrapper>
              <!-- <component :is="getWidgetName(widget)"></component> -->
            </template>
          </div>
        </template>
      </draggable>
    </div>
  </el-form>
</template>

<script setup lang="ts">
// import { ref } from "vue";
import FormItemWrapper from "./field-widget/form-item-wrapper.vue";

defineProps(["designer"]);

// const componentList = ref([]);

function getWidgetName(widget: any) {
  console.log("widgetName", widget.type + "-widget");
  return widget.type + "-widget";
}
</script>

<style scoped lang="scss">
.form-widget-list {
  background-color: pink;
  min-height: calc(100vh - 56px - 68px);
  padding: 3px;
}
</style>
