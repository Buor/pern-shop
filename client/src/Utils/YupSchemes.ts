import * as Yup from "yup";

const emailReg = /\w+@\w+.\w+/;

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too short!')
        .max(500, "Too long email!")
        .matches(emailReg, 'Wrong email!'),
    password: Yup.string()
})