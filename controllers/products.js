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

            let totals = 0;


            try {
                totals = await ProductModel.countDocuments(query);
                const products = await ProductModel.find(query)
                    .sort(sortOptions)
                    .skip(skip)
                    .limit(limit);

                if (!products) {
                    resolve({ error: true, message: "Failed: Cannot retrieve product details. Please try again.", data: [] });
                }
                else {
                    resolve({
                        error: false,
                        message: "Product retrieved successfully.",
                        data: products,
                        totals
                    });
                }
            } catch (error) {
                resolve({ error: true, message: "Failed: Something went wrong. Please try again.", data: [] });
            }
        });

    const getById = (id) =>
        new Promise(async (resolve, reject) => {
            try {
                const product = await ProductModel.findById(id);

                if (!product) {
                    resolve({ error: true, message: "Failed: Cannot retrieve product details. Please try again.", data: {} });
                }
                else {
                    resolve({ error: false, message: "Product retrieved successfully.", data: product });
                }
            } catch (error) {
                resolve({ error: true, message: "Failed: Something went wrong. Please try again.", data: {} });
            }
            return;
        });

    const create = (reqProduct) =>
        new Promise(async (resolve, reject) => {
            const { product_name, product_description, product_brand, product_barcode } = reqProduct;
            try {
                const newProduct = await ProductModel.create({ product_name, product_description, product_brand, product_barcode, });
                if (!newProduct) {
                    resolve({ error: true, message: "Failed: Cannot add product. Please try again.", data: {} });
                }
                else {
                    resolve({ error: false, message: "Product added successfully.", data: newProduct });
                }
            } catch (error) {
                resolve({ error: true, message: "Failed: Something went wrong. Please try again.", data: {} });
            }
            return;
        });


    const update = (reqProduct, id) =>
        new Promise(async (resolve, reject) => {
            try {
                const updatedProduct = await ProductModel.findByIdAndUpdate(
                    id,
                    reqProduct,
                    { new: true }
                );
                if (!updatedProduct) {
                    resolve({ error: true, message: "Failed: Incorrect ID or Product not exist.", data: {} });
                }
                else {
                    resolve({ error: false, message: "Product updated successfully.", data: updatedProduct });
                }
            } catch (error) {
                resolve({ error: true, message: "Failed: Something went wrong. Please try again.", data: {} });
            }
            return;
        });

    const deleteProduct = (id) =>
        new Promise(async (resolve, reject) => {
            try {
                const product = await ProductModel.findByIdAndDelete(id);
                if (!product) {
                    resolve({ error: true, message: "Failed: Incorrect ID or Product not exist.", data: {} });
                }
                else {
                    resolve({ error: false, message: "Product deleted successfully.", data: product });
                }
            } catch (error) {
                resolve({ error: true, message: "Failed: Something went wrong. Please try again.", data: {} });
            }
            return;
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
