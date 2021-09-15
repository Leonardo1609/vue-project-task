import { verifyAuthentication } from "@/router/verifyAuthentication";
import store from "@/store";
import { RouteRecordRaw } from "vue-router";

const router: RouteRecordRaw = {
	path: "/projects",
	name: "projects",
	component: () => import("@/modules/project/layouts/ProjectLayout.vue"),
	beforeEnter: [verifyAuthentication],
	children: [
		{
			path: ":slug",
			name: "project-view",
			component: () =>
				import(
					/* webpackChunkName "ProjectView" */ "../views/ProjectView.vue"
				),
			props: (router) => ({
				slug: router.params.slug,
			}),
		},
	],
};

export default router;
