const Router = require('express')
const router = new Router()
const formContoller = require('../controllers/formController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get("/",formContoller.getAll );
router.post("/", checkRole('ADMIN') || checkRole('MODER'), formContoller.create );
router.delete("/:id",checkRole('ADMIN') || checkRole('MODER'), formContoller.deleteForm);

module.exports = router;