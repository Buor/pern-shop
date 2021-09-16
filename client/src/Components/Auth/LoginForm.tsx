import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { login } from '../../dal/auth/authApi'
import { useDispatch } from 'react-redux'
import { LoginSchema } from '../../utils/yupSchemes'
import useIsVerified from '../../utils/customHooks/useIsVerified'
import { setIsAuth } from '../../redux/auth/authReducer'

interface IProps {
    closeFunc: Function
}

export const LoginForm: React.FC<IProps> = ({ closeFunc }) => {

    const dispatch = useDispatch()
    const isVerified = useIsVerified()
    const [loginError, setLoginError] = useState('')

    if (isVerified === 'pending' || isVerified === 'true') return null

    return (
        <div className={'login_form'} onClick={() => closeFunc()}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={LoginSchema}
                onSubmit={async values => {

                    if (Object.values(values).some(val => val === '')) {
                        setLoginError('All fields must be filled!')
                        return
                    }

                    const result = await login(values)
                    if (result === true) {
                        dispatch(setIsAuth(true))
                        closeFunc()
                        return
                    }
                    setLoginError(result)
                }}
            >
                {({ errors, touched }) =>
                    <Form onClick={e => e.stopPropagation()}>
                        <h2 className={'title_first'}>
                            Welcome!
                        </h2>
                        <div className='deco_gray' />
                        <h3 className={'title_second'}>
                            Login Form
                        </h3>

                        <div className='input_wrapper'>
                            <div className='input_desc'>
                                Email
                            </div>
                            <Field
                                name={'email'}
                                type={'text'}
                            />
                            {errors.email && touched.email ? <div className={'input_error_message'}>
                                <ErrorMessage name={'email'} />
                            </div> : ''}
                        </div>

                        <div className='input_wrapper'>
                            <div className='input_desc'>
                                Password
                            </div>
                            <Field
                                name={'password'}
                                type={'password'}
                            />
                            {errors.password && touched.password ? <div className={'input_error_message'}>
                                <ErrorMessage name={'password'} />
                            </div> : ''}
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