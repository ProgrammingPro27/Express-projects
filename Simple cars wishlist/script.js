let carOffersHolder = document.getElementById("carsWrapper")
let form = document.getElementById("form")

const handleImageUpload = event => {

  const formData = new FormData()

  formData.append('filename', event)

  fetch('/', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
}

function loadAllCards() {
  fetch('/data')
    .then((response) => response.json())
    .then((data) => {
      for (let i in data) {
        makeCard(data[i])
      }
    });
}

loadAllCards()

form.addEventListener("submit", onSubmit = (event) => {
  event.preventDefault();
  let dataa = Object.fromEntries(new FormData(event.target).entries());

  handleImageUpload(dataa.Image)

  dataa.Image = dataa.Image.name
  fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataa)
  }).then((response) => response.json()).then((dataa) => makeCard(dataa))
}

)

function something(e) {
  let currID
  if (e.target.tagName === "DIV" && e.target.parentElement.id === "carsWrapper") {
    currID = e.target.id
  }
  if (e.target.className === "info") {
    currID = e.target.parentElement.id
  }
  if (currID) {
    window.open(currID)
  }
}

carOffersHolder.addEventListener('click', something);

function makeCard(dataa) {
  let frame = document.createElement("div");
  for (let i in dataa) {
    if (i != "Image" && i != "Link") {
      let text = document.createElement("p");
      text.className = "info"
      text.innerHTML = `${i}:</br>${dataa[i]}`
      frame.appendChild(text)
    }
  }
  frame.id = dataa.Link

  //===========================
  let file = document.querySelector('input[type=file]').files[0];
  let reader = new FileReader();

  reader.onloadend = function () {
    frame.style.backgroundImage = `url(${reader.result})`
  }
  if (file) {
    reader.readAsDataURL(file);
  }
  //===========================
  frame.style.backgroundImage = `url(/${dataa.Image})`
  carOffersHolder.appendChild(frame)
}