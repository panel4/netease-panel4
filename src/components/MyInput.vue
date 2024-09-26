<!-- eslint-disable max-len -->
<template>
  <div class="inline-block text-[14px] relative w-[180px]">
    <input
      v-bind="attrs"
      :value="props.value"
      @input="(e) => emit('update:value', e.target.value)"
      class="w-[100%] px-[15px] h-[40px] leading-[40px] text-[#606266] box-border rounded-[4px] bg-white border outline-none"
    />
  </div>
</template>
<script setup>
import { useAttrs, defineProps, defineEmits } from "vue";
// 单向数据流
const props = defineProps({
  value: String,
});
const emit = defineEmits(["update:value"]);
const attrs = useAttrs();
</script>
