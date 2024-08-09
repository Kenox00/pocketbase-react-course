import PocketBase from 'pocketbase';

const url = `https://cream-means.pockethost.io/`;
export const client = new PocketBase(url);
client.autoCancellation(false);

export async function getTasks() {
    return await client.collection("Tasks").getFullList();
}

export async function createTask(title, description) {
    const data = { Title: title, Description: description };
    return await client.collection("Tasks").create(data);  
}

export async function deleteTask(id) {
    let confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) {
        return;
    } 
    await client.collection("Tasks").delete(id);
    window.location.reload();
}

export async function updateTask(id, title, description) {
    const data = { Title: title, Description: description };
    return await client.collection("Tasks").update(id, data);  // Fixed: pass the data object
}

export async function toggelTask(id,title,completed) {
    const data = { Title: title, completed: completed };
    return await client.collection("Tasks").update(id, data);  
}
