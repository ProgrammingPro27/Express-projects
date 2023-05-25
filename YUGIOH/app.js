const express = require("express");
const app = express();
const fs = require("fs")
app.use("/cardImages", express.static(__dirname + "/cardImages"));

app.use("/styles", express.static(__dirname + "/styles"));

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
})
app.get("/cardForm", (req, res) => {
    res.sendFile("cardMaker.html", { root: __dirname });
})
app.get("/cardData", (req, res) => {
    res.sendFile("cards.json", { root: __dirname });
})
app.get("/deck", (req, res) => {
    res.sendFile("deck.html", { root: __dirname });
})

app.get("/currentProfile", (req, res) => {
    res.sendFile("currentProfile.json", { root: __dirname });
})
app.listen(3000, function () {
    console.log("server listening on port 3000")
})

//=====================================

app.get("/cardData/:id", (req, res) => {
    const userId = req.params.id.split(":").join("");
    fs.readFile('./cards.json', 'utf8', function (err, data) {
        let dataaa = JSON.parse(data)
        if (dataaa[userId]) {
            res.send(dataaa[userId]);
        }
    });
})

let fileUpload = require("express-fileupload")
app.use(fileUpload());

app.post('/cardImages', function (req, res) {
    let file = req.files.filename
    let fileName = file.name
    file.mv("./cardImages/" + fileName, function (err) {
        res.send(JSON.stringify({ status: 'success', path: '/' + fileName }))
    })
});

app.use(express.json());

app.post('/cardData', function (request, response) {
    response.send(request.body);
    const fileName = './cards.json';
    const file = require(fileName);

    request.body.attack = Number(request.body.attack)
    request.body.defence = Number(request.body.defence)

    delete (request.body.Image)

    file[Date.now()] = request.body;

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
    });

});

app.post('/currentProfile', function (request, response) {
    response.send(request.body);
    const fileName = './currentProfile.json';

    fs.writeFile(fileName, JSON.stringify(request.body), function writeJSON(err) {
        if (err) return console.log(err);
    });

});