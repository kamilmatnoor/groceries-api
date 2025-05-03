const Product = (() => {
    const getAll = () =>
        new Promise((resolve, reject) => {
            resolve({ error: false, message: "Success: Product, response from controller" });
        });

    return {
        getAll
    }
})();

module.exports = Product;