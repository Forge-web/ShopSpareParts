import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CartItem from "../components/CartItem.vue";
import Me from "../pages/Me.vue";
import Admin from "../pages/Admin.vue";
import SpareParts from "../pages/SpareParts.vue";

const routes = [
	{
		path: '/',
		component: HomePage
	},
	{
		name: 'spare_parts',
		path:'/spare_parts/:id',
		component: SpareParts,
		props: true,
	},
	{
		name: 'me',
		path: '/me',
		component: Me,
		props: true,
	},
	{
		name: 'admin',
		path: '/admin',
		component: Admin
	}
]

const router = createRouter(
	{
		history: createWebHashHistory('/'),
		routes
	},
)

export default router;