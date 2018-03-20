import _list from "./configlist_datasources.js"
import {
    setTimeout
} from "timers";
export default {
    props: ["parent_name", "parent_desc"],
    data() {
        let datasource_id = this.$route.params.datasource_id;
        let dataset_id = this.$route.params.dataset_id;
        let pro_step = "step1";
        let text_name = "";
        let accept = "";
        let text_tip = "";
        let ds_type = "";
        if (_list[datasource_id]) {
            let _item = _list[datasource_id];
            text_name = _item.text;
            if (_item.accept) {
                accept = _item.accept.join(",");
            }
            text_tip = _item.text_tip;
            ds_type = _item.ds_type;
        }
        let percent = 0;
        let connector_obj = {
            my_dataset_obj: this.dataset_obj,
            datasource_id: ~~datasource_id,
            name: "",
            addr: "",
            port: "",
            dbname: "",
            username: "",
            password: ""
        }
        return {
            collapse_item_class1: "",
            collapse_item_class2: "disabled",
            collapse_item_class3: "disabled",
            datasource_id: datasource_id,
            dataset_id: dataset_id,
            pro_step: pro_step,
            ds_type: ds_type,
            testb: '/api/datasources/upload_file',
            limit: 1,
            accept: accept,
            old_file_id: null,
            file_id: null,
            file_list: [],
            connect_status: false,
            connector_obj: {
                datasource_id: ~~datasource_id,
                name: "",
                addr: "",
                port: "",
                dbname: "",
                username: "",
                password: ""
            },
            database_list: [],
            text_name: "点击" + text_name,
            title_text_name: text_name,
            text_tip: text_tip,
            percent: percent,
            uploading: false,
            sheet_list: [],
            sheet_value: "",
            custom_sql: "",
            typelist: [],
            time_granularities: [],
            d_column: [],
            d_tableData: [],
            desc_name: this.parent_name,
            desc_folder: "",
            desc_tags: [],
            desc_text: this.parent_desc,
            dialogVisible: false,
            foldername: "",
            nofile: false,
            tags_list: []
        }
    },
    methods: {
        prevclick(e, step) {
            if (this['collapse_item_class' + step] == "disabled") {
                e.preventDefault();
                e.stopPropagation();
                return
            }
            let ret = this.btnnext("step" + step);
            if (!ret) {
                e.preventDefault();
                e.stopPropagation();
            }
        },
        prevclick_step1(e) {
            this.prevclick(e, 1);
        },
        prevclick_step2(e) {
            this.prevclick(e, 2);
        },
        prevclick_step3(e) {
            this.prevclick(e, 3);
        },
        onprogress() {
            if (!this.nofile) {
                this.nofile = true;
            }
            this.uploading = true;
            let _params = arguments;
            let percent = _params[0].percent.toFixed(2) + "%";
            this.percent = percent;
            this.text_name = "上传进度:" + percent;
        },
        onsuccess(response, file) {
            this.text_name = file.name
            this.uploading = false
            if (response.status == "success") {
                this.file_list.push({
                    file_upload_id: response.file_upload_id,
                    filename: file.name
                })
                if (response.sheet_names) {
                    let _slist = [];
                    let _snames = response.sheet_names;
                    for (let i = 0; i < _snames.length; i++) {
                        _slist.push({
                            label: _snames[i],
                            value: _snames[i]
                        })
                    }
                    this.sheet_list = _slist;
                }
            } else {
                this.$notify.error({
                    title: '错误',
                    message: data.msg
                });
            }
            this.file_id = response.file_upload_id;
            this.collapse_item_class2 = "disabled";
            this.collapse_item_class3 = "disabled";
        },
        beforeupload(file) {
            if (file.size > 100 * 1024 * 1024) {
                this.$notify.error({
                    title: '错误',
                    message: '文件需小于100M'
                });
                return false
            }
        },
        btnnext(step) {
            if (step == this.$refs.collapse.activeNames[0]) {
                return true;
            }
            if (step == "step2" || step == "step3") {
                if (this.ds_type == 1 || this.ds_type == 2) {
                    if (!this.file_id) {
                        this.$notify.error({
                            title: '错误',
                            message: '请选择已有文件或上传新文件'
                        });
                        return false
                    }
                } else if (this.ds_type == 3 || this.ds_type == 4) {
                    if (!this.connect_status) {
                        this.$notify.error({
                            title: '错误',
                            message: '请先通过测试连接'
                        });
                        return false
                    }
                }
            }
            if (step == "step2") {
                this.collapse_item_class1 = "ok"
                this.collapse_item_class2 == "disabled" && (this.collapse_item_class2 = "");
                this.before_step2();
            }
            if (step == "step3") {
                for (let i = 0; i < this.d_column.length; i++) {
                    if (this.d_column[i].format == -1 && this.d_column[i].time_field_info.time_pattern == "") {
                        this.$notify.error({
                            title: '错误',
                            message: '请填写自定义时间格式'
                        });
                        return false;
                    }
                }
                this.collapse_item_class2 = "ok"
                this.collapse_item_class3 == "disabled" && (this.collapse_item_class3 = "");
            }
            this.$refs.collapse.activeNames = [step]
        },
        before_step2() {
            if (this.old_file_id != this.file_id) {
                this.old_file_id = this.file_id;
                this.get_sheet();
            }
        },
        get_sheet(trig, callback) {
            let _url = "";
            let _data = {};
            if (this.ds_type == 1 || this.ds_type == 2) {
                _url = "/api/datasources/get_sheet_names";
                _data = {
                    file_upload_id: ~~this.file_id
                }
            } else if (this.ds_type == 3 || this.ds_type == 4) {
                _url = "/api/datasources/get_jdbc_tables";
                _data = {
                    jdbc_connector_id: ~~this.file_id
                }
            }
            let _this = this;
            this.$axios({
                method: 'post',
                url: _url,
                data: _data
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    let _sheetlist = [];
                    for (let i = 0; i < data.result.length; i++) {
                        _sheetlist.push({
                            label: data.result[i],
                            value: data.result[i]
                        })
                    }
                    _this.sheet_list = _sheetlist;
                    if (!trig) {
                        _this.sheet_value = data.result[0];
                    } else {
                        callback()
                    }
                    _this.get_schema_preview(trig);
                } else {
                    _this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        get_schema_preview(trig) {
            let _obj = {};
            let _url1 = "";
            let _url2 = "";
            if (this.ds_type == 1 || this.ds_type == 2) {
                _url1 = "/api/datasources/get_file_upload_schema";
                _url2 = "/api/datasources/get_file_upload_preview";
                _obj = {
                    "file_upload_id": ~~this.file_id,
                    "sheet_name": this.sheet_value,
                    "with_table_header": true
                }
            } else if (this.ds_type == 3 || this.ds_type == 4) {
                _url1 = "/api/datasources/get_jdbc_table_schema";
                _url2 = "/api/datasources/get_jdbc_table_preview";
                _obj = {
                    "jdbc_connector_id": ~~this.file_id
                }
                if (this.sheet_value == "-1") {
                    if (this.custom_sql != "" && this.validate_sql()) {
                        _obj.custom_sql = this.custom_sql;
                    } else {
                        return;
                    }
                } else {
                    _obj.table_name = this.sheet_value
                }
            }
            let _this = this;
            let loadinginstance = this.$loading.service({
                target: ".step2box",
                spinner: "el-icon-loading"
            })
            if (!trig) {
                this.$axios.all([
                        this.$axios.post(_url1, _obj),
                        this.$axios.post(_url2, _obj)
                    ])
                    .then(this.$axios.spread(function (schemaResp, previewResp) {
                        loadinginstance.close()
                        if (schemaResp.data.status == "success") {
                            let _data = schemaResp.data;
                            for (let i = 0; i < _data.result.length; i++) {
                                _data.result[i].prop = "t" + i;
                                _data.result[i].alias_name = "";
                                _data.result[i].chosen = true;
                                _data.result[i].format = 1;
                                _data.result[i].actual_partition = _data.result[i].partition;
                                _data.result[i].time_field_info = {
                                    "time_pattern": "",
                                    "time_granularity_id": _data.result[i].time_granularity_id
                                };
                            }
                            _this.d_column = _data.result
                        } else {
                            _this.$notify.error({
                                title: '错误',
                                message: schemaResp.data.msg
                            });
                        }
                        if (previewResp.data.status == "success") {
                            let _data = previewResp.data;
                            let _tempdata = [];
                            for (let i = 0; i < _data.result.length; i++) {
                                let _tempitem = {};
                                for (let j = 0; j < _data.result[i].length; j++) {
                                    _tempitem["t" + j] = _data.result[i][j];
                                }
                                _tempdata.push(_tempitem);
                            }
                            _this.d_tableData = _tempdata
                        } else {
                            _this.$notify.error({
                                title: '错误',
                                message: previewResp.data.msg
                            });
                        }
                    }));
            } else {
                this.$axios.all([
                        this.$axios.post(_url2, _obj)
                    ])
                    .then(this.$axios.spread(function (previewResp) {
                        loadinginstance.close()
                        if (previewResp.data.status == "success") {
                            let _data = previewResp.data;
                            let _tempdata = [];
                            for (let i = 0; i < _data.result.length; i++) {
                                let _tempitem = {};
                                for (let j = 0; j < _data.result[i].length; j++) {
                                    _tempitem["t" + j] = _data.result[i][j];
                                }
                                _tempdata.push(_tempitem);
                            }
                            _this.d_tableData = _tempdata
                        } else {
                            _this.$notify.error({
                                title: '错误',
                                message: previewResp.data.msg
                            });
                        }
                    }));
            }
        },
        change_folder() {
            if (this.desc_folder == "-1") {
                this.dialogVisible = true;
            }
        },
        getfilelist() {
            this.$axios({
                method: 'post',
                url: '/api/datasources/get_files_uploaded',
                data: {
                    datasource_id: ~~this.datasource_id
                }
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    this.file_list = data.result
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        gettypelist() {
            this.$axios({
                method: 'get',
                url: '/api/datasources/get_data_type_names'
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    let _tplist = [];
                    for (let i = 0; i < data.result.length; i++) {
                        _tplist.push({
                            label: data.result[i],
                            value: data.result[i]
                        })
                    }
                    this.typelist = _tplist
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        gettagslist() {
            this.$axios({
                method: 'post',
                url: '/api/datasources/get_dataset_tags'
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    this.tags_list = data.result
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        createtag(name) {
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/api/datasources/create_dataset_tag',
                data: {
                    name: name
                }
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    let _id = data.dataset_tag_id;
                    for (let i = 0; i < this.desc_tags.length; i++) {
                        if (typeof (this.desc_tags[i]) == "string" && this.desc_tags[i] == name) {
                            this.tags_list.push({
                                id: _id,
                                name: name
                            })
                            setTimeout(() => {
                                _this.desc_tags.splice(i, 1, _id)
                            }, 0)
                        }
                    }
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        get_time_granularities() {
            this.$axios({
                method: 'get',
                url: '/api/datasources/get_time_granularities'
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    let _tplist = [];
                    for (let i = 0; i < data.result.length; i++) {
                        _tplist.push({
                            label: data.result[i].name,
                            value: data.result[i].id
                        })
                    }
                    this.time_granularities = _tplist
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        file_list_change() {
            if (!this.nofile) {
                this.nofile = true;
            }
            let _tempname = "";
            let _list = this.file_list;
            for (let i = 0; i < _list.length; i++) {
                if (_list[i].file_upload_id == this.file_id) {
                    _tempname = _list[i].filename;
                    break;
                }
            }
            this.text_name = _tempname;
            this.collapse_item_class2 = "disabled";
            this.collapse_item_class3 = "disabled";
        },
        tagchange(tagvalue) {
            let _this = this;
            for (let i = 0; i < tagvalue.length; i++) {
                if (typeof (tagvalue[i]) == "string") {
                    this.createtag(tagvalue[i]);
                }
            }
        },
        validate_sql() {
            if (!this.custom_sql) {
                return fasle;
            }
            if (this.custom_sql.toLocaleLowerCase().indexOf('update ') == 0 ||
                this.custom_sql.toLocaleLowerCase().indexOf('delete ') == 0 ||
                this.custom_sql.toLocaleLowerCase().indexOf('insert ') == 0 ||
                this.custom_sql.toLocaleLowerCase().indexOf(' update ') != -1 ||
                this.custom_sql.toLocaleLowerCase().indexOf(' delete ') != -1 ||
                this.custom_sql.toLocaleLowerCase().indexOf(' insert ') != -1) {
                this.$notify.error({
                    title: '错误',
                    message: "自定义sql只能使用select语句"
                });
                return false;
            } else {
                return true;
            }
        },
        dataset_save() {
            if (!this.desc_name) {
                this.$notify.error({
                    title: '错误',
                    message: "请填写工作表名称"
                });
                return;
            }
            let _obj
            if (this.ds_type == 1 || this.ds_type == 2) {
                _obj = {
                    datasource_id: ~~this.ds_type,
                    file_upload_id: this.file_id,
                    with_table_header: true,
                    sheet_name: this.sheet_value,
                    name: this.desc_name
                };
            } else if (this.ds_type == 3 || this.ds_type == 4) {
                _obj = {
                    datasource_id: ~~this.ds_type,
                    jdbc_connector_id: this.file_id,
                    name: this.desc_name
                };
                if (this.sheet_value == '-1') {
                    if (this.custom_sql == "") {
                        this.$notify.error({
                            title: '错误',
                            message: "请填写自定义sql"
                        });
                        return;
                    } else if (!this.validate_sql()) {
                        return;
                    } else {
                        _obj.custom_sql = this.custom_sql;
                    }
                } else {
                    _obj.table_name = this.sheet_value;
                }
            }

            if (this.desc_folder) {
                _obj.dataset_directory_id = this.desc_folder
            }
            if (this.desc_tags.length) {
                _obj.tag_ids = this.desc_tags
            }
            if (this.desc_text) {
                _obj.description = this.desc_text
            }
            let _fields_info = JSON.parse(JSON.stringify(this.d_column));
            for (let i = 0; i < _fields_info.length; i++) {
                if (_fields_info[i].alias_name == "") {
                    _fields_info[i].alias_name = _fields_info[i].name
                }
                if (_fields_info[i].mapping_type != "时间") {
                    delete _fields_info[i].time_field_info
                } else {
                    if (_fields_info[i].format == -1 && _fields_info[i].time_field_info.time_pattern) {
                        this.$notify.error({
                            title: '错误',
                            message: "请填写时间格式"
                        });
                        return;
                    } else if (_fields_info[i].format == 1) {
                        _fields_info[i].time_field_info.time_pattern = _fields_info[i].time_format
                    }
                }
            }
            _obj.fields_info = _fields_info;
            //console.log(_obj);
            let _url = '/api/datasources/create_dataset';
            if (this.dataset_id) {
                _url = '/api/datasets/update_dataset';
                _obj.dataset_id = ~~this.dataset_id
            }
            this.$axios({
                method: 'post',
                url: _url,
                data: _obj
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    this.$notify({
                        title: '成功',
                        message: data.msg,
                        type: 'success'
                    });
                    if (!this.dataset_id) {
                        this.$router.push('/datasets');
                    }
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        validate_jdbc_connector() {
            if (this.file_id == null) {
                this.$notify.error({
                    title: '错误',
                    message: "请选择连接"
                });
                return;
            }
            if (this.connector_obj.name == "" ||
                this.connector_obj.addr == "" ||
                this.connector_obj.port == "" ||
                this.connector_obj.dbname == "" ||
                this.connector_obj.username == "") {
                this.$notify.error({
                    title: '错误',
                    message: "请填写完整的连接信息"
                });
                return;
            }
            let _obj = JSON.parse(JSON.stringify(this.connector_obj));
            if (this.file_id) {
                _obj.file_id = ~~this.file_id
            }
            _obj.port = ~~_obj.port;
            let _tempobj = {};
            if (this.file_id > 0) {
                _obj.jdbc_connector_id = ~~this.file_id;
            }else{
                _tempobj= {
                    addr: this.connector_obj.addr,
                    dbname: this.connector_obj.name,
                    jdbc_connector_name: this.connector_obj.username,
                    password: this.connector_obj.password,
                    port: this.connector_obj.port,
                    username: this.connector_obj.dbname
                }
            }
            this.$axios({
                method: 'post',
                url: '/api/datasources/validate_jdbc_connector',
                data: _obj
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    this.connect_status = true;
                    if (data.jdbc_connector_id) {
                        _tempobj.jdbc_connector_id = data.jdbc_connector_id;
                        this.database_list.push(_tempobj);
                        this.file_id = data.jdbc_connector_id;
                    }
                    this.$notify({
                        title: '成功',
                        message: data.msg,
                        type: 'success'
                    });
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        get_jdbc_connectors() {
            this.$axios({
                method: 'post',
                url: '/api/datasources/get_jdbc_connectors',
                data: {
                    datasource_id: ~~this.datasource_id
                }
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    this.database_list = data.result;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        change_connector() {
            let _id = this.file_id;
            if (_id == "-1") {
                this.connector_obj.name = "";
                this.connector_obj.addr = "";
                this.connector_obj.port = "";
                this.connector_obj.dbname = "";
                this.connector_obj.username = "";
                this.connector_obj.password = "";
            } else {
                for (let i = 0; i < this.database_list.length; i++) {
                    if (this.database_list[i].jdbc_connector_id == _id) {
                        let _dobj = this.database_list[i];
                        this.connector_obj.name = _dobj.jdbc_connector_name;
                        this.connector_obj.addr = _dobj.addr;
                        this.connector_obj.port = _dobj.port;
                        this.connector_obj.dbname = _dobj.dbname;
                        this.connector_obj.username = _dobj.username;
                        this.connector_obj.password = _dobj.password;
                    }
                }
            }
        },
        runsql() {
            if (!this.custom_sql || this.custom_sql == "") {
                this.$notify.error({
                    title: '错误',
                    message: "请填写自定义sql"
                });
                return
            }
            this.get_schema_preview();
        },
        change_sheet() {
            this.get_schema_preview();
        },
        show_dataset() {
            if (!this.dataset_id) {
                return;
            }
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/api/datasets/show_dataset',
                data: {
                    datasource_id: ~~this.datasource_id,
                    dataset_id: ~~this.dataset_id
                }
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    _this.datasetdata_handle(data.result);
                } else {
                    _this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        datasetdata_handle(data) {

            this.collapse_item_class1 = "ok";
            this.collapse_item_class2 = "ok";
            this.collapse_item_class3 = "ok";

            if (this.ds_type == 1 || this.ds_type == 2) {
                this.file_id = data.file_upload_id
                this.old_file_id = data.file_upload_id
            } else if (this.ds_type == 3 || this.ds_type == 4) {
                this.file_id = data.jdbc_connector_id
                this.old_file_id = data.jdbc_connector_id
            }
            this.change_connector();

            this.desc_name = data.name;
            data.dataset_directory_id && (this.desc_folder = data.dataset_directory_id);
            data.tag_ids && (this.desc_tags = data.tag_ids);
            this.desc_text = data.description;

            this.get_sheet(true, () => {
                let _data = data.fields_info;
                for (let i = 0; i < _data.length; i++) {
                    if (!_data[i].time_field_info) {
                        _data[i].time_field_info = {
                            "time_pattern": "",
                            "time_granularity_id": 1
                        };
                    }
                }
                this.d_column = _data;
                if (this.ds_type == 1 || this.ds_type == 2) {
                    this.sheet_value = data.sheet_name;
                } else if (this.ds_type == 3 || this.ds_type == 4) {
                    this.connect_status = true
                    this.custom_sql = data.custom_sql
                    this.sheet_value = data.table_name
                }
            })
        },
    },
    created: function () {
        if (this.ds_type == 1 || this.ds_type == 2) {
            this.getfilelist(); //获取已上传文件列表
        } else if (this.ds_type == 3 || this.ds_type == 4) {
            this.get_jdbc_connectors(); //获取已上传文件列表
        }
        this.gettypelist(); //获取类型列表
        this.gettagslist(); //获取tag
        this.get_time_granularities(); //获取时间粒度列表
        if (this.dataset_id) {
            this.show_dataset();
        }
    },
    watch: {
        parent_name(val) {
            if (this.dataset_id) {
                this.desc_name = val;
            }
        },
        parent_desc(val) {
            if (this.dataset_id) {
                this.desc_text = val;
            }
        },
        desc_text(val) {
            if (this.dataset_id) {
                this.$emit("on-desc-change", val);
            }
        },
        desc_name(val) {
            if (this.dataset_id) {
                this.$emit("on-name-change", val);
            }
        }
    }

}