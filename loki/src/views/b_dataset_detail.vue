<template lang="pug">
    el-row#page_dataset_detail
        el-row.head
            img.logo(:src="logosrc")
            el-row.text
                el-row
                    el-row.titlebox
                        span.title(v-bind:style="{visibility:isedittext?'hidden':'visible'}") {{title}}
                        el-input.title(v-model="title" v-bind:style="{visibility:!isedittext?'hidden':'visible'}")
                el-row.fixdescheight
                    el-row.descbox
                        span.desc(v-bind:style="{visibility:isedittext?'hidden':'visible'}") {{desc}}
                        el-input.desc(v-model="desc" v-bind:style="{visibility:!isedittext?'hidden':'visible'}" placeholder=" ")
                        svg.icon(@click="edittext(true)" v-if="!isedittext")
                            use(xlink:href="#symbolist_base_icon_edit")
                        svg.icon.ss(@click="edittext(false)" v-if="isedittext")
                            use(xlink:href="#symbolist_base_icon_success")
            el-button.graybtn(@click="create_chart") ＋新建图表
        el-tabs.detaillist(value="f1")
            el-tab-pane.juniorlist(label="数据详情" name="f1")
                b_datasources_process(:parent_name="title" :parent_desc="desc" @on-name-change="on_name_change" @on-desc-change="on_desc_change")
            el-tab-pane.juniorlist(label="关联图表" name="f2")
                b_chartlist
</template>
<script src="../javascripts/b_dataset_detail.js"></script>
<style lang="stylus" src="../stylesheets/b_dataset_detail.styl"></style>