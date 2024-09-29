export default [
  {
    path: '/home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/player',
    component: () => import('@/views/Player/index.vue'),
    meta: {
      title: '播放器',
      keepAlive: true
    }
  },
  {
    path: "/coll",
    component: () => import("@/views/songs/PlaylistColl.vue"),
  },
]
