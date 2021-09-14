import store from "@/store";
import { RouteRecordRaw } from "vue-router";

const router: RouteRecordRaw = {
	path: "/auth",
	name: "auth",
	component: () =>
		import(
			/* webpackChunkName "AuthLayout"*/ "@/modules/auth/layouts/AuthLayout.vue"
		),
	children: [
		{
			path: "login",
			name: "login",
			component: () =>
				import(
					/* webpackChunkName "LoginView"*/ "@/modules/auth/views/LoginView.vue"
				),
		},
		{
			path: "register",
			name: "register",
			component: () =>
				import(
					/* webpackChunkName "RegisterView"*/ "@/modules/auth/views/RegisterView.vue"
				),
		},
	],
};

export default router;
