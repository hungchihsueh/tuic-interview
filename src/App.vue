<script setup>
	import { reactive } from "vue";
	import database from "../lib/firebase";
	let state = reactive({ todos: [] });
	let input = "";
	const addTodo = () => {
		if (input) {
			state.todos.push(input);
			input = "";
		}
	};
	const clearToDo = (todo) => {
		console.log(todo);
		let newTodos = state.todos.filter((item) => item != todo);
		console.log(newTodos);
		state.todos = newTodos;
	};
</script>

<template>
	<div>
		<input
			v-model="input"
			type="text" />
		<button @click="addTodo">Add</button>
	</div>
	<div>
		<ul>
			<li
				v-for="(todo, i) in state.todos"
				:key="`${todo}${i}`">
				{{ todo }}
				<button @click="() => clearToDo(todo)">x</button>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
