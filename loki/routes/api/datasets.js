const router = require('koa-router')()
const Axios = require('axios')
const koaProxy = require('@svenardo/koa-proxy');
const webconfig = require('../../build/webconfig');

router.prefix('/api/datasets')

router.post('/show_datasets', async function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    await Axios.post(webconfig.api.url + "/show_datasets", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
    return;
})

router.post('/delete_dataset', async function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    await Axios.post(webconfig.api.url + "/delete_dataset", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
    return;
})

router.post('/show_dataset', async function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    await Axios.post(webconfig.api.url + "/show_dataset", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
    return;
})

router.post('/update_dataset', async function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    await Axios.post(webconfig.api.url + "/update_dataset", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
    return;
})
module.exports = router