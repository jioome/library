const Router = require('@koa/router');
const { book: bookController } = require('../controller');

const notAuthrouter = new Router();
const authRouter = new Router();

notAuthrouter.get('/', bookController.readAllBook);
notAuthrouter.get('/:id', bookController.readBook);
authRouter.post('/', bookController.createBook);
authRouter.put('/:id', bookController.updateBook);
authRouter.delete('/:id', bookController.deleteBook);



module.exports = {
    notAuthrouter,
    authRouter,
};