import * as turf from '@turf/turf'
import { Viewer } from 'cesium';
import * as Cesium from 'cesium';
export const addLines = (viewer: Viewer) => {
    var points = turf.randomPoint(1000, { bbox: [120.20767356458816, 31.554624594176644, 120.97882134673013, 31.13762719229192] })
    points.features.forEach(feature => {
        const coordinates = feature.geometry.coordinates;
        const surfacePosition = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], 0);
        const heightPosition = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], 5000 * Math.random());
        addFlyintLineByPrimitive([surfacePosition, heightPosition]);
        // addFlyingLineByEntity([surfacePosition, heightPosition]);
    })
    function addFlyintLineByPrimitive(positions: any) {
        // primitive方式添加
        const primitive = new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: new Cesium.PolylineGeometry({
                    positions: positions,
                    width: 1.0,
                    vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
                })
            }),
            appearance: new Cesium.PolylineMaterialAppearance({
                material: Cesium.Material.fromType((Cesium as any).Material.PolylineFlowType, {
                    speed: 30 * Math.random(),
                    color: Cesium.Color.CYAN,
                    percent: 0.1,
                    gradient: 0.01
                }),
            })
        });
        viewer.scene.primitives.add(primitive);
    };
}