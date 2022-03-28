const Router = require('@koa/router');

const {notAuthrouter: bookAuthRouter} = require("./book");
const signRouter = require("./auth");

const router = new Router();

router.use('/book', bookAuthRouter.routes());
router.use('/auth', signRouter.routes());



module.exports = router