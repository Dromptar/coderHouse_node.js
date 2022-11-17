const express = require('express');
const handlebars = require("express-handlebars");
const path = require("path");
const {Server} = require("socket.io")


const Container = require("./managers/Container");
const productsService = new Container("products.txt");
const viewsFolder = path.join(__dirname, "views");
// console.log(viewsFolder);



const app = express();
app.use(express.static(__dirname+"/public"));

const server = app.listen(8080, ()=> console.log("Server listening on port 8080"));
//Middleware para interpretar la info que llega en formato json a traves de una solicitud
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//Vamos a inicializar nuestro motor de plantillas
app.engine("handlebars", handlebars.engine());

//Donde tengo las vistas en mi proyecto
app.set("views", viewsFolder);

//Que motor de plantillas voy a utilizar
app.set("view engine", "handlebars");

//configuar el socket del lado backend
const io = new Server(server);

io.on("connection", async (socket) => {
    console.log("New client connected");
    socket.emit("productsArray", await productsService.getAll())

    socket.on("newProductAdded", async (data) => {
        await productsService.save(data);

       
        io.sockets.emit("productsArray", await productsService.getAll());
    })
})

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

app.post("/products", async (req, res) => {
    const newProduct = req.body;
    await productsService.save(newProduct);
    res.redirect("/");
})



