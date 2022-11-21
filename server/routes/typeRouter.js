const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.get("/", typeController.getAll);
router.post("/", checkRole('ADMIN') || checkRole('MODER'), typeController.create );
router.delete("/:id", checkRole('ADMIN') || checkRole('MODER'), typeController.deleteType);

module.exports = router;