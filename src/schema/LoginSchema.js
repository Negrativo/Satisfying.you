const Yup = require('yup');

const validateLogin = Yup.object().shape({    
    email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatorio'),
    senha: Yup.string().required('Senha é obrigatorio'),    
});

export default validateLogin;
