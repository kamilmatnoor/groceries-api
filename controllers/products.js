const Product = (() => {
    const getAll = () =>
        new Promise((resolve, reject) => {
            resolve({ error: false, message: "Success: getAll Product, response from controller" });
        });

    const getById = (id) =>
        new Promise((resolve, reject) => {
            resolve({ error: false, message: "Success: getById Product, response from controller" });
        });

    const create = (product) =>
        new Promise((resolve, reject) => {
            resolve({ error: false, message: "Success: create Product, response from controller" });
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
