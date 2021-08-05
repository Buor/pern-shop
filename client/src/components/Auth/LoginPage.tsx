import React, {useRef, useState} from 'react'
import {Field, Form, Formik, ErrorMessage} from "formik"
import {login} from "../../DAL/auth/authApi"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import {setIsAuth, setUserData} from "../../Redux/auth/authReducer"
import * as Yup from 'yup';
import {LoginSchema} from "../../Utils/YupSchemes";

interface IProps {
    setUserData: Function,
    setIsAuth: Function
}

const LoginPage: React.FC<IProps> = ({setIsAuth}) => {

    const history = useHistory()

    const [loginError, setLoginError] = useState("");

    return (
        <div className={'login_page'}>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={LoginSchema}
                onSubmit={async values => {

                    if (Object.values(values).some(val => val === "")) {
                        setLoginError("All field must be filled!")
                        return
                    }

                    const result = await login(values)
                    if (result === true) {
                        history.push('/userPage')
                        setIsAuth(true)
                        return
                    }
                    setLoginError(result);
                }}
            >
                {({errors, touched}) =>
                    <Form>
                        <h2 className={'title_first'}>
                            Welcome!
                        </h2>
                        <div className="deco_gray"/>
                        <h3 className={'title_second'}>
                            Login Form
                        </h3>

                        <div className="input_wrapper">
                            <div className="input_desc">
                                Email
                            </div>
                            <Field
                                name={'email'}
                                type={'text'}
                            />
                            {errors.email && touched.email ? <div className={'input_error_message'}>
                                <ErrorMessage name={'email'}/>
                            </div> : ""}
                        </div>

                        <div className="input_wrapper">
                            <div className="input_desc">
                                Password
                            </div>
                            <Field
                                name={'password'}
                                type={'password'}
                            />
                            {errors.password && touched.password ? <div className={'input_error_message'}>
                                <ErrorMessage name={'password'}/>
                            </div> : ""}
                        </div>

                        {
                            loginError && <div className={'login_error_message'}>
                                {loginError}
                            </div>
                        }

                        <button type={'submit'}>
                            Submit
                        </button>


                    </Form>
                }

            </Formik>
        </div>


    )
}

export default connect(() => ({}), {
    setUserData,
    setIsAuth
})(LoginPage)