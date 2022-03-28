const Router = require('@koa/router');
const { auth: authController } = require('../controller');

const notAuthrouter = new Router();

notAuthrouter.post('/signIn', authController.signIn);
notAuthrouter.post('/signUp', authController.signUp);




module.exports = notAuthrouter;