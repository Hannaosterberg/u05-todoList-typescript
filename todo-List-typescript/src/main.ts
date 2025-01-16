const addTodoBtn = document.querySelector(".add-todo") as HTMLButtonElement;
const todoSection = document.querySelector("section") as HTMLTableSectionElement;
const toDoList = document.querySelector(".todo-List") as HTMLUListElement;
interface Todo {
	id: number,
	text: string,
	completed: boolean
}

const addedToDos: Todo[] = [];

const displayToDo = () => {

}

const addToDo = () => {
	

}
const editText = () => {

}
const isDone = (status: Todo) => {
    status.completed = status.completed ? false : true;
}

const removeToDo = () => {

}

const clearTodos = () => {

}

const addToLocalStorage = () => {

}