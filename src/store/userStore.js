/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { defineStore } from "pinia";
import to from "await-to-js";
import { loginByPhone } from "@/api";
// 在组件外通过直接导入router实例
// 在组件内部通过useRouter访问
import router from "@/router";

// 组件中获取Store中的数据 可以直接使用useXXX
// 组件外获取数据？
export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: null,
    };
  },
  getters: {
    cookie(state) {
      return state.userInfo?.cookie;
    },
  },
  actions: {
    async userLogin(data) {
      const [err, res] = await to(loginByPhone(data));
      if (res) {
        // 将用户的数据保存在userStore中 全局可用
        this.userInfo = res.data;
        // router.replace("/");
      }
    },
  },
  persist: true,
});
