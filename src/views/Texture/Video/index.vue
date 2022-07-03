<script setup lang='ts'>
import * as turf from '@turf/turf'
import { onMounted } from 'vue';
import * as Cesium from 'cesium';
import CesiumBox from '@/components/CesiumBox/index.vue'
import { Viewer } from 'cesium';
import '@/plugins/PolylineFlowMaterialProperty.js'
import { AddRadarScanPostStage } from '@/plugins/radir';
import { add3DTiles } from '@/plugins/add3DTiles';
import { addLines } from '@/plugins/addLines';
import { TILES_URL } from '@/constant';






//初始化旋转角度
let rotation = Cesium.Math.toRadians(90);
const getRotationValue = () => {
    rotation += 0.09;
    return rotation;
}

//绘制雷达扫描的圆圈与四分之一的渐变半圆
const drawRadarCanvas = () => {
    let canvas = document.createElement("canvas");
    canvas.width = 300
    canvas.height = 300
    let context = canvas.getContext('2d');
    if (!context) return;
    //绘制圆
    context.lineWidth = 1;
    context.strokeStyle = "red";
    //绘制圆
    context.arc(150, 150, 140, 0, 360, false);
    context.stroke();
    //封闭新路径
    context.closePath();
    //绘制渐变半圆
    let grd = context.createLinearGradient(175, 100, canvas.width, 150);
    grd.addColorStop(0, "rgba(255,0,0,0)");
    grd.addColorStop(1, "rgba(255,0,0,0.8)");
    context.fillStyle = grd;
    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 140, -90 / 180 * Math.PI, 0 / 180 * Math.PI);
    context.fill();
    return canvas;
}
//绘制三维场景的雷达扫描
const addRadarScaning = (viewer: Cesium.Viewer) => {
    const lon = 120.61821146589226;
    const lat = 31.33757865065701;

    const position = Cesium.Cartesian3.fromDegrees(lon, lat,);
    //绘制雷达扫描的canvas
    let radarCanvas = drawRadarCanvas();
    //绘制雷达扫描的三维场景的实体
    let entity = viewer.entities.add({
        position,
        name: "ellipse",
        ellipse: {//绘制圆或者椭圆
            semiMinorAxis: 3000.0,//短半轴,注意短半轴如果比长半轴短就是椭圆
            semiMajorAxis: 3000.0,//长半轴,注意长半轴如果比短半轴短就会报错
            material: new Cesium.ImageMaterialProperty({
                image: radarCanvas,
                transparent: true
            }),
            fill: true,
            outline: true,
            outlineColor: Cesium.Color.GREEN,
            outlineWidth: 10,
            //绘制动态的旋转
            rotation: new Cesium.CallbackProperty(getRotationValue, false),
            stRotation: new Cesium.CallbackProperty(getRotationValue, false)
        },
    });
    viewer.flyTo(entity)
}
const drawCanvas1 = () => {
    let canvas = document.createElement("canvas");
    canvas.width = 300
    canvas.height = 300
    let context = canvas.getContext('2d');
    if (!context) return;
    if (!canvas) return;
    let grd = context.createLinearGradient(175, 100, canvas.width, 150);
    grd.addColorStop(0, "rgba(0,255,0,0)");
    grd.addColorStop(1, "rgba(0,255,0,1)");
    context.fillStyle = grd;
    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 140, -90 / 180 * Math.PI, 0 / 180 * Math.PI);//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    context.fill();
    return canvas;
}
const addRadarScaning1 = (viewer: Cesium.Viewer) => {
    const lon = 120.67010955028967;
    const lat = 31.32115060744205;

    const position = Cesium.Cartesian3.fromDegrees(lon, lat,);
    //绘制雷达扫描的canvas
    let radarCanvas = drawRadarCanvas();
    //绘制雷达扫描的三维场景的实体
    let entity = viewer.entities.add({
        position,
        name: "ellipse",
        ellipse: {//绘制圆或者椭圆
            semiMinorAxis: 3000.0,//短半轴,注意短半轴如果比长半轴短就是椭圆
            semiMajorAxis: 3000.0,//长半轴,注意长半轴如果比短半轴短就会报错
            material: new Cesium.ImageMaterialProperty({
                image: drawCanvas1(),
                transparent: true
            }),
            fill: true,
            outline: true,
            outlineColor: Cesium.Color.GREEN,
            outlineWidth: 10,
            //绘制动态的旋转
            rotation: new Cesium.CallbackProperty(getRotationValue, false),
            stRotation: new Cesium.CallbackProperty(getRotationValue, false)
        },
    });
}


const createVideo = (viewer: Cesium.Viewer) => {

    // let  videoElement=document.createElement('div');
    // videoElement.loop=true;
    // videoElement.autoplay=true;
    // videoElement.src='https://cesium.com/public/SandcastleSampleData/big-buck-bunny_trailer.mp4'
    // videoElement.type="video/mp4";
    var videoElement = document.getElementById("trailer");
    let planyEntity = new Cesium.PlaneGraphics({
        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0),//指定平面的法线和距离  UNIT_Z代表方向，X,Y,Z,一般Z即可
        // plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0),//指定平面的法线和距离  UNIT_Z代表方向，X,Y,Z,一般Z即可
        // plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Y, 0),//指定平面的法线和距离  UNIT_Z代表方向，X,Y,Z,一般Z即可
        dimensions: new Cesium.Cartesian2(300, 400),//指定宽度和高度
        material: videoElement as any,

    })

    let plane = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(120.59708196457579, 31.29284332689935,0),//经纬度转笛卡尔
        plane: planyEntity
    })
}
onMounted(() => {
    let { viewer } = window;


    if (viewer) {
        let { viewer } = window;

        add3DTiles(TILES_URL, window.viewer)
        addLines(viewer);


        addRadarScaning(viewer);
        addRadarScaning1(viewer);

        createVideo(viewer);
        let handle = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
        handle.setInputAction((event) => {
            var earthPosition = viewer.camera.pickEllipsoid(event.position, viewer.scene.globe.ellipsoid);
            var cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            var height = cartographic.height;
            console.log("[Lng=>" + lng + ",Lat=>" + lat + ",H=>" + height + "]");

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)



    }

})
</script>
<template>
    <CesiumBox />
    <video id="trailer" style="display: none;" autoplay="true" loop crossorigin controls>
        <source src="https://cesium.com/public/SandcastleSampleData/big-buck-bunny_trailer.mp4" type="video/mp4">
        Your browser does not support the <code>video</code> element.
    </video>
</template>