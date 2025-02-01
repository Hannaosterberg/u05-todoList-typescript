import supabase from "./supabaseClient.ts";
import { Todo } from "./main.ts";
import { displayToDo } from "./main.ts";


supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        console.log('User signed in:', session);
        displayToDo(); 
    } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
    }
});

export async function fetchItems() {
    const {data, error} = await supabase
    .from("TodoList")
    .select('*')
    if(error) {
        console.error("Couldn't fetch items", error)
        return [];
    } else {
        return data;
    };
}
export async function insertItems(task: Todo) {
    const {error} = await supabase
    .from("TodoList")
    .insert([task])
    displayToDo();
    if(error) {
        console.error("Error, couln't insert items", error)
    };
}
export async function updateEditTodo(id: string, newText: string) {
    const {error} = await supabase
    .from("TodoList")
    .update({text: newText})
    .eq("id", id)
    if(error) {
        console.error("Error, couldn't update items", error)
    } else {
        const todoSpan = document.querySelector(`.todo-text[data-id="${id}"]`) as HTMLSpanElement;
        if(todoSpan) {
            todoSpan.innerText = newText;
        }
    }
}
export async function updateCompleteTodo(task: Todo[]) {
    const todo = task[0];
    const checkBox = document.querySelector(`.checkbox[data-id="${task[0].id}"]`) as HTMLInputElement;
    if (checkBox) {
        const newStatus = checkBox.checked;
        const {error} = await supabase
        .from("TodoList")
        .update({completed: newStatus})
        .eq("id", todo.id);
    if(error) {
        console.error("Error, couldn't update items", error)
    } else {
        console.log("Status updated:", newStatus)
        }
    }
}
export async function deleteTodo(id: string) {
    const {error} = await supabase
    .from("TodoList")
    .delete()
    .eq("id", id)
    displayToDo();
    if(error) {
        console.error("Error, coulnd't delete", error)
    };
}

export async function getTodo(id: string ){
    const {data, error} = await supabase
    .from('TodoList')
    .select()
    .eq('id', id);
    if(error) {
        console.error("Error", error)
    } else {
        updateCompleteTodo(data)
    }
}

export async function clearAllTodos() {
    const {data, error} = await supabase
    .from("TodoList")
    .delete()
    .neq("id", 0);
    if(error) {
        console.error("Error, couln't delete all items", error)
    } else {
        console.log("All todos deleted", data);
        displayToDo();
    }
}

