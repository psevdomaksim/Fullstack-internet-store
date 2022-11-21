const Router = require('express');
const router = new Router();

const ordersController = require('./../controllers/ordersController');
const checkRole = require('./../middleware/checkRoleMiddleware');


router.post('/', ordersController.create)
router.get('/', checkRole('ADMIN') || checkRole('MODER'), ordersController.getAll)
router.get('/:id', checkRole('ADMIN') || checkRole('MODER'), ordersController.getOne)
router.put('/', checkRole('ADMIN') || checkRole('MODER'), ordersController.updateOrder)
router.delete('/', checkRole('ADMIN') || checkRole('MODER'), ordersController.deleteOrder);


module.exports = router;