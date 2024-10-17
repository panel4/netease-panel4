<template>
  <div class="w-[100vw] h-[14vh] flex justify-between items-center p-2">
    <div class="flex-col">
      <van-icon
        name="wap-nav"
        size="23px"
        @click="showLeft = true"
        :action="action"
      />
    </div>
    <div
      class="flex w-[80vw] h-[40px] justify-center items-center bg-[#f7f8fa] rounded-[20px]"
      style="box-shadow: 1px 1px 2px gray"
    >
      <van-search
        v-model="value"
        placeholder="请输入"
        @search="onSearch"
        class="h-[37px] rounded-full"
        background="#f7f8fa"
      />
      <van-icon name="scan" size="23px" />
    </div>
    <div>
      <Icon icon="clarity:microphone-line" width="1.6rem" height="1.6rem" />
    </div>
    <van-popup
      v-model:show="showLeft"
      position="left"
      :style="{ width: '60%', height: '100%' }"
    >
      <!-- 内容写在这里面 -->
      <div class="w-[60vw] h-[100vw] bg-[#f8f9fd]">
        <div></div>
        <div class="">
          <div
            class="w-[50vw] mx-auto h-[40px] bg-[#ffffff] flex flex-row items-center justify-around"
          >
            <div class="flex flex-row items-center">
              <Icon icon="solar:letter-linear" />
              <div class="">免费听VIP歌曲</div>
            </div>
            <div class="">
              <Icon icon="weui:arrow-outlined" />
            </div>
          </div>
        </div>

        <div class="w-[50vw] h-[50vw] bg-[#ffffff] mx-auto">
          <div
            class="w-full h-[40px] flex flex-row items-center justify-around border-b-2"
          >
            <div class="flex flex-row items-center">
              <Icon icon="solar:letter-linear" />
              <div class="pl-[8px]">我的消息</div>
            </div>
            <div class="">
              <Icon icon="weui:arrow-outlined" />
            </div>
          </div>
          <div
            class="w-full h-[40px] flex flex-row items-center justify-around border-b-2"
          >
            <div class="flex flex-row items-center">
              <Icon icon="solar:letter-linear" />
              <div class="pl-[8px]">云贝消息</div>
            </div>
            <div class="">
              <Icon icon="weui:arrow-outlined" />
            </div>
          </div>
          <div
            class="w-full h-[40px] flex flex-row items-center justify-around border-b-2"
          >
            <div class="flex flex-row items-center">
              <Icon icon="mdi:badge-outline" />
              <div class="pl-[8px]">徽章中心</div>
            </div>
            <div class="">
              <Icon icon="weui:arrow-outlined" />
            </div>
          </div>
          <div
            class="w-full h-[40px] flex flex-row items-center justify-around border-b-2"
          >
            <div class="flex flex-row items-center">
              <Icon icon="fluent-emoji-high-contrast:womans-clothes" />
              <div class="pl-[8px]">装扮中心</div>
            </div>
            <div class="">
              <Icon icon="weui:arrow-outlined" />
            </div>
          </div>
          <div
            class="w-full h-[40px] flex flex-row items-center justify-around border-b-2"
          >
            <div class="flex flex-row items-center">
              <Icon icon="ph:lightbulb-filament" />
              <div class="pl-[8px]">创作者中心</div>
            </div>
            <div class="">
              <Icon icon="weui:arrow-outlined" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { ref } from "vue";
import showToast from "vant";
import { Icon } from "@iconify/vue";
const onSelect = (item) => {
  // 默认情况下点击选项时不会自动收起
  // 可以通过 close-on-click-action 属性开启自动收起
  show.value = false;
  showToast(item.name);
};

const value = ref("");
const onSearch = (val) => showToast(val);
const showLeft = ref(false);
const action = [{ name: "sj" }, { name: "sj1" }, { name: "sj2" }];
</script>
<style scoped></style>
