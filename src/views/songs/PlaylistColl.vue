<template>
  <div>
    <div class="flex h-[8vw] m-[4vw]">
      <Icon
        icon="radix-icons:arrow-left"
        style="color: black"
        class="text-[8vw]"
        @click="BackHome"
      />
      <div class="ml-[3vw] leading-[8vw] text-[5vw]">收藏者</div>
    </div>
    <div>
      <div
        v-for="item in subcell"
        :key="item.id"
        class="flex h-[20vw] ml-[5vw]"
      >
        <img
          :src="item.avatarUrl"
          class="w-[14vw] h-[14vw] rounded-[7vw] mt-[3vw]"
          alt=""
        />
        <div class="text-[4vw] text-[#373737] leading-[20vw] ml-[5vw]">
          {{ item.nickname }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getPlaylistSub } from "@/api/home";
import { Icon } from "@iconify/vue";
import { useRouter} from "vue-router";

const router = useRouter();
const BackHome = () => {
  router.back();
};
const subcell = ref([]);
getPlaylistSub().then((res) => {
  subcell.value = res.subscribers;
  console.log(res);
});
</script>
