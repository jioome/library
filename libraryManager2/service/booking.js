
const { bookingHistory:bookingRepo } = require('../repository');

const createBooking = async (inputBooking) => {
    const createTime = new Date();
    const bookingData = {
        bookId: inputBooking.bookId,
        userId: inputBooking.userId,
        bookingOrder: inputBooking.bookingOrder,
        createAt : createTime
    }
    if(!bookId) {
        throw new Error('bookId 정보가 필요합니다.');
    }
    if(!userId) {
        throw new Error('userId 정보가 필요합니다.');
    }
    const booking = await bookingRepo.createBooking(bookingData);
    // delete user.password;
    // console.log(booking);
    return booking;

}


const readAllBooking = async (selectData) => {
    const {userId,bookId,bookingOrder}= selectData;
    const allBooking = await bookingRepo.readAllBooking(userId,bookId,bookingOrder);
    return allBooking;
}




const readBooking = async (id) => {

    let index = parseInt(id);
    const findBooking = await bookingRepo.readBooking(index);
    return findBooking;
    
}


const deleteBooking = async (bookingId) => {
    const index = parseInt(bookingId);
    
    const result = await bookingRepo.deleteBooking(index);
    return result;
   
}




module.exports = {
    createBooking,
    readAllBooking,
    readBooking,
    deleteBooking,

}
