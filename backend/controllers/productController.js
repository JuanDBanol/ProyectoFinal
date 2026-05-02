const Product = require("../models/Product");

// CREAR producto
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({ message: "Campos obligatorios faltantes" });
        }

        const product = new Product({
            name,
            description,
            price,
            stock
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTENER todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// OBTENER producto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ACTUALIZAR producto
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ELIMINAR producto
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};