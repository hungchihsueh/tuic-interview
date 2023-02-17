import { defineStore } from "pinia";
export const useTodoStore = defineStore("todo", {
	state: () => {
		return {
			todos: [],
			user: {
				loggedIn: false,
				data:{}
			}
		};
	},
	actions: {
		addTodo(payload) {
			this.todos = [...this.todos, payload];
		},
		removeTodo(payload) {
			this.todos = this.todos.filter((todo) => todo != payload);
		},
		setLogin(payload) {
			this.user.loggedIn=payload
		},
		setData(payload) {
			this.user.data=payload
		}
	},
	getters: {
		getUser(state){return state.user}
	}
});
