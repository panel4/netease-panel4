export default [
    {
        path:'/player',
        component:() => import('@/views/Player/index.vue'),
        meta:{
            title:'播放器',
            keepAlive:true
        }
    }
];
