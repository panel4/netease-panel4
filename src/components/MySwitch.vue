<!-- eslint-disable max-len -->
<template>
  <div
    @click="emit('update:value', !props.value)"
    class="w-[40px] h-[20px] rounded-[10px] bg-black overflow-hidden"
  >
    <div
      :class="`${
        props.value ? 'translate-x-[20px]' : 'translate-x-0'
      } w-[16px] h-[16px] m-[2px] bg-red-600 rounded-[8px]  transition-transform`"
    ></div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({ value: Boolean });
const emit = defineEmits(["update:value"]);
</script>
