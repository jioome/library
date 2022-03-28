
const { book:bookRepo } = require('../repository');




const createBook = async (inputBook) => {
    let bookData = {
        bookName : inputBook.bookName,
        author: inputBook.author,
        publishingHouse: inputBook.publishingHouse,
        issueDate: inputBook.issueDate,
        isbn: inputBook.isbn,
        classification: inputBook.classification,
        bookingNumber: inputBook.bookingNumber }
    
    const result = await bookRepo.createBook(bookData);
    // console.log(result);
    return result;
}


const readAllBook = async(selectData) => {
    const {
        bookName,
        author,
        publishingHouse,
        issueDate,
        isbn,
        classification,
        bookingNumber } = selectData ; 
    const allBook = await bookRepo.readAllBook(
        bookName,
        author,
        publishingHouse,
        issueDate,
        isbn,
        classification,
        bookingNumber );
    return allBook;
}


const readBook = async (id) => {

    const index =parseInt(id);
    const findBook = await bookRepo.readBook(index);
    return findBook;

}

const updateBook = async (id,body) => {

    let index = parseInt(id);
    const updateResult = await bookRepo.updateBook(index,body);
    return updateResult;
};

const deleteBook = async (id) => {
    const index = parseInt(id);
    const result = await bookRepo.deleteBook(index);
    return result;
}




module.exports = {
    createBook,
    readAllBook,
    readBook,
    updateBook,
    deleteBook,

}
