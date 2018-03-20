const router = require('koa-router')()

router.prefix('/api/users')

router.post('/authcode', function (ctx, next) {
    if (ctx.session.view == undefined) {
        ctx.session.view = 0;
    } else {
        ctx.session.view += 1;
    }
    console.log('viewNum', ctx.session.view) //log 输出
    let rn = Math.random();
    if (rn > 0.5) {
        ctx.body = {
            status: "success"
        };
    } else {
        ctx.body = {
            status: "failure",
            msg: "获取验证码失败"
        };
    }
})

router.post('/signin1', function (ctx, next) {
    let data = ctx.request.body;
    let ret = {};
    if (data.password == "123123") {
        ret.status = "success";
        ret.user_id = "2015678";
        ctx.session.user_id = ret.user_id;
        ctx.session.user_name = '本地mock测试';
    } else {
        ret.status = false;
        let rn = Math.random();
        if (rn > 0.5) {
            ret.msg = "密码错误";
        } else {
            ret.msg = "用户不存在";
        }
    }
    ctx.body = ret;
})


router.post('/signin2', function (ctx, next) {
    let data = ctx.request.body;
    let ret = {};
    if (data.authcode == "8888") {
        ret.status = "success";
        ret.user_id = "2015678";
        ctx.session.user_id = ret.user_id;
        ctx.session.user_name = '本地mock测试';
    } else {
        ret.status = false;
        let rn = Math.random();
        if (rn > 0.5) {
            ret.msg = "验证码错误";
        } else {
            ret.msg = "用户不存在";
        }
    }
    ctx.body = ret;
})

router.post('/signup1', function (ctx, next) {
    ctx.body = {
        status: "success"
    };
})
router.post('/signup2', function (ctx, next) {
    ctx.body = {
        status: "success"
    };
})

router.get('/occupations', function (ctx, next) {
    let ret = {
        status: "success",
        result: [{
            "id": 1,
            "name": "CEO/公司负责人"
        },   {
            "id": 2,
            "name": "商务拓展"
        }]
    };
    ctx.body = ret;
})

router.get('/userinfo', function (ctx, next) {
    let ret = {
        user_name: ctx.session.user_name
    };
    ctx.body = ret;
})

module.exports = router