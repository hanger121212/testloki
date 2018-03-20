import _list from "./configlist_datasources.js"
import b_datasources_process from "../views/b_datasources_process.vue"
export default {
    data() {
        let _name = this.$route.params.datasource_id;
        let showprocess = false;
        let imgsrc = null;
        let text = "";
        if (_list[_name]) {
            showprocess = true;
            imgsrc = _list[_name].imgsrc_m;
            text = _list[_name].text
        }
        return {
            showprocess: showprocess,
            imgsrc: imgsrc,
            text: text
        }
    },
    components:{
        b_datasources_process : b_datasources_process
    },
    methods: {},
    beforeCreate:function(){
        this.$store.commit('change_showtopbar', true);
        this.$store.commit('change_topbarname', "3");
    }
}