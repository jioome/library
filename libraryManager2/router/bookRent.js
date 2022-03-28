const Router = require('@koa/router');
const { bookRent: bookRentController } = require('../controller');

const router = new Router();

router.get('/', bookRentController.readAllBookRent);

router.get('/:id', bookRentController.readBookRent);
router.post('/', bookRentController.createBookRent);
router.put('/:id', bookRentController.updateBookRent);
router.delete('/:id', bookRentController.deleteBookRent);



module.exports = router;