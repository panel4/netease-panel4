/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    return { userInfo }
  },
  {
    persist: true
  }
)
