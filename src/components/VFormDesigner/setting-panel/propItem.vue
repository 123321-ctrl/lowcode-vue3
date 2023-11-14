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
    <template v-if="propName === 'labelAlign'">
      <el-form-item prop="labelAlign" label="字段标签对齐">
        <el-radio-group
          v-model="optionModel.labelAlign"
          class="radio-group-custom"
        >
          <el-radio-button label="label-left-align">居左</el-radio-button>
          <el-radio-button label="label-center-align">居中</el-radio-button>
          <el-radio-button label="label-right-align">居右</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </template>
    <template v-if="propName === 'type'">
      <el-form-item prop="type" label="显示类型">
        <el-select v-model="optionModel.type">
          <el-option label="text" value="text"></el-option>
          <el-option label="password" value="password"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template v-if="propName === 'defaultValue'">
      <el-form-item prop="defaultValue" label="默认值">
        <el-input type="text" v-model="optionModel.defaultValue"></el-input>
      </el-form-item>
    </template>
    <template v-if="propName === 'placeholder'">
      <el-form-item prop="placeholder" label="占位内容">
        <el-input type="text" v-model="optionModel.placeholder"></el-input>
      </el-form-item>
    </template>
    <template v-if="propName === 'columnWidth'">
      <el-form-item prop="columnWidth" label="标签宽度">
        <el-input type="text" v-model="optionModel.columnWidth"></el-input>
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
    <template v-if="propName === 'hidden'">
      <el-form-item prop="hidden" label="隐藏">
        <el-switch v-model="optionModel.hidden"></el-switch>
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
defineProps(["editorName", "propName", "optionModel"]);

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

const cssClassList = ref([])
</script>

<style scoped lang="scss"></style>
