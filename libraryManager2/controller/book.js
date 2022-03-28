const { book: bookService } = require('../service');

const bookValidation = () => {
    //validation
    if(!bookName) {
        throw new Error('책 제목이 꼭 필요합니다.');
    }
    if(!author) {
        throw new Error('작가 정보가 꼭 필요합니다.');
    }
    if(!publishingHouse) {
        throw new Error('출판사 정보가 꼭 필요합니다.');
    }
    if(!issueDate) {
        throw new Error('발행일 정보가 꼭 필요합니다.');
    }
    if(!isbn) {
        throw new Error('isbn 정보가 꼭 필요합니다.');
    }
    if(!classification) {
        throw new Error('분류번호 정보가 꼭 필요합니다.');
    }
    if(!Number.isInteger(isbn)) { 
        throw new Error('required id is only integer');
    }

    const checkValidDate = (issueDate) => {
        console.log(issueDate);
        const date = issueDate.split("-");
	    const y = parseInt(date[0], 10);
        const m = parseInt(date[1], 10);
        const d = parseInt(date[2], 10);
	    
	    const dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
	    result = dateRegex.test(d+'-'+m+'-'+y);
        return result;
    }

    if (!checkValidDate(issueDate)){
        throw new Error('유효하지 않은 날짜입니다.');
    }
}

const createBook = async (ctx) => {

    const {
        bookName,
        author,
        publishingHouse,
        issueDate,
        isbn,
        classification ,
        bookingNumber} = ctx.request.body;
            
    if(ctx.user.role != 'admin'){
        throw new Error('권한이 없는 사용자 입니다.');
    }
    //validation
    if(!bookName) {
        throw new Error('책 제목이 꼭 필요합니다.');
    }
    if(!author) {
        throw new Error('작가 정보가 꼭 필요합니다.');
    }
    if(!publishingHouse) {
        throw new Error('출판사 정보가 꼭 필요합니다.');
    }
    if(!issueDate) {
        throw new Error('발행일 정보가 꼭 필요합니다.');
    }
    if(!isbn) {
        throw new Error('isbn 정보가 꼭 필요합니다.');
    }
    if(!classification) {
        throw new Error('분류번호 정보가 꼭 필요합니다.');
    }
    if(!Number.isInteger(isbn)) { 
        throw new Error('required isbn is only integer');
    }

    const checkValidDate = (issueDate) => {
        console.log(issueDate);
        const date = issueDate.split("-");
	    const y = parseInt(date[0], 10);
        const m = parseInt(date[1], 10);
        const d = parseInt(date[2], 10);
	    
	    const dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
	    result = dateRegex.test(d+'-'+m+'-'+y);
        return result;
    }

    if (!checkValidDate(issueDate)){
        throw new Error('유효하지 않은 날짜입니다.');
    }

    const booKData =  {
        bookName,
        author,
        publishingHouse,
        issueDate,
        isbn,
        classification , 
        bookingNumber}
    
    const setBook = await bookService.createBook(booKData);
    console.log(setBook);
    ctx.body = setBook;
    return setBook;
}


const readAllBook = async (ctx) => {
    const {
        bookName,
        author,
        publishingHouse,
        issueDate,
        isbn,
        classification ,
        bookingNumber} = ctx.request.query;
    
    if(!Number.isInteger(isbn) && isbn) { 
        throw new Error('required isbn is only integer');
    }

    const bookQueryData = {
        bookName,
        author,
        publishingHouse,
        issueDate,
        isbn,
        classification,
        bookingNumber };
        
    const allBook = await bookService.readAllBook(bookQueryData);
    console.log(allBook);
    ctx.body = allBook;
    return allBook;
}


const readBook = async (ctx) => {
    const id = Number(ctx.params.id);
    if(!Number.isInteger(id)) { 
        throw new Error('required id is only integer');
    }

    const read = await bookService.readBook(id);

    if (!read){
        throw new Error('책을 찾을 수 없습니다.');
    }
    ctx.body = read;
    return read;

}


const updateBook = async (ctx, next) => {
    const id = ctx.params.id;
    if(!Number.isNaN(id)) { 
        throw new Error('required id is only integer');
    }
    const {
        bookName,
        author,
        publishingHouse,
        issueDate,
        isbn,
        classification ,
        bookingNumber} = ctx.request.body;

    if(ctx.user.role != 'admin'){
        throw new Error('권한이 없는 사용자 입니다.');
    }

    if(isbn & !Number.isInteger(isbn)) { 
        throw new Error('required isbn is only integer');
    }

    const checkValidDate = (issueDate) => {
        console.log(issueDate);
        const date = issueDate.split("-");
	    const y = parseInt(date[0], 10);
        const m = parseInt(date[1], 10);
        const d = parseInt(date[2], 10);
	    
	    const dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
	    result = dateRegex.test(d+'-'+m+'-'+y);
        return result;
    }
    
    if(issueDate){
        if (!checkValidDate(issueDate)){
            throw new Error('유효하지 않은 날짜입니다.');
        }
    }

    const booKData =  {
        bookName,
        author,
        publishingHouse,
        issueDate,
        isbn,
        classification , 
        bookingNumber}

    const bookSet = await bookService.updateBook(id,booKData);

    if (bookSet == 0){

        throw new Error('책이 존재하지 않습니다.');
    }
    
    ctx.body = {
        message : '책 업데이트 완료.'
    };

};

const deleteBook = async (ctx) => {
    const id = ctx.params.id;
    console.log(isNaN(id))
    if(isNaN(id)) { 
        throw new Error('required id is only integer');
    }
    const deleteData = await bookService.deleteBook(id);

    if(ctx.user.role != 'admin'){
        throw new Error('권한이 없는 사용자 입니다.');
    }
    if (deleteData === 0){
        throw new Error('책이 존재하지 않습니다.');
    }
    ctx.body =  {message : '책 삭제가 완료 되었습니다.'};
    
    
   
}




module.exports = {
    createBook,
    readAllBook,
    readBook,
    updateBook,
    deleteBook,
}
