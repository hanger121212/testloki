<template lang="pug">
    el-row#page_base
        el-row(v-if="showtopbar.value")
            el-menu.top-menu-bar(:default-active="activeIndex.value" mode="horizontal" @select="handleSelect" :msg="message")
                a(href="/base" class="logo")
                    img(src="../images/logo_text.png")
                el-menu-item(index="1")
                    svg.icon.icon1
                        use(xlink:href="#symbolist_base_icon_dashboard")
                    span 仪表盘
                el-menu-item(index="2")
                    svg.icon.icon2
                        use(xlink:href="#symbolist_base_icon_datasource")
                    span 工作表
                el-menu-item(index="3")
                    svg.icon.icon3
                        use(xlink:href="#symbolist_base_icon_connectors")
                    span 数据源
                el-row.userbar
                    .userinfo
                        svg.icon.icon3
                            use(xlink:href="#symbolist_base_icon_user")
                        span {{user_name}}
                    li.baritem
                        svg.icon.icon3
                            use(xlink:href="#symbolist_base_icon_setting")
                    li.baritem
                        svg.icon.icon3
                            use(xlink:href="#symbolist_base_icon_tip")
                    li.baritem
                        a(href="/logout", title="退出") 
                            svg.icon.icon3
                                use(xlink:href="#symbolist_base_icon_logout")
        router-view
</template>
<script src="../javascripts/base.js"></script>
<style lang="stylus" src="../stylesheets/base.styl"></style>