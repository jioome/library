
const { db } = require('../lib/db');

const emailDuplicateCheck = async (userData) => {
    const where = {email:userData.email}
    const checkEmail =await db.User.findOne({where, raw:true}); 
    console.log(checkEmail)
    return checkEmail;
}

const signIn = async (inputSignIn) => {
    const signInData = { 
        email : inputSignIn.email ,
        password : inputSignIn.password
         }
    const where = {email:signInData.email}
    const findUser = await db.User.findOne({where, raw:true});
    return findUser;
}


const signUp = async (inputUserData) => {
    const userData = {
        name: inputUserData.name,
        email: inputUserData.email,
        address: inputUserData.address,
        phoneNumber: inputUserData.phoneNumber,
        password: inputUserData.password,
        role: inputUserData.role
    }

    if (await emailDuplicateCheck(userData)){
        return false;
    }else{
        const signUpData = await db.User.create(userData, { raw: true });
        return signUpData;
    }

        
   
}






module.exports = {
    signIn,
    signUp,
    emailDuplicateCheck
}