export default {
    data() {
        return {
            test: "1"
        }
    },
    methods: {},
    beforeCreate:function(){
        this.$store.commit('change_showtopbar', false);
        this.$store.commit('change_topbarname', "1");
    }

}