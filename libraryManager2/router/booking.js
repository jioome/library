const Router = require('@koa/router');
const { booking: bookingController } = require('../controller');

const router = new Router();

router.get('/', bookingController.readAllBooking);
router.get('/:id', bookingController.readBooking);
router.post('/', bookingController.createBooking);
router.delete('/:id', bookingController.deleteBooking);



module.exports = router;