const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.readData();
  }

  readData() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data) || [];
    } catch (error) {
      this.products = [];
    }
  }

  saveData() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    this.readData();

    // Validar campos obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios");
    }

    // Validar que no se repita el campo "code"
    const existingProduct = this.products.find(product => product.code === code);
    if (existingProduct) {
      throw new Error("Código de producto duplicado. No se puede agregar el producto.");
    }

    // Crear un producto con id autoincrementable
    const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;

    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    // Agregar el nuevo producto al array
    this.products.push(newProduct);
    this.saveData();

    // Devolver el ID generado automáticamente
    return id;
  }

  getProducts() {
    this.readData();
    return this.products;
  }

  getProductById(id) {
    this.readData();
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new Error("Not found");
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    this.readData();
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado. No se puede actualizar.");
    }

    // Actualizar el producto manteniendo el ID
    this.products[index] = { ...this.products[index], ...updatedFields };
    this.saveData();
  }

  deleteProduct(id) {
    this.readData();
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado. No se puede eliminar.");
    }

    // Eliminar el producto del array
    this.products.splice(index, 1);
    this.saveData();
  }

  async getProducts(limit) {
    this.readData();
    // Lógica para devolver productos según el límite
  }

  async getProductById(id) {
    this.readData();
    // Lógica para devolver un producto por ID
  }
}

// Uso de la clase
// const manager = new ProductManager('productos.json');

// try {
//   console.log(manager.getProducts()); // []

//   const productId = manager.addProduct({
//     title: "producto prueba",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "abc123",
//     stock: 25
//   });

//   console.log(manager.getProducts()); // [{ id: 1, title: "producto prueba", ... }]

//   const productById = manager.getProductById(productId);
//   console.log(productById); // { id: 1, title: "producto prueba", ... }

//   // Intentar agregar un producto con el mismo código debería arrojar un error
//   try {
//     manager.addProduct({
//       title: "producto duplicado",
//       description: "Este es un producto duplicado",
//       price: 150,
//       thumbnail: "Otra imagen",
//       code: "abc123", // Código duplicado
//       stock: 20
//     });
//   } catch (error) {
//     console.error(error.message); // "Código de producto duplicado. No se puede agregar el producto."
//   }

//   // Intentar actualizar un campo de algún producto
//   try {
//     manager.updateProduct(productId, { price: 250 });
//     console.log(manager.getProducts()); // [{ id: 1, title: "producto prueba", price: 250, ... }]
//   } catch (error) {
//     console.error(error.message); // Mensaje de error si algo sale mal
//   }

//   // Intentar eliminar un producto
//   try {
//     manager.deleteProduct(productId);
//     console.log(manager.getProducts()); // []
//   } catch (error) {
//     console.error(error.message); // Mensaje de error si algo sale mal
//   }

// } catch (error) {
//   console.error(error.message); // En caso de algún error inesperado durante el testing
// }

module.exports = ProductManager;


