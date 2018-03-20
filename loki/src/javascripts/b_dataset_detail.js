import _list from "./configlist_datasources.js"
import b_datasources_process from "../views/b_datasources_process.vue"
import b_chartlist from "../views/b_chartlist.vue"
export default {
    data() {
        let datasource_id = this.$route.params.datasource_id;
        return {
            isedittext: false,
            logosrc: _list[datasource_id].imgsrc,
            activeName: "f1",
            title: "",
            desc: ""
        }
    },
    components: {
        b_datasources_process: b_datasources_process,
        b_chartlist: b_chartlist
    },
    methods: {
        edittext(trig) {
            this.isedittext = trig;
        },
        on_name_change(val) {
            this.title = val
        },
        on_desc_change(val) {
            this.desc = val
        },
        create_chart(){
            this.$router.push('/dataset/chartedit');
        }
    },
    beforeCreate: function () {
        this.$store.commit('change_showtopbar', true);
        this.$store.commit('change_topbarname', "2");
    }
}