<template>
  <div class="form-widget-list">
    <draggable
      v-model="componentList"
      item-key="id"
      :group="{ name: 'dragGroup' }"
      tag="transition-group"
      :component-data="{ name: 'fade' }"
    >
      <template #item="{ element }">
        <div>{{ element.type }}</div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// const prop = defineProps({
//   designer: {
//     type: Object,
//   },
// });

const componentList = ref([]);
</script>

<style scoped lang="scss">
.form-widget-list {
  background-color: pink;
  min-height: calc(100vh - 56px - 68px);
  padding: 3px;
}
</style>
