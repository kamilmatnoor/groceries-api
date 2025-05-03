const ProductModel = require("../models/product");

const Product = (() => {
    const getAll = () =>
        new Promise(async (resolve, reject) => {
            const product = await ProductModel.find();
            resolve({ error: false, message: "Success: getAll Product, response from controller", data: product });
        });

    const getById = (id) =>
        new Promise(async (resolve, reject) => {
            const product = await ProductModel.findById(id);
            resolve({ error: false, message: "Success: getById Product, response from controller", data: product });
        });

    const create = (reqProduct) =>
        new Promise(async (resolve, reject) => {
            const { product_name, product_description, product_brand, product_barcode } = reqProduct;
            const product = await ProductModel.create({ product_name, product_description, product_brand, product_barcode, });
            resolve({ error: false, message: "Success: create Product, response from controller", data: product });
        });


    const update = (product, id) =>
        new Promise((resolve, reject) => {
            resolve({ error: false, message: "Success: update Product, response from controller" });
        });

    const deleteProduct = (id) =>
        new Promise((resolve, reject) => {
            resolve({ error: false, message: "Success: delete Product, response from controller" });
        });

    return {
        getAll,
        getById,
        create,
        update,
        deleteProduct
    }
})();

module.exports = Product;
