const Router = require('express')
const router = new Router()

const userRouter = require("./userRouter")
const productRouter = require("./productRouter")
const basketRouter = require("./basketRouter")
const typeRouter = require("./typeRouter")
const formRouter = require("./formRouter")
const ordersRouter = require("./ordersRouter")
//const shopInfoRouter = require("./shopInfoRouter")

router.use('/user', userRouter )
router.use('/product', productRouter)
router.use('/basket', basketRouter)
router.use('/type', typeRouter)
router.use('/form', formRouter)
router.use('/orders', ordersRouter)

module.exports = router;