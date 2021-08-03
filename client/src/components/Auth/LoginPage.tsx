import React, {useRef} from 'react'
import {Field, Form, Formik} from "formik"
import {login} from "../../DAL/auth/authApi"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import {setUserData} from "../../Redux/auth/authReducer"

interface IProps {
    setUserData: Function
}

const LoginPage: React.FC<IProps> = () => {

    const history = useHistory()

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
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
            <Form>
                <div>
                    <h2>
                        Login Form
                    </h2>
                    <div>
                        <Field
                            name={'email'}
                            type={'text'}

                        />

                        <Field name={'password'}
                               type={'password'}

                        />
                    </div>

                    <button type={'submit'}
                    >
                        Submit
                    </button>

                </div>


            </Form>
        </Formik>

    )
}

export default connect(() => ({}), {
    setUserData
})(LoginPage)