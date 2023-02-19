<script setup>
	import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
	import { useRouter } from "vue-router";
	const router = useRouter();
	const provider = new GoogleAuthProvider();
	const auth = getAuth();
	const registerWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result);
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				// IdP data available using getAdditionalUserInfo(result)
				// ...
				router.push("/todo");
			})
			.catch((error) => {
				console.log(error);
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
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
