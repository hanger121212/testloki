const router = require('koa-router')()
const koaProxy = require('@svenardo/koa-proxy');
const Axios = require('axios')

router.prefix('/api/datasets')

router.post('/show_datasets', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": [{
            "dataset_id": 1,
            "datasource_id": 1,
            "dataset_name": "文件数据集1",
            "create_user": "张三",
            "update_user": "李四",
            "record_num": 100,
            "column_num": 3,
            "chart_num": 99,
            "update_time": "2018-01-01 11:11:11",
            "fields_info": [{
                    "name": "int_field",
                    "alias_name": "整型字段",
                    "actual_type": "integer",
                    "mapping_type": "整数",
                    "partition": false,
                    "actual_partition": false,
                    "chosen": true,
                    "time_format": "yyyy-MM-dd HH24:MI:SS"
                },
                {
                    "name": "decimal_field",
                    "alias_name": "定点数字段1",
                    "actual_type": "numeric",
                    "mapping_type": "定点数",
                    "partition": false,
                    "actual_partition": false,
                    "chosen": true,
                    "time_format": "yyyy-MM-dd HH24:MI:SS"
                },
                {
                    "name": "timestamp_field",
                    "alias_name": "时间戳字段",
                    "actual_type": "timestamp",
                    "mapping_type": "时间",
                    "partition": false,
                    "actual_partition": false,
                    "time_field_info": {
                        "time_pattern": "yyyy-MM-dd HH24:MI:SS",
                        "time_granularity_id": 1
                    },
                    "chosen": true,
                    "time_format": "yyyy-MM-dd HH24:MI:SS"
                }
            ]
        }, {
            "dataset_id": 2,
            "datasource_id": 3,
            "dataset_name": "文件数据集1",
            "create_user": "张三",
            "update_user": "李四",
            "record_num": 100,
            "column_num": 3,
            "chart_num": 99,
            "update_time": "2018-01-01 11:11:11",
            "fields_info": [{
                    "name": "int_field",
                    "alias_name": "整型字段",
                    "actual_type": "integer",
                    "mapping_type": "整数",
                    "partition": false,
                    "actual_partition": false,
                    "chosen": true,
                    "time_format": "yyyy-MM-dd HH24:MI:SS"
                },
                {
                    "name": "decimal_field",
                    "alias_name": "定点数字段1",
                    "actual_type": "numeric",
                    "mapping_type": "定点数",
                    "partition": false,
                    "actual_partition": false,
                    "chosen": true,
                    "time_format": "yyyy-MM-dd HH24:MI:SS"
                },
                {
                    "name": "timestamp_field",
                    "alias_name": "时间戳字段",
                    "actual_type": "timestamp",
                    "mapping_type": "时间",
                    "partition": false,
                    "actual_partition": false,
                    "time_field_info": {
                        "time_pattern": "yyyy-MM-dd HH24:MI:SS",
                        "time_granularity_id": 1
                    },
                    "chosen": true,
                    "time_format": "yyyy-MM-dd HH24:MI:SS"
                }
            ]
        }]
    }
    ctx.body = ret;
})

router.post('/delete_dataset', function (ctx, next) {
    let ret = {
        "status": "success",
         "msg": "删除成功"
    }
    ctx.body = ret;
})

router.post('/show_dataset', function (ctx, next) {
    let ret = {
        "status": "success",
        "result": {
            "jdbc_connector_id": 1,
            "name": "pg工作表",
            "fields_info": [{
                    "name": "int_field",
                    "alias_name": "整型字段",
                    "actual_type": "integer",
                    "mapping_type": "整数",
                    "partition": false,
                    "actual_partition": false,
                    "chosen": true,
                    "time_format": "yyyy-MM-dd HH24:MI:SS"
                },
                {
                    "name": "decimal_field",
                    "alias_name": "定点数字段1",
                    "actual_type": "numeric",
                    "mapping_type": "定点数",
                    "partition": false,
                    "actual_partition": false,
                    "chosen": true,
                    "time_format": "yyyy-MM-dd HH24:MI:SS"
                },
                {
                    "name": "timestamp_field",
                    "alias_name": "时间戳字段",
                    "actual_type": "timestamp",
                    "mapping_type": "时间",
                    "partition": false,
                    "actual_partition": false,
                    "time_field_info": {
                        "time_pattern": "yyyy-MM-dd HH24:MI:SS",
                        "time_granularity_id": 1
                    },
                    "chosen": true,
                    "time_format": "yyyy-MM-dd HH24:MI:SS"
                }
            ],
            "column_num": 3,
            "record_num": 100,
            "custom_sql": null,
            "dataset_directory_id": 1,
            "description": "这是一个描述",
            "tag_ids": [1, 2, 3],
            "create_user": "张三",
            "table_name":"table1",
            "update_user": "李四",
            "cached": false
        }
    }
    ctx.body = ret;
})

router.post('/update_dataset', function (ctx, next) {
    let ret = {
        "status": "success",
        "msg": "更新成功"
      }
    ctx.body = ret;
})

module.exports = router