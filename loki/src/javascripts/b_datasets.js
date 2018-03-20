import _list from "./configlist_datasources.js"
export default {
    data() {
        return {
            dslist: _list,
            delete_dataset_name: "",
            delete_dataset_id: "",
            delete_datasource_id: "",
            ds_list: [],
            dialogVisible: false,
            c_type: "",
            c_user: "",
            c_sort: ""
        }
    },
    methods: {
        control_change(args, show) {
            if (args[0]) {
                show.showcontrol = true
            } else {
                show.showcontrol = false
            }
        },
        get_datasets_list() {
            this.$axios({
                method: 'post',
                url: '/api/datasets/show_datasets'
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    for (let i = 0; i < data.result.length; i++) {
                        data.result[i].showcontrol = false; //处理标签样式
                    }
                    this.ds_list = data.result;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
            })
        },
        dataset_delete_dialog(dataset_id, datasource_id, _name) {
            this.delete_dataset_name = _name;
            this.delete_dataset_id = dataset_id;
            this.delete_datasource_id = datasource_id;
            this.dialogVisible = true;
        },
        dataset_edit(dataset_id, datasource_id) {
            this.$router.push('/dataset/detail/' + dataset_id + '/' + datasource_id);
        },
        dataset_delete() {
            let _obj = {
                "datasource_id": ~~this.delete_datasource_id,
                "dataset_id": ~~this.delete_dataset_id
            }
            this.$axios({
                method: 'post',
                url: '/api/datasets/delete_dataset',
                data: _obj
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    for (let i = 0; i < this.ds_list.length; i++) {
                        if (this.ds_list[i].dataset_id == this.delete_dataset_id) {
                            this.ds_list.splice(i, 1);
                            break;
                        }
                    }
                    this.dialogVisible = false;
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
        create_dataset(){
            this.$router.push('/dataset/editchart');
        }
    },
    created: function () {
        this.get_datasets_list();
    },
    beforeCreate: function () {
        this.$store.commit('change_showtopbar', true);
        this.$store.commit('change_topbarname', "2");
    }
}