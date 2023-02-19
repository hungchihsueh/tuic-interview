<script setup>
	import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
	import { useRouter } from "vue-router";
	const router = useRouter();
	const provider = new GoogleAuthProvider();
	const auth = getAuth();
	const registerWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				router.push("/todo");
			})
			.catch((error) => {
				console.log(error);
			});
	};
</script>
<template>
	<div
		class="mx-auto h-screen w-screen bg-blue-50 flex flex-col items-center justify-center">
		<h1 class="font-bold text-2xl mb-5">Login</h1>
		<button
			class="rounded-lg shadow text-white bg-blue-500 p-5"
			@click="registerWithGoogle">
			Sign in with Google
		</button>
	</div>
</template>

<style></style>
