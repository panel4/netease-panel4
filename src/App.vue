<template>
  <div class="w-[100px] h-[100px] bg-red-600 rounded-[50px]"></div>
  <div class="flex items-center justify-between">
    <div class="flex-1 text-center leading-[50px] bg-[#123456]">1</div>
    <div class="flex-1 text-center leading-[50px] bg-[#654321]">2</div>
    <div class="flex-1 text-center leading-[50px] bg-[#098765]">3</div>
  </div>
  <div
    class="bg-gradient-to-r from-[#128945] to-[#d90b07] h-16 font-bold text-white"
  >
    线性渐变
  </div>
  <Icon icon="gridicons:bug" style="color: red; font-size: 100px" />
  <Icon icon="gridicons:time" style="color: green; font-size: 100px" />
  <Icon
    icon="bitcoin-icons:brush-filled"
    style="color: #3171f2; font-size: 100px"
  />
  <Icon icon="noto:lollipop" style="font-size: 300px" />
</template>
<script setup>
import { Icon } from "@iconify/vue";
</script>
