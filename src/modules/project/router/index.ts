import { verifyAuthentication } from "@/router/verifyAuthentication";
import { RouteRecordRaw } from "vue-router";

const router: RouteRecordRaw = {
	path: "/projects",
	name: "projects",
	component: () => import("@/modules/project/layouts/ProjectLayout.vue"),
	beforeEnter: [verifyAuthentication],
	children: [
		{
			path: "",
			name: "no-project",
			component: () =>
				import(
					/* webpackChunkName "NoProjectView" */ "../views/NoProjectView.vue"
				),
		},
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
