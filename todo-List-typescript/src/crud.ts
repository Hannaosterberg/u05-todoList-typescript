import supabase from "./supabaseClient.ts";
import { Todo } from "./main.ts";
import { displayToDo } from "./main.ts";


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
    if(error) {
        console.error("Error, couln't insert items", error)
    };
    displayToDo()
}
export async function updateEditTodo(id: string, newText: string) {
    const {error} = await supabase
    .from("TodoList")
    .update({text: `${newText}`})
    .eq("id", id)
    displayToDo()
    if(error) {
        console.error("Error, couldn't update items", error)
    };
}
export async function updateCompleteTodo(task: Todo[]) {
    console.log(task);
    const newStatus = task[0].completed ? false : true;
    const {error} = await supabase
    .from("TodoList")
    .update({completed: newStatus})
    .eq("id", task[0].id)
    displayToDo()
    if(error) {
        console.error("Error, couldn't update items", error)
    };
}
export async function deleteTodo(id: string) {
    const {error} = await supabase
    .from("TodoList")
    .delete()
    .eq("id", id)
    displayToDo()
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


