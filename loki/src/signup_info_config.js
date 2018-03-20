import Vue from 'vue';
import Axios from 'axios'
import {
  Button,
  Input,
  Row,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Select,
  Option
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router';
import router from '../routes/vue_router/vrouter_signup_info';
import Index from './views/signup_info.vue';

import Ripple from 'vue-ripple-directive'

Vue.use(VueRouter);
Vue.prototype.$axios = Axios;
//elementui
Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);

Vue.directive('ripple', Ripple);

new Vue({
  el: '#app',
  router, //将路由配置添加到vue实例中
  render: h => h(Index)
});