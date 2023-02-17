<script setup>
	import { reactive } from "vue";
	import { useTodoStore } from "../store/store";
	import { storeToRefs } from "pinia";
	const todoStore = useTodoStore();
	const { todos } = storeToRefs(todoStore);
	let input = "";
	const addTodo = () => {
		if (input) {
			todoStore.addTodo(input);
			input = "";
		}
	};
	const clearToDo = (todo) => {
		todoStore.removeTodo(todo);
	};
	const signOut = () => {};
</script>
<template>
	<div class="container transition-all duration-150 mx-auto pt-10">
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
					v-for="(todo, i) in todos"
					:key="`${todo}${i}`">
					{{ todo }}
					<button @click="() => clearToDo(todo)">x</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<style></style>
