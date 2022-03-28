
const { user:userRepo } = require('../repository');


const readAllUser = async (selectData) => {
    const { name, email ,address,phoneNumber,role} = selectData;
    const allUser = await userRepo.readAllUser(name, email,address,phoneNumber,role);
    return allUser;
}


const readUser = async (id) => {

    let index = parseInt(id);
    const findUser = await userRepo.readUser(index);
    return findUser;

}

const updateUser = async (id,body) => {
    let index = parseInt(id);
    const updateResult = await userRepo.updateUser(index,body);
    return updateResult;
};



const deleteUser = async (id) => {
    const index = parseInt(id);
    const result = await userRepo.deleteUser(index);
    return result;
   
}




module.exports = {
    readAllUser,
    readUser,
    updateUser,
    deleteUser,
}
