const router = require('koa-router')()
const Axios = require('axios')
const koaProxy = require('@svenardo/koa-proxy');
const webconfig = require('../../build/webconfig');

router.prefix('/api/datasources')

router.get('/show_datasource_categories', async function (ctx, next) {
    await Axios.get(webconfig.api.url + "/show_datasource_categories")
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

router.post("/upload_file", async ctx => {
    let user_id = ctx.session.user_id
    ctx.body = await koaProxy(ctx, {
        target: webconfig.api.url + "/upload_file?userid=" + user_id + "&",
        changeOrigin: true
    })
})

router.post('/get_files_uploaded', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/get_files_uploaded", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})


router.post('/get_sheet_names', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/get_sheet_names", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.post('/get_file_upload_schema', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/get_file_upload_schema", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.post('/get_file_upload_preview', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/get_file_upload_preview", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.get('/get_data_type_names', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.get(webconfig.api.url + "/get_data_type_names", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.get('/get_time_granularities', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.get(webconfig.api.url + "/get_time_granularities", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.post('/create_dataset', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/create_dataset", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.post('/create_dataset_tag', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/create_dataset_tag", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.post('/get_dataset_tags', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/get_dataset_tags", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.post('/validate_jdbc_connector', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/validate_jdbc_connector", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.post('/get_jdbc_connectors', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/get_jdbc_connectors", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.post('/get_jdbc_tables', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/get_jdbc_tables", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.post('/get_jdbc_table_schema', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/get_jdbc_table_schema", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})

router.post('/get_jdbc_table_preview', function (ctx, next) {
    let data = ctx.request.body;
    data.user_id = ~~ctx.session.user_id;
    return Axios.post(webconfig.api.url + "/get_jdbc_table_preview", data)
        .then(function (response) {
            ctx.body = response.data;
        }).catch(function (error) {
            console.log(error);
            if (webconfig.log_onhtml) {
                ctx.body = error.response.data;
            } else ctx.body = "";
        });
})
module.exports = router