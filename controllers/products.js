const ProductModel = require("../models/product");

const Product = (() => {
    const get = (options) =>
        new Promise(async (resolve, reject) => {
            const query = {};

            if (options.searchText && options.searchText.trim() !== '') {
                query.$or = [
                    { product_name: { $regex: options.searchText, $options: 'i' } },
                    { product_brand: { $regex: options.searchText, $options: 'i' } }
                ];
            }

            const sortOptions = {};
            if (options.sortField && options.sortOrder) {
                sortOptions[options.sortField] = options.sortOrder === 'asc' ? 1 : -1;
            }

            const page = parseInt(options.currentPage) || 1;
            const limit = parseInt(options.itemsPerPage) || 20;
            const skip = (page - 1) * limit;

            const products = await ProductModel.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);
                console.log(products);
            resolve({ error: false, message: "Success: getAll Product, response from controller", data: products });
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


    const update = (reqProduct, id) =>
        new Promise(async (resolve, reject) => {
            const updatedProduct = await ProductModel.findByIdAndUpdate(
                id,
                reqProduct,
                { new: true }
            );

            resolve({ error: false, message: "Success: update Product, response from controller", data: updatedProduct });
        });

    const deleteProduct = (id) =>
        new Promise(async (resolve, reject) => {
            console.log(id);
            await ProductModel.findByIdAndDelete(id);
            resolve({ error: false, message: "Success: delete Product, response from controller" });
        });

    return {
        get,
        getById,
        create,
        update,
        deleteProduct
    }
})();

module.exports = Product;
