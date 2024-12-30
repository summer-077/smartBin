<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script setup lang="ts" name="PieCharts">
import { useChart } from '@/hooks/useChart';
import type { EChartsOption } from 'echarts';
import { ref, type Ref, onMounted } from 'vue';

const chartRef: Ref = ref(null);
const { setOptions } = useChart(chartRef);
let option: EChartsOption;

onMounted(() => {
  init();
});

const init = () => {
  option = {
    title: {
      text: '总垃圾量中四类垃圾占比',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: '0.3rem',
      },
      top: '10px',
    },
    tooltip: {
      trigger: 'item',
      textStyle: {
        fontSize: '0.2rem',
      },
      formatter: (params) => {
        return `${params.name}: ${params.value} (${params.percent}%)`;
      },
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '其他垃圾' },
          { value: 735, name: '可回收垃圾' },
          { value: 580, name: '厨余垃圾' },
          { value: 484, name: '有害垃圾' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          color: '#fff',
          // fontWeight: 'bold',
        },
        labelLine: {
          show: true,
        },
      },
    ],
    textStyle: {
      fontSize: '0.2rem',
      color: '#fff',
    },
  };

  setOptions(option);
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 37vh;
  display: flex;
  align-items: center;
}
</style>