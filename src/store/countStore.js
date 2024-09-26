/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import { defineStore } from "pinia";

// 全局数据需要一个store来承载（已存在store、重新定义）
export const useCountStore = defineStore("count", {
  // 全局的状态是定义在state函数的返回的对象中的
  state() {
    return {
      count: 1,
      ratio: 2, // 比率
      // count1: 是count的平方
    };
  },
  // 定义派生数据
  getters: {
    powCount(state) {
      return state.count ** 2;
    },
  },
  actions: {
    increase() {
      this.count++;
    },
    setValue(value) {
      this.count = value;
    },
  },
  // 开启数据持久化
  persist: {
    // 保存在本地存储中的key
    key: "countStore",
    storage: sessionStorage,
    pick: ["count"],
  },
});
