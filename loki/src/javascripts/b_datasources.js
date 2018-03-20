import imglist from "./configlist_datasources.js"
export default {
    data() {
        return {
            search_value: "",
            clist: {
                f1: [],
                f2: [],
                f3: [],
                f4: []
            },
            datasources_datalist:[],
            imglist: imglist
        }
    },
    methods: {
        getdatasourceslist() {
            this.$axios({
                method: 'get',
                url: '/api/datasources/show_datasource_categories'
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    this.datasources_datalist = data.result;
                    for (let i = 0; i < data.result.length; i++) {
                        let datasources = data.result[i].datasources;
                        for (let j = 0; j < datasources.length; j++) {
                            let _id = datasources[j].id;
                            datasources[j].img = this.imglist[_id] ? this.imglist[_id].imgsrc : null;
                        }
                        this.clist["f" + (i + 1)] = data.result[i].datasources;
                    }
                }
            })
        },
        routetocreate(type) {
            this.$router.push('/datasources/' + type + '/createdataset');
        },
        showconnector(name) {
            if (this.search_value.length > 0) {
                let l_name = name.toLocaleLowerCase();
                let l_sv = this.search_value.toLocaleLowerCase();
                if (l_name.indexOf(l_sv) == -1) {
                    return false;
                }
            }
            return true;
        }
    },
    mounted: function () {
    },
    beforeCreate:function(){
        this.$store.commit('change_showtopbar', true);
        this.$store.commit('change_topbarname', "3");
    },
    created:function(){
        this.getdatasourceslist()
    }
}