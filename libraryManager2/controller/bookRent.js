const { bookRent: bookRentService } = require('../service');

const createBookRent = async (ctx) => {
    const {
        bookId,
        userId,
        extendNumber,
        delinquencyDate
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
    if(!Number.isInteger(extendNumber)& extendNumber) { 
        throw new Error('required extendNumber is only integer');
    }
    if(!Number.isInteger(delinquencyDate & delinquencyDate)) { 
        throw new Error('required delinquencyDate is only integer');
    }
    const bookRentData =  { 
        bookId,
        userId,
        extendNumber,
        delinquencyDate }
    
    const setRent = await bookRentService.createBookRent(bookRentData);
    // console.log(setRent);
    

    ctx.body = setRent;
    return setRent;
}

const readAllBookRent = async (ctx) => {
    const {bookId,userId,extendNumber,delinquencyDate,rentDate,returnDate} = ctx.request.query;

    const bookRentQueryData = {
        bookId,userId,extendNumber,delinquencyDate,rentDate,returnDate};
    const bookRent = await bookRentService.readAllBookRent(bookRentQueryData);
    ctx.body = bookRent;
}


const readBookRent = async  (ctx) => {
    const id = ctx.params.id;
    if(isNaN(id)) { 
        throw new Error('required id is only integer');
    }
    const read = await bookRentService.readBookRent(id);

    if (!read ){
        throw new Error('대출 내역을 찾을 수 없습니다.');
    }
    ctx.body = read;
    console.log(read);

}


const updateBookRent = async (ctx, next) => {
    const id = ctx.params.id;
    if(isNaN(id)) { 
        throw new Error('required id is only integer');
    }
    const {
        bookId,
        userId,
        extendNumber,
        delinquencyDate
        } = ctx.request.body;
    
    if(userId & !Number.isInteger(userId)) { 
        throw new Error('required userId is only integer');

    }
    if(bookId & !Number.isInteger(bookId)) { 
        throw new Error('required bookId is only integer');
    }
    if(extendNumber & !Number.isInteger(extendNumber)) { 
        throw new Error('required extendNumber is only integer');
    }
    if(!Number.isInteger(delinquencyDate)) { 
        throw new Error('required delinquencyDate is only integer');
    }
    const bookRentData =  { 
        bookId,
        userId,
        extendNumber,
        delinquencyDate }


    const bookRentSet = await bookRentService.updateBookRent(id,bookRentData);
    if (bookRentSet == 0){
        throw new Error('대출이 존재하지 않습니다.');
    }
    console.log("업데이트 완료");
    ctx.body = {
        message : '대출 내역을 업데이트 합니다.'
    };
};


const deleteBookRent = async (ctx) => {
    const id = ctx.params.id;
    if(isNaN(id)) { 
        throw new Error('required id is only integer');
    }
    const deleteData = await bookRentService.deleteBookRent(id);
    if (deleteData == 0 ){
        throw new Error('대출내역이 존재하지 않습니다.');
    }
    ctx.body = {message : '대출내역 삭제가 완료 되었습니다.'};
   
}


module.exports = {
    createBookRent,
    readAllBookRent,
    readBookRent,
    updateBookRent,
    deleteBookRent,
}
