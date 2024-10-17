<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const active = ref(0);
</script>

<template>
  <van-tabbar v-model="active" style="position: fixed; padding-bottom: 20px">
    <van-tabbar-item>
      <div class="text-center mx-auto">
        <Icon
          icon="ri:netease-cloud-music-line"
          style="
            color: /*#d72828*/ #9195a0;
            padding-bottom: 5px;
            width: 40px;
            height: 40px;
          "
        />
        <span class="text-[14px] font-sans">推荐</span>
      </div>
    </van-tabbar-item>
    <van-tabbar-item>
      <div class="text-center mx-auto">
        <Icon
          icon="iconamoon:discover-light"
          style="color: #9195a0; padding-bottom: 5px; width: 40px; height: 40px"
        />
        <span class="text-[14px] font-sans">发现</span>
      </div>
    </van-tabbar-item>

    <van-tabbar-item>
      <div class="text-center mx-auto">
        <Icon
          icon="hugeicons:radio"
          style="color: #9195a0; padding-bottom: 5px; width: 40px; height: 40px"
        />
        <span class="text-[14px] font-sans">漫游</span>
      </div>
    </van-tabbar-item>

    <van-tabbar-item>
      <div class="text-center mx-auto">
        <Icon
          icon="hugeicons:message-multiple-01"
          style="color: #9195a0; padding-bottom: 5px; width: 40px; height: 40px"
        />
        <span class="text-[14px] font-sans">动态</span>
      </div>
    </van-tabbar-item>

    <van-tabbar-item>
      <div class="text-center mx-auto">
        <Icon
          icon="icon-park-outline:people"
          style="color: #9195a0; padding-bottom: 5px; width: 40px; height: 40px"
        />
        <span class="text-[14px] font-sans">我的</span>
      </div>
    </van-tabbar-item>
  </van-tabbar>
</template>
