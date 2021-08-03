import React, {useRef} from 'react'
import {Field, Form, Formik, ErrorMessage} from "formik"
import {login} from "../../DAL/auth/authApi"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import {setUserData} from "../../Redux/auth/authReducer"
import * as Yup from 'yup';
import {LoginSchema} from "../../Utils/YupSchemes";

interface IProps {
    setUserData: Function
}



const LoginPage: React.FC<IProps> = () => {

    const history = useHistory()

    return (
        <div className={'login_page'}>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={LoginSchema}
                onSubmit={async values => {
                    const result = await login(values)
                    if (result) {
                        //todo setUserData
                        history.push('/userPage')
                        return
                    }
                    console.log('login error!')
                }}
            >
                {({errors, touched}) =>
                    <Form>
                        <div className={'login_form'}>
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
                                {errors.email ? <div className={'input_error_message'}>
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
                            </div>

                            <button type={'submit'}>
                                Submit
                            </button>

                        </div>


                    </Form>
                }

            </Formik>
        </div>


    )
}

export default connect(() => ({}), {
    setUserData
})(LoginPage)