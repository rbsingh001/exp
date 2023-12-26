function myfunction() {

    let amount = document.getElementById("expence").value;

    let description = document.getElementById("des").value;

    let category = document.getElementById("category").value;

    const exp = {
        amount: amount,
        description: description,
        category: category
    }
    axios
        .post('http://localhost:3000/add-exp',
            exp
        )
        .then(res => {

            console.log('res-data');

            ShowNewExp(res.data);

            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })

}

function ShowNewExp(ex) {
    document.getElementById("expence").value = "";

    document.getElementById("des").value = "";

    document.getElementById("category").value = "";
    console.log(ex.id);
    let eid = ex.id;

    let ul = document.getElementById("ul")

    let li = document.createElement("li");
    let t = document.createTextNode(ex.amount + " " + ex.description + " " + ex.category);

    li.appendChild(t);
    li.setAttribute('id', eid);
    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    let list = document.getElementById("ul")
    deleteButton.addEventListener("click", function () {
        deleteExp(eid);

    })

    // var editbtn = document.createElement('button');
    // editbtn.innerText = 'Edit';
    // editbtn.addEventListener("click", function () {
    //     editUser(u_id);
    // })

    li.appendChild(deleteButton);
    // li.appendChild(editbtn);


    li.setAttribute("id", `${eid}`);
    ul.appendChild(li);
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000")
        .then((response) => {
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                ShowNewExp(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

function deleteExp(x) {
    axios.delete(`http://localhost:3000/exp/${x}`)
    .then((response) => {
            if(response.status === 204){
                var liToRemove = document.getElementById(`${x}`);

                if (liToRemove) {
                liToRemove.remove();

                }
                else{
                    console.error('Delete Req was not successful');
                }
            }
            
        })
        .catch((error) => console.log(error));
}