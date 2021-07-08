const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        reference: {
            type: String,
            required: true,
            unique:true,
            minlength:5,
            maxlength:12        },
       
        customer_name: {
            type: String,
            required: true
        },
        address_delivery: {
            type: String,
            required: true,
            unique:true,
            minlength:5,
            maxlength:12
        },
        address_invoice: {
            type: String,
            required: true,
            unique:true,
            minlength:5,
            maxlength:12
        },
        // products: {
        //     type: String,
        //     required: true
        // },
        products: {
            type: Array,
            properties: {
                product_name: { type: String},
                quantity:           { type: String },
                unit_price:          {type: String},
                product_total:          {type: String}

            },
           // required: [product_name, quantity, unit_price,product_total]
          },
          total: {
            type: String,
            required: true
        },

        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }

    }
);

module.exports = Order = mongoose.model("orders", OrderSchema);