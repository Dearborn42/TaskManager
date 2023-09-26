

window.onload = function() {
    const checkboxes = document.querySelectorAll("#checkbox");
    for(let i=0; i<checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", function() {
            if (this.checked)
                document.getElementById(`${i+1}`).classList.add("completed");
            else
                document.getElementById(`${i+1}`).classList.remove("completed");
        });
    }
};


function editTaskName(id){
    const name = prompt("Please enter a new name");
    fetch(`/name/${id}`, {
        method: "PUT",
        headers: {'Content-type': "application/json"},
        body: JSON.stringify({name})
    }).then((res) => {
        if(res.status === 200)
            window.location.reload();
    })
}

function editTaskDesc(id){
    const desc = prompt("Please enter a new desc");
    fetch(`/desc/${id}`, {
        method: "PUT",
        headers: {'Content-type': "application/json"},
        body: JSON.stringify({desc})
    }).then((res) => {
        if(res.status === 200)
            window.location.reload();
    })
}

function createTask(){
    const name = prompt("Please enter the name");
    const desc = prompt("Please enter the desc"); 
    fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name, desc: desc})
    }).then((res) => {
        if(res.status === 200)
            window.location.reload();
    })
}

function deleteTask(id){
    fetch(`/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then((res) => {
        if(res.status === 200)
            window.location.reload();
    })
}