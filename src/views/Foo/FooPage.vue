<template>
  <div
    @click="toggleFullscreen"
    ref="divRef"
    class="w-100vw h-[100vw] bg-blue-500"
  >
    <h1>x: {{ x }}</h1>
    <h1>y: {{ y }}</h1>
    <van-button @click.stop="run">手动触发请求</van-button>
  </div>
  <van-tag type="danger" @click="countStore.increase">{{
    countStore.count
  }}</van-tag>
  <van-tag type="primary">{{ indexStore.index }}</van-tag>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { useFullscreen, useMousePosition, useHttp } from "@/hooks";
import { getHomePageMenu } from "@/api";
// eslint-disable-next-line import/no-cycle
import { useCountStore, useIndexStore } from "@/store";

const countStore = useCountStore();
const indexStore = useIndexStore();
// 复用逻辑 组合函数(函数名、参数、返回值)
// element参数是需要被全屏状态的元素
const divRef = ref(null);
const { toggleFullscreen } = useFullscreen(divRef);
const { x, y } = useMousePosition();
// eslint-disable-next-line object-curly-newline
const { loading, data, error, run } = useHttp(getHomePageMenu, {
  manual: true,
  transformData(res) {
    return res.data.data;
  },
});
watchEffect(() => {
  console.log(loading.value, data.value, error.value);
});
// true, undefined, undefined
// false, {}, undefined
</script>
