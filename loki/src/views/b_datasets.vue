<template lang="pug">
    el-row#page_datasets
        el-row.topbar
            el-row.search
                el-input(placeholder="搜索")
                el-row.iconbox
                    svg.icon
                        use(xlink:href="#symbolist_base_icon_search")
            el-button.graybtn(@click="create_dataset") ＋新建工作表
        el-row.condition
            el-select(placeholder="所有类型" v-model="c_type")
            el-select.sheetselect.userlist(placeholder="所有用户" v-model="c_user")
            el-select.sort(placeholder="时间排序" v-model="c_sort")
        el-row.dslist
            el-table(:data="ds_list" show-header=false)
                el-table-column(label="name" value="name" min-width="200")
                    template(slot-scope="scope")
                        img.logo(:src="dslist[scope.row.datasource_id].imgsrc_m")
                        .title
                            span.type {{dslist[scope.row.datasource_id].title}}
                            .namebox
                                span.name {{scope.row.dataset_name}}
                el-table-column(label="user" value="user")
                    template(slot-scope="scope")
                        span.type 创建用户 / 最近更新
                        span.name {{scope.row.create_user}} / {{scope.row.update_user}}
                el-table-column(label="size" value="size")
                    template(slot-scope="scope")
                        span.type 行 / 列
                        span.name {{scope.row.record_num}} / {{scope.row.column_num}}
                el-table-column(label="chartnum" value="chartnum")
                    template(slot-scope="scope")
                        span.type 图表
                        span.name {{scope.row.chart_num}}
                el-table-column(label="date" value="date")
                    template(slot-scope="scope")
                        span.type 更新
                        span.name {{scope.row.update_time}}
                el-table-column(label="operate" width="110")
                    template(slot-scope="scope")
                        el-dropdown.control(trigger="click" :showTimeout=0 :hideTimeout=0 @visible-change="control_change(arguments,scope.row)" :class="scope.row.showcontrol?'show':''")
                            .editbox.el-dropdown-link
                                svg.icon
                                    use(xlink:href="#symbolist_base_icon_edit")
                            el-dropdown-menu.datasetlist_control(slot="dropdown")
                                .control(@click="dataset_edit(scope.row.dataset_id,scope.row.datasource_id)")
                                    el-dropdown-item
                                        span 编辑
                                    .coverbox
                                .control(@click="dataset_delete_dialog(scope.row.dataset_id,scope.row.datasource_id,scope.row.dataset_name)")
                                    el-dropdown-item
                                        span 删除
                                    .coverbox2
        el-dialog(title="提示信息" :visible.sync="dialogVisible" width="30%" top="36vh")
            el-row.desctext 确认要删除 {{delete_dataset_name}} 工作表
            span(slot="footer" class="dialog-footer")
                el-button.cancel(@click="dialogVisible = false") 取消
                el-button.ok(type="primary" @click="dataset_delete") 删除
</template>
<script src="../javascripts/b_datasets.js"></script>
<style lang="stylus" src="../stylesheets/b_datasets.styl"></style>