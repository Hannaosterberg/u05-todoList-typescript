// const addTodoBtn = document.querySelector(".add-todo") as HTMLButtonElement;
// const userInput = document.querySelector("input") as HTMLInputElement;
// const toDoList = document.querySelector(".todo-List") as HTMLUListElement;
// const clearBtn = document.querySelector(".clear-todo-list") as HTMLButtonElement;
// interface Todo {
// 	id: number,
// 	text: string,
// 	completed: boolean
// }

// let addedToDos: Todo[] = [];


// const displayToDo = (): void => {
// 	toDoList.innerHTML = "";
// 	addedToDos.forEach((todo) => {
// 		const todoElement = document.createElement("li") as HTMLLIElement;
// 		todoElement.innerHTML = `
// 								<input type="checkbox" ${todo.completed ? "checked" : ""} class = "checkbox" data-id = "${todo.id}">	
// 								<span class = "todo-text" data-id = "${todo.id}" >${todo.text}</span>
// 								<button class = "edit-todo" data-id="${todo.id}">
// 								<img class = "edit"src="./src/img/edit-pencil-svgrepo-com.svg" alt="edit button">
// 								</button>
// 								<button class = "remove-todo" data-id="${todo.id}">
// 								<img class = "trashcan" src="./src/img/delete-svgrepo-com.svg" alt="trashcan button">
// 								</button>
// 								`
// 	toDoList.appendChild(todoElement);
// 	});
// 	addEventListeners();
// }

// const addToDo = (): void => {
// 	const newTodoText: string = userInput.value.trim();
// 	if(newTodoText) {
// 		const newTodo: Todo = {
// 			id: Date.now(),
// 			text: newTodoText,
// 			completed: false
// 		};
// 		addedToDos.push(newTodo);
// 		userInput.value = "";
// 		saveToLocalStorage();
// 		displayToDo();
// 	}

// }
// const editText = (id: number, newText: string): void => {
// 	const todo: Todo | undefined = addedToDos.find(todo => todo.id === id);
// 	if(todo) {
// 		todo.text = newText;
// 		saveToLocalStorage();
// 		displayToDo();
// 	}
// }
// const isDone = (status: number): void => {
// 	const todo: Todo | undefined = addedToDos.find(todo => todo.id === status);
// 	if(todo) {
// 		todo.completed = !todo.completed;
// 		saveToLocalStorage();
// 		displayToDo();
// 	}
// }

// const removeToDo = (id: number): void => {
// 	addedToDos.splice(id);
// 	saveToLocalStorage();
// 	displayToDo();
// }

// const clearTodos = (): void => {
// 	addedToDos = [];
// 	saveToLocalStorage();
// 	displayToDo();
// }

// const saveToLocalStorage = (): void => {
// 	localStorage.setItem("todos", JSON.stringify(addedToDos));
// }
// const loadFromLocalStorage = (): Todo[] => {
// 	const savedTodos: string | null = localStorage.getItem("todos");
// 	return savedTodos ? JSON.parse(savedTodos) as Todo[] : [];
// }

// const addEventListeners = (): void => {
// 	const checkboxes = document.querySelectorAll(".checkbox");
// 	checkboxes.forEach(checkbox => {
// 		checkbox.addEventListener("change", (event) => {
// 			const id: number = parseInt((event.target as HTMLInputElement).dataset.id!);
// 			isDone(id);
// 		});
// 	});

// 	const editButtons = document.querySelectorAll(".edit-todo");
// 	editButtons.forEach(button => {
// 		button.addEventListener("click", (event) => {
// 			const id: number = parseInt((event.target as HTMLButtonElement).dataset.id!);
// 			const span = document.querySelector(`.todo-text[data-id="${id}"]`) as HTMLSpanElement;
// 			const newText = prompt("Edit your todo:", span.innerText);
// 			if(newText !== null) {
// 				editText(id,newText);
// 			}
// 		});
// 	});

// 	const removeButtons = document.querySelectorAll(".remove-todo");
// 	removeButtons.forEach(button => {
// 		button.addEventListener("click", (event) => {
// 			const id: number = parseInt((event.target as HTMLButtonElement).dataset.id!)
// 			removeToDo(id);
// 		});
// 	});

// 	if(clearBtn) {
// 		clearBtn.addEventListener("click", (event) => {
// 			clearTodos();
// 		})
// 	}
// }

// addTodoBtn.addEventListener("click", (event)=> {
// 	event.preventDefault();
// 	addToDo();
// })
// displayToDo();