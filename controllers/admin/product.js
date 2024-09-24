const Product = require('../../models/product')

class adminController {

    async getAllProducts(req,res) {
        const products = await Product.findAll()
        console.log(products)
        res.status(201).json({
            products: products
        })
    }

    async getProductbyId(req,res){
        const product = await Product.findOne({ where: { id: req.params.id } });
        console.log(product)
        res.status(201).json({
            product: product
        })
    }

    async addProduct(req,res) {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            imageURL: req.body.imageURL,
            description: req.body.description
        })
        res.status(201).json({
            message: 'Product is added',
            productId: product.id
        })
    }

    async updateProduct (req, res) {
        const productId = req.params.id; 
        const editMode = req.query.edit === 'true'; 
    
        
            const product = await Product.findByPk(productId);
          
    
            if (editMode) { 
                const updatedData = {
                    title: req.body.title,
                    price: req.body.price,
                    imageURL: req.body.imageURL,
                    description: req.body.description
                }
                const updatedArticle = await product.update(updatedData);
    
                res.status(201).json({ message: `Product with ID ${productId} updated successfully`, updatedArticle });
            } else {
            
                res.status(201).json({ message: `Viewing product with ID ${productId}`, product });
            }
        
    }

    async deleteProduct(req, res){
        const productId = req.params.id
        const product = await Product.findOne({ where: { id: req.params.id } });
        product.destroy();
        res.status(201).json({
            message: `Product with id: ${productId} has been deleted`
        })
    }
}

module.exports = new adminController();