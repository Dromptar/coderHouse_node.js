const express = require("express");
const Contenedor = require("./Contenedor")
const app = express();
const PORT = 8080;

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});

const productsContainer = new Contenedor("productos.txt");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

//Rutas
app.get("/", (req, res) => {
    res.send("<h1 style='color:green'>Bienvenido al servidor express</h1>");
});

let visitas = 0;
app.get("/visitas", (req, res) =>{
    visitas++;
    res.send(`La cantidad de visitas es ${visitas}`);
})

app.get("/Simon", (req, res) => {
    res.send(`Hi Simon!`)
})

// ruta de productos
app.get("/products", async (req, res) => {
    const products = await productsContainer.getAll();
    res.send(products);   
})

//ruta de productos Random
app.get("/productrandom", async(req, res) => {
    const products = await productsContainer.getAll();
    const randomId = getRandomInt(products.length);
    const randomProduct = await productsContainer.getById(randomId);
    res.send(randomProduct);
})