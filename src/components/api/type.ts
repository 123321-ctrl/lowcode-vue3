export type designerType = {
  widgetList: [];
  selectedWidget: selectedType | null;
  setSelected: Function;
  hasConfig: Function;
};

export type selectedType = {
  type: String;
  icon: String;
  formItemFlag: Boolean;
  options: fieldType;
  category: String;
};

export type optionItemsType = {
  value: Number;
  disabled?: Boolean;
  label: String;
};

export type fieldType = {
  name: String;
  label: String;
  labelAlign: String;
  type: String;
  defaultValue: String;
  placeholder: String;
  columnWidth: String;
  size: String;
  labelWidth: null;
  labelHidden: false;
  readonly: false;
  disabled: false;
  hidden: false;
  clearable: true;
  showPassword: false;
  required: false;
  requiredHint: "";
  validation: "";
  validationHint: "";
  multiple: Boolean,
  rows: [];
  // number-widget
  controlsPosition: String;
  min: Number;
  max: Number;
  precision: Number;
  step: Number;
  // radio-widget
  displayStyle: String;
  buttonStyle: String;
  optionItems: optionItemsType[];
  border: Boolean;
  // select-widget
  filterable: Boolean;
  allowCreate: Boolean;
  remote: Boolean;
  automaticDropdown: Boolean; //自动下拉
  multiple: Boolean;
  multipleLimit: Number;
  // time-widget
  autoFullWidth: String;
  editable: Boolean;
  format: String; //时间格式
  valueFormat: String; //日期对象格式
  startPlaceholder: String;
  endPlaceholder: String;
  // switch-widget
  activeText: String;
  inactiveText: String;
  activeColor: null;
  inactiveColor: null;
  switchWidth: Number;
  // rate-widget
  lowThreshold: Number;
  highThreshold: Number;
  allowHalf: Boolean;
  showText: Boolean;
  showScore: Boolean;
  // slider-widget
  showStops: Boolean;
  range: Boolean;
  vertical: Boolean;
  // button-widget
  plain: Boolean;
  round: Boolean;
  circle: Boolean;
  icon: null;
  contentPosition: String,
  //-------------------
  customClass: ""; //自定义css类名
  labelIconClass: null;
  labelIconPosition: "rear";
  labelTooltip: null;
  minLength: null;
  maxLength: null;
  showWordLimit: false;
  prefixIcon: "";
  suffixIcon: "";
  appendButton: false;
  appendButtonDisabled: false;
  buttonIcon: "custom-search";
  //-------------------
  onCreated: "";
  onMounted: "";
  onInput: "";
  onChange: "";
  onFocus: "";
  onBlur: "";
  onValidate: "";
  onAppendButtonClick: "";
};

export type fieldObj = {
  options: fieldType;
};
