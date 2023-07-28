//======================================= Name Regex Validation ========================================//


const validateName = (name) => {
    return (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name))
  }
  
  
  
  //====================================== Email Regex Validation =======================================//
  
  
  const validateEmail = (emailId) => {
    return (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(emailId))
  }
  
  
  //===================================== Password Regex Validation ====================================//
  
  
  const validatePassword = (password) => {
    return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_])(?!.*\s).{8,}$/.test(password));
  }
  

  module.exports = { validateName, validateEmail, validatePassword }