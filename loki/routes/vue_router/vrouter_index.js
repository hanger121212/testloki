import Vue from 'vue'
import Router from 'vue-router'

//创建 router 实例
const router = new Router({
	mode: 'history',
	routes: [{
			name: 'index',
			path: '/',
			meta: {
				title: '登录'
			}
		},
		{
			name: 'signup',
			path: '/signup',
			meta: {
				title: '注册'
			}
		}
	]
})


export default router;