const Router = require('@koa/router');
const { user: userController } = require('../controller');

const router = new Router();

router.get('/', userController.readAllUser);
router.get('/:id', userController.readUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);



module.exports = router;