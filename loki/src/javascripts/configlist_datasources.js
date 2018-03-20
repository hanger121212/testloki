export default {
    1: {
        imgsrc: require('../images/datasources/excel.png'),
        imgsrc_m: require('../images/datasources/excel_m.png'),
        text: "上传Excel文件",
        title: "Excel",
        accept: [".xlsx", ".xls"],
        text_tip: "*只能上传xlsx/xls文件,支持文件最大为:100MB",
        ds_type: 1
    },
    2: {
        imgsrc: require('../images/datasources/csv.png'),
        imgsrc_m: require('../images/datasources/csv_m.png'),
        text: "上传CSV文件",
        title: "CSV",
        accept: [".csv"],
        text_tip: "*只能上传csv文件,支持文件最大为:100MB",
        ds_type: 2
    },
    3: {
        imgsrc: require('../images/datasources/mysql.png'),
        imgsrc_m: require('../images/datasources/mysql_m.png'),
        text: "连接MySQL",
        title: "MySQL",
        ds_type: 3
    },
    4: {
        imgsrc: require('../images/datasources/postgresql.png'),
        imgsrc_m: require('../images/datasources/postgresql_m.png'),
        text: "连接PostgreSQL",
        title: "PostgreSQL",
        ds_type: 3
    },
    5: {
        imgsrc: require('../images/datasources/sparksql.png'),
        imgsrc_m: require('../images/datasources/sparksql_m.png'),
        text: "连接SparkSQL",
        title: "SparkSQL",
        ds_type: 4
    },
    6: {
        imgsrc: require('../images/datasources/impala.png'),
        imgsrc_m: require('../images/datasources/impala_m.png'),
        text: "连接Impala",
        title: "Impala",
        ds_type: 4
    },
    7: {
        imgsrc: require('../images/datasources/hive.png'),
        imgsrc_m: require('../images/datasources/hive_m.png'),
        text: "连接Hive",
        title: "Hive",
        ds_type: 4
    },
    10: {
        imgsrc: require('../images/datasources/baiduanalytics.png'),
        imgsrc_m: require('../images/datasources/baiduanalytics_m.png'),
        title: "百度统计",
        ds_type: 5
    }
}