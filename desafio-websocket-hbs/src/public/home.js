console.log("js home view");
const socketClient = io();

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    // console.log("product", product)
    socketClient.emit("newProductAdded", product);
});

const productsContainer = document.getElementById("productsContainer");

socketClient.on("productsArray", async (data) => {
    console.log(data);
    const templateTable = await fetch("./templates/table.handlebars");
    const templateFormat = await templateTable.text();
    // console.log(template)
    const template = Handlebars.compile(templateFormat);
    const html = template({products: data});
    console.group(html);
    productsContainer.innerHTML = html;
})