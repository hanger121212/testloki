<template lang="pug">
    el-row#page_signup_info
        el-row.header
            el-row
                a.logo(href="http://www.shujike.com")
                    img(src="../images/logo3.png")
                span 新一代智能分析平台
        el-row.main
            el-row
                el-form.info(:model="signup_info" :rules="checkinfo" @submit.native.prevent="submitinfo" ref="ref_signup_info" )
                    el-row
                        span.title 选择您的专属分析顾问
                    p 完善以下信息，有助于为您分配精准的数据分析顾问，收到最新的分析案例及增长秘籍。
                    el-row.itemlist
                        el-form-item(prop="company")
                            el-input( placeholder="请输入公司全称"  v-model="signup_info.company")
                        el-form-item(prop="job")
                            el-select( placeholder="请选择您的职位"  v-model="signup_info.job")
                                el-option(v-for="item in joblist" :key="item.id" :label="item.name" :value="item.id")
                        el-form-item(prop="email")
                            el-input( placeholder="请输入您的工作邮箱"  v-model="signup_info.email")
                        el-row.buttonbox
                            el-button.login(native-type="submit" v-ripple="'rgba(255, 255, 255, 0.12)'") 立即登录                
                el-form.description
                    img(src="../images/step2.png")
                    span 中国领先的智能经营平台
                    span 已经帮助3000+企业实现业务增长
        el-row.footer
            p © 2017 数极客 京ICP备16027639号-1
</template>
<script src="../javascripts/signup_info.js"></script>
<style lang="stylus" src="../stylesheets/signup_info.styl"></style>