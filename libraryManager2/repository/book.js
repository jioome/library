const { db } = require('../lib/db');

const createBook = async (bookData) => {
    const createBookData = {
        bookName: bookData.bookName,
        author: bookData.author,
        publishingHouse: bookData.publishingHouse,
        issueDate: bookData.issueDate,
        classification: bookData.classification,
        bookingNumber: bookData.bookingNumber,
        isbn: bookData.isbn
    }
    // console.log(createBookData);
    const createBookResult = await db.Book.create(createBookData, { raw: true });
    return createBookResult;
}


const readAllBook = async (bookName,author,
    publishingHouse,issueDate,isbn,classification,bookingNumber ) =>{
    
    const readBookData = {
        bookName:bookName,
        author: author,
        publishingHouse: publishingHouse,
        issueDate: issueDate,
        classification: classification,
        bookingNumber: bookingNumber,
        isbn: isbn
    }
    const where = {};
    
    if(bookName) {
        where.bookName = {
            [db.Sequelize.Op.like]: `%${readBookData.bookName}%`
        }
    }
    if(author) {
        where.author = {
            [db.Sequelize.Op.like]: `%${readBookData.author}%`
        }
    }

    if(publishingHouse) {
        where.publishingHouse = {
            [db.Sequelize.Op.like]: `%${readBookData.publishingHouse}%`
        }
    }
    if(issueDate) {
        where.issueDate = readBookData.issueDate
    }

    if(isbn) {
        where.isbn = {
            [db.Sequelize.Op.like]: `%${readBookData.isbn}%`
        }
    }
    if(classification) {
        where.classification = {
            [db.Sequelize.Op.like]: `%${readBookData.classification}%`
        }
    }
    if(bookingNumber) {
        where.bookingNumber = readBookData.bookingNumber
    }
    const allBookData = await db.Book.findAll({where, raw:true});
    return allBookData;
}


const readBook = async(id) =>{
    const where = {bookId:id};
    const findBook = await db.Book.findOne({where, raw:true});
    return findBook;
}

const updateBook = async (id,data) =>{
    const result = await db.sequelize.transaction(async (t) => {
        const findBook = await db.Book.findOne({where:{bookId:id}, raw:true},{ transaction: t });
        const updateBookData = await db.Book.update( data ,
            {where:{bookId:id}
        }, { 
            transaction: t 
        });
        return updateBookData;
    });
    return result;
}

const deleteBook = async (id) =>{
    
    const result = await db.sequelize.transaction(async (t) => {
        const findBook = await db.Book.findOne({where:{bookId:id}, raw:true},{ transaction: t });
        const deleteBookData = await db.Book.destroy({
            
            where:{bookId:id}, 
            raw:true
        }, { 
            transaction: t 
        });
        return deleteBookData;
    });
    return result;
}

module.exports = {
    createBook,
    readAllBook,
    readBook,
    updateBook,
    deleteBook
}