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

}

function deleteUser(email){

}