<template>
  <BetterScroll :config="{ scrollX: true, scrollY: false }" :dep="menu">
    <div
      v-for="item in props.menu"
      :key="item.name"
      @click="emit('click')"
      class="flex flex-col items-center w-[20vw] mb-[10vw] mt-[4vw]"
    >
      <div>
        <img :src="item.iconUrl" alt="" class="w-[13vw] h-[13vw] filter" />
      </div>
      <div class="text-[#676c7c] text-[14px] font-sans">{{ item.name }}</div>
    </div>
  </BetterScroll>
</template>
<script setup>
import BetterScroll from "@/components/BetterScroll.vue";
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  menu: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["click"]);
</script>

<style scoped>
.filter {
  filter: url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27><filter id=%27colorize%27><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
</style>
