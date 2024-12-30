<template>
  <div class="scroll-container">
    <div class="header">
      <div class="header-item">垃圾点-分类垃圾箱</div>
      <div class="header-item">温度</div>
      <div class="header-item">湿度</div>
    </div>
    <vue3-seamless-scroll :step='0.5' :hover="true" :list="list" class="scroll">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-temperature">{{ item.temperature }}°C</div>
        <div class="item-humidity">{{ item.humidity }}%</div>
      </div>
    </vue3-seamless-scroll>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { useMarkersStore } from "@/stores/markersStore";

const markersStore = useMarkersStore();
const list = ref([]);

onMounted(() => {
  updateList();
});

const updateList = () => {
  list.value = markersStore.markers.flatMap(marker =>
    marker.bins.map(bin => ({
      title: `${marker.name} - ${bin.name}`,
      temperature: bin.temperature,
      humidity: bin.humidity,
    }))
  );
};

// 如果需要定期更新数据，可以使用 setInterval
// setInterval(() => {
//   markersStore.updateMarkerStatus();
//   updateList();
// }, 5000); // 每5秒更新一次数据
</script>

<style>
.scroll-container {
  width: 100%;
  /* margin: 100px auto; */
  position: relative;
}

.header {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 修改为 flex-start */
  padding: 3px 0;
  position: sticky;
  top: 0;
  z-index: 1;
}

.header-item {
  flex: 1;
  text-align: left; /* 修改为 left 对齐 */
}

.header-item:first-child {
  flex: 2; /* 增加“垃圾点-分类垃圾箱”这一列的宽度占比 */
}

.scroll {
  height: 350px;
  width: 100%;
  overflow: hidden;
  margin-top: 5px; /* 确保滚动内容不与表头重叠 */
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 修改为 flex-start */
  padding: 3px 0;
  border-bottom: 1px solid #eee;
  height: 50px;
}

.scroll .item div {
  flex: 1;
  text-align: left; /* 修改为 left 对齐 */
}

.scroll .item .item-title {
  flex: 2; /* 增加“垃圾点-分类垃圾箱”这一列的宽度占比 */
}
</style>