<template lang="pug">
    el-row#page_datasources
        el-row.title
            span 添加数据源
            el-input.search(placeholder="搜索" v-model="search_value" clearable)
        el-tabs.connectorlist(value="f1")
            el-tab-pane.juniorlist(v-for="item_l in datasources_datalist" :label="item_l.label_name" :name="'f'+item_l.label_id" :key="item_l.label_id")
                el-row.connector(v-for="item in item_l.datasources" :key="item.id")
                    el-row(v-if="showconnector(item.name)")
                        img(:src="item.img" @click="routetocreate(item.id)")
                        span {{item.name}}
</template>
<script src="../javascripts/b_datasources.js"></script>
<style lang="stylus" src="../stylesheets/b_datasources.styl"></style>