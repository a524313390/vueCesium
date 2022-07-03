<script setup lang='ts'>
import Silder from './Silder/index.vue';

</script>
<template>
    <div class="Layouts">
        <div class="silder">
            <Silder />
        </div>
        <div class="content">
            <div class="header">头部</div>
            <div class="router-wrap">
                <router-view />
            </div>
        </div>
    </div>
</template>
<style  lang="less"  scoped>
@import url('./index.less');
</style>