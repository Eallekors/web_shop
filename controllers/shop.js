const Product = require('../models/product')
const Cart = require('../models/cart')
const CartItem = require('../models/cart-item')


class shopController {
    async getAllProducts(req, res) {
        const products = await Product.findAll()
        console.log(products)
        res.status(201).json({
            products: products
        })
    }

    async getCart(req, res) {
        const userCart = await req.user.getCart()
        console.log('--------------------userCart-----------')
        //console.log(userCart)
        console.log('--------------------userCart-----------')
        const cartProducts = await userCart.getProducts()
        res.status(201).json({
            products: cartProducts
        })
    }

    async addToCart(req, res) {
        const { productId, quantity } = req.body;
    
        const quantityToAdd = Number(quantity) || 1;
    
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
    
        const userCart = await req.user.getCart();
        if (!userCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
    
        const productsInCart = await userCart.getProducts({ where: { id: product.id } });
    
        if (productsInCart.length === 0) {
             await userCart.addProduct(product, {
                through: { quantity: quantityToAdd }
            });
        } else {
             const cartProduct = productsInCart[0]; 
            const currentQuantity = Number(cartProduct.cartItem.quantity);
            const newQuantity = currentQuantity + quantityToAdd;
    
            await cartProduct.cartItem.update({ quantity: newQuantity });
        }
    
        res.status(200).json({ message: 'Product added to cart successfully' });
    }
    
    async removeFromCart(req, res) {
            const userCart = await req.user.getCart();
            
            if (!userCart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            
            
            const cartItem = await Product.findByPk(req.params.id); // id of product to remove
            
            if (!cartItem) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            
            const productsInCart = await userCart.getProducts({ where: { id: cartItem.id } });
            if (productsInCart.length === 0) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }
            
            await userCart.removeProduct(cartItem); 
            
            return res.status(200).json({ message: 'Product removed from cart successfully' });
    } 
}

module.exports = new shopController()