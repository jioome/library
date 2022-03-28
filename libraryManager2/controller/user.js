const { user: userService } = require('../service');
const bcrypt = require('bcrypt');



const readAllUser = async (ctx, next) => {
    console.log(ctx.request.query);
    const {name,email,address,phoneNumber,role} = ctx.request.query;
    
    const userQueryData = {
        name,email,address,phoneNumber,role
    };
    const allUser = await userService.readAllUser(userQueryData);
    ctx.body = allUser;

}


const readUser = async (ctx, next) => {
    const id = ctx.params.id;
    if(isNaN(id)) { 
        throw new Error('required id is only integer');
    }
    const read = await userService.readUser(id);
    if (!read){
        throw new Error('회원을 찾을수 없습니다.');
    }
    ctx.body = read;


}

const updateUser = async (ctx, next) => {
    const id = ctx.params.id;
    if(isNaN(id)) { 
        throw new Error('required id is only integer');
    }
    const body = ctx.request.body;
    const userSet = await userService.updateUser(id,body);

    if (userSet == 0){
        ctx.status= 404;
        throw new Error('회원이 존재하지 않습니다.');
    }
    
    ctx.body = userSet;

};

const deleteUser = async (ctx) => {
    const id = ctx.params.id;
    if(isNaN(id)) { 
        throw new Error('required id is only integer');
    }
    const deleteData = await userService.deleteUser(id);
    if (deleteData == 0){
        ctx.status= 404;
        throw new Error('회원이 존재하지 않습니다.');
    }
    ctx.body = {message : '회원 삭제가 완료 되었습니다.'};
    
}




module.exports = {
    readAllUser,
    readUser,
    updateUser,
    deleteUser,
}
