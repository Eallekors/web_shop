const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const Order = require('../models/order');
const OrderItem = require('../models/order-items');

exports.createOrder = async (req, res, next) => {
    const userId = req.user.id; // Assuming the user is logged in and user info is stored in `req.user`

    try {
        // 1. Find the user's cart
        const cart = await Cart.findOne({ where: { userId: userId } });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // 2. Get all items in the cart
        const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "No items in the cart to process" });
        }

        // 3. Create a new order for the user
        const order = await Order.create({ userId: userId });

        // 4. Process each cart item and create an order item
        for (const cartItem of cartItems) {
            await OrderItem.create({
                orderId: order.id,
                productId: cartItem.productId,
                quantity: cartItem.quantity,
               
            });
        }

        // 5. Clear the cart in the application (don't delete the cart or cart items from the database)
        await CartItem.destroy({ where: { cartId: cart.id } }); // Clear the cart items

        // 6. Send success response
        return res.status(201).json({ message: "Order processed successfully", orderId: order.id });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to process order" });
    }
};
