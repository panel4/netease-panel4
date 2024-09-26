<template>
  <!-- <Menu :menu="menu" /> -->
  <!-- BlockType 功能就是根据我传入的数据 对数据进行处理 并选择合适的组件渲染  -->
  <BlockType v-for="item in pageData" :data="item" :key="item.blockCode" />
  <div ref="element" class="w-[100px] h-[100px] bg-red-500">
    需要被全屏展示的元素
    <div @click="toggleFullscreen">
      <Icon
        v-if="isFullscreen"
        icon="ic:round-close-fullscreen"
        style="color: #ffffff"
      />
      <Icon v-else icon="mdi:fullscreen" style="color: #ffffff" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { getHomePageData } from "@/api";
import BlockType from "@/views/Home/children/BlockType.vue";
import { useFullscreen } from "@/hooks";
import { useRequest } from "vue-request";

const element = ref(null);
const { isFullscreen, toggleFullscreen } = useFullscreen(element);
// 请求自动发送 请求不带参数
const { data: pageData } = useRequest(getHomePageData);
</script>
<style scoped>
.filter {
  filter: url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27><filter id=%27colorize%27><feColorMatrix type=%27matrix%27 values=%271 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0%27/></filter></svg>#colorize");
}
</style>
