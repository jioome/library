const { booking: bookingService } = require('../service');

const createBooking = async (ctx) => {
    console.log(ctx.user);

    function sleep(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
      }
      await sleep(3000);
    const {
        userId,
        bookId,
        bookingOrder
         } = ctx.request.body;
    if(!bookId) {
        throw new Error('bookId 정보가 필요합니다.');
    }
    if(!userId) {
        throw new Error('userId 정보가 필요합니다.');
    }
    if(!Number.isInteger(userId)) { 
       throw new Error('required userId is only integer');
    }
    if(!Number.isInteger(bookId)) { 
        throw new Error('required bookId is only integer');
    }

    if(!Number.isInteger(bookingOrder)) { 
        throw new Error('required bookingOrder is only integer');
    }
    const bookingData =  {
        userId,
        bookId,
        bookingOrder }

    const setBooking = await bookingService.createBooking(bookingData);
    ctx.body = setBooking;
    if(!setBooking) { 
        throw new Error( '3명 이상 예약할 수 없습니다.');
    }


}


const readAllBooking = async (ctx, next) => {
    const {userId,
        bookId,
        bookingOrder} = ctx.request.query;

    const bookingQueryData = {
        userId,
        bookId,
        bookingOrder
    };
    const allBooking = await bookingService.readAllBooking(bookingQueryData);
    console.log(allBooking);
    ctx.body = allBooking;
}



const readBooking = async (ctx, next) => {
    const id = ctx.params.id;
    if(isNaN(id)) { 
        throw new Error('required id is only integer');
    }
    const result = await bookingService.readBooking(id)
    console.log(result);
    
    if (result == null){
        throw new Error('예약이 꽉 찼습니다. 예약할 수 없습니다.',);
    }
    ctx.body = result;


}


const deleteBooking = async (ctx) => {
    const id = ctx.params.id;
    if(isNaN(id)) { 
        throw new Error('required id is only integer');
    }
    const deleteData = await bookingService.deleteBooking(id)

   
    if (deleteData == 0 ){
        throw new Error('예약이 존재하지 않습니다.');
    }
    ctx.body = {message : '예약이 삭제 되었습니다.'};
  
   
}




module.exports = {
    createBooking,
    readAllBooking,
    readBooking,
    deleteBooking,
}
