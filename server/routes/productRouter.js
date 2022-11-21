const Router = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.get("/",  productController.getAll );
router.get("/",  productController.getFiltered );
router.get("/:id", productController.getOne );
router.post("/", checkRole('ADMIN') || checkRole('MODER'), productController.create);
router.put("/:id", checkRole('ADMIN') || checkRole('MODER'), productController.updateProduct);
router.delete("/:id", checkRole('ADMIN') || checkRole('MODER'), productController.deleteProduct);

module.exports = router;