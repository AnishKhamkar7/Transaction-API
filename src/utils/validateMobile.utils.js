function validateMobileNo(mobileNo){
    const mobileNoPattern = /^\d{10}$/;

    if (!mobileNoPattern.test(mobileNo)) {
        throw new Error("Mobile Number is Invalid");
    }
    
}

export {validateMobileNo}