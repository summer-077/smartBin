import { createApp } from 'vue';
import App from './App.vue';
import '../src/assets/styles/index.css';
import { createPinia } from 'pinia';
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
// const app = createApp(App);

// 挂载应用
// app.mount('#app');

// 设置rem适配
(function(doc, win){
  const fn = () => {
    const docEl = doc.documentElement,
      clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    // 根据设计图宽度调整根元素字体大小
    docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
  };
  
  if (!doc.addEventListener) return;
  win.addEventListener('resize', fn);  // 监听窗口大小变化
  doc.addEventListener('DOMContentLoaded', fn);  // 页面加载完成后执行
})(document, window);
