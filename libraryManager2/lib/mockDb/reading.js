const fs = require('fs');

const readData = (path) => {

    const readFile = fs.readFileSync(path);
    let datas = JSON.parse(readFile.toString()); 
    return datas;

}


const findId = (id) => {

    const index = books.findIndex((p)=>p.id.toString()===id);
    const read = books[index]
    
    console.log(read);
    return read;

}


module.exports= {
    findId,
    readData
};