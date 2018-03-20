export default {
    data() {
        return {
            activeIndex: this.$store.state.topbarname,
            user_name: "",
            message: "",
            showtopbar: this.$store.state.showtopbar
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            switch (key) {
                case "1":
                    this.$router.push('/dashboards');
                    break;
                case "2":
                    this.$router.push('/datasets');
                    break;
                case "3":
                    this.$router.push('/datasources');
                    break;
            }
        },
        getuserinfo() {
            this.$axios({
                method: 'get',
                url: '/api/users/userinfo'
            }).then(response => {
                let data = response.data;
                this.user_name = data.user_name;
            })
        }
    },
    mounted: function () {
        this.getuserinfo();
    }
}