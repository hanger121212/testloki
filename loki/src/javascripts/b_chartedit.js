import _charttype from "./configlist_charttype.js"
import _list from "./configlist_datasources.js"
import draggable from 'vuedraggable'
export default {
    data() {
        let chartdata = [{
            id: 1,
            title: "连类比物",
            children: [1, 2, 3, 4, 5, 6, 7],
        }, {
            id: 2,
            title: "由此及彼",
            children: [8, 9, 10, 11],
        }, {
            id: 3,
            title: "星罗棋布",
            children: [12, 13, 14, 15, 16],
        }, {
            id: 4,
            title: "览众山小",
            children: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        }, {
            id: 5,
            title: "见微知著",
            children: [29, 30, 31],
        }]
        let fielddata = [{
            id:0,
            title: "日期",
            icon: "date"
        }, {
            id:1,
            title: "订单来源",
            icon: "bigt"
        }, {
            id:2,
            title: "订单地区",
            icon: "bigt"
        }, {
            id:3,
            title: "用户注册来源",
            icon: "bigt"
        }, {
            id:4,
            title: "用户注册地区",
            icon: "bigt"
        }, {
            id:5,
            title: "支付订单量",
            icon: "number"
        }, {
            id:6,
            title: "新增订单量",
            icon: "number"
        }, {
            id:7,
            title: "取消订单量",
            icon: "number"
        }, {
            id:8,
            title: "好评订单量",
            icon: "number"
        }, {
            id:9,
            title: "待服务订单量",
            icon: "number"
        }, {
            id:10,
            title: "被投诉订单量",
            icon: "number"
        }, {
            id:11,
            title: "被拒订单量",
            icon: "number"
        }]

        let data = []

        for (let i = 0; i <= 360; i++) {
            let t = i / 180 * Math.PI
            let r = Math.sin(2 * t) * Math.cos(2 * t)
            data.push([r, i])
        }
        return {
            test: "1",
            imgsrc: _list[1].imgsrc_m,
            charttype: _charttype,
            chartdata: chartdata,
            fielddata: fielddata,
            dimension:[],
            event:[],
            polar: {
                title: {
                    text: '极坐标双数值轴'
                },
                legend: {
                    data: ['line']
                },
                polar: {
                    center: ['50%', '54%']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                angleAxis: {
                    type: 'value',
                    startAngle: 0
                },
                radiusAxis: {
                    min: 0
                },
                series: [{
                    coordinateSystem: 'polar',
                    name: 'line',
                    type: 'line',
                    showSymbol: false,
                    data: data
                }],
                animationDuration: 2000
            }
        }
    },
    methods: {
        changechart:function(id){
            console.log(id);
        }
    },
    components: {
        draggable,
    },
    beforeCreate: function () {
        this.$store.commit('change_showtopbar', false);
        this.$store.commit('change_topbarname', "1");
    }

}