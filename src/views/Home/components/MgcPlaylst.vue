<script setup>
import { Icon } from "@iconify/vue";
import BetterScroll from "@/components/BetterScroll.vue";

const props = defineProps({
  data: Array,
  title: String,
});
</script>

<template>
  <div
    class="p-[10px] text-[20px] font-sans font-bold text-gray-800 hover:underlin"
  >
    {{ title }}
  </div>
  <BetterScroll :config="{ scrollX: true, scrollY: false }" :dep="data">
    <div v-for="item in data" class="flex flex-col w-[33vw] h-[50vw] pl-[10px]">
      <div class="w-[32vw] h-[32vw] relative">
        <img
          :src="item.uiElement.image.imageUrl"
          alt=""
          class="items-center rounded-[10px] w-[30vw] h-[30vw]"
        />
        <div
          class="absolute w-full flex flex-row translate-x-[1.6rem] translate-y-[-7.1rem] text-[#f1f0ee]"
        >
          <div class="flex items-center">
            <Icon
              icon="simple-line-icons:earphones"
              style="color: #f1f0ee; height: 14px"
            />
          </div>
          <div>
            {{ item.resourceExtInfo.playCount }}
          </div>
        </div>
        <div class="absolute translate-x-[4.7rem] translate-y-[-2.3rem]">
          <Icon
            icon="iconamoon:player-play-fill"
            style="color: #fdfffa"
            width="2rem"
            height="2rem"
          />
        </div>
      </div>
      <div
        class="text-clamp font-sans text-[17px] text-gray-800 w-[30vw] text-center"
      >
        {{ item.uiElement.mainTitle.title }}
      </div>
    </div>
  </BetterScroll>
</template>
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
