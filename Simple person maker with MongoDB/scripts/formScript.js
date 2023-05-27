let formWrapper = document.createElement("div");
formWrapper.id = "formWrapper"
document.body.appendChild(formWrapper)


function createForm() {
    formWrapper.innerHTML += `<div id="formWrapper">
<button id="closeFormButton"><i class="fa-solid fa-xmark"></i></button>
<form id="form" action="/people" method="post">
    <label for="name">Name:</label><br>
    <input type="text" id="name" name="name" required><br>
    <label for="age">Age:</label><br>
    <input type="number" id="age" name="age" required><br>
    <label for="gender">Gender:</label><br>
    <select id="gender" name="gender" required>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select><br>
    <input type="submit" value="Submit">
</form>
</div>`
}
createForm();

let form = document.getElementById("form");
let dataForm = document.getElementById("formWrapper");
let closeFormButton = document.getElementById("closeFormButton");
let openFormButton = document.getElementById("openFormButton");

dataForm.addEventListener("submit", onSubmit = (event) => {
    event.preventDefault();
    let dataa = Object.fromEntries(new FormData(event.target).entries());
    fetch("/people", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataa)
    }).then((res) => {
        location.reload()
    })
})

closeFormButton.addEventListener("click", function () {
    dataForm.style.display = "none"
    openFormButton.style.display = "block"
})
openFormButton.addEventListener("click", function () {
    dataForm.style.display = "flex"
    openFormButton.style.display = "none"
})