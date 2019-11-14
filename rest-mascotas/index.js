const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 8090;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var mascotas = [
    { id: 1, nombre: "pepe trueno", tipo: "Gato", edad: 3, descripcion: "gruñon y juguetón" },
    { id: 2, nombre: "chispita", tipo: "Perro", edad: 5, descripcion: "se comporta muy bien" },
    { id: 3, nombre: "rafael", tipo: "Tortuga", edad: 2, descripcion: "le encanta la lechuga y pasear por la casa (si, también le gusta la pizza)" },
    { id: 4, nombre: "yogui", tipo: "Perro", edad: 1, descripcion: "super activo, le gusta correr mucho" },
    { id: 5, nombre: "piolin", tipo: "Guacamayo", edad: 3, descripcion: "muy colorida, come frutas y ¡habla!" }
];

var tipos = [
    { id: 1, nombre: "Gato" },
    { id: 2, nombre: "Perro" },
    { id: 3, nombre: "Tortuga" },
    { id: 4, nombre: "Guacamayo" },
];

app.post('/tipos', function (req, res) {
    let tipo = req.body;
    let ids = tipos.map(elt => elt.id);
    tipo.id = Math.max(...ids) + 1;
    tipos.push(tipo);
    res.status(201).json(tipo);
});

app.get('/tipos', function (req, res) {
    res.status(200).json(tipos);
});

app.get('/tipos/:id', function (req, res) {
    res.status(200).json(tipos.find(elt => elt.id == req.params.id));
});

app.post('/mascotas', function (req, res) {
    let mascota = req.body;
    let ids = mascotas.map(elt => elt.id);
    if (mascotas.length == 0) {
        mascota.id = 1
    } else {
        mascota.id = Math.max(...ids) + 1;
    }
    mascotas.push(mascota);
    res.status(201).json(mascota);
});

app.get('/mascotas', function (req, res) {
    res.status(200).json(mascotas);
});

app.get('/mascotas/:id', function (req, res) {
    res.status(200).json(mascotas.find(elt => elt.id == req.params.id));
});

app.put('/mascotas', function (req, res) {
    let index = mascotas.findIndex(elt => elt.id == req.body.id);
    if (index >= 0)
        mascotas[index] = req.body;
    res.status(200).send();
});

app.delete('/mascotas/:id', function (req, res) {
    let index = mascotas.findIndex(elt => elt.id == req.params.id);
    if (index >= 0)
        mascotas.splice(index, 1);
    res.status(200).send();
});

app.listen(port, () => {
    console.log("El servidor está inicializado en el puerto " + port);
});