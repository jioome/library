const { db } = require('../lib/db');
const bcrypt = require('bcrypt');

const Role = {"anonymous":0 ,"user": 1, "admin" :2} ; 

const readAllUser = async (name,email,address,phoneNumber,role) =>{
    const where = {};
    const userData = {
        name: name,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        role: role 
    }

    if(name) {
        where.name = {
            [db.Sequelize.Op.like]: `%${userData.name}%`
        }
    }
    if(email) {
        where.email = {
            [db.Sequelize.Op.like]: `%${userData.email}%`
        }
    }

    if(address) {
        where.address = {
            [db.Sequelize.Op.like]: `%${userData.address}%`
        }
    }
    if(phoneNumber) {
        where.phoneNumber = {
            [db.Sequelize.Op.like]: `%${userData.phoneNumber}%`
        }
    }

    if(role) {
        where.role = userData.role
    }
    const allUserData = await db.User.findAll({where, raw:true});

    return allUserData;
}


const readUser = async(id) =>{
    const where = {userId:id};
    const findUser = await db.User.findOne({where, raw:true});
    console.log(findUser);
    return findUser;
}

const updateUser = async (id,inputUserData) =>{
    
    const result = await db.sequelize.transaction(async (t) => {
        const findUser = await db.User.findOne({where : {userId:id}, raw:true},{transaction: t });
        const updateUserData = await db.User.update( inputUserData ,
            {
                where:{userId:id},
                raw:true,
                returning: true
        }, {    
            transaction: t 
        });
        return updateUserData[1];
    });
    return result;
}

const deleteUser = async (id) =>{
    const result = await db.sequelize.transaction(async (t) => {
        const deleteData = await db.User.destroy({
            where:{userId:id}, 
            raw:true
        },{    
            transaction: t });
        return deleteData;
    });
    return result;
}

module.exports = {
    readAllUser,
    readUser,
    updateUser,
    deleteUser
}