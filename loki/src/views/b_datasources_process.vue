<template lang="pug">
    el-row#page_datasources_process
        el-collapse(accordion :value="pro_step" ref="collapse")
            .stepbox(@click.capture="prevclick_step1" :class="collapse_item_class1")
                el-collapse-item(name="step1")
                    template(slot="title")
                        .iconbox
                            svg.icon.edit
                                use(xlink:href="#symbolist_base_icon_edit")
                            .noedit
                                svg.icon(v-if="collapse_item_class1=='ok'")
                                    use(xlink:href="#symbolist_base_icon_success")
                                span(v-if="collapse_item_class1!='ok'") 01
                        span {{title_text_name}}
                    el-row(v-if="ds_type==1||ds_type==2")
                        el-row.desctext 选择已有文件
                        el-select.sheetselect(v-model="file_id" @change="file_list_change")
                            el-option(v-for="item in file_list" :key="item.file_upload_id" :label="item.filename" :value="item.file_upload_id")
                        el-row.desctext 上传新文件
                        el-row
                            el-upload(:accept="accept" :action="testb" ref="upload" :on-progress="onprogress" :class="!nofile?'nofile':''" :on-success="onsuccess" :before-upload="beforeupload")
                                el-button.uploadbtn
                                    span.text {{text_name}}
                                    .iconbox
                                        svg.icon
                                            use(xlink:href="#symbolist_base_icon_upload")
                                .progressbar(v-if="uploading")
                                    .percent(:style="{width:percent}")
                                        span 上传进度{{percent}}
                                .upload__tip(slot="tip" class="el-upload__tip") {{text_tip}}
                        el-row
                            el-button.nextstep(v-ripple="'rgba(255, 255, 255, 0.12)'" @click="btnnext('step2')")
                                span 下一步
                    el-row(v-if="ds_type==3||ds_type==4")
                        el-row.desctext 选择连接
                        el-select.sheetselect(v-model="file_id" @change="change_connector")
                            el-option(v-for="item in database_list" :key="item.jdbc_connector_id" :label="item.jdbc_connector_name" :value="item.jdbc_connector_id")
                            el-option(label="新建连接" value="-1")
                        el-row(v-if="file_id!=null")
                            el-row.desctext(v-if="file_id=='-1'") 连接名称
                            el-input.sheetselect(placeholder="请输入" v-model="connector_obj.name" v-if="file_id=='-1'")
                            el-row.desctext 连接地址
                            el-input.sheetselect(placeholder="请输入" v-model="connector_obj.addr")
                            el-row.desctext 端口号
                            el-input.sheetselect(placeholder="请输入" v-model="connector_obj.port")
                            el-row.desctext 数据库名称
                            el-input.sheetselect(placeholder="请输入" v-model="connector_obj.dbname")
                            el-row.desctext 用户名
                            el-input.sheetselect(placeholder="请输入" v-model="connector_obj.username")
                            el-row.desctext 密码
                            el-input.sheetselect(placeholder="请输入" v-model="connector_obj.password" type="password")
                        el-row
                            el-button.nextstep(v-ripple="'rgba(255, 255, 255, 0.12)'" @click="btnnext('step2')")
                                span 下一步
                            el-button.test(v-ripple="'rgba(255, 255, 255, 0.12)'" @click='validate_jdbc_connector')
                                span 测试连接
            .stepbox(@click.capture="prevclick_step2" :class="collapse_item_class2" )
                el-collapse-item(name="step2")
                    template(slot="title")
                        .iconbox
                            svg.icon.edit
                                use(xlink:href="#symbolist_base_icon_edit")
                            .noedit
                                svg.icon(v-if="collapse_item_class2=='ok'")
                                    use(xlink:href="#symbolist_base_icon_success")
                                span(v-if="collapse_item_class2!='ok'") 02
                        span 预览数据
                    el-row.step2box
                        el-row.desctext 选择工作表
                        el-row.sheetselect.short
                            el-select(v-model="sheet_value" @change="change_sheet")
                                el-option(v-for="item in sheet_list" :key="item.value" :label="item.label" :value="item.value")
                                el-option(v-if="ds_type==3||ds_type==4" key="-1" label="自定义sql查询" value="-1")
                        el-row(v-if="sheet_value=='-1'")
                            el-row.desctext
                                span 自定义sql
                                el-button.runsql(v-ripple="'rgba(255, 255, 255, 0.12)'" @click="runsql" size="mini")
                                    span 运行
                            el-input.sheetselect.sqlarea(type="textarea" v-model="custom_sql")
                        el-row.desctext 数据预览
                        el-table.preview(:data="d_tableData" stripe border fit max-height="300")
                            el-table-column(v-for="item in d_column" v-show="item.chosen" :prop="item.prop" :label="item.name" :key="item.prop" width="150")
                        el-row.desctext 列设置
                        el-table.rowsetting(:data="d_column" border)
                            el-table-column(prop="chosen" width="50")
                                template.nopadding(slot-scope="scope")
                                    el-checkbox(v-model="scope.row.chosen")
                            el-table-column(prop="name" label="名称")
                            el-table-column(prop="alias_name" label="别名")
                                template(slot-scope="scope")
                                    el-input(:placeholder="scope.row.name" v-model="scope.row.alias_name")
                            el-table-column(prop="mapping_type" label="类型")
                                template(slot-scope="scope")
                                    el-select(v-model="scope.row.mapping_type")
                                        el-option(v-for="item in typelist" :key="item.value" :label="item.label" :value="item.value")
                            el-table-column(prop="format" label="设置" )
                                template(slot-scope="scope" v-if="scope.row.mapping_type=='时间'")
                                    el-row.small
                                        span 时间格式
                                        el-select(v-model="scope.row.format"  placeholder="时间格式")
                                            el-option(v-for="item in [{label:'默认',value:1},{label:'自定义',value:-1}]" :key="item.value" :label="item.label" :value="item.value")
                                    el-row(v-if="scope.row.format=='-1'")
                                        el-input.fix(:placeholder="scope.row.time_format" v-model="scope.row.time_field_info.time_pattern" :class="scope.row.formatstr?'':'error'")
                                    el-row.small
                                        span 时间粒度
                                        el-select(v-model="scope.row.time_field_info.time_granularity_id"  placeholder="时间粒度")
                                            el-option(v-for="item in time_granularities" :key="item.value" :label="item.label" :value="item.value")
                            el-table-column(prop="partition" label="分区字段" v-if="ds_type==4")
                                template(slot-scope="scope")
                                    el-checkbox(v-model="scope.row.is_partition" :disabled="!scope.row.partition") 设为分区字段
                        el-button.nextstep(v-ripple="'rgba(255, 255, 255, 0.12)'" @click="btnnext('step3')")
                            span 下一步
            .stepbox(@click.capture="prevclick_step3" :class="collapse_item_class3")
                el-collapse-item(name="step3")
                    template(slot="title")
                        .iconbox
                            svg.icon.edit
                                use(xlink:href="#symbolist_base_icon_edit")
                            .noedit
                                svg.icon(v-if="collapse_item_class3=='ok'")
                                    use(xlink:href="#symbolist_base_icon_success")
                                span(v-if="collapse_item_class3!='ok'") 03
                        span 工作表设置
                    el-row
                        el-row.desctext 工作表名称
                        el-input.sheetselect(v-model="desc_name")
                        el-row.desctext 文件夹
                        el-select.sheetselect(v-model="desc_folder" @change="change_folder")
                            el-option(label="创建新文件夹" value="-1")
                        el-row.desctext 标签
                        el-select.sheetselect(multiple filterable allow-create default-first-option v-model="desc_tags" size="small" @change="tagchange")
                            el-option(v-for="item in tags_list" :key="item.id" :label="item.name" :value="item.id")
                        el-row.desctext 备注
                        el-input.sheetselect(type="textarea" v-model="desc_text")
                        el-button.nextstep(v-ripple="'rgba(255, 255, 255, 0.12)'" @click="dataset_save")
                            span 保存
        el-dialog(title="创建文件夹" :visible.sync="dialogVisible" width="30%" top="36vh")
            el-row.desctext 名称
            el-input.fixinput(v-model="foldername" placeholder="请输入名称")
            span(slot="footer" class="dialog-footer")
                el-button.cancel(@click="dialogVisible = false") 取消
                el-button.ok(type="primary" @click="dialogVisible = false") 保存
</template>
<script src="../javascripts/b_datasources_process.js"></script>
<style lang="stylus" src="../stylesheets/b_datasources_process.styl"></style>