

window.onload = function() {
    const checkboxes = document.querySelectorAll("#checkbox");
    checkboxes.forEach((x) => {
        x.addEventListener("change", function() {
            if (this.checked){
                document.getElementsByClassName(this.classList[0])[0].classList.add("crossed-out");
                document.getElementsByClassName(this.classList[0])[1].classList.add("completed");
                document.getElementsByClassName(this.classList[0])[2].classList.add("completed");
            }  
            else{
                document.getElementsByClassName(this.classList[0])[0].classList.remove("crossed-out");
                document.getElementsByClassName(this.classList[0])[1].classList.remove("completed");
                document.getElementsByClassName(this.classList[0])[2].classList.remove("completed");
            }
        });
    })
};


function editTaskName(id){
    const name = prompt("Please enter a new name");
    fetch(`/users/name/${id}`, {
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
    fetch(`/users/desc/${id}`, {
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
    fetch('/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name, desc: desc})
    }).then((res) => {
        if(res.status === 200)
            window.location.reload();
    })
}

function deleteTask(id){
    fetch(`/users/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then((res) => {
        if(res.status === 200)
            window.location.reload();
    })
}