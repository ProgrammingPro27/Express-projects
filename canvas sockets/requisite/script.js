let socket = io();

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let wrapper = document.getElementById("wrapper")
let player = document.getElementById("playerName")
let createPlayerButton = document.getElementById("createPlayerButton")

let x = canvas.width / 2;
let y = canvas.height / 2;

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    x = canvas.width / 2;
    y = canvas.height / 2;
});

ctx.textBaseline = 'middle';
ctx.textAlign = "center";
ctx.font = "20px Comic Sans MS";

let players = {

}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * 16);
        color += letters[randomIndex];
    }
    return color;
}

function createDataForCircle(playerInfo) {
    players[playerInfo.name] = { name: playerInfo.name, x: canvas.width / 2, y: canvas.height / 2, color: playerInfo.color }
}

function createCircle(playerName, x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color
    ctx.arc(x, y, 60, 0, 2 * Math.PI);
    ctx.fill()
    ctx.fillStyle = "black"
    ctx.fillText(playerName, x, y);
    ctx.stroke();
}

createPlayerButton.addEventListener("click", function (e) {
  if(player.value.length !=0){
        if (!players[player.value]) {
            socket.emit('create player', { name: player.value, color: getRandomColor() });
            wrapper.style.display = "none"
        } else {
            alert("PLAYER ALREADY EXISTS, PLEASE CHANGE YOUR NAME!")
        }
    }else{
        alert("Type name")
    }
})

socket.on('create player', (data) => {
    createDataForCircle(data)
    if(players[player.value]){
        players[player.value].id = Date.now()
    }
});

window.addEventListener("keypress", function (e) {
    if (players[player.value] && players[player.value].id) {
        switch (e.code) {
            case "KeyW": y -= 10; break;
            case "KeyS": y += 10; break;
            case "KeyA": x -= 10; break;
            case "KeyD": x += 10; break;
        }
        socket.emit('player move', { name: player.value, x, y });
    }
})

socket.on('player move', (data) => {
    players[data.name].x = data.x
    players[data.name].y = data.y
});

function render() {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let amount = Object.entries(players);
    if (amount.length != 0) {
        amount.forEach(ball => {
            createCircle(ball[1].name, ball[1].x, ball[1].y, ball[1].color)
        })
    }
};

render();
