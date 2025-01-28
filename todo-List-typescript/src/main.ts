import supabase from "./supabaseClient.ts";
import { fetchItems, insertItems, updateEditTodo, deleteTodo, getTodo, clearAllTodos } from "./crud.ts";

console.log(supabase)

const addTodoBtn = document.querySelector(".add-todo") as HTMLButtonElement;
const userInput = document.querySelector("input") as HTMLInputElement;
const toDoList = document.querySelector(".todo-List") as HTMLUListElement;
const clearBtn = document.querySelector(".clear-todo-list") as HTMLButtonElement;
export interface Todo {
	id?: string,
	text: string,
	completed: boolean
}

// let addedToDos: Todo[] = [];

export const displayToDo = async () => {
	const fetchedTodos: Todo[] = await fetchItems();
	console.log(fetchedTodos)
	toDoList.innerHTML = "";
	fetchedTodos.forEach((todo) => {
		const todoElement = document.createElement("li") as HTMLLIElement;
		todoElement.innerHTML = `
								<div class = "li-item">
								<input class = "checkbox" type="checkbox" ${todo.completed ? "checked" : ""} class = "checkbox" data-id = "${todo.id}">	
								<span class = "todo-text" data-id = "${todo.id}" >${todo.text}</span>
								<div class = "buttons">
								<button class = "edit-todo" data-id="${todo.id}">
								<img class = "edit"src="./src/img/edit-pencil-svgrepo-com.svg" alt="edit button">
								</button>
								<button class = "remove-todo" data-id="${todo.id}">
								<img class = "trashcan" src="./src/img/delete-svgrepo-com.svg" alt="trashcan button">
								</button>
								</div>
								</div>
								`
	toDoList.appendChild(todoElement);
	});
	addEventListeners();
	}


const addToDo = (): void => {
	const newTodoText: string = userInput.value.trim();
	if(newTodoText) {
		const newTodo: Todo = {
			text: newTodoText,
			completed: false
		};
		// addedToDos.push(newTodo);
		userInput.value = "";
		insertItems(newTodo)
		// saveToLocalStorage();
		// displayToDo();
	}

}
// const editText = (id: string, newText: string): void => {
// 	// const todo: Todo | undefined = addedToDos.find(todo => todo.id === id);
// 		updateEditTodo(id, newText)
// 		saveToLocalStorage();
// 		displayToDo();
	
// }
// const isDone = (status: string): void => {
// 	const todo: Todo | undefined = addedToDos.find(todo => todo.id === status);
// 	if(todo) {
// 		todo.completed = !todo.completed;
// 		saveToLocalStorage();
// 		displayToDo();
// 	}
// }

// const removeToDo = (id: string): void => {
// 	// addedToDos = addedToDos.filter(todo => todo.id !== id);
// 	deleteTodo(id)
// 	saveToLocalStorage();
// 	displayToDo();
// }

// const clearTodos = (): void => {

// 	// addedToDos = [];
// 	// saveToLocalStorage();
// 	// displayToDo();
// }

// const saveToLocalStorage = (): void => {
// 	localStorage.setItem("todos", JSON.stringify(addedToDos));
// }
// const loadFromLocalStorage = (): Todo[] => {
// 	const savedTodos: string | null = localStorage.getItem("todos");
// 	return savedTodos ? JSON.parse(savedTodos) as Todo[] : [];
// }

const addEventListeners = (): void => {
	const checkboxes = document.querySelectorAll(".checkbox");
	checkboxes.forEach(checkbox => {
		checkbox.addEventListener("change", (event) => {
			const id: string = (event.target as HTMLInputElement).dataset.id!;
			getTodo(id);
		});
	});

	const editButtons = document.querySelectorAll(".edit-todo");
	editButtons.forEach(button => {
		button.addEventListener("click", (event) => {
			const id: string = ((event.currentTarget as HTMLButtonElement).dataset.id!);
			const span = document.querySelector(`.todo-text[data-id="${id}"]`) as HTMLSpanElement;
			const newText = prompt("Edit your todo:", span.innerText);
			if(newText !== null) {
				updateEditTodo(id,newText);
			}
		});
	});

	const removeButtons = document.querySelectorAll(".remove-todo");
	removeButtons.forEach(button => {
		button.addEventListener("click", (event) => {
			const id: string = ((event.currentTarget as HTMLButtonElement).dataset.id!)
			deleteTodo(id);
		});
	});

	if(clearBtn) {
		clearBtn.addEventListener("click", (event) => {
			event.preventDefault();
			clearAllTodos();
		})
	}
}

addTodoBtn.addEventListener("click", (event)=> {
	event.preventDefault();
	addToDo();
})
window.onload = () => {
	// addedToDos = loadFromLocalStorage();
	displayToDo();
}