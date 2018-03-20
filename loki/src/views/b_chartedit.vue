<template lang="pug">
    el-row#page_chartedit
        el-row.header
            el-row.back
                svg.icon
                    use(xlink:href="#symbolist_base_icon_goback")
                span 可视化编辑
            el-row.title
                span 销售业绩广告效果
                svg.icon
                    use(xlink:href="#symbolist_base_icon_edit")
        el-row.leftview
            el-row.left_desc
                el-row.left_title
                    span 工作表
                el-row.left_type
                    img(:src="imgsrc")
                    span 销售业绩报表
            el-row.table_fields
                el-row.desc
                    span 字段
                el-row.search
                    el-input(placeholder="搜索")
                    el-row.iconbox
                        svg.icon
                            use(xlink:href="#symbolist_base_icon_search")
                .fieldlistbox
                    draggable.fieldlist(v-model="fielddata" :options="{group:{ name:'people',  pull:'clone', put:false, onStart:false }}")
                        el-row.field(v-for="item in fielddata" :key="item.id")
                            svg.icon
                                use(:xlink:href="'#symbolist_base_icon_'+item.icon")
                            span {{item.title}}
        el-row.mainview
            .mainbox
                el-row.chart_args
                    el-row.row.dimension
                        span 维度
                        draggable.itemlist(v-model="dimension" :options="{group:'people'}")
                            .item(v-for="item in dimension" :key="item.id")
                                svg.icon
                                    use(:xlink:href="'#symbolist_base_icon_'+item.icon")
                                span {{item.title}}
                    el-row.row.event
                        span 数值
                        draggable.itemlist(v-model="event" :options="{group:'people'}")
                            .item(v-for="item in event" :key="item.id")
                                svg.icon
                                    use(:xlink:href="'#symbolist_base_icon_'+item.icon")
                                span {{item.title}}
                el-row.chart_content
                    el-row.chart_params
                        el-row.chart_filters
                            .placeholder
                                .l1 拖拽字段到这里
                                .l2 进行筛选
                            .title  筛选器
                        el-row.chart_themes
                            .title  主题
                    .chartBox
                        chart(:options="polar" auto-resize)
        el-row.rightview
            el-row.desc 图表类型
            el-row.viewbox
                el-row.charttype(v-for="item in chartdata" :key="item.id")
                    el-row.title {{item.title}}
                    el-row.imglist
                        img(v-for="item_i in item.children" :src="charttype[item_i].img" @click="changechart(item_i)")
</template>
<script src="../javascripts/b_chartedit.js"></script>
<style lang="stylus" src="../stylesheets/b_chartedit.styl"></style>