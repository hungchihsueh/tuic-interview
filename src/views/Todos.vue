<script setup>
	import { onMounted, reactive } from "vue";
	import { useTodoStore } from "../store/store";
	import { storeToRefs } from "pinia";
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
		console.log(todo.todoKey);
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
</script>
<template>
	<div class="container transition-all duration-150 mx-auto pt-10">
		<button @click="signOutByebye">signout</button>
		<div class="flex justify-center items-center gap-3 mx-auto">
			<input
				class="border border-black p-3 rounded-md"
				v-model="input"
				type="text" />
			<button
				@click="addTodo"
				class="shadow border rounded-sm p-3">
				Add
			</button>
		</div>
		<div class="bg-blue-400">
			<ul>
				<li
					v-for="(todo, i) in state.todos"
					:key="`${todo}${i}`">
					<div>
						<input
							:checked="todo.isFinished"
							:aria-label="todo.todo"
							type="checkbox"
							name=""
							id=""
							@change="(e) => toggoleTodo(e, todo)" />
						{{ todo.todo }}
						<button @click="() => clearToDo(todo)">x</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style></style>
