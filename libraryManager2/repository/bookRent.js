const { db } = require('../lib/db');

const createBookRent = async (inputBookRent) => {
    const bookRentData = {
        bookId : inputBookRent.bookId,
        userId: inputBookRent.userId,
        extendNumber : inputBookRent.extendNumber,
        delinquencyDate : inputBookRent.delinquencyDate ,
        rentDate : inputBookRent.rentDate,
        returnDate : inputBookRent.returnDate,
        createAt : inputBookRent.createAt
    }
    const where = {bookId:bookRentData.bookId,userId:bookRentData.userId};
    const checkDuplicate = await db.bookRent.findOne({where, raw:true});
    if (await checkDuplicate){
        throw new Error('중복된 대여 입니다.')
    }else {
        const bookData = await db.bookRent.create(bookRentData, { raw: true }); 
        return bookData;
    }
//추가 -> 동일한 isbn 중복으로 대여 불가능하게 하기 
// 예약 상태인 것 못 빌리게
}

const readAllBookRent = async (bookId,userId,extendNumber,delinquencyDate,rentDate,returnDate) =>{
    const where = {};
    
    if(bookId) {
        where.bookId = bookId
    }
    if(userId) {
        where.userId = userId
    }

    if(extendNumber) {
        where.extendNumber = extendNumber
    }
    if(delinquencyDate) {
        where.delinquencyDate = delinquencyDate
    }    
    if(rentDate) {
        const startRentDate = `${rentDate} 00:00:00`
        const endRentDate = `${rentDate} 23:59:59`
        where.rentDate = {
            [db.Sequelize.Op.between]: [startRentDate, endRentDate]
        }
    }
    if(returnDate) {
        where.returnDate = {
            [db.Sequelize.Op.like]: `%${returnDate}%`
        }
    }
    const allBookRentData = await db.bookRent.findAll({where, raw:true});        
    return allBookRentData;
}


const readBookRent = async (id) =>{
    const where = {bookRentId:id};
    const findBookRent = await db.bookRent.findOne({where, raw:true});  
    return findBookRent;
}

const updateBookRent = async (id,inputBookRent) =>{
    const result = await db.sequelize.transaction(async (t) => {
        const findBookRent = await db.bookRent.findOne({where : {bookRentId:id}, raw:true},{transaction: t});  
        const updateBookRentData = await db.bookRent.update( inputBookRent ,
            {where:{bookRentId:id}
        }, { 
            transaction: t 
        });
        return updateBookRentData;
    });
    return result;
} 

const deleteBookRent = async (id) =>{
    const result = await db.sequelize.transaction(async (t) => {
        const deleteBookRentData = await db.bookRent.destroy({
            
            where:{bookRentId:id}, 
            raw:true
        },{ 
            transaction: t 
        });
        return deleteBookRentData;
    });
    return result;
}

module.exports = {
    createBookRent,
    readAllBookRent,
    readBookRent,
    updateBookRent,
    deleteBookRent
}