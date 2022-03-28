const Router = require('@koa/router');
const jwt = require('jsonwebtoken');

const {
    authRouter: bookAuthRouter,
} = require("./book");
const bookingRouter = require("./booking");
const bookRentRouter = require("./bookRent");
const userRouter = require("./user");

const router = new Router();


router.use('/book', bookAuthRouter.routes());
router.use('/booking', bookingRouter.routes());
router.use('/bookRent', bookRentRouter.routes());
router.use('/user', userRouter.routes());
// router.use('/auth', authRouter.routes());


module.exports = router;

