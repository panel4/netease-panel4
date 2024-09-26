<template>
  <img :src="userStore.userInfo?.profile.avatarUrl" alt="">
  <div class="overflow-hidden pt-[100px]">
    <MyInput placeholder="请输入手机号" v-model:value="userInfo.phone" /><br />
    <MyInput
      placeholder="请输入密码"
      type="password"
      v-model:value="userInfo.password"
    />
    <MyInput placeholder="请输入验证码" v-model:value="userInfo.captcha" />
    <br />
    <van-button
      @click="sendCode"
      :loading="loading"
      type="success"
      loading-text="发送中"
      >发送验证码</van-button
    >
    <van-button
      @click="userStore.userLogin(userInfo)"
      :loading="loadingLogin"
      type="primary"
      loading-text="登陆中..."
      >登陆</van-button
    >
  </div>
</template>
<script setup>
/* eslint-disable comma-dangle */
import { ref, watch, watchEffect } from "vue";
import MyInput from "@/components/MyInput.vue";
import { sendValidCode } from "@/api";
import { useRequest } from "vue-request";
import { showToast } from "vant";
import { useUserStore } from "@/store";

const userInfo = ref({
  phone: "",
  password: "",
  captcha: "",
});
// 发送验证码
const {
  run: sendCode,
  data: result,
  loading,
} = useRequest(() => sendValidCode({ phone: userInfo.value.phone }), {
  manual: true, // 手动发送请求
});
watch(result, () => {
  if (result.value.data.code !== 200) {
    showToast(result.value.data.message);
  }
});
const userStore = useUserStore();
watchEffect(() => {
  console.log(userStore.userInfo);
});
</script>
