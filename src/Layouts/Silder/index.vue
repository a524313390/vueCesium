<script setup lang='ts'>
import { ref, watch } from 'vue'
import { routes } from '@/router'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const routers=useRoute();
const isCollapse = ref(false)
const defaultActive=ref('');

const handleSelect = (key: string, keyPath: string[]) => {
  
    router.push(key)
}


watch(routers, (current) => {
    
    defaultActive.value=current.path
  /* ... */
},{
    deep:true,
    immediate:true
})
</script>
<template>

    <el-menu :default-active="defaultActive" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff"
        class="el-menu-vertical-demo" :collapse="isCollapse" @select="handleSelect">
        <template v-for="item in routes">
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1" :key="item.path">
                <template #title>
                    <span style="marginRight:20px">
                        <IconFont :name="item.meta.icon" />
                    </span>
                    <span>{{ item.meta.title }}</span>
                </template>
                <template :index="item.path" v-for="citem in  item.children" :key="citem.path">
                    <el-menu-item :index="citem.path" >{{ (citem as any).meta.titile }}
                    </el-menu-item>
                </template>


            </el-sub-menu>
            <template v-else>

                <el-menu-item :index="item.redirect">
                    <span style="marginRight:20px">
                        <IconFont :name="item.meta.icon" />
                    </span>
                    <span>{{ item.meta.title }}</span>
                </el-menu-item>
            </template>
        </template>

    </el-menu>
</template>
<style>
.el-menu-vertical-demo {
    width: 100%;
    height: 100%;
}
</style>