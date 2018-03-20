<template lang="pug">
    el-row#page_datasources_create
        el-row.datasource_header
            img(:src="imgsrc")
            span {{text}}
        div(v-if="showprocess")
            b_datasources_process
</template>
<script src="../javascripts/b_datasources_create.js"></script>
<style lang="stylus" src="../stylesheets/b_datasources_create.styl"></style>