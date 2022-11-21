const {Basket, BasketProduct} = require('./../models/models');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {id} = req.params;
        const user = req.user;
        const userBasket = await Basket.findOne({where: {userId: user.id}});
        const productItem = await BasketProduct.findOne({where: {basketId: userBasket.id, productId: id}});

        if(productItem) {
            return next();
        }
        return res.json(" didn't find in basket of user");
    } catch (e) {
        res.json(e);
    }
};