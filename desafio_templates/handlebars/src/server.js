const express = require('express');
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();

const Container = require("./managers/Container");
const productsService = new Container("products.txt");

const viewsFolder = path.join(__dirname, "views");
// console.log(viewsFolder);

app.listen(8080, ()=> console.log("Server listening on port 8080"));

//Middleware para interpretar la info que llega en formato json a traves de una solicitud
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Vamos a inicializar nuestro motor de plantillas
app.engine("handlebars", handlebars.engine());

//Donde tengo las vistas en mi proyecto
app.set("views", viewsFolder);

//Que motor de plantillas voy a utilizar
app.set("view engine", "handlebars");

let users = [
    {name: "Muradin", age: 112},
    {name: "Cairn", age: 73},
    {name: "Sylvanas", age: 32},
    {name: "Thrall", age: 57}
];

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/products", async (req, res) => {
    const products = await productsService.getAll();
    console.log(products);
    res.render("products", {
        products : products
    });
})

app.get("/contact", (req, res) => {
    res.render("contact")
})

app.get("/users", (req, res) => {
    res.render("users", {
        people: users
    })
})

app.post("/products", async (req, res) => {
    const newProduct = req.body;
    await productsService.save(newProduct);
    res.redirect("/");
})



