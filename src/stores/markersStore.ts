// src/stores/markersStore.ts
import { defineStore } from 'pinia';
import axios from '@/axios/index';

export const useMarkersStore = defineStore('markers', {
  state: () => ({
    markers: [
      {
        id: 1, // 添加 id 属性
        name: '垃圾点1',
        position: [113.991552, 22.530008],
        bins: [
          {
            id: 1,
            name: '可回收',
            temperature: 10,
            humidity: 50,
            status: '空',
          },
          {
            id: 2,
            name: '厨余',
            temperature: 22,
            humidity: 45,
            status: '空',
          },
          {
            id: 3,
            name: '有害',
            temperature: 50,
            humidity: 60,
            status: '空',
          },
          {
            id: 4,
            name: '其他',
            temperature: 21,
            humidity: 40,
            status: '空',
          },
        ],
      },
      {
        id: 2, // 添加 id 属性
        name: '垃圾点2',
        position: [113.991112, 22.530242],
        bins: [
          {
            id: 5,
            name: '可回收',
            temperature: 22,
            humidity: 45,
            status: '空',
          },
          {
            id: 6,
            name: '厨余',
            temperature: 20,
            humidity: 50,
            status: '空',
          },
          {
            id: 7,
            name: '有害',
            temperature: 21,
            humidity: 40,
            status: '空',
          },
          {
            id: 8,
            name: '其他',
            temperature: 23,
            humidity: 50,
            status: '满',
          },
        ],
      },
      {
        id: 3, // 添加 id 属性
        name: '垃圾点3',
        position: [113.991933, 22.53005],
        bins: [
          {
            id: 9,
            name: '可回收',
            temperature: 50,
            humidity: 60,
            status: '空',
          },
          {
            id: 10,
            name: '厨余',
            temperature: 21,
            humidity: 40,
            status: '空',
          },
          {
            id: 11,
            name: '有害',
            temperature: 23,
            humidity: 50,
            status: '空',
          },
          {
            id: 12,
            name: '其他',
            temperature: 18,
            humidity: 55,
            status: '满',
          },
        ],
      },
      {
        id: 4, // 添加 id 属性
        name: '垃圾点4',
        position: [113.991869, 22.52989],
        bins: [
          {
            id: 13,
            name: '可回收',
            temperature: 21,
            humidity: 40,
            status: '空',
          },
          {
            id: 14,
            name: '厨余',
            temperature: 23,
            humidity: 50,
            status: '空',
          },
          {
            id: 15,
            name: '有害',
            temperature: 18,
            humidity: 55,
            status: '空',
          },
          {
            id: 16,
            name: '其他',
            temperature: 20,
            humidity: 50,
            status: '空',
          },
        ],
      },
      {
        id: 5, // 添加 id 属性
        name: '垃圾点5',
        position: [113.992162, 22.530004],
        bins: [
          {
            id: 17,
            name: '可回收',
            temperature: 20,
            humidity: 50,
            status: '空',
          },
          {
            id: 18,
            name: '厨余',
            temperature: 18,
            humidity: 55,
            status: '空',
          },
          {
            id: 19,
            name: '有害',
            temperature: 20,
            humidity: 50,
            status: '空',
          },
          {
            id: 20,
            name: '其他',
            temperature: 21,
            humidity: 40,
            status: '空',
          },
        ],
      },
      {
        id: 6, // 添加 id 属性
        name: '垃圾点6',
        position: [113.991778, 22.529465],
        bins: [
          {
            id: 21,
            name: '可回收',
            temperature: 18,
            humidity: 55,
            status: '空',
          },
          {
            id: 22,
            name: '厨余',
            temperature: 20,
            humidity: 50,
            status: '空',
          },
          {
            id: 23,
            name: '有害',
            temperature: 21,
            humidity: 40,
            status: '半满',
          },
          {
            id: 24,
            name: '其他',
            temperature: 23,
            humidity: 50,
            status: '满',
          },
        ],
      },
    ],
  }),
  actions: {
    async fetchMarkers() {
      try {
        const response = await axios.get('/api/markers'); // 使用代理路径
        this.markers = response.data;
      } catch (error) {
        console.error('获取垃圾点数据失败', error);
      }
    },
    async updateMarkerStatus() {
      try {
        const response = await axios.get('/api/markers'); // 使用代理路径
        const updatedBins = response.data;
        this.updateBins(updatedBins);
      } catch (error) {
        console.error('更新垃圾桶状态失败', error);
      }
    },
    updateBins(updatedBins: Array<{ id: number; name: string; longitude: number; latitude: number; temperature: string; humidity: string; status: string }>) {
      updatedBins.forEach(updatedBin => {
        this.markers.forEach(marker => {
          marker.bins.forEach(bin => {
            if (bin.id === updatedBin.id) {
              bin.temperature = parseFloat(updatedBin.temperature);
              bin.humidity = parseFloat(updatedBin.humidity.replace('%', ''));
              bin.status = updatedBin.status === 'active' ? '满' : '空';
            }
          });
        });
      });
    },
    getFullCount() {
      return this.markers.reduce((count, marker) => {
        return count + marker.bins.filter(bin => bin.status === '满').length;
      }, 0);
    },
    getHalfFullCount() {
      return this.markers.reduce((count, marker) => {
        return count + marker.bins.filter(bin => bin.status === '半满').length;
      }, 0);
    },
    getEmptyCount() {
      return this.markers.reduce((count, marker) => {
        return count + marker.bins.filter(bin => bin.status !== '满' && bin.status !== '半满').length;
      }, 0);
    },
  },
  getters: {
    fullCount: (state) => state.getFullCount(),
    halfFullCount: (state) => state.getHalfFullCount(),
    emptyCount: (state) => state.getEmptyCount(),
  },
});