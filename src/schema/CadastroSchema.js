const Yup = require('yup');

const validateCadastro = Yup.object().shape({
  email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatorio'),
  senha: Yup.string().min(4, 'Senha deve conter ao menos 4 caracteres').required('Senha é obrigatorio'),
  senha2: Yup.string().oneOf([Yup.ref('senha'), null], 'As senhas não batem').required('Confirme a senha')
});

export default validateCadastro;
