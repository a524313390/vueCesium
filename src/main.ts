import { router } from './router/index';
import { createApp } from 'vue';
import App from './App.vue';
import 'element-plus/dist/index.css';
import '@/assets/css/index.less';
import ElementPlus from 'element-plus';
import IconFont from '@/components/IconFont/index.vue';
import store from './store';

const app = createApp(App);

app.component('IconFont', IconFont);
app.use(store)
app.use(ElementPlus);
app.use(router);
app.mount('#app');
