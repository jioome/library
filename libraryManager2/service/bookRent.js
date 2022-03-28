
const { bookRent:bookRentRepo, bookingHistory } = require('../repository');


// 예약 자동으로 올라가기 
const createBookRent = async (createData) => {

    const rentDay = new Date();
    const returnBook = new Date();
    returnBook.setDate(returnBook.getDate()+14);
    const createTime = new Date();

   
    let bookRentData = {
        bookId : createData.bookId,
        userId: createData.userId,
        extendNumber : createData.extendNumber,
        delinquencyDate : createData.delinquencyDate ,
        rentDate : rentDay,
        returnDate : returnBook,
        createAt : createTime
    }

    const BookRent = await bookRentRepo.createBookRent(bookRentData); 
    
    return BookRent;

}


const readAllBookRent = async (selectData) => {
    const { bookId,userId,extendNumber,delinquencyDate,rentDate,returnDate} = selectData;
    const allBookRent = await bookRentRepo.readAllBookRent( bookId,userId,extendNumber,delinquencyDate,rentDate,returnDate);
    return allBookRent;
}


const readBookRent = async (id) => {
   
    let index = parseInt(id);
    const findBookRent = await bookRentRepo.readBookRent(index);
    return findBookRent;
}

const updateBookRent = async (id,body) => {

    let index = parseInt(id);
    const updateBookRent = await bookRentRepo.updateBookRent(index,body);

    return updateBookRent;
};

const deleteBookRent = async (id) => {

    const index = parseInt(id);
    const result = await bookRentRepo.deleteBookRent(index);
    return result;
   
}




module.exports = {
    createBookRent,
    readAllBookRent,
    readBookRent,
    updateBookRent,
    deleteBookRent,
}
