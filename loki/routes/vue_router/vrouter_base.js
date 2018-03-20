import Vue from 'vue'
import Router from 'vue-router'

//vue-router懒加载
const dashboards = () =>
    import ('../../src/views/b_dashboards.vue');
const datasets = () =>
    import ('../../src/views/b_datasets.vue');
const datasources = () =>
    import ('../../src/views/b_datasources.vue');
const datasources_create = () =>
    import ('../../src/views/b_datasources_create.vue');
const datasources_csv = () =>
    import ('../../src/views/b_datasources_csv.vue');
const dataset_detail = () =>
    import ('../../src/views/b_dataset_detail.vue');
const dataset_chartedit = () =>
    import ('../../src/views/b_chartedit.vue');

//创建 router 实例
const router = new Router({
    mode: 'history',
    base: "/base/",
    routes: [{
        path: '/',
        redirect: '/datasources'
    }, {
        name: "dashboards",
        path: '/dashboards',
        component: dashboards
    }, {
        name: "datasets",
        path: '/datasets',
        component: datasets
    }, {
        name: "chartedit",
        path: '/dataset/chartedit',
        component: dataset_chartedit
    }, {
        name: "datasources",
        path: '/datasources',
        component: datasources
    }, {
        name: "datasources_create",
        path: '/datasources/:datasource_id/createdataset',
        component: datasources_create,
    }, {
        name: "dataset_detail",
        path: '/dataset/detail/:dataset_id/:datasource_id',
        component: dataset_detail
    }, {
        path: '*',
        redirect: '/'
    }]
})


export default router;