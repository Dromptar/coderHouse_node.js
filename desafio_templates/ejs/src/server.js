const express = require('express');
const app = express();
const path = require("path");

const viewsFolder = path.join(__dirname, "views");

const Container = require("./managers/Container");
const productsService = new Container("products.txt");

app.listen(8080, () => console.log('Server listening on port 8080'));

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set("views", viewsFolder);

app.get("/", (req, res) => {
    res.render("home", {
        msg: "Welcome! Take a chair, have a beer and enjoy"
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