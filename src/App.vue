<script setup>
	// router
	import { useRouter } from "vue-router";

	const router = useRouter();
	const goTodo = () => {
		router.push("/todo");
	};
</script>

<template>
	<router-view></router-view>
</template>

<style scoped></style>
