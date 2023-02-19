<script setup>
	import { onMounted, reactive } from "vue";
	import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
	import { useRouter } from "vue-router";
	import {
		getDatabase,
		ref,
		child,
		push,
		update,
		remove,
		get,
		onValue,
		set,
	} from "firebase/database";
	const state = reactive({ todos: {} });
	const router = useRouter();
	const auth = getAuth();
	let input = "";
	const addTodo = () => {
		if (input) {
			const db = getDatabase();
			const user = auth.currentUser;
			// Get a key for a new Post.
			const todoKey = push(child(ref(db), `/todos/${user.uid}`)).key;
			const todoData = {
				todoKey,
				userName: user.displayName,
				created_time: new Date(),
				todo: input,
				isFinished: false,
			};
			const updates = {};

			updates[`/todos/${user.uid}/${todoKey}`] = todoData;
			update(ref(db), updates);
			input = "";
		}
	};
	const toggoleTodo = (e, todo) => {
		const db = getDatabase();
		const user = auth.currentUser;
		console.log(user);
		const uid = user.uid;
		const key = todo.todoKey;
		const updates = {};
		if (e.target.checked) {
			updates[`/todos/${uid}/${key}`] = { ...todo, isFinished: true };
			update(ref(db), updates);
		} else {
			updates[`/todos/${uid}/${key}`] = { ...todo, isFinished: false };
			update(ref(db), updates);
		}
	};
	const clearToDo = (todo) => {
		console.log(todo.todoKey);
		const db = getDatabase();
		remove(ref(db, `todos/${auth.currentUser.uid}/${todo.todoKey}`));
	};

	const getData = async () => {
		const auth = getAuth();
		const user = await auth.currentUser;
		console.log(user);
		const dbRef = ref(getDatabase());
		get(child(dbRef, `todos/${user.uid}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					console.log(snapshot.val());
					state.todos = snapshot.val();
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const signOutByebye = () => {
		signOut(auth)
			.then(() => {
				console.log(auth.currentUser);
				router.push("/");
			})
			.catch((error) => {
				// An error happened.
			});
	};
	onMounted(async () => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				getData();
			} else {
				console.log("not login");
			}
			onValue(
				ref(getDatabase(), `todos/${auth.currentUser.uid}`),
				(snapshot) => {
					const data = snapshot.val();
					state.todos = data;
				},
			);
		});
	});
	const checki = (i) => {
		console.log(i);
	};
</script>
<template>
	<div class="container transition-all duration-150 mx-auto pt-10">
		<button
			@click="signOutByebye"
			class="py-3 px-5 rounded shadow bg-gray-50 font-bold hover:bg-blue-500 hover:text-white transition-all duration-150">
			signout
		</button>
		<div
			class="mx-auto text-center my-10 font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-br from-green-400 to-blue-600">
			Hello! {{ auth.currentUser.displayName }}
		</div>
		<div
			class="mb-10 w-1/2 flex justify-center items-center gap-3 mx-auto border shadow-md p-3 rounded-full bg-gray-100">
			<input
				class="border-none shadow-[inset_0_4px_6px_-1px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] p-3 rounded-l-full w-4/5"
				v-model="input"
				type="text" />
			<button
				@click="addTodo"
				class="shadow border rounded-r-full p-3 bg-orange-300 text-white font-bold w-1/5 min-w-fit hover:shadow-md transition-all duration-150 active:shadow-transparent">
				Add
			</button>
		</div>
		<div class="w-1/2 px-2 mx-auto">
			<ul class="flex flex-col justify-start items-start gap-3">
				<li
					v-for="(todo, i) in state.todos"
					:key="`${todo}${i}`"
					class="flex w-full justify-between items-center rounded-full shadow font-bold text-xl transition-colors"
					:class="[todo.isFinished ? `bg-green-300` : `bg-blue-300`]">
					<div class="flex gap-5 p-5 justify-start items-center">
						<input
							:checked="todo.isFinished"
							:aria-label="todo.todo"
							type="checkbox"
							name=""
							id=""
							class="w-8 h-8 rounded-full"
							@change="(e) => toggoleTodo(e, todo)" />
						<span class="text-2xl">{{ todo.todo }}</span>
					</div>
					<button
						@click="() => clearToDo(todo)"
						class="px-5 hover:text-red-500 hover:text-3xl transition-all duration-150">
						x
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<style></style>
