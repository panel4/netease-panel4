import { createWebHistory, createRouter } from "vue-router";
import localforage from "localforage";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 只有登陆页可以不需要权限访问 其他任何页面都必须先登陆再访问
  if (!to.fullPath.startsWith("/login")) {
    localforage
      .getItem("userInfo")
      .then(({ cookie }) => {
        if (cookie) {
          next();
        } else {
          next(`/login?originPath=${to.fullPath}`);
        }
      })
      .catch(() => {
        next(`/login?originPath=${to.fullPath}`);
      });
  } else {
    next();
  }
});

// 刚开始我访问C页面
// 没有登陆状态
// 路由到登陆页
// 完成登陆 C

export default router;
