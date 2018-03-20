import placeholder_fix from './placeholder_fix.js';
export default {
    data() {
        const query = this.$route.name;
        let activeName = "login";
        if (query == "signup") {
            activeName = "register";
        }
        return {
            activeName: activeName, //tabs 登录or注册
            ispswlogin: true, //密码登录 or 验证码登录
            loading_msg: false, //验证码
            iscounting: false,
            msgtime: 60,
            check_serverstatus: true, //服务器端验证信息
            check_login_psd: true,
            check_login_msg: true,
            errormsg: "",
            loginform: { //登录表单
                login_phone: "",
                login_password: "",
                login_msg: ""
            },
            regform: { //注册表单
                reg_name: "",
                reg_phone: "",
                reg_password: "",
                reg_msg: ""
            },
            checklogin: { //登录验证
                login_phone: [{
                    validator: this.validator_phone,
                    trigger: "Manual"
                }, {
                    validator: this.validator_login_phone_errormsg,
                    trigger: "Manual"
                }],
                login_password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'Manual'
                }, {
                    validator: this.validator_login_psd_errormsg,
                    trigger: "Manual"
                }],
                login_msg: [{
                    validator: this.validator_login_msg_errormsg,
                    trigger: "Manual"
                }, {
                    required: true,
                    message: '请输入验证码',
                    trigger: 'Manual'
                }]
            },
            checkreg: { //注册验证
                reg_name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'Manual'
                }],
                reg_phone: [{
                    validator: this.validator_phone,
                    trigger: "Manual"
                }, {
                    validator: this.validator_login_msg_errormsg,
                    trigger: "Manual"
                }],
                reg_password: [{
                    required: true,
                    message: '请输入6-16位数字或字母组合',
                    trigger: 'Manual'
                }, {
                    validator: this.validator_password,
                    trigger: "Manual"
                }, {
                    validator: this.validator_login_msg_errormsg,
                    trigger: "Manual"
                }],
                reg_msg: [{
                    validator: this.validator_reg_msg_errormsg,
                    trigger: "Manual"
                }, {
                    required: true,
                    message: '请输入验证码',
                    trigger: 'Manual'
                }]
            }
        }
    },
    methods: {
        //检验密码
        validator_password(rule, value, callback) {
            if (value.length < 6 || value.length > 16 || !/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/.test(value)) {
                callback(new Error('请输入6-16位数字或字母组合'));
            } else {
                callback();
            }
        },
        //检验手机号规则
        validator_phone(rule, value, callback) {
            if (value.length != 11 || !/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) {
                callback(new Error('请输入正确的手机账户'));
            } else {
                callback();
            }
        },
        validator_login_phone_errormsg(rule, value, callback) {
            if (this.check_serverstatus) {
                callback()
            } else {
                callback(new Error(this.errormsg));
            }
        },
        validator_login_psd_errormsg(rule, value, callback) {
            if (this.check_serverstatus) {
                callback()
            } else {
                callback(new Error(this.errormsg));
            }
        },
        validator_login_msg_errormsg(rule, value, callback) {
            if (this.check_serverstatus) {
                callback()
            } else {
                callback(new Error(this.errormsg));
            }
        },
        validator_reg_msg_errormsg(rule, value, callback) {
            if (this.check_serverstatus) {
                callback()
            } else {
                callback(new Error(this.errormsg));
            }
        },
        submitLoginForm() {
            this.$refs.ref_loginform.validate((valid) => {
                if (valid) {
                    if (this.ispswlogin) {
                        this.$axios({
                            method: 'post',
                            url: '/api/users/signin1',
                            data: {
                                phone: parseInt(this.loginform.login_phone),
                                password: this.loginform.login_password
                            }
                        }).then(response => {
                            let data = response.data;
                            if (data.status == "success") {
                                window.location.href = "/base"
                            } else {
                                if (data.msg.indexOf('用户') != -1) {
                                    this.check_serverstatus = false;
                                    this.errormsg = data.msg;
                                    this.$refs.ref_loginform.validateField("login_phone", () => {});
                                    this.check_serverstatus = true;
                                } else {
                                    this.check_serverstatus = false;
                                    this.errormsg = data.msg;
                                    this.$refs.ref_loginform.validateField("login_password", () => {});
                                    this.check_serverstatus = true;
                                }
                            }
                        })
                    } else {
                        this.$axios({
                            method: 'post',
                            url: '/api/users/signin2',
                            data: {
                                phone: parseInt(this.loginform.login_phone),
                                authcode: ~~this.loginform.login_msg
                            }
                        }).then(response => {
                            let data = response.data;
                            if (data.status == "success") {
                                window.location.href = "/base"
                            } else {
                                if (data.msg.indexOf('用户') != -1) {
                                    this.check_serverstatus = false;
                                    this.errormsg = data.msg;
                                    this.$refs.ref_loginform.validateField("login_phone", () => {});
                                    this.check_serverstatus = true;
                                } else {
                                    this.check_serverstatus = false;
                                    this.errormsg = data.msg;
                                    this.$refs.ref_loginform.validateField("login_msg", () => {});
                                    this.check_serverstatus = true;
                                }
                            }
                        })
                    }
                }
            });
            return false;
        },
        submitRegform() {
            this.$refs.ref_regform.validate((valid) => {
                if (valid) {
                    this.$axios({
                        method: 'post',
                        url: '/api/users/signup1',
                        data: {
                            name: this.regform.reg_name,
                            phone: parseInt(this.regform.reg_phone),
                            token: ~~this.regform.reg_msg,
                            password: this.regform.reg_password
                        }
                    }).then(response => {
                        let data = response.data;
                        if (data.status == "success") {
                            window.location.href = "/signup_info"
                        } else {
                            if (data.msg.indexOf('验证码') != -1) {
                                this.check_serverstatus = false;
                                this.errormsg = data.msg;
                                this.$refs.ref_regform.validateField("reg_msg", () => {});
                                this.check_serverstatus = true;
                            } else {
                                this.check_serverstatus = false;
                                this.errormsg = data.msg;
                                this.$refs.ref_regform.validateField("reg_phone", () => {});
                                this.check_serverstatus = true;
                            }
                        }
                    })
                }
            })
            return false;
        },
        msglogin_click() {
            this.ispswlogin = false;
        },
        psdlogin_click() {
            this.ispswlogin = true;
        },
        msg_countdown() {
            if (this.msgtime <= 0) {
                this.iscounting = false;
                this.msgtime = 60;
            } else {
                setTimeout(() => {
                    this.msgtime -= 1;
                    this.msg_countdown();
                }, 1000)
            }
        },
        msg_click(type) {
            this.loading_msg = true;
            let phone;
            let _valid = true;
            if (type == 'signup') {
                this.$refs.ref_regform.validateField("reg_phone", (valid) => {
                    if (valid) {
                        _valid = false;
                    }
                });
                if (!_valid) {
                    this.loading_msg = false;
                    return;
                }
                phone = parseInt(this.regform.reg_phone)
            } else {
                this.$refs.ref_loginform.validateField("login_phone", (valid) => {
                    if (valid) {
                        _valid = false;
                    }
                });
                if (!_valid) {
                    this.loading_msg = false;
                    return;
                }
                phone = parseInt(this.loginform.login_phone)
            }
            this.$axios({
                method: 'post',
                url: '/api/users/authcode',
                data: {
                    phone: phone
                }
            }).then(response => {
                let data = response.data;
                if (data.status == "success") {
                    setTimeout(() => {
                        this.iscounting = true;
                        this.loading_msg = false;
                        this.msg_countdown();
                    }, 1000)
                } else {
                    this.loading_msg = false;
                    if (type == 'signup') {
                        this.check_serverstatus = false;
                        this.errormsg = data.msg;
                        this.$refs.ref_regform.validateField("reg_msg", () => {});
                        this.check_serverstatus = true;
                    } else {
                        this.check_serverstatus = false;
                        this.errormsg = data.msg;
                        this.$refs.ref_loginform.validateField("login_msg", () => {});
                        this.check_serverstatus = true;
                    }
                }
            })
        }
    },
    mounted: function () {
        //fix ie9 placeholder不兼容
        placeholder_fix();
    }
}