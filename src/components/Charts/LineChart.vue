<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script setup lang="ts" name="LineCharts">
import * as echarts from 'echarts';
import { ref, type Ref, onMounted } from 'vue';
import { useChart } from '@/hooks/useChart';

type EChartsOption = echarts.EChartsOption;

const chartRef: Ref = ref(null);
const { setOptions } = useChart(chartRef);
let option: EChartsOption;

onMounted(() => {
  init();
});

const init = () => {
  option = {
    color: ['#91cc75', '#fac858', '#ee6666', '#5470c6'],
    title: {
      text: '周垃圾量',
      textStyle: {
        color: '#fff',
        fontSize: '0.3rem',
      },
      top: '20px', // 调整标题位置以避免与图例重叠
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['可回收垃圾', '厨余垃圾', '有害垃圾', '其他垃圾'],
      top: '22%', // 图例位置设置为顶部
      left: 'center', // 图例水平居中
      icon:'rect',
      // orient: 'horizontal', // 图例方向为横向
      // itemGap: 40, // 调整图例项之间的间距
      // itemWidth: 20, // 设置每个图例项的宽度
      textStyle: {
        color: '#fff', // 图例文字颜色
        fontSize: '12px',
      },
    },
    textStyle: {
      fontSize: '0.2rem',
      color: '#fff',
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '35%', // 调整顶部留白以适应图例和标题
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '可回收垃圾',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          color: '#91cc75',
        },
        emphasis: {
          focus: 'series',
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: '厨余垃圾',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          color: '#fac858',
        },
        emphasis: {
          focus: 'series',
        },
        data: [320, 132, 201, 334, 190, 130, 220],
      },
      {
        name: '有害垃圾',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          color: '#ee6666',
        },
        emphasis: {
          focus: 'series',
        },
        data: [220, 402, 231, 134, 190, 230, 120],
      },
      {
        name: '其他垃圾',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top',
        },
        areaStyle: {
          opacity: 1,
          color: '#5470c6',
        },
        emphasis: {
          focus: 'series',
        },
        data: [220, 302, 181, 234, 210, 290, 150],
      },
    ],
  };
  setOptions(option);
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 40vh;
}
</style>