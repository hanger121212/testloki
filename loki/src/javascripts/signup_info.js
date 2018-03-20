import placeholder_fix from './placeholder_fix.js';
export default {
    data() {
        return {
            check_serverstatus: true,
            errormsg: "",
            joblist: [],
            signup_info: { //登录表单
                company: "",
                job: "",
                email: ""
            },
            checkinfo: { //登录验证
                email: [{
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'Manual'
                }, {
                    type: 'email',
                    message: '请输入正确的邮箱',
                    trigger: "Manual"
                }],
                company: [{
                    required: true,
                    message: '请输入公司名称',
                    trigger: 'Manual'
                }],
                job: [{
                    required: true,
                    message: '请选择职位',
                    trigger: 'Manual'
                }]
            }
        }
    },
    methods: {
        submitinfo() {
            this.$refs.ref_signup_info.validate((valid) => {
                if (valid) {
                    this.$axios({
                        method: 'post',
                        url: '/api/users/signup2',
                        data: {
                            company: this.signup_info.company,
                            occupation_id: ~~this.signup_info.job,
                            email: this.signup_info.email
                        }
                    }).then(response => {
                        let data = response.data;
                        if (data.status == "success") {
                            window.location.href = "/base"
                        } else {
                            this.check_serverstatus = false;
                            this.errormsg = data.msg;
                            this.$refs.ref_signup_info.validateField("email", () => {});
                            this.check_serverstatus = true;
                        }
                    })
                }
            });
            return false
        },
        getjoblist() {
            this.$axios({
                method: 'get',
                url: '/api/users/occupations'
            }).then(response => {
                if(response.data.status == "success"){
                    let data = response.data.result;
                    this.joblist = data;
                }
            })
        }
    },
    mounted: function () {
        //fix ie9 placeholder不兼容
        placeholder_fix();
        this.getjoblist();
    }
}