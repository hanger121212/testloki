<template lang="pug">
    el-row#page_index
        el-row.header
            el-row
                a.logo(href="http://www.shujike.com")
                    img(src="../images/logo.png")
                h1 新一代智能分析平台
        el-row.main
            el-tabs(v-model="activeName" type="card")
                el-tab-pane(label="登录" name="login")
                    el-form.loginform(:model="loginform" ref="ref_loginform" :rules="checklogin" @submit.native.prevent="submitLoginForm" show-message=false)
                        el-form-item.iptgroup(prop="login_phone" show-message=false)
                            el-input(v-model="loginform.login_phone" placeholder="您的手机号")
                            svg.icon
                                use(xlink:href="#symbolist_icon_account")

                        el-row
                            el-form-item.iptgroup(prop="login_password" v-if="ispswlogin")
                                el-input(v-model="loginform.login_password" placeholder="登录密码" type="password")
                                svg.icon
                                    use(xlink:href="#symbolist_icon_password")

                        el-row
                            el-form-item.iptgroup(prop="login_msg" v-if="!ispswlogin")
                                el-row.regmsgbox
                                    el-input.regmsg(v-model="loginform.login_msg" placeholder="登录验证码")
                                    svg.icon
                                        use(xlink:href="#symbolist_icon_msg")
                                el-button.getregmsg(v-ripple="'rgba(255, 255, 255, 0.12)'" :loading="loading_msg" :disabled="iscounting" @click="msg_click('login')")
                                    span(v-if="!iscounting") 获取验证码
                                    span(v-if="iscounting") {{msgtime}}' 后可重发

                        el-row.extbox
                            el-button.forget(v-ripple="'rgba(153, 153, 153, 0.12)'") 忘记密码
                            el-button.msglogin(v-ripple="'rgba(153, 153, 153, 0.12)'"  v-if="ispswlogin"  @click="msglogin_click")
                                svg.icon
                                    use(xlink:href="#symbolist_icon_msg")
                                span 验证码登录
                            el-button.psdlogin(v-ripple="'rgba(153, 153, 153, 0.12)'"  v-if="!ispswlogin"  @click="psdlogin_click")
                                svg.icon
                                    use(xlink:href="#symbolist_icon_password")
                                span 密码登录
                        el-button.login(native-type="submit" v-ripple="'rgba(255, 255, 255, 0.12)'") 立即登录
                el-tab-pane(label="注册" name="register")
                    el-form.regform(:model="regform" :rules="checkreg" @submit.native.prevent="submitRegform"  ref="ref_regform" )
                        el-form-item.iptgroup(prop="reg_name")
                            el-input(placeholder="姓名" v-model="regform.reg_name")
                        el-form-item.iptgroup(prop="reg_phone")
                            el-input(placeholder="手机号" v-model="regform.reg_phone")
                        el-form-item.iptgroup(prop="reg_password")
                            el-input(placeholder="设置密码" v-model="regform.reg_password" type="password")
                        el-form-item.iptgroup(prop="reg_msg")
                            el-row.regmsgbox
                                el-input.regmsg(placeholder="验证码" v-model="regform.reg_msg")
                            el-button.getregmsg(v-ripple="'rgba(255, 255, 255, 0.12)'" :loading="loading_msg" :disabled="iscounting" @click="msg_click('signup')" )
                                span(v-if="!iscounting") 获取验证码
                                span(v-if="iscounting") {{msgtime}}' 后可重发
                        el-button.register(native-type="submit" v-ripple="'rgba(255, 255, 255, 0.12)'") 开始注册
                        p.protocol 点击注册，表示已经阅读并同意
                            a(href="http://www.shujike.com/docs/term.html" target="_blank") 使用协议
        el-row.footer
            p © 2017 数极客 京ICP备16027639号-1
</template>
<script src="../javascripts/index.js"></script>
<style lang="stylus" src="../stylesheets/index.styl"></style>