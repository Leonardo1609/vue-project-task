import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import projectRouter from "@/modules/project/router";
import authRouter from "@/modules/auth/router";

const routes: Array<RouteRecordRaw> = [
	{
		// "/"
		...authRouter
	},
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
