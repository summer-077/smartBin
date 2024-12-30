<template>
  <div id="container"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useMarkersStore } from '@/stores/markersStore';

const markersStore = useMarkersStore();
let map = ref(null);

// 创建标记点并显示信息
function addMarker() {
  if (!markersStore.markers) {
    console.error('markersStore.markers is undefined');
    return;
  }
  console.log('markersStore.markers:', markersStore.markers);
  markersStore.markers.forEach((markerData) => {
    if (!markerData.bins) {
      console.error('markerData.bins is undefined');
      return;
    }

    // 根据 bins 的状态设置背景色和图标
    let popoverBackgroundColor = '';
    let iconImage = '';
    let hasHighTemperature = false;

    // 确定背景色优先级
    const hasFullBin = markerData.bins.some(bin => bin.status === '满');
    const hasHalfFullBin = markerData.bins.some(bin => bin.status === '半满');
    hasHighTemperature = markerData.bins.some(bin => bin.temperature > 60);

    if (hasFullBin) {
      popoverBackgroundColor = '#FF8A80'; // 更柔和的红色
      iconImage = '/src/assets/images/single_err_bin.svg';
    } else if (hasHalfFullBin) {
      popoverBackgroundColor = '#f3d06a'; // 更柔和的黄色
      iconImage = '/src/assets/images/single_warn_bin.svg';
    } else {
      popoverBackgroundColor = 'rgba(29, 78, 216, 0.6)'; // 半透明蓝色
      iconImage = '/src/assets/images/bin.svg';
    }

    // 如果有高温，使用 warning.svg 并添加动画效果
    if (hasHighTemperature) {
      iconImage = '/src/assets/images/warning.svg';
    }

    // 自定义信息窗体内容
    var content = `
      <div class="popover" style="background-color: ${popoverBackgroundColor};z-index: 9999;">
        <div class="popover-title">
          ${markerData.name}
        </div>
   <div class="popover-content">
  <div class="grid-container">
    ${markerData.bins.map(bin => `
      <div class='bin_item'>
        <div>分类：${bin.name}</div>
        <div>温度：${bin.temperature}°C</div>
        <div>湿度：${bin.humidity}%</div>
        <div>状态：${bin.status}</div>
      </div>
    `).join('')}
  </div>
</div>
      </div>`;

    // 创建 infoWindow 实例
    var infoWindow = new AMap.InfoWindow({
      isCustom: true, // 使用自定义窗体
      content: content, // 传入动态拼接的 DOM 元素
      anchor: "top-left",
    });

    // 创建标记
    const marker = new window.AMap.Marker({
      position: new window.AMap.LngLat(markerData.position[0], markerData.position[1]),
      icon: new AMap.Icon({
        size: new AMap.Size(100, 40),
        image: iconImage,
        imageSize: new AMap.Size(40, 40),
      }),
      offset: new AMap.Pixel(-10, -40),
    });

    if (map.value && marker) {
      map.value.add(marker);

      // 设置 hover 事件
      marker.on('mouseover', () => {
        infoWindow.open(map.value, marker.getPosition());
      });

      marker.on('mouseout', () => {
        infoWindow.close();
      });

      // 直接使用marker.on会产生位移的情况，所以我们这里使用自定义事件
      let el = marker.dom.querySelector('.amap-icon img');
      if (el) {
        // 只有当 iconImage 为 warning.svg 时应用动画效果
        if (iconImage === '/src/assets/images/warning.svg') {
          el.style.animation = 'scale-animation 1s infinite';
        }
      }
    }
  });
}

let intervalId = ref(null);
onMounted(() => {
  // 高德地图安全设置
  window._AMapSecurityConfig = {
    securityJsCode: "你的code",
  };

  // 加载高德地图 JavaScript API
  AMapLoader.load({
    key: "你的code", // 申请好的Web端开发者Key
    version: "2.0", // JSAPI 版本
    plugins: ["AMap.Scale"], // 加载的插件
  })
    .then((AMap) => {
      // 初始化地图
      map.value = new AMap.Map("container", {
        viewMode: "3D", // 3D视图
        zoom: 18, // 初始缩放级别
        center: new AMap.LngLat(113.991874, 22.529966), // 设置地图中心点
      });


      // 初始化完成后，添加标记
      addMarker();

      // 每隔10秒钟更新一次垃圾桶状态
      intervalId.value = setInterval(markersStore.updateMarkerStatus, 1000);
    })
    .catch((e) => {
      console.error("AMapLoader 加载失败", e);
    });
});

onUnmounted(() => {
  // 销毁地图实例，释放资源
  map.value?.destroy();
  clearInterval(intervalId.value);
});

// 监听 markers 数据的变化，当 markers 数据变化时重新添加标记
watch(
  () => markersStore.markers,
  () => {
    if (map.value) {
      map.value.clearMap(); // 清除原有的标记
      addMarker(); // 重新添加标记
    }
  },
  { deep: true }
);
</script>

<style lang="less">
#container {
  width: 100%;
  height: 800px; /* 设置容器高度 */
}
// 高德icon默认宽度100修改
.amap-icon {
  overflow: visible !important;
  width: 0 !important;
}
.popover {
  position: absolute;
  border-radius: 10px;
  font-size: 0.2rem;
  color: #fff;
  backdrop-filter: blur(20px); 
  -webkit-backdrop-filter: blur(10px);  
}
.popover-title {
  padding: 12px;
  border-bottom: 1px solid #fff;
}
.popover-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  div {
    padding-top: 5px;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px; /* 设置网格项之间的间距 */
}

.bin_item {
  width: 100px;
  display:flex;
  flex-direction: column;
  align-items: flex-start;
}

/* 添加放大缩小动画 */
.scale-animation {
  animation: scale-animation 1s infinite;
}

@keyframes scale-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
</style>