const express = require('express');
const ProductManager = require('./ProductManager'); // Ajusta la ruta según tu estructura de archivos

const app = express();
const port = 8080;

app.get('/products', async (req, res) => {
  try {
    const productManager = new ProductManager('productos.json'); // Mover la instancia aquí
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productManager = new ProductManager('productos.json'); // Mover la instancia aquí
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
