const Yup = require('yup');

const validateRecuparSenha = Yup.object().shape({
  email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatorio')
});

export default validateRecuparSenha;
