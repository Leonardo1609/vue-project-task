import { RouteRecordRaw } from "vue-router";

const router: RouteRecordRaw = {
	path: "/projects",
	name: "projects",
	component: () => import("@/modules/project/layouts/ProjectLayout.vue"),

	children: [
		{
			path: ":slug",
			name: "project-view",
			component: () =>
				import(
					/* webpackChunkName "ProjectView" */ "../views/ProjectView.vue"
				),
		},
	],
};

export default router;
