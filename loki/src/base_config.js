import Vue from 'vue';
import Vuex from 'vuex'
import Axios from 'axios'
import {
    Button,
    Input,
    Row,
    Tabs,
    TabPane,
    Form,
    FormItem,
    Menu,
    MenuItem,
    Collapse,
    CollapseItem,
    Upload,
    Select,
    Option,
    Table,
    TableColumn,
    Checkbox,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Message,
    Notification,
    Loading,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router';
import router from '../routes/vue_router/vrouter_base';
import Index from './views/base.vue';
import './images/symbolist_base.svg';
import ECharts from 'vue-echarts'

import Ripple from 'vue-ripple-directive'

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.prototype.$axios = Axios;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading;
//Vue.use(ElementUI);
//elementui
Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Upload);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.component('chart', ECharts)

Vue.directive('ripple', Ripple);

const store = new Vuex.Store({
    state: {
        showtopbar:{
            value:true
        },
        topbarname:{
            value:""
        }
    },
    mutations: {
        change_showtopbar(state, trig) {
            state.showtopbar.value = trig
        },
        change_topbarname(state, name) {
            state.topbarname.value = name
        }
    }
})

new Vue({
    el: '#app',
    router, //将路由配置添加到vue实例中
    render: h => h(Index),
    store
});