<template>
  <div>
    <RouterView class="w-[100vw] h-[50vw]" />
    <div
      class="border text-red-600 text-[30px]"
      @click="countStore.setValue(1234)"
    >
      在APP组件中，count：{{ countStore.count }}
    </div>
    <div class="border text-green-300 text-[30px]">
      {{ countStore.powCount }}
    </div>
    <img :src="userStore.userInfo?.profile.avatarUrl" alt="" />
  </div>
</template>
<script setup>
import { watchEffect } from "vue";
import { showDialog } from "vant";
// import "vant/lib/dialog/index.css";
import { useCountStore, useUserStore } from "@/store";
import { useNetworkStatus } from "./hooks";

const countStore = useCountStore();
const userStore = useUserStore();

const isOnLine = useNetworkStatus();
watchEffect(() => {
  if (!isOnLine.value) {
    showDialog({
      message: "网络似乎失去了连接！",
      theme: "round-button",
    });
  }
});
</script>
