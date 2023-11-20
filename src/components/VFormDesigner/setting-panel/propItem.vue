<template>
  <div>
    <template v-if="propName === 'name'">
      <el-form-item prop="name" :rules="nameRequiredRule">
        <template #label>
          <span> 唯一名称 </span>
        </template>
        <el-input type="text" v-model="optionModel.name"></el-input>
      </el-form-item>
    </template>
    <template v-if="propName === 'label'">
      <el-form-item prop="label" label="标签">
        <el-input type="text" v-model="optionModel.label"></el-input>
      </el-form-item>
    </template>
    <template v-if="propName === 'type'">
      <el-form-item prop="type" label="显示类型">
        <template v-if="(selectedWidget as selectedType).type === 'date'">
          <el-select v-model="optionModel.type">
            <el-option label="datetime" value="datetime"></el-option>
            <el-option label="date" value="date"></el-option>
            <el-option label="dates" value="dates"></el-option>
            <el-option label="year" value="year"></el-option>
            <el-option label="month" value="month"></el-option>
            <el-option label="week" value="week"></el-option>
          </el-select>
        </template>
        <template
          v-else-if="(selectedWidget as selectedType).type === 'date-range'"
        >
          <el-select v-model="optionModel.type">
            <el-option label="daterange" value="daterange"></el-option>
            <el-option label="datetimerange" value="datetimerange"></el-option>
            <el-option label="monthrange" value="monthrange"></el-option>
          </el-select>
        </template>
        <template v-else>
          <el-select v-model="optionModel.type">
            <el-option label="text" value="text"></el-option>
            <el-option label="password" value="password"></el-option>
          </el-select>
        </template>
      </el-form-item>
    </template>
    <template v-if="propName === 'defaultValue'">
      <el-form-item prop="defaultValue" label="默认值">
        <template v-if="(selectedWidget as selectedType).type === 'switch'">
          <el-switch
            v-model="optionModel.defaultValue"
            active-text="true"
            inactive-text="false"
          ></el-switch>
        </template>
        <template v-else-if="(selectedWidget as selectedType).type === 'rate'">
          <el-input-number
            v-model="optionModel.defaultValue"
            :min="0"
            :max="optionModel.max"
            style="width: 100%"
          >
          </el-input-number>
        </template>
        <template v-else-if="(selectedWidget as selectedType).type === 'color'">
          <el-color-picker
            v-model="optionModel.defaultValue"
          >
          </el-color-picker>
        </template>
        <template v-else>
          <el-input type="text" v-model="optionModel.defaultValue"></el-input>
        </template>
      </el-form-item>
    </template>
    <template v-if="propName === 'startPlaceholder'">
      <el-form-item prop="startPlaceholder" label="起始占位内容">
        <el-input type="text" v-model="optionModel.startPlaceholder"></el-input>
      </el-form-item>
    </template>
    <template v-if="propName === 'endPlaceholder'">
      <el-form-item prop="endPlaceholder" label="截止占位内容">
        <el-input type="text" v-model="optionModel.endPlaceholder"></el-input>
      </el-form-item>
    </template>
    <template v-if="propName === 'placeholder'">
      <el-form-item prop="placeholder" label="占位内容">
        <el-input type="text" v-model="optionModel.placeholder"></el-input>
      </el-form-item>
    </template>
    <template v-if="propName === 'autoFullWidth'">
      <el-form-item prop="autoFullWidth" label="自动拉伸宽度">
        <el-switch v-model="optionModel.autoFullWidth"></el-switch>
      </el-form-item>
    </template>
    <template v-if="propName === 'size'">
      <el-form-item prop="size" label="组件大小">
        <el-select v-model="optionModel.size">
          <el-option
            v-for="item in widgetSizes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </template>
    <template v-if="propName === 'showStops'">
      <el-form-item prop="showStops" label="显示间断点">
        <el-switch v-model="optionModel.showStops"></el-switch>
      </el-form-item>
    </template>
    <template v-if="propName === 'displayStyle'">
      <el-form-item prop="displayStyle" label="显示样式">
        <el-radio-group v-model="optionModel.displayStyle">
          <el-radio label="inline">行内</el-radio>
          <el-radio label="block">块</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
    <template v-if="propName === 'buttonStyle'">
      <el-form-item prop="buttonStyle" label="显示为按钮">
        <el-switch v-model="optionModel.buttonStyle"></el-switch>
      </el-form-item>
    </template>
    <template v-if="propName === 'border'">
      <el-form-item prop="border" label="带有边框">
        <el-switch v-model="optionModel.border"></el-switch>
      </el-form-item>
    </template>
    <template v-if="propName === 'labelWidth'">
      <el-form-item prop="labelWidth" label="标签宽度">
        <el-input
          type="number"
          v-model="optionModel.labelWidth"
          min="0"
          class="hide-spin-button"
        ></el-input>
      </el-form-item>
    </template>
    <template v-if="propName === 'labelHidden'">
      <el-form-item prop="labelHidden" label="隐藏字段标签">
        <el-switch v-model="optionModel.labelHidden"></el-switch>
      </el-form-item>
    </template>
    <template v-if="propName === 'rows'">
      <el-form-item prop="rows" label="行数">
        <el-input-number
          v-model="optionModel.rows"
          style="width: 100%"
        ></el-input-number>
      </el-form-item>
    </template>
    <template v-if="propName === 'required'">
      <el-form-item prop="required" label="必填字段">
        <el-switch v-model="optionModel.required"></el-switch>
      </el-form-item>
    </template>
    <template v-if="propName === 'requiredHint'">
      <el-form-item prop="requiredHint" label="必填校验提示">
        <el-input type="text" v-model="optionModel.requiredHint"></el-input>
      </el-form-item>
    </template>
    <template v-if="propName === 'validation'">
      <el-form-item prop="validation" label="字段校验">
        <el-select
          v-model="optionModel.validation"
          filterable
          clearable
          allow-create
          default-first-option
        >
          <el-option
            v-for="(fv, fvIdx) in fieldValidators"
            :key="fvIdx"
            :label="fv.label"
            :value="fv.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </template>
    <template v-if="propName === 'validationHint'">
      <el-form-item prop="validationHint" label="校验失败提示">
        <el-input type="text" v-model="optionModel.validationHint"></el-input>
      </el-form-item>
    </template>
    <template v-if="propName === 'readonly'">
      <el-form-item prop="readonly" label="只读">
        <el-switch v-model="optionModel.readonly"></el-switch>
      </el-form-item>
    </template>
    <template v-if="propName === 'disabled'">
      <el-form-item prop="disabled" label="禁用">
        <el-switch v-model="optionModel.disabled"></el-switch>
      </el-form-item>
    </template>
    <template v-if="propName === 'clearable'">
      <el-form-item prop="clearable" label="可清除">
        <el-switch v-model="optionModel.clearable"></el-switch>
      </el-form-item>
    </template>
    <template v-if="propName === 'showPassword'">
      <el-form-item prop="showPassword" label="可显示密码">
        <el-switch v-model="optionModel.showPassword"></el-switch>
      </el-form-item>
    </template>
    <template v-if="propName === 'format'">
      <el-form-item prop="format" label="显示格式">
        <template
          v-if="(selectedWidget as selectedType).type === 'date' || 'date-range'"
        >
          <el-select v-model="optionModel.format" filterable allow-create>
            <el-option label="YYYY-MM-DD" value="YYYY-MM-DD"></el-option>
            <el-option label="YYYY/MM/DD" value="YYYY/MM/DD"></el-option>
            <el-option
              label="YYYY年MM月DD日"
              value="YYYY年MM月DD日"
            ></el-option>
            <el-option
              label="YYYY-MM-DD HH:mm:ss"
              value="YYYY-MM-DD HH:mm:ss"
            ></el-option>
            <el-option
              label="YYYY-MM-DD hh:mm:ss"
              value="YYYY-MM-DD hh:mm:ss"
            ></el-option>
          </el-select>
        </template>
        <template v-else>
          <el-select v-model="optionModel.format" filterable allow-create>
            <el-option label="HH:mm:ss" value="HH:mm:ss"></el-option>
            <el-option label="HH时mm分ss秒" value="HH时mm分ss秒"></el-option>
            <el-option label="hh:mm:ss" value="hh:mm:ss"></el-option>
          </el-select>
        </template>
      </el-form-item>
    </template>
    <template v-if="propName === 'optionItems'">
      <el-form-item label-width="0">
        <el-divider class="custom-divider-margin-top">选项设置</el-divider>
        <OptionItemsSetting
          :designer="designer"
          :selected-widget="designer.selectedWidget"
        ></OptionItemsSetting>
      </el-form-item>
    </template>
    <template v-if="propName === 'customClass'">
      <el-form-item prop="customClass" label="自定义CSS样式">
        <el-select
          v-model="optionModel.customClass"
          multiple
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="(item, idx) in cssClassList"
            :key="idx"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { designerType, selectedType, fieldType } from "@/components/api/type";
import OptionItemsSetting from "./option-items-setting.vue";

defineProps<{
  designer: designerType;
  selectedWidget: selectedType | null;
  editorName: String;
  propName: String | number;
  optionModel: fieldType;
}>();

const nameRequiredRule = ref({ required: true, message: "name required" });

const widgetSizes = ref([
  { label: "default", value: "" },
  { label: "large", value: "large" },
  //{label: 'medium', value: 'medium'},
  { label: "small", value: "small" },
  //{label: 'mini', value: 'mini'},
]);

const fieldValidators = ref([
  { value: "number", label: "数字" },
  { value: "letter", label: "字母" },
  {
    value: "letterAndNumber",
    label: "数字字母",
  },
  {
    value: "mobilePhone",
    label: "手机号码",
  },
  { value: "email", label: "邮箱" },
  { value: "url", label: "网址" },
  { value: "noChinese", label: "非中文字符" },
  { value: "chinese", label: "仅中文字符" },
]);

const cssClassList = ref([]);
</script>

<style scoped lang="scss"></style>
