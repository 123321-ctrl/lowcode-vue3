<template>
  <div class="option-items-pane">
    <el-radio-group
      v-if="
      (selectedWidget as selectedType).type === 'radio' ||
      ((selectedWidget as selectedType).type === 'select' && !(selectedWidget as selectedType).options.multiple)
    "
      v-model="optionModel.defaultValue"
      @change="emitDefaultValueChange"
    >
      <draggable
        tag="ul"
        :list="optionModel.optionItems"
        item-key="id"
        v-bind="{
          group: 'optionsGroup',
          ghostClass: 'ghost',
          handle: '.drag-option',
        }"
      >
        <template #item="{ element: option, index: idx }">
          <li>
            <el-radio :label="option.value">
              <el-input
                v-model="option.value"
                size="small"
                style="width: 100px"
              ></el-input>
              <el-input
                v-model="option.label"
                size="small"
                style="width: 100px"
              ></el-input>
              <i class="iconfont icon-drag drag-option"></i>
              <el-button
                circle
                plain
                size="small"
                type="danger"
                @click="deleteOption(option, idx)"
                icon="el-icon-minus"
                class="col-delete-button"
              ></el-button>
            </el-radio>
          </li>
        </template>
      </draggable>
    </el-radio-group>
    <el-checkbox-group
      v-else-if="
        (selectedWidget as selectedType).type === 'checkbox' ||
        ((selectedWidget as selectedType).type === 'select' && (selectedWidget as selectedType).options.multiple)
      "
      v-model="optionModel.defaultValue"
      @change="emitDefaultValueChange"
    >
      <draggable
        tag="ul"
        :list="optionModel.optionItems"
        item-key="id"
        v-bind="{
          group: 'optionsGroup',
          ghostClass: 'ghost',
          handle: '.drag-option',
        }"
      >
        <template #item="{ element: option, index: idx }">
          <li>
            <el-checkbox :label="option.value">
              <el-input
                v-model="option.value"
                size="small"
                style="width: 100px"
              ></el-input>
              <el-input
                v-model="option.label"
                size="small"
                style="width: 100px"
              ></el-input>
              <i class="iconfont icon-drag drag-option"></i>
              <el-button
                circle
                plain
                size="small"
                type="danger"
                @click="deleteOption(option, idx)"
                icon="el-icon-minus"
                class="col-delete-button"
              ></el-button>
            </el-checkbox>
          </li>
        </template>
      </draggable>
    </el-checkbox-group>
    <div
      v-if="((selectedWidget as selectedType).type === 'radio') || ((selectedWidget as selectedType).type === 'checkbox') || ((selectedWidget as selectedType).type === 'select')"
    >
      <el-button link type="primary" @click="addOption">增加新项</el-button>
      <el-button link type="primary" @click="importOptions">导入新项</el-button>
      <el-button link type="primary" @click="resetDefault"
        >重设选中项</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { designerType, selectedType } from "@/components/api/type";

const prop = defineProps<{
  designer: designerType;
  selectedWidget: selectedType | null;
}>();

const optionModel = computed(() => {
  return (prop.selectedWidget as selectedType).options;
});

function emitDefaultValueChange() {
  //   if (!!prop.designer && !!prop.designer.formWidget) {
  //     let fieldWidget = prop.designer.formWidget.getWidgetRef(
  //       prop.selectedWidget.options.name
  //     );
  //     if (!!fieldWidget && !!fieldWidget.refreshDefaultValue) {
  //       fieldWidget.refreshDefaultValue();
  //     }
  //   }
}

function deleteOption(_option: any, index: number) {
  optionModel.value.optionItems.splice(index, 1);
}

function addOption() {
  let newValue = optionModel.value.optionItems.length + 1;
  optionModel.value.optionItems.push({
    value: newValue,
    label: "new option",
  });
}
function importOptions() {}
function resetDefault() {}
</script>

<style scoped lang="scss">
.option-items-pane {
  width: 100%;
}
</style>
