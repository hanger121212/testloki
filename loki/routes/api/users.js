const router = require('koa-router')()
const Axios = require('axios')
const webconfig = require('../../build/webconfig');

router.prefix('/api/users')

router.post('/authcode', function (ctx, next) {
  let data = ctx.request.body;
  return Axios.post(webconfig.api.url + "/authcode", data)
    .then(function (response) {
      ctx.body = response.data;
    }).catch(function (error) {
      console.log(error);
      ctx.body = "";
    });
})

router.post('/signin1', function (ctx, next) {
  let data = ctx.request.body;
  return Axios.post(webconfig.api.url + "/signin1", data)
    .then(function (response) {
      ctx.session.user_id = response.data.user_id
      ctx.session.user_name = response.data.user_name
      ctx.body = response.data;
    }).catch(function (error) {
      console.log(error);
      ctx.body = "";
    });
})

router.post('/signin2', function (ctx, next) {
  let data = ctx.request.body;
  return Axios.post(webconfig.api.url + "/signin2", data)
    .then(function (response) {
      ctx.session.user_id = response.data.user_id
      ctx.session.user_name = response.data.user_name
      ctx.body = response.data;
    }).catch(function (error) {
      console.log(error);
      ctx.body = "";
    });
})

router.post('/signup1', function (ctx, next) {
  let data = ctx.request.body;
  return Axios.post(webconfig.api.url + "/signup1", data)
    .then(function (response) {
      ctx.session.user_id = response.data.user_id
      ctx.body = response.data;
    }).catch(function (error) {
      console.log(error);
      ctx.body = "";
    });
})

router.post('/signup2', function (ctx, next) {
  let data = ctx.request.body;
  data.user_id = ~~ctx.session.user_id;
  return Axios.post(webconfig.api.url + "/signup2", data)
    .then(function (response) {
      ctx.session.user_name = data.name;
      ctx.body = response.data;
    }).catch(function (error) {
      console.log(error);
      ctx.body = "";
    });
})

router.get('/occupations', function (ctx, next) {
  return Axios.get(webconfig.api.url + "/occupations")
    .then(function (response) {
      ctx.body = response.data;
    }).catch(function (error) {
      console.log(error);
      ctx.body = "";
    });
})

router.get('/userinfo', function (ctx, next) {
    let ret = {
        user_name: ctx.session.user_name
    };
    ctx.body = ret;
})

module.exports = router