import * as Cesium from 'cesium'
class PolylineFlowMaterialProperty {
  constructor(options) {
    options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT)
    this._definitionChanged = new Cesium.Event()
    this._color = void 0
    this._speed = void 0
    this._percent = void 0
    this._gradient = void 0
    this._colorSubscription = void 0
    this.color = options.color
    this.speed = options.speed
    this.percent = options.percent
    this.gradient = options.gradient
    this._time = performance.now()
  }
}

Object.defineProperties(PolylineFlowMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return (
        Cesium.Property.isConstant(this._color) &&
        Cesium.Property.isConstant(this._speed) &&
        Cesium.Property.isConstant(this._percent) &&
        Cesium.Property.isConstant(this._gradient)
      )
    },
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged
    },
  },
  color: Cesium.createPropertyDescriptor('color'),
  speed: Cesium.createPropertyDescriptor('speed'),
  percent: Cesium.createPropertyDescriptor('percent'),
  gradient: Cesium.createPropertyDescriptor('gradient'),
})

PolylineFlowMaterialProperty.prototype.getType = function (time) {
  return 'PolylineFlow'
  //return Cesium.Material.PolylineFlowType;
}

PolylineFlowMaterialProperty.prototype.getValue = function (time, result) {
  Cesium.defined(result) || (result = {})
  result.color = Cesium.Property.getValueOrClonedDefault(
    this._color,
    time,
    Cesium.Color.CYAN,
    result.color
  )
  result.percent = Cesium.Property.getValueOrDefault(
    this._percent,
    time,
    0.1,
    result.percent
  )
  result.gradient = Cesium.Property.getValueOrDefault(
    this._gradient,
    time,
    0.01,
    result.gradient
  )
  result.speed = Cesium.Property.getValueOrDefault(
    this._speed,
    time,
    1,
    result.speed
  )
  result.time = ((performance.now() - this._time) % this._speed) / this._speed
  return result
}

PolylineFlowMaterialProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof PolylineFlowMaterialProperty &&
      Cesium.Property.equals(this._color, other._color) &&
      Cesium.Property.equals(this._speed, other._speed) &&
      Cesium.Property.equals(this._gradient, other._gradient) &&
      Cesium.Property.equals(this._percent, other._percent))
  )
}

Cesium.Material.PolylineFlowType = 'PolylineFlow'
Cesium.Material.PolylineFlowSource = `
        uniform vec4 color;
        uniform float speed;
        uniform float percent;
        uniform float gradient;

        czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        float t =fract(czm_frameNumber * speed / 1000.0);
        t *= (1.0 + percent);
        float alpha = smoothstep(t- percent, t, st.s) * step(-t, -st.s);
        alpha += gradient;
        material.diffuse = color.rgb;
        material.alpha = alpha;
        return material;
        }
`
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineFlowType, {
  fabric: {
    type: Cesium.Material.PolylineFlowType,
    uniforms: {
      color: Cesium.Color.CYAN,
      speed: 1,
      gradient: 0.01,
      percent: 0.1,
      time: 0,
    },
    source: Cesium.Material.PolylineFlowSource,
  },
  translucent: !0,
})

// window.PolylineFlowMaterialProperty = PolylineFlowMaterialProperty
