

const { auth: authService } = require('../service');
const bcrypt = require('bcrypt');

const signIn = async (ctx) => {
    const {email, password}  = ctx.request.body;

    if(!email) {
        throw new Error('이메일을 입력해주세요.');
    }
    if(!password) {
        throw new Error('비밀번호를 입력해주세요.');
    }
     
    const validEmailCheck = (email) =>{
        const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return pattern.test(email)
    }

    if(validEmailCheck(email)== false){
        throw new Error('올바른 이메일 주소를 입력해주세요.');
    }
    
    const signInData =  { 
        email,
        password }

    
    const signInResult= await authService.signIn(signInData);
    if (!signInResult) {
        throw new Error('로그인 실패 \n비밀번호를 확인해주세요.');
    }else{
        ctx.body = {
            ...signInResult,
        }
    } 
    
    return signInResult;

}

const signUp = async (ctx) => {

    let {
        name,
        email,
        address,
        callNumber,
        password,
        userType} = ctx.request.body;
    

    const validEmailCheck = (email) =>{
        const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return pattern.test(email)
    }

    const validCallNumberCheck = (callNumber) =>{
        callNumber = callNumber.replace(/-/g,'');
        const pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
        return pattern.test(callNumber);
        
    }

    if(validEmailCheck(email)== false){
        throw new Error('올바른 이메일 주소를 입력해주세요.');
    }

    if(validCallNumberCheck(callNumber)){
        callNumber = callNumber.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");

    }else{
        throw new Error('유효하지 않은 전화번호 입니다.');
    }

    if(!name) {
        throw new Error('이름이 꼭 필요합니다.');
    }
    if(!email) {
        throw new Error('이메일이 꼭 필요합니다.');
    }
    if(!address) {
        throw new Error('주소 정보가 꼭 필요합니다.');
    }
    if(!callNumber) {
        throw new Error('전화번호가 꼭 필요합니다.');
    }


    const encryptedPW = bcrypt.hashSync(password,10);
    
  
    const userData =  { 
        name,
        email,
        address,
        callNumber,
        encryptedPW,
        userType }

    ctx.body = userData;

    const setUser = await authService.signUp(userData);
    const signUpData =  { 
        name,
        email,
        address,
        callNumber,
        userType }

    if (setUser == false){
        throw new Error('해당 email이 존재합니다');
    }else {
        ctx.body = signUpData;
    }
    
    return signUpData;
}









module.exports = {
    signIn,
    signUp
}
