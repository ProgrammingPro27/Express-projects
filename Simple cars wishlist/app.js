const express = require("express");
let fileUpload = require("express-fileupload")

const app = express();
const fs = require('fs');
app.listen(3000)

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(fileUpload());

app.use(express.static('./carPictures'));


app.post('/', function (req, res) {
    let file = req.files.filename
    let fileName = file.name
    file.mv("./carPictures/" + fileName, function (err) {
        res.send(JSON.stringify({ status: 'success', path: '/' + fileName }))
    })
});


app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
})
app.get("/data", (req, res) => {
    res.sendFile("data.json", { root: __dirname });
})

app.get("/s1", (req, res) => {
    res.sendFile("script.js", { root: __dirname });
})
app.get("/style", (req, res) => {
    res.sendFile("style.css", { root: __dirname });
})


app.post("/data", (req, res) => {
    res.send(req.body);

    fs.readFile('./data.json', 'utf8', function (err, data) {
        let dataaa = JSON.parse(data)
        let newData = JSON.parse(JSON.stringify(req.body))

        dataaa[Date.now()] = newData

        fs.writeFile('./data.json', JSON.stringify(dataaa), err => {
            if (err) {
                console.error(err);
            }
        });
    });
})