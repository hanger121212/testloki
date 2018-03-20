import Vue from 'vue';
import Axios from 'axios'
import {
  Button,
  Input,
  Row,
  Tabs,
  TabPane,
  Form,
  FormItem
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router';
import router from '../routes/vue_router/vrouter_index';
import Index from './views/index.vue';
import './images/symbolist.svg';

import Ripple from 'vue-ripple-directive'

Vue.use(VueRouter);
Vue.prototype.$axios = Axios;
//Vue.use(ElementUI);
//elementui
Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);

Vue.directive('ripple', Ripple);

new Vue({
  el: '#app',
  router, //将路由配置添加到vue实例中
  render: h => h(Index)
});