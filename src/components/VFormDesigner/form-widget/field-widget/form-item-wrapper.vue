<template>
  <div>
    <el-form-item
      :label="label"
      :label-width="labelWidth + 'px'"
      :label-position="field.options.labelAlign"
      @click.stop="selectField(field)"
    >
      <!-- <template #label></template> -->
      <template v-if="widgetName === 'input-widget'">
        <el-input
          ref="fieldEditor"
          v-model="fieldModel"
          :disabled="field.options.disabled"
          :size="field.options.size"
          :readonly="field.options.readonly"
          :type="field.options.type"
          :show-password="field.options.showPassword"
          :placeholder="field.options.placeholder"
          :clearable="field.options.clearable"
          :minlength="field.options.minLength"
          :maxlength="field.options.maxLength"
          :show-word-limit="field.options.showWordLimit"
          :prefix-icon="field.options.prefixIcon"
          :suffix-icon="field.options.suffixIcon"
        ></el-input>
      </template>
      <template v-if="widgetName === 'textarea-widget'">
        <el-input
          type="textarea"
          ref="fieldEditor"
          v-model="fieldModel"
          :disabled="field.options.disabled"
          :readonly="field.options.readonly"
          :placeholder="field.options.placeholder"
          :rows="field.options.rows"
          :minlength="field.options.minLength"
          :maxlength="field.options.maxLength"
          :show-word-limit="field.options.showWordLimit"
        >
        </el-input>
      </template>
      <template v-if="widgetName === 'number-widget'">
        <el-input-number
          ref="fieldEditor"
          v-model="fieldModel"
          class="full-width-input"
          :disabled="field.options.disabled"
          :controls-position="field.options.controlsPosition"
          :placeholder="field.options.placeholder"
          :min="field.options.min"
          :max="field.options.max"
          :precision="field.options.precision"
          :step="field.options.step"
        >
        </el-input-number>
      </template>
      <template v-if="widgetName === 'radio-widget'">
        <el-radio-group
          ref="fieldEditor"
          v-model="fieldModel"
          :class="{
            'radio-group-block': field.options.displayStyle === 'block',
          }"
          :disabled="field.options.disabled"
        >
          <template v-if="!!field.options.buttonStyle">
            <el-radio-button
              v-for="(item, index) in field.options.optionItems"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              :border="field.options.border"
              :style="{ display: field.options.displayStyle }"
              >{{ item.label }}</el-radio-button
            >
          </template>
          <template v-else>
            <el-radio
              v-for="(item, index) in field.options.optionItems"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              :border="field.options.border"
              :style="{ display: field.options.displayStyle }"
              >{{ item.label }}</el-radio
            >
          </template>
        </el-radio-group>
      </template>
      <template v-if="widgetName === 'checkbox-widget'">
        <el-checkbox-group
          ref="fieldEditor"
          v-model="fieldModel"
          :disabled="field.options.disabled"
        >
          <template v-if="!!field.options.buttonStyle">
            <el-checkbox-button
              v-for="(item, index) in field.options.optionItems"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              :border="field.options.border"
              :style="{ display: field.options.displayStyle }"
              >{{ item.label }}</el-checkbox-button
            >
          </template>
          <template v-else>
            <el-checkbox
              v-for="(item, index) in field.options.optionItems"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              :border="field.options.border"
              :style="{ display: field.options.displayStyle }"
              >{{ item.label }}</el-checkbox
            >
          </template>
        </el-checkbox-group>
      </template>
      <template v-if="widgetName === 'select-widget'">
        <el-select
          ref="fieldEditor"
          v-model="fieldModel"
          class="full-width-input"
          :disabled="field.options.disabled"
          :clearable="field.options.clearable"
          :filterable="field.options.filterable"
          :allow-create="field.options.allowCreate"
          :default-first-option="allowDefaultFirstOption"
          :automatic-dropdown="field.options.automaticDropdown"
          :multiple="field.options.multiple"
          :multiple-limit="field.options.multipleLimit"
          :placeholder="field.options.placeholder"
          :remote="field.options.remote"
        >
          <el-option
            v-for="item in field.options.optionItems"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </template>
      <template v-if="widgetName === 'time-widget'">
        <el-time-picker
          ref="fieldEditor"
          v-model="fieldModel"
          :class="[!!field.options.autoFullWidth ? 'auto-full-width' : '']"
          :disabled="field.options.disabled"
          :readonly="field.options.readonly"
          :clearable="field.options.clearable"
          :editable="field.options.editable"
          :format="field.options.format"
          value-format="HH:mm:ss"
          :placeholder="field.options.placeholder"
        >
        </el-time-picker>
      </template>
      <template v-if="widgetName === 'time-range-widget'">
        <el-time-picker
          ref="fieldEditor"
          is-range
          v-model="fieldModel"
          :class="[!!field.options.autoFullWidth ? 'full-width-input' : '']"
          :disabled="field.options.disabled"
          :readonly="field.options.readonly"
          :clearable="field.options.clearable"
          :editable="field.options.editable"
          :format="field.options.format"
          value-format="HH:mm:ss"
          :start-placeholder="field.options.startPlaceholder"
          :end-placeholder="field.options.endPlaceholder"
        >
        </el-time-picker>
      </template>
      <template v-if="widgetName === 'date-widget'">
        <el-date-picker
          ref="fieldEditor"
          :type="field.options.type"
          v-model="fieldModel"
          :class="[!!field.options.autoFullWidth ? 'auto-full-width' : '']"
          :readonly="field.options.readonly"
          :disabled="field.options.disabled"
          :clearable="field.options.clearable"
          :editable="field.options.editable"
          :format="field.options.format"
          :value-format="field.options.valueFormat"
          :placeholder="field.options.placeholder"
        >
        </el-date-picker>
      </template>
      <template v-if="widgetName === 'date-range-widget'">
        <el-date-picker
          ref="fieldEditor"
          :type="field.options.type"
          v-model="fieldModel"
          :disabled="field.options.disabled"
          :readonly="field.options.readonly"
          :clearable="field.options.clearable"
          :editable="field.options.editable"
          :format="field.options.format"
          :value-format="field.options.valueFormat"
          :start-placeholder="field.options.startPlaceholder"
          :end-placeholder="field.options.endPlaceholder"
        >
        </el-date-picker>
      </template>
      <template v-if="widgetName === 'switch-widget'">
        <el-switch
          ref="fieldEditor"
          v-model="fieldModel"
          :disabled="field.options.disabled"
          :active-text="field.options.activeText"
          :inactive-text="field.options.inactiveText"
          :active-color="field.options.activeColor"
          :inactive-color="field.options.inactiveColor"
          :width="field.options.switchWidth"
        >
        </el-switch>
      </template>
      <template v-if="widgetName === 'rate-widget'">
        <el-rate
          ref="fieldEditor"
          v-model="fieldModel"
          :disabled="field.options.disabled"
          :max="field.options.max"
          :low-threshold="field.options.lowThreshold"
          :high-threshold="field.options.highThreshold"
          :allow-half="field.options.allowHalf"
          :show-text="field.options.showText"
          :show-score="field.options.showScore"
        >
        </el-rate>
      </template>
      <template v-if="widgetName === 'color-widget'">
        <el-color-picker
          ref="fieldEditor"
          v-model="fieldModel"
          :disabled="field.options.disabled"
        >
        </el-color-picker>
      </template>
      <template v-if="widgetName === 'slider-widget'">
        <el-slider
          ref="fieldEditor"
          v-model="fieldModel"
          :disabled="field.options.disabled"
          :show-stops="field.options.showStops"
          :min="field.options.min"
          :max="field.options.max"
          :step="field.options.step"
          :range="field.options.range"
          :vertical="field.options.vertical"
        >
        </el-slider>
      </template>
      <template v-if="widgetName === 'static-text-widget'">
        <el-switch
          ref="fieldEditor"
          v-model="fieldModel"
          :disabled="field.options.disabled"
          :active-text="field.options.activeText"
          :inactive-text="field.options.inactiveText"
          :active-color="field.options.activeColor"
          :inactive-color="field.options.inactiveColor"
          :width="field.options.switchWidth"
        >
        </el-switch>
      </template>
      <template v-if="widgetName === 'html-text-widget'">
        <el-switch
          ref="fieldEditor"
          v-model="fieldModel"
          :disabled="field.options.disabled"
          :active-text="field.options.activeText"
          :inactive-text="field.options.inactiveText"
          :active-color="field.options.activeColor"
          :inactive-color="field.options.inactiveColor"
          :width="field.options.switchWidth"
        >
        </el-switch>
      </template>
      <template v-if="widgetName === 'button-widget'">
        <el-button
          ref="fieldEditor"
          :type="field.options.type"
          :plain="field.options.plain"
          :round="field.options.round"
          :circle="field.options.circle"
          :icon="field.options.icon"
          :disabled="field.options.disabled"
        >
          {{ field.options.label }}</el-button
        >
      </template>
      <template v-if="widgetName === 'divider-widget'">
        <el-divider
          ref="fieldEditor"
          direction="horizontal"
          :content-position="field.options.contentPosition"
        >
          {{ field.options.label }}</el-divider
        >
      </template>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { fieldObj, designerType } from "@/components/api/type";
const prop = defineProps<{
  widgetName: String;
  field: fieldObj;
  designer: designerType;
}>();

const fieldModel = ref(null);
console.log("field", prop.field);

const label = computed(() => {
  if (!!prop.field.options.labelHidden) {
    return "";
  }
  return prop.field.options.label;
});
const allowDefaultFirstOption = computed(() => {
  return !!prop.field.options.filterable && !!prop.field.options.allowCreate;
});
const labelWidth = computed(() => {
  if (!!prop.field.options.labelHidden) {
    return 0;
  }

  if (!!prop.field.options.labelWidth) {
    return prop.field.options.labelWidth;
  }

  // if (!!prop.designer) {
  //   return prop.designer.formConfig.labelWidth;
  // } else {
  //   return prop.formConfig.labelWidth;
  // }
});

function selectField(field: any) {
  prop.designer.setSelected(field);
}
</script>

<style scoped lang="scss">
.radio-group-block {
  display: block !important;
}
.auto-full-width{
  width: 100%;
}
</style>
