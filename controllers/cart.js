const ensureCart = (req) => {
    if (!req.session.cart) {
        req.session.cart = { items: [], totalPrice: 0 };
    }
};

const recalcTotal = (cart) => {
    cart.totalPrice = cart.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
};

    const index = (req, res) => {
        ensureCart(req);
        res.render('cart/index.ejs', { cart: req.session.cart });
    };
        
    const add = (req, res) => {
      ensureCart(req);

      const { id, name, price, image } = req.body;


const ParsedPrice = parseFloat(price);
if (!id || !name || Number.isNaN(ParsedPrice)) {
    return res.status(400).send('Invalid cart item data');
}

const cart = req.session.cart;

const existing = cart.items.find((item) => item.id ===id);
if (existing) {
    existing.qty +=1;
} else {
    cart.items.push({
        id,
        name,
        price: ParsedPrice,
        image: image || '',
        qty: 1,
    });
}

recalcTotal(cart);
res.redirect('/cart');
};

const remove = (req, res) => {
    ensureCart(req);

    const { id } = req.body;
    const cart = req.session.cart;

    cart.items = cart.items.filter((item) => item.id !==id);

    recalcTotal(cart);
    res.redirect('/cart');
};

module.exports = {
    index,
    add,
    remove,
};
