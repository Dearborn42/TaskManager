function assignTask(email){
    let tasks = prompt("Enter Task Name");
    fetch(`/admin/assign/${window.location.search}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tasks })
    }).then((res) => {
        if(res.status === 202)
            window.location.reload();
    })
}

function removeTask(email){
    fetch(`/admin/removeTask/${window.location.search}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    }).then((res) => {
        if(res.status === 202)
            window.location.reload();
    })
}

function editUser(email){
    fetch(`/admin/edit/${email}${window.location.search}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    }).then((res) => {
        window.location.href = res.url;
    })
}

function deleteUser(email){
    fetch(`/admin/deleteUser${window.location.search}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email })
    }).then((res) => {
        window.location.reload();
    })
}


function createUser(){
    fetch(`/admin/create${window.location.search}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
    }).then((res) => {
        if(res.status === 202)
            window.location.href = res.url;
    })
}


const searchUsers = document.getElementById('searchUsers');
const searchTasks = document.getElementById('searchTasks');
const user_divs = document.getElementsByClassName('user_search');
const task_divs = document.getElementsByClassName('task_search');

searchUsers.addEventListener('input', filterUsers);
searchTasks.addEventListener('input', filterTasks);

function filterUsers() {
    const searchTerm = searchUsers.value.toLowerCase();
    for (let i = 0; i < user_divs.length; i++) {
        const divText = user_divs[i].textContent.toLowerCase();
        if (divText.includes(searchTerm))
            user_divs[i].style.display = 'block';
        else
            user_divs[i].style.display = 'none';
    }
}

function filterTasks() {
    const searchTask = searchTasks.value.toLowerCase();
    for (let i = 0; i < task_divs.length; i++) {
        const divText = task_divs[i].textContent.toLowerCase();
        if (divText.includes(searchTask)) 
            task_divs[i].style.display = 'block';
        else
            task_divs[i].style.display = 'none';
    }
}
