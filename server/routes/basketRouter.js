const Router = require('express');
const router = new Router();
const BasketController = require('./../controllers/basketController');
const authMiddleware = require('./../middleware/authMiddleware');
const checkDeleteProductFromBasket = require('./../middleware/checkDeleteProductFromBasket');


router.post('/',  BasketController.addProduct)
router.get('/',  BasketController.getProducts)
router.delete('/:id', checkDeleteProductFromBasket, BasketController.deleteProduct);

module.exports = router;