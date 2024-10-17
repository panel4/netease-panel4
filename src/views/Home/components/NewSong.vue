<template>
  <div>
    <div
      class="p-[10px] text-[20px] font-sans font-bold text-gray-800 hover:underlin"
    >
      {{ title }}
    </div>
  </div>
  <BetterScroll :config="{ scrollX: true, scrollY: false }" :dep="data">
    <div v-for="item in data" class="w-[40vw] h-[70vw] pl-[10px]">
      <img
        :src="item.uiElement.image.imageUrl"
        alt=""
        class="rounded-[20px] w-[32vw] h-[32vw]"
      />
      <div
        class="text-clamp font-sans text-[17px] text-gray-800 w-[30vw] text-center"
      >
        {{ item.uiElement.mainTitle.title }}
      </div>
    </div>
  </BetterScroll>
</template>
<script setup>
import BetterScroll from "@/components/BetterScroll.vue";
const props = defineProps({
  data: Array,
  title: String,
});
console.log(props.data);

console.log(props);
</script>
<style scoped>
.text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
