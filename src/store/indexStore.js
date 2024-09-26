/* eslint-disable import/prefer-default-export */
import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", {
  state() {
    return {
      index: 0,
    };
  },
});
