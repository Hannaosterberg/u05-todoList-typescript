import supabase from "./supabaseClient.ts";

export async function signUp(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
        email,
        password,
    });
    if(error) {
        console.error("Error signing up: ", error.message);
        return;
    }
    const registerMessage = document.querySelector(".register-message") as HTMLDivElement;
    if(registerMessage) {
        registerMessage.innerHTML = "Register sucess! You can now log in";
    }
    console.log("User signed up");
}
export async function signIn(email:string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if(error) {
        console.error("Error signing in", error.message)
        alert("Wrong email or password, try again")
        return;
    }
    const {data: session, error: sessionError} = await supabase.auth.getSession();
    if(sessionError) {
        console.error("error getting session", sessionError.message);
        return false;
    }
    if(!session) {
        alert("No session-ID, try again")
        return false
    }
    console.log("user signed in")
    return true;
}
export async function signOut() {
    const {error} = await supabase.auth.signOut();
    if(error) {
        console.error("Error logging out: ", error.message);
        return {error}
    }
}

