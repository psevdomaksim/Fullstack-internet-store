const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get("/auth",authMiddleware, userController.checkAuth );
router.get("/",checkRole('ADMIN') || checkRole('MODER'), userController.getAll );

router.get("/:id",checkRole('ADMIN') || checkRole('MODER'), userController.getOne );
router.post("/registration", userController.registration );
router.post("/login", userController.login);
router.delete("/:id",checkRole('ADMIN') || checkRole('MODER'), userController.deleteUser);
router.put("/:id",checkRole("ADMIN"), userController.changeUser);

module.exports = router;