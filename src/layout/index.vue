// src/layout/index.vue
<template>
  <div class="layout">
    <Header>景区智能垃圾桶平台</Header>
    <div class="layout-content">
      <div class="layout-content-left">
        <Panel :panelTitle="`满溢状态`">
          <div class="bin">
            <div class="bin-status">
              <img src='@/assets/images/danger_bin.svg' alt="logo" />
              已满速清：{{ fullCount }}
            </div>
            <div class="bin-status">
              <img src='@/assets/images/warn_bin.svg' alt="logo" />
              半满待查：{{ halfFullCount }}</div>
            <div class="bin-status">
              <img src='@/assets/images/safe_bin.svg' alt="logo" />
              少载可续：{{ emptyCount }}</div>
          </div>
        </Panel>
        <Panel :panelTitle="`温湿度状态`">
          <Table :markers="markers"></Table> <!-- 传递 markers 数据 -->
        </Panel>
      </div>
      <div class="layout-content-right">
        <Panel>
          <LineCharts></LineCharts>
        </Panel>
        <Panel class="pie-chart-panel">
          <PieChart></PieChart>
        </Panel>
      </div>
      <Sence></Sence>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import Header from './Header.vue';
import Sence from '@/components/Sence.vue';
import Panel from '@/components/Panel/index.vue';
import LineCharts from '@/components/Charts/LineChart.vue';
import PieChart from '@/components/Charts/PieChart.vue';
import Table from '@/components/table/table.vue';
import { useMarkersStore } from '@/stores/markersStore';
import { computed } from 'vue';

const markersStore = useMarkersStore();

const fullCount = computed(() => markersStore.fullCount);
const halfFullCount = computed(() => markersStore.halfFullCount);
const emptyCount = computed(() => markersStore.emptyCount);
const markers = computed(() => markersStore.markers); // 获取 markers 数据
</script>

<style scoped lang="less">
.layout {
  width: 100vw;
  height: 100vh;
}

.layout-content {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}

.layout-content-left {
  position: absolute;
  left: 0.3rem;
  top: 70px;
  width: 30vw;
}

.layout-content-right {
  position: absolute;
  right: 0.6rem;
  top: 70px;
  width: 30vw;
}

.panel {
  margin-bottom: 0.2rem;
}

.bin {
  display: flex;
  flex-direction: row;

  .bin-status {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 0.1rem;

    img {
      margin-right: 0.1rem;
      width: 0.5rem;
    }
  }
}

.pie-chart-panel {
  height: 40vh;
}
</style>