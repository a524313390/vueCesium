<script setup lang='ts'>
import { useViewerStore } from '@/store';
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css"
import Viewer from 'cesium/Source/Widgets/Viewer/Viewer';
import { onMounted, Ref, ref } from 'vue';


const domRef = ref<Element | string>('');
onMounted(() => {
   
var esri = new Cesium.ArcGisMapServerImageryProvider({
    url : 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
});
    const viewer = new Cesium.Viewer(domRef.value, {
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        timeline: false,
        navigationHelpButton: false,
        animation: false,
        imageryProvider:esri
    });
    (viewer.cesiumWidget.creditContainer as HTMLDivElement).style.display = "none";
 
    window.viewer=viewer;
    
})
</script>
<template>
    <div ref="domRef" class="vue-wrap" style="width: 100%;height:100%"></div>
</template>

<style  lang="less"  scoped>
</style>