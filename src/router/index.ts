import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Layouts from '@/Layouts/index.vue';
import Home from '@/views/Home/index.vue';
import Login from '@/views/Login/index.vue';
import Tiles from '@/views/Shader/Tiles/index.vue';
import FlyLine from '@/views/Shader/FlyLine/index.vue';
import Radir from '@/views/Shader/Radir/index.vue';
import VideoTexture from '@/views/Texture/Video/index.vue';
import VideoTexture1 from '@/views/Texture/Video1/index.vue';
import { BASE_NAME } from '@/constant';
const staticRouter = [{ path: '/login', component: Login }];
export const routes = [
    { path: '/', component: Layouts, meta: { title: '首页', icon: 'icon-home' }, redirect: '/home/index', children: [{ path: '/home/index', component: Home }] },
    {
        path: '/shader',
        component: Layouts,
        meta: { title: '着色器', icon: 'icon-sanweibaimo' },
        redirect: '/shader/index',
        children: [
            { path: '/shader/index', component: Tiles, meta: { titile: '白膜' } },
            { path: '/shader/flyline', component: FlyLine, meta: { titile: '城市飞线' } },
            { path: '/shader/radir', component: Radir, meta: { titile: '雷达扫描' } },
        ],
    },
    {
        path: '/texture',
        component: Layouts,
        meta: { title: '纹理', icon: 'icon-sanweibaimo' },
        redirect: '/shader/video',
        children: [
            { path: '/shader/video', component: VideoTexture, meta: { titile: '视频纹理' } },
            { path: '/shader/video1', component: VideoTexture1, meta: { titile: '视频纹理1' } },
        ],
    },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(BASE_NAME),
    routes: staticRouter.concat(routes), // `routes: routes` 的缩写
});
