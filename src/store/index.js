import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export * from "./countStore";
export * from "./indexStore";
export * from "./userStore";
export default pinia;

// 数据持久化 就是把内存中的数据 固化 到硬盘上（localStorage）的过程
