const router = require('koa-router')()
const koaProxy = require('@svenardo/koa-proxy');
const Axios = require('axios')

router.prefix('/api/datasources')

router.get('/show_datasource_categories', function (ctx, next) {
    // ctx.session.view += 1;
    let ret = {
        "status": "success",
        "result": [{
                "label_id": 1,
                "label_name": "文件",
                "datasources": [{
                        "id": 1,
                        "name": "Excel",
                        "alias_name": "Excel"
                    },
                    {
                        "id": 2,
                        "name": "CSV",
                        "alias_name": "CSV"
                    }
                ]
            },
            {
                "label_id": 2,
                "label_name": "传统数据库",
                "datasources": [{
                        "id": 3,
                        "name": "MySQL",
                        "alias_name": "MySQL"
                    },
                    {
                        "id": 4,
                        "name": "PostgreSQL",
                        "alias_name": "PostgreSQL"
                    }
                ]
            },
            {
                "label_id": 3,
                "label_name": "大数据仓库",
                "datasources": [{
                        "id": 5,
                        "name": "SparkSQL",
                        "alias_name": "SparkSQL"
                    },
                    {
                        "id": 6,
                        "name": "Impala",
                        "alias_name": "Impala"
                    },
                    {
                        "id": 7,
                        "name": "Hive",
                        "alias_name": "Hive"
                    }
                ]
            },
            {
                "label_id": 4,
                "label_name": "其他数据源",
                "datasources": [{
                        "id": 8,
                        "name": "微博",
                        "alias_name": "Weibo"
                    },
                    {
                        "id": 9,
                        "name": "微信",
                        "alias_name": "Weixin"
                    },
                    {
                        "id": 10,
                        "name": "百度统计",
                        "alias_name": "BaiduAnalytics"
                    },
                    {
                        "id": 11,
                        "name": "自定义数据源",
                        "alias_name": "UserDefinedDatasource"
                    }
                ]
            }
        ]
    }
    ctx.body = ret;
})

router.post('/upload_file', function (ctx, next) {
    let ret = {
        "status": "success",
        "file_upload_id": 2,
        "sheet_names": ["sheet", "工作表1"],
        "msg": "文件上传成功"
    }
    ctx.body = ret;
})

router.post('/get_files_uploaded', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": [{
            "file_upload_id": 1,
            "filename": "新增订单数据合表（两周数据）new (UTF8).csv"
        }]
    }
    ctx.body = ret;
})

router.post('/get_sheet_names', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": ["sheet", "工作表1"]
    }
    ctx.body = ret;
})

router.post('/get_file_upload_schema', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": [{
                "name": "field1",
                "actual_type": "double",
                "mapping_type": "浮点数",
                "partition": false,
                "time_foramt": "yyyy-MM-dd HH:mm:ss"
            },
            {
                "name": "field2",
                "actual_type": "string",
                "mapping_type": "文本",
                "partition": false,
                "time_foramt": "yyyy-MM-dd HH:mm:ss"
            },
            {
                "name": "field2",
                "actual_type": "date",
                "mapping_type": "时间",
                "partition": false,
                "time_foramt": "yyyy-MM-dd HH:mm:ss"
            }
        ]
    }
    ctx.body = ret;
})

router.post('/get_file_upload_preview', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": [
            [1, 2, 3],
            [1, 2, 3]
        ]
    }
    ctx.body = ret;
})

router.get('/get_data_type_names', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": ["文本", "整数", "定点数", "浮点数", "时间"]
    }
    ctx.body = ret;
})

router.get('/get_time_granularities', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": [{
                "id": 1,
                "name": "秒"
            },
            {
                "id": 2,
                "name": "分钟"
            },
            {
                "id": 3,
                "name": "小时"
            },
            {
                "id": 4,
                "name": "天"
            },
            {
                "id": 5,
                "name": "月"
            },
            {
                "id": 6,
                "name": "年"
            }
        ]
    }
    ctx.body = ret;
})

router.post('/create_dataset', function (ctx, next) {
    let ret = {
        "status": "success",
        "file_upload_dataset_id": 1,
        "msg": "保存成功"
    }
    ctx.body = ret;
})

router.post('/create_dataset_tag', function (ctx, next) {
    let ret = {
        "status": "success",
        "dataset_tag_id": 111
    }
    ctx.body = ret;
})

router.post('/get_dataset_tags', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": [{
                "id": 1,
                "name": "tag1"
            },
            {
                "id": 2,
                "name": "tag2"
            },
            {
                "id": 3,
                "name": "tag3"
            },
        ]
    }
    ctx.body = ret;
})

router.post('/validate_jdbc_connector', function (ctx, next) {
    let ret = {
        "status": "success",
         "connector_id": 111,
         "msg": "连接器验证成功"
    }
    ctx.body = ret;
})

router.post('/get_jdbc_connectors', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": [{
                "jdbc_connector_id": 1,
                "jdbc_connector_name": "mysql-test",
                "addr": "shujike-test-1",
                "port": 10000,
                "dbname": "default",
                "username": "hive",
                "password": "hive"
            },
            {
                "jdbc_connector_id": 2,
                "jdbc_connector_name": "pg-test",
                "addr": "shujike-test-1",
                "port": 5432,
                "dbname": "default",
                "username": "thor",
                "password": "thor"
            }
        ]
    }
    ctx.body = ret;
})


router.post('/get_jdbc_tables', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": ["table1", "table2", "table3"]
    }
    ctx.body = ret;
})

router.post('/get_jdbc_table_schema', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": [  {
            "name": "field1",
            "actual_type": "character varying",
            "mapping_type": "文本",
            "partition": false,
            time_foramt: "yyyy-MM-dd HH:mm:ss",
            time_granularity_id: 1
        },    {
            "name": "field2",
            "actual_type": "bigint",
            "mapping_type": "整数",
            "partition": false,
            time_foramt: "yyyy-MM-dd HH:mm:ss",
            time_granularity_id: 1
        },    {
            "name": "field3",
            "actual_type": "decimal(2,3)",
            "mapping_type": "定点数",
            "partition": false,
            time_foramt: "yyyy-MM-dd HH:mm:ss",
            time_granularity_id: 1
        },    {
            "name": "field4",
            "actual_type": "real",
            "mapping_type": "浮点数",
            "partition": false,
            time_foramt: "yyyy-MM-dd HH:mm:ss",
            time_granularity_id: 1
        },    {
            "name": "field5",
            "actual_type": "bit",
            "mapping_type": "unknown",
            "partition": false,
            time_foramt: "yyyy-MM-dd HH:mm:ss",
            time_granularity_id: 1
        },    {
            "name": "field5",
            "actual_type": "timestamp",
            "mapping_type": "时间",
            "partition": true,
            time_foramt: "yyyy-MM-dd HH:mm:ss",
            time_granularity_id: 1
        },    {
            "name": "field6",
            "actual_type": "string",
            "mapping_type": "文本",
            "partition": true,
            time_foramt: "yyyy-MM-dd HH:mm:ss",
            time_granularity_id: 1
        }]
    }
    ctx.body = ret;
})

router.post('/get_jdbc_table_preview', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": [  
            [1, "天津", "空港商务园"] ,  
            [2, "北京", "绿地中心"]
        ]
    }
    ctx.body = ret;
})

module.exports = router