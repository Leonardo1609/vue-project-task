import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import projectRouter from "@/modules/project/router";

const routes: Array<RouteRecordRaw> = [
	{
		// "/projects"
		...projectRouter,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
