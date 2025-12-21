const Order = require('../models/order');

const ensureCart = (req) => {
    if (!req.session.cart) {
         req.session.cart = { items: [], totalPrice: 0 };
    }
};

const recalcTotal = (cart) => {
    cart.totalPrice = cart.items.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const qty = Number (item.qty) || 0;
        return sum + price * qty;
    }, 0);
};

    const newCheckout = (req, res) => {
        ensureCart(req);

        if (!req.session.cart.items.length) {
            return res.redirect('/cart');
        }

        return res.render('orders/checkout.ejs', { cart: req.session.cart });
    };
        
    const createOrder = async (req, res) => {
      ensureCart(req);

      const cart = req.session.cart;
      recalcTotal(cart);


      const { deliveryLocation } = req.body;

      if (!cart.items.length) return res.redirect('/cart');

      if (!req.session.user || !req.session.user._id) {
        return res.redirect('/auth/sign-in');
      }

      if (!deliveryLocation || !deliveryLocation.trim()) {
        return res.status(400).send('Delivery location is required');
      }

      try {
        const order = await Order.create({
            user: req.session.user._id,
            items: cart.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: Number(item.qty),
            image: item.image || '',
        })),
            totalPrice: cart.totalPrice,
            paymentMethod: 'Cash',
            deliveryLocation: deliveryLocation.trim(),
            status: 'Pending',
        });

        req.session.cart = { items: [], totalPrice: 0 };

        return res.redirect(`/orders/${order._id}`);
      } catch (err) {
        res.status(400).send('Error placing order');
      }
};


const show = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.session.user._id,
        });

        if (!order) return res.redirect('/cart');

        res.render('orders/show.ejs', { order });
    } catch (err) {
        console.error(err);
        res.status(400).send('Order not found');
    }
};

module.exports = {
    newCheckout,
    createOrder,
    show,
};
