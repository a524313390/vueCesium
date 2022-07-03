<script setup lang='ts'>
import { StyleValue } from 'vue';

interface Props {
    name?: string;
    style?: StyleValue,
}
withDefaults(defineProps<Props>(), {
    name: '',
    style: ""
});
</script>
<template>
    <span :class="['iconfont', name]" :style="style"></span>
</template>

<style>
@import url('//at.alicdn.com/t/font_3370538_0ca4n8fiilh8.css');
</style>