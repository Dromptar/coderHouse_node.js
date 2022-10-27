const fs = require("fs");

class Contenedor {
    constructor(name) {
        this.filename = name;
    }

    async save(product) {
        try {
            if (fs.existsSync(this.filename)) {
                const productos = await this.getAll();
                if(productos.length > 0) {
                // agregar un product adicional
                    const lastId = productos[productos.length - 1].id + 1;
                    product.id = lastId;
                    productos.push(product);
                    await fs.promises.writeFile(this.filename, JSON.stringify(productos, null, 2));
                } else {
                // agregamos un primer producto
                    product.id = 1;
                    await fs.promises.writeFile(this.filename, JSON.stringify([product], null, 2)); // null y 2 para el formato de columnas de JSON
                }
            } else {
                // agregamos un primer producto
                product.id = 1;
                await fs.promises.writeFile(this.filename, JSON.stringify([product], null, 2)); // null y 2 para el formato de columnas de JSON
            }
        } catch (error) {
            return "El producto no pudo ser guardado";
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.filename, "utf-8");
            if(contenido.length > 0) {
                const productos = JSON.parse(contenido);
                return productos;
            } else {
                return [];
            }                 
        } catch (error) {
            return "El archivo no se pudo leer";
        }
    }
    
    async getById(id) {
        try {
            // obtener todos los products
            const productos = await this.getAll();
            // buscar nuestro producto via el id
            const product = productos.find(el => el.id === id);
            return product;
        } catch (error) {
            return "El producto no se encuentra";
        }
    }

    async deleteById(id) {
        try {
            const productos = await this.getAll();
            //crear un array sin el id pasado en parametro
            const newProducts = productos.filter(el => el.id !== id);
            await fs.promises.writeFile(this.filename, JSON.stringify(newProducts, null, 2));
            return `El producto con el id: ${id} fue eliminado`
        } catch (error) {
            return "El elemento no se pudo eliminar";
        }
    }

    async deleteAll() {
        try {
            const productos = await this.getAll();
            const emptyProducts = productos.splice(0, productos.length);
            console.log(emptyProducts.length);
            await fs.promises.writeFile(this.filename, JSON.stringify(productos, null, 2));
            return "Los elementos ya fueron eliminados con exito";
        } catch (error) {
            return "No se pudieron borrar los elementos";
        }      
    }

    getName() {
        return this.filename;
    }
}

const producto1 = {
    title: "Camisa deportiva",
    price: 500,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_822877-MLA46374685703_062021-W.jpg"
}
const producto2 = {
    title: "zapatilla deportiva",
    price: 10000,
    thumbnail: "https://contents.mediadecathlon.com/p2175064/k$a323df0c88381a47cf8c79a3a38aeb5f/sq/chaussures.jpg?format=auto&f=800x0"
}

// creating an instance of class Contenedor
const manejadorProductos = new Contenedor("productos.txt");
console.log(manejadorProductos);

const getData = async() => {
    // guardar un producto
    // await manejadorProductos.save(producto1);
    // await manejadorProductos.save(producto2);

    // mostrar/leer los productos
    // const productos = await manejadorProductos.getAll();
    // console.log("productos", productos);

    // //encontrar un producto via su id
    // const productFound= await manejadorProductos.getById(2);
    // console.log("Product found :", productFound);
    // await manejadorProductos.deleteById(1);

    // borrar todos los elementos del archivo
    // await manejadorProductos.deleteAll();
}
getData();


module.exports = Contenedor;