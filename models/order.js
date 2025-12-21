const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
    {
        id: { type: String, required: true},
        name: { type: String, required: true},
        price: { type: Number, required: true, min: 0 },
        qty: { type: Number, required: true, min: 1 },
        image: { type: String, required: true},
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

        items: { type: [orderItemSchema], required: true },

        totalPrice: { type: Number, required: true, min: 0 },

        paymentMethod: { type: String, enum: ['Cash'], required: true, default: 'Cash' },

        deliveryLocation: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Order', orderSchema);