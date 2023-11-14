<template>
  <div>
    <el-form-item :label="label" @click.stop="selectField(field)">
      <!-- <template #label></template> -->
      <template v-if="widgetName === 'input-widget'">
        <el-input
          ref="fieldEditor"
          v-model="fieldModel"
          :disabled="field.options.disabled"
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
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const prop = defineProps({
  widgetName: {
    type: String,
  },
  field: {
    type: Object,
  },
  designer: {
    type: Object,
  },
});

const fieldModel = ref(null);
console.log("field", prop.field);

const label = computed(() => {
  if (!!prop.field.options.labelHidden) {
    return "";
  }
  return prop.field.options.label;
});

function selectField(field) {
  prop.designer.setSelected(field);
}
</script>

<style scoped lang="scss"></style>
