module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: ''}
    
    if(err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou deja pris";

    if(err.message.includes('email'))
        errors.email = "Email incorrect";
    
    if(err.message.includes('password'))
        errors.password = "le mot de passe doit faire 6 caracteres minimum";
    
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = "ce Pseudo est deja pris";

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.Email = "cet Email est deja enregistré";

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}

    if (err.message.includes("email")) 
      errors.email = "Email inconnu";
  
    if (err.message.includes('password'))
      errors.password = "Le mot de passe ne correspond pas"

    return errors;
}

