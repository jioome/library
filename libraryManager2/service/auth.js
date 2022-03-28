const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { auth:authRepo, user } = require('../repository');

const signIn = async (inputSignIn) => {
    const signInData = { 
        email : inputSignIn.email ,
        password : inputSignIn.password
    };
    const userData = await authRepo.signIn(signInData);
    
    const encryptedPW = userData.password;
    const PW =signInData.password;
    const same = bcrypt.compareSync(PW, encryptedPW);


    let token = same;
    if(same){
        delete userData.password
        token = jwt.sign({ 
            ...userData,
        } ,'testerrffer',{expiresIn : '30m'});
    }


    return { accessToken: token };
}

const signUp = async (inputUser) => {
    const userData = { 
        name : inputUser.name ,
        email : inputUser.email,
        address: inputUser.address,
        phoneNumber :inputUser.callNumber,
        password : inputUser.encryptedPW ,
        role :inputUser.userType }

    const user = await authRepo.signUp(userData);


    return user;

}

module.exports = {
    signIn,
    signUp
}
