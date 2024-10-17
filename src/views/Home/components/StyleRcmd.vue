<script setup>
// import BetterScroll from "@/components/BetterScroll.vue";
import { Icon } from "@iconify/vue";
const props = defineProps({
  data: Array,
  title: String,
});
console.log(props);
</script>

<template>
  <div
    class="pl-[10px] text-[20px] font-sans font-bold text-gray-800 hover:underlin"
  >
    {{ title }}
  </div>
  <!-- <BetterScroll
    :config="{ scrollX: true, scrollY: false }"
    :dep="data"
    style="flex-wrap: wrap; flex-direction: column; height: 256px"
  > -->
  <div
    class="w-[100%] h-[270px] overflow-x-scroll flex flex-col items-center flex-wrap overflow-auto no-scrollbar"
  >
    <div v-for="item in data" class="pt-[15px] h-[80px] pl-[2rem] pr-[5rem]">
      <div class="flex-1 flex flex-row justify-start items-center">
        <img
          :src="item.uiElement.image.imageUrl"
          alt=""
          class="rounded-[10px] w-[18vw] h-[18vw]"
        />
        <div class="flex-2 flex flex-row justify-left w-full">
          <div class="w-[50vw] pl-[10px]">
            <div class="text-[18px] font-sans font-bold text-gray-800">
              {{ item.uiElement.mainTitle.title }}
            </div>
            <div class="text-[#9195a0] font-sans">
              {{ item.resourceExtInfo.artists[0].name }}
            </div>
          </div>
          <Icon
            icon="iconamoon:player-play-fill"
            style="color: #666d7d"
            width="2rem"
            height="2rem"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- </BetterScroll> -->
</template>
<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}
</style>
