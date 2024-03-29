import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cesium from 'vite-plugin-cesium'; // 引入插件
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const base = mode === 'development' ? '/' : '/cesium/';
    return {
        plugins: [vue(), cesium()],
        base,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
    };
});
