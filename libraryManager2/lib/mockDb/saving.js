
const fs = require('fs');
// const { book: bookService } = require('..../service');

const saveManage =  (path,data) => {
    
    fs.writeFileSync(path, JSON.stringify(data));
    console.log(111);
    return data;
};






module.exports= {
    saveManage,

};
