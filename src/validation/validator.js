//======================================= Name Regex Validation ========================================//

const validateVehicleId = (name) => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    name
  );
};

//====================================== Email Regex Validation =======================================//

const validateEmail = (emailId) => {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(emailId);
};



module.exports = { validateVehicleId, validateEmail };
