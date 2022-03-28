

const Router = require('@koa/router');
const jwt = require('jsonwebtoken');

const authRouter = require("./authRouter");
const notAuthRouter = require("./notAuthRouter");

const router = new Router();

const authMiddleware = async (ctx, next) => {
    if(!ctx.user) throw new Error('auth fail')
    
    try{
        await next();
    } catch (err) {
        throw err;
    }
};

router.use(async (ctx, next) => {
    const startDate = new Date();
    // console.log("startDate:" ,startDate);

    const _endDateSet = () => {
        const endDate = new Date();
        // console.log("endDate:" ,endDate);
    }
    try {
        await next();
    } catch (err) {
        _endDateSet();
        throw err;
    }
    _endDateSet();

  })
router.use(notAuthRouter.routes());
router.use(authMiddleware,  authRouter.routes());



module.exports = router