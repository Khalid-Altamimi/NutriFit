const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
    {
        id: { type: String, required: true},
        name: { type: String, required: true},
        price: { type: Number, required: true,},
        image: { type: String, default: ' '},
        qty: { type: Number, default: 1, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

        items: { type: [orderItemSchema], default: [] },

        totalPrice: { type: Number, required: true, min: 0 },

        paymentMethod: { type: String, enum: ['Cash'], default: 'Cash' },

        deliveryLocation: { type: String, required: true, trim: true },
        status: { type: String, enum: ['Pending', 'Cancelled', 'Completed'], default: 'Pending'},
    },
    { timestamps: true }
);


module.exports = mongoose.model('Order', orderSchema);