<template>
  <div class="bg-[#f6f4f2] h-[65vw]">
    <div class="text-[3.5vw] text-[#9d9b9b] p-[3vw]">你可能还会喜欢</div>
    <BetterScroll
      :config="{ scrollX: true, scrollY: false, click: true }"
      :dep="props.data"
    >
      <div
        v-for="item in playtop"
        :key="item.id"
        class="w-[30vw] h-[49vw] ml-[3.932vw] relative"
      >
        <img
          class="w-[30vw] h-[30vw] rounded-[3vw] shadow-custom mt-[10px]"
          :src="item.coverImgUrl"
          alt=""
        />
        <div class="absolute top-[4vw] right-[2vw] text-[10px] text-white flex">
          <Icon
            icon="ic:baseline-arrow-right"
            width="4vw"
            height="4vw"
            style="color: white"
          />{{ changeCount(item.playCount) }}
        </div>
        <div class="mt-[2vw] line-clamp-2 hover:text-[#c8c9c9]">
          {{ item.name }}
        </div>
      </div>
    </BetterScroll>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { getPlaylisttop } from "@/api/home";
import BetterScroll from "@/components/BetterScroll.vue";

const props = defineProps({
  data: {},
});
const playtop = ref([]);
getPlaylisttop().then((res) => {
  playtop.value = res.playlists.slice(0, 6);
  console.log(playtop.value);
});
const changeCount = (num) => {
 if (num >= 100000000) {
  return `${(num / 100000000).toFixed(2)}亿`;
 }
 if (num >= 10000) {
  return `${(num / 10000).toFixed(2)}万`;
 }
};
</script>
