<template>
    <div
      id="map-container"
      class="map-container"
      :style="{
        width: width,
        height: height
      }"
    ></div>
  </template>
  
  <script>
  import AMapLoader from '@amap/amap-jsapi-loader'
  
  export default {
    name: 'SMap',
    emits: ['clickMap'],
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      },
      markerList: {
        type: Array
      },
      hasSatellite: {
        type: Boolean,
        default: false
      },
      hasRoadNet: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    setup(props, context) {
      let map = null
  
      onMounted(() => {
        window._AMapSecurityConfig = {
          securityJsCode: '0e88106c22d6e8973d6c83d470a1b1dc'
        }
        AMapLoader.load({
          key: '0e88106c22d6e8973d6c83d470a1b1dc', // 申请好的Web端开发者Key，首次调用 load 时必填
          version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: ['AMap.Scale', 'AMap.HawkEye'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        })
          .then(AMap => {
            map = new AMap.Map('map-container', {
              // 设置地图容器id
              viewMode: '3D', // 是否为3D地图模式
              zoom: 17, // 初始化地图级别
              center: [114.056236, 22.542538], // 初始化地图中心点位置
              mapStyle: 'amap://styles/macaron' //设置地图的显示样式,
              // layers: [new AMap.TileLayer.Satellite()],//设置图层,可设置成包含一个或多个图层的数组
            })
  
            AMap.plugin('AMap.Scale', function () {
              var scale = new AMap.Scale() // 比例尺控件
              map.addControl(scale) //添加控件
            })
  
            AMap.plugin('AMap.HawkEye', function () {
              var hawkEye = new AMap.HawkEye() // 鹰眼控件
              map.addControl(hawkEye) //添加控件
            })
  
            map.on('click', function (e) {
              const lng = e.lnglat.getLng()
              const lat = e.lnglat.getLat()
              context.emit('clickMap', lng, lat)
            })
  
            if (props.hasSatellite) {
              var satellitelayer = new AMap.TileLayer.Satellite()
              map.add(satellitelayer)
            }
  
            if (props.hasRoadNet) {
              var roadNetlayer = new AMap.TileLayer.RoadNet()
              map.add(roadNetlayer)
            }
  
            if (props.markerList) {
              markerList.forEach(element => {
                var marker = new AMap.Marker({
                  icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                  position: [element.lng, element.lat]
                })
  
                //单独将点标记和矢量圆形添加到地图上
                map.add(marker)
              })
            }
          })
          .catch(e => {
            console.error(e)
          })
      })
  
      onUnmounted(() => {
        map?.destroy()
      })
  
      return {}
    }
  }
  </script>
  
  <style lang="scss" scoped></style>
  