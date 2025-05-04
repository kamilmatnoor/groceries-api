const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        product_name: {
            type: String,
            required: [true, "Product Name is required"],
        },
        product_description: {
            type: String,
        },
        product_brand: {
            type: String,
            required: [true, "Brand is required"],
        },
        product_barcode: {
            type: String,
            required: [true, "Barcode is required"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
