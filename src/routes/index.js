// router
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{ path: "/", component: () => import("../views/Login.vue") },
	{ path: "/todo", component: import("../views/Todos.vue") },
	{ path: "/map", component: import("../views/Map.vue") },
];
 const router = createRouter({
	history: createWebHistory(),
	routes, // short for `routes: routes`
});
export default router