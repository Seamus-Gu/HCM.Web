<template>
  <div
    class="tag-cloud-container"
    ref="tagCloudRef"
    :style="{ width: '100%', height: `${height}px` }"
    @mousemove="mousemove"
  >
    <span
      class="tag-cloud-item"
      v-for="item in cloudItemList"
      :key="item.key"
      :style="{
        transformOrigin: '50% -50%',
        transform: item.transform,
        opacity: item.opacity,
        filter: item.filter,
        color: item.color,
        zIndex: item.zIndex,
        willChange: 'transform, opacity, filter',
        position: 'absolute',
        top: '50%',
        left: '50%'
      }"
      @click="handleUrl(item.url)"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script>
/**
 * height 标签云高度 unit `px
 * tagList 标签列表 array
 * radius rolling radius, unit `px
 * maxSpeed rolling max speed, optional: `slow`, `normal`(default), `fast`
 * initSpeed rolling init speed, optional: `slow`, `normal`(default), `fast`
 * direction  rolling init direction, unit clockwise `deg`, optional: `0`(top) , `90`(left), `135`(right-bottom)(default)
 * mouseFull mouse move full screen
 */

export default {
  name: 'STagCloud',
  props: {
    api: {
      type: Function,
      required: true
    },
    height: {
      type: String,
      default: '400'
    },
    tagList: {
      type: Array
    },
    radius: {
      type: String,
      default: '200'
    },
    maxSpeed: {
      type: String
    },
    initSpeed: {
      type: String
    },
    direction: {
      type: Number,
      default: 135
    },
    mouseFull: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const getMaxSpeed = name => ({ slow: 0.5, normal: 1, fast: 2 }[name] || 1)
    const getInitSpeed = name =>
      ({ slow: 16, normal: 32, fast: 80 }[name] || 32)

    const tagCloudRef = ref()

    const tagCloudData = reactive({
      cloudItemList: [],
      maxSpeed: getMaxSpeed(props.maxSpeed),
      initSpeed: getInitSpeed(props.initSpeed),
      // 标签云宽度
      width: undefined,
      // rolling depth
      depth: 2 * props.radius,
      // rolling area size with mouse
      size: 1.5 * props.radius,
      // 中心轴位置
      centerX: 0,
      // 鼠标和滚动x轴的初始距离
      mouseX0: 0,
      // 鼠标和滚动y轴的初始距离
      mouseY0: 0,
      // 鼠标X轴坐标
      mouseX: 0,
      // 鼠标Y轴坐标
      mouseY: 0,
      // 是否激活旋转
      isActive: false,
      // 定时器
      interval: undefined
    })

    const methods = reactive({
      // 将字符串转换为颜色值
      stringToColor: str => {
        let hash = 0
        // 计算字符串的哈希值
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash)
        }
        let color = '#'
        for (let i = 0; i < 3; i++) {
          let value = (hash >> (i * 8)) & 0xff
          color += `00${value.toString(16)}`.slice(-2)
        }
        return color
      },
      initTags: async () => {
        await props.api().then(res => {
          tagCloudData.cloudItemList = res.data.items
        })

        let len = tagCloudData.cloudItemList.length
        let i = 0
        tagCloudData.cloudItemList.forEach(item => {
          // 计算 phi 的值(-1~1 的反余弦值)
          let phi = Math.acos(-1 + (2 * i + 1) / len)
          let theta = Math.sqrt(len * Math.PI) * phi
          item.x = (tagCloudData.size * Math.cos(theta) * Math.sin(phi)) / 2
          item.y = (tagCloudData.size * Math.sin(theta) * Math.sin(phi)) / 2
          item.z = (tagCloudData.size * Math.cos(phi)) / 2
          item.color = methods.stringToColor(item.name) || '#333'
          item.zIndex = i
          i++
        })
      },
      init: () => {
        // dom 宽度
        tagCloudData.width = tagCloudRef.value.offsetWidth

        // 中心x轴位置
        tagCloudData.centerX =
          parseInt(tagCloudData.width) / 2 - props.radius / 2

        // 初始化鼠标与滚动中心x轴之间的距离
        tagCloudData.mouseX0 =
          tagCloudData.initSpeed * Math.sin(props.direction * (Math.PI / 180))

        // 初始化鼠标与滚动中心Y轴之间的距离
        tagCloudData.mouseY0 =
          -tagCloudData.initSpeed * Math.cos(props.direction * (Math.PI / 180))

        tagCloudData.mouseX = tagCloudData.mouseX0
        tagCloudData.mouseY = tagCloudData.mouseY0

        tagCloudRef.value.onmouseover = () => {
          tagCloudData.isActive = true
        }
        tagCloudRef.value.onmouseout = () => {
          tagCloudData.isActive = false
        }

        methods.rotate()

        tagCloudData.interval = setInterval(() => {
          // 旋转周期
          methods.rotate()
        }, 10)
      },
      mousemove: event => {
        const rect = tagCloudRef.value.getBoundingClientRect()
        tagCloudData.mouseX = (event.clientX - (rect.left + rect.width / 2)) / 5
        tagCloudData.mouseY = (event.clientY - (rect.top + rect.height / 2)) / 5
      },
      rotate: () => {
        let mathX1 = Math.max(-tagCloudData.mouseX, -tagCloudData.size)
        let mathY1 = Math.max(-tagCloudData.mouseY, -tagCloudData.size)

        const a =
          -(Math.min(mathY1, tagCloudData.size) / props.radius) *
          tagCloudData.maxSpeed
        const b =
          (Math.min(mathX1, tagCloudData.size) / props.radius) *
          tagCloudData.maxSpeed

        if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) return // pause

        // calculate offset
        const l = Math.PI / 180
        const sc = [
          Math.sin(a * l),
          Math.cos(a * l),
          Math.sin(b * l),
          Math.cos(b * l)
        ]

        tagCloudData.cloudItemList.forEach(item => {
          const rx1 = item.x
          const ry1 = item.y * sc[1] + item.z * -sc[0]
          const rz1 = item.y * sc[0] + item.z * sc[1]
          const rx2 = rx1 * sc[3] + rz1 * sc[2]
          const ry2 = ry1
          const rz2 = rz1 * sc[3] - rx1 * sc[2]
          const per = (2 * tagCloudData.depth) / (2 * tagCloudData.depth + rz2) // todo
          item.x = rx2
          item.y = ry2
          item.z = rz2

          item.scale = per.toFixed(3)
          let alpha = per * per - 0.25
          alpha = (alpha > 1 ? 1 : alpha).toFixed(3)
          const left = (item.x - 20 / 2).toFixed(2)
          const top = (item.y - 20 / 2).toFixed(2)

          const transform = `translate3d(${left}px, ${top}px, 0) scale(${item.scale})`
          item.transform = transform
          item.filter = `alpha(opacity=${100 * alpha})`
          item.opacity = alpha
        })
      },
      handleUrl: url => {
        window.open(url)
      }
    })

    onMounted(() => {
      methods.initTags()

      methods.init()
      if (props.mouseFull) {
        window.addEventListener('mousemove', methods.mousemove)
      }
    })

    onUnmounted(() => {
      clearInterval(tagCloudData.interval)
      if (props.mouseFull) {
        window.removeEventListener('mousemove', methods.mousemove)
      }
    })

    return {
      tagCloudRef,
      ...toRefs(tagCloudData),
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss">
// 标签云
.tag-cloud-container {
  position: relative;

  .tag-cloud-item {
    padding: 2px 4px;
    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;
  }

  a {
    color: #fff;
    font-weight: bold;
    text-decoration: none;
    padding: 3px 6px;
    &:hover {
      color: #ff0000;
      letter-spacing: 2px;
    }
  }
}
</style>
