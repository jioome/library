const { db } = require('../lib/db');

const createBooking = async (inputBooking) => {
    const {
        bookId,
        userId,
        createAt
    } = inputBooking;
    
    
    const result = await db.sequelize.transaction(async (t) => {

        const book = await db.Book.findOne({
            where: { bookId },
        }, { transaction: t, raw: true });
        if(book.bookingNumber > 5) { return 0; }
        
        const maxBookingOrder = await db.Booking.max('bookingOrder',{ where : {
            bookId,
        } , raw:true}, { transaction: t });        
        if(maxBookingOrder > 5) { return 0; }

        await db.Book.update({
            bookingNumber: book.bookingNumber + 1,
        },{where : { bookId} }, { transaction: t });
        
        const bookingData = {
            bookId: bookId,
            userId: userId,
            createAt: createAt,
            bookingOrder: maxBookingOrder +1
        }
        
        const booking = await db.Booking.create(bookingData, { raw: true }, { transaction: t });
        return booking

    });
    return result;

}


const readAllBooking = async (userId,bookId,bookingOrder,createAt) =>{
    const bookingData = {
        bookId: bookId,
        userId: userId,
        bookingOrder: bookingOrder,
        createAt: createAt,

    }
    const where = {};
    
    if(userId) {
        where.userId = bookingData.bookId
    }
    if(bookId) {
        where.bookId = bookingData.bookId
    }

    if(bookingOrder) {
        where.bookingOrder = bookingData.bookingOrder
    }
    if(createAt) {
        where.createAt = bookingData.createAt
    }
    const allBooking = await db.Booking.findAll({where, raw:true});
    return allBooking;
}


const readBooking = async(id) =>{
    const where = {bookingId:id};
    const findBooking = await db.Booking.findOne({where, raw:true});
    return findBooking;
}

const updateBooking = async (id,data) =>{
    const result = await db.sequelize.transaction(async (t) => {
        const findBooking = await db.Booking.findOne({where:{bookingId:id}, raw:true},{ transaction: t });
        const updateData = await db.Booking.update( data ,
        {where:{bookingId:id}}, { transaction: t } );
        return updateData
    });
    return result;
}

const deleteBooking = async (bookingId) =>{
    const result = await db.sequelize.transaction(async (t) => {
        
        const booking = await db.Booking.findOne({
            where: { bookingId },
        }, { transaction: t, raw: true });
        
        if(!booking) { return false}

        const book = await db.Book.findOne({
            where: { bookId: booking.bookId },
        }, { transaction: t, raw: true });
        
        if(!book) { return false}
        if(book.bookingNumber <= 0) { return false}


        await db.Book.update({
            bookingNumber: book.bookingNumber -1 
        },{
            where : { bookId: booking.bookId} 
        }, { transaction: t });

        const deletedBooking = await db.Booking.destroy({
            where:{bookingId}, 
            raw:true
        }, { transaction: t })
        
        return deleteBooking;
    });
    
    return result;
}

module.exports = {
    createBooking,
    readAllBooking,
    readBooking,
    updateBooking,
    deleteBooking
}