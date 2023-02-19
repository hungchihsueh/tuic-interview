<script setup>
	// router
	import { useRouter, useRoute } from "vue-router";

	const router = useRouter();
	const route = useRoute();
	const goTodo = () => {
		router.push("/todo");
	};
	console.log(route.path);
</script>

<template>
	<router-link
		to=""
		@click="
			() => {
				route.path == `/map` ? router.back() : router.push(`/map`);
			}
		"
		class="fixed top-5 right-5 p-3 px-5 rounded shadow bg-green-400 text-white font-bold"
		>{{ route.path == "/map" ? "Back" : "Map Demo" }}</router-link
	>

	<router-view />
</template>

<style scoped></style>
