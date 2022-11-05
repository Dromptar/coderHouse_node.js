const express = require('express');
const app = express();

const Contenedor = require("./Contenedor");
const productsContainer = new Contenedor("productos.txt");

const PORT = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));


app.listen(PORT, () => {
    console.log(`Server is listenig on port ${PORT}`)
})

app.get("/api/products", async (req, res) => {
    const products = await productsContainer.getAll();
    res.send(products);
})

app.get("/api/products/:id", async (req, res) => {
    const allProducts = await productsContainer.getAll();
    const id = parseInt(req.params.id);
    const product = allProducts[id];
    if(isNaN(id)) {
        res.json({
            error: 'Param is not a number'
        })
    } else if (product == undefined) {
        res.json({
            error: "Product doesn't not exist"
        })
    } else {
        res.send({
            product
        })
    }
})

app.post("/api/products", async (req, res) => {
    let product = req.body;
    const addProduct = await productsContainer.save(product)
    res.json({
        addProduct,
        msg: 'Product added'
    })
})

app.put("/api/products/:id", (req, res) => {

})

app.delete("/api/products/:id", async (req, res) => {
    const allProducts = await productsContainer.getAll();
    const id = parseInt(req.params.id);
    const product = allProducts[id];
    const deleteSingleProduct = await productsContainer.deleteById(product);
    if(isNaN(id)) {
        res.json({
            error: 'Param is not a number'
        })
    } else if (product == undefined) {
        res.json({
            error: "Product doesn't not exist"
        })
    } else {
        res.send({
            deleteSingleProduct,
            Msg: 'Product has been deleted'
        })
    }
})