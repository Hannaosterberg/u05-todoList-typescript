import supabase from "./supabaseClient.ts";
import { fetchItems, insertItems, updateEditTodo, deleteTodo, getTodo, clearAllTodos } from "./crud.ts";
import { signIn, signUp, signOut } from "./auth.ts";

console.log(supabase)

const addTodoBtn = document.querySelector(".add-todo") as HTMLButtonElement;
const userInput = document.querySelector(".input-box") as HTMLInputElement;
const toDoList = document.querySelector(".todo-List") as HTMLUListElement;
const clearBtn = document.querySelector(".clear-todo-list") as HTMLButtonElement;
const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const registerBtn = document.getElementById("registerBtn") as HTMLButtonElement;
const loginForm = document.getElementById("loginForm") as HTMLDivElement;
const registerForm = document.getElementById("registerForm") as HTMLDivElement;
const signInForm = document.querySelector("#login-form") as HTMLInputElement;
const signUpForm = document.querySelector("#signup-form") as HTMLInputElement;
const loginContainer = document.querySelector(".login-container") as HTMLFieldSetElement;
const formBox = document.querySelector(".form-box") as HTMLFieldSetElement;
const logOutBtn = document.querySelector(".logOut-btn") as HTMLButtonElement;
export interface Todo {
	id?: string,
	text: string,
	completed: boolean
}

export const displayToDo = async () => {
	const fetchedTodos: Todo[] = await fetchItems();
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
		userInput.value = "";
		insertItems(newTodo)
	}

}

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
	console.log("hej")
})
signInForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const email = (document.querySelector("#email") as HTMLInputElement).value;
	const password = (document.querySelector("#password") as HTMLInputElement).value;
	signIn(email, password).then(sucess => {
		if(sucess) {
			formBox.style.display = "block";
			loginContainer.style.display = "none";
			displayToDo();
		}
	})
})
signUpForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const email = (document.querySelector("#signup-email") as HTMLInputElement);
	const password = (document.querySelector("#signup-password") as HTMLInputElement);
	signUp(email.value, password.value);
})
loginBtn.addEventListener("click", () => {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    loginBtn.classList.add("active");
    registerBtn.classList.remove("active");
});
registerBtn.addEventListener("click", () => {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    registerBtn.classList.add("active");
    loginBtn.classList.remove("active");
});
logOutBtn.addEventListener("click", (event) =>{
	event.preventDefault();
	formBox.style.display = "none"
	loginContainer.style.display = "block";
	const email = (document.querySelector("#email") as HTMLInputElement);
	const password = (document.querySelector("#password") as HTMLInputElement);
	signOut();
	email.value = "";
	password.value = "";
} )

window.onload = () => {
	if (localStorage.sbXqnbfgkbaszibshmrqtrAuthToken) {
	formBox.style.display = "block";
	loginContainer.style.display = "none";
	}
}