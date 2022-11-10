const express = require('express');
const app = express();
const path = require("path");

const Container = require("./managers/Container");
const productsService = new Container("products.txt");

const viewsFolder = path.join(__dirname, "views");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.set("views", viewsFolder);


app.listen(8080, () => {
    console.log("Server listening on port: 8080");
})

app.set("views", __dirname + "/views");

app.set("view engine", "pug");



app.get("/", (req, res) => {
    res.render("home",{
        message: "Well, this is a pug test!"
    })
})

app.get("/products", async (req, res) => {
    const products = await productsService.getAll();
    console.log(products);
    res.render("products", {
        products : products
    });
})

app.post("/products", async (req, res) => {
    const newProduct = req.body;
    await productsService.save(newProduct);
    res.redirect("/");
})