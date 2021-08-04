import * as Yup from "yup";

const emailReg = /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
const passwordReg = /[a-zA-Z0-9_.+-]+/;

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .min(5, 'Too short!')
        .max(255, "Too long email!")
        .matches(emailReg, 'Wrong email!'),
    password: Yup.string().max(64, "Password length must be less or equal 64 symbols")
})

/*FOR REGISTER

 Yup.string()
        .min(8, 'Password must be over 8 symbols')
        .matches(passwordReg, "Password may only contain A-Z, a-z, 0-9, _, ., +, -")

*/