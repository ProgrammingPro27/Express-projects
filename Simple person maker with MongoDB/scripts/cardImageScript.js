let wrapper = document.createElement("div");
wrapper.className = "wrapper"
document.body.appendChild(wrapper)

function createCard(name, age, gender) {
    let genderClass = "cardMale"
    if (gender == "Female") {
        genderClass = "cardFemale"
    }
    wrapper.innerHTML += `<div class="card ${genderClass}" >
<p class="card-value">Name: <span class="card-value-marker">${name}</span></p>
<p class="card-value">Gender: <span class="card-value-marker">${gender}</span></p>
<p class="card-value">Age: <span class="card-value-marker">${age}</span></p>
</div>`
};
// createCard("Ivan Ivanov", "Male", 20);
// createCard("Ivana Belova", "Female", 22);