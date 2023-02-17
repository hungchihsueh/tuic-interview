// router
import { createRouter, createWebHistory } from "vue-router";
// import Login from "../views/Login.vue";
// import Todo from "../views/Todos.vue";
const routes = [
	{ path: "/", component: () => import("../views/Login.vue") },
	{ path: "/todo", component: import("../views/Todos.vue") },
];
 const router = createRouter({
	history: createWebHistory(),
	routes, // short for `routes: routes`
});
export default router