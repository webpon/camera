import { createApp } from 'vue'
import App from './App.vue'

import { Image as VanImage } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

const app = createApp(App);
app.use(VanImage);


app.mount('#app')
