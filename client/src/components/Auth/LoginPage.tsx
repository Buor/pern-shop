import React, {useRef} from 'react'
import {Formik, Field, Form} from "formik"
import {SCard, SFlex} from "../../styledComponents/baseStyledComponents"
import {login} from "../../DAL/auth/authApi"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import {setUserData} from "../../redux/auth/authReducer"
import {SButton, SForm} from '../../styledComponents/inputStyledComponents'
import {SInput} from '../../styledComponents/inputStyledComponents'
import {SH2} from "../../styledComponents/titleStyles"

interface IProps {
    setUserData: Function
}

const LoginPage: React.FC<IProps> = ({setUserData}) => {

    const history = useHistory()

    const inputStyles = useRef({
        borderRadius: 20,
        margin: '10px 0',
        padding: '10px',
        border: '1px solid gray'
    })

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
                <SForm>
                    <SFlex flexDirection={'column'} align={'center'}>
                        <SCard>
                            <SFlex flexDirection={'column'} width={500}>
                                <SH2 style={{textAlign: "center"}}>
                                    Login Form
                                </SH2>
                                <SFlex flexDirection={'column'}>
                                    <Field
                                        name={'email'}
                                        type={'text'}

                                        as={SInput}
                                        {...inputStyles.current}
                                    />

                                    <Field name={'password'}
                                           type={'password'}

                                           as={SInput}
                                           {...inputStyles.current}
                                    />
                                </SFlex>

                                <SButton type={'submit'}
                                         hover={"base"}
                                         borderRadius={20}
                                         color={'white'}
                                         padding={'10px 15px'}
                                         width={150}
                                         style={{alignSelf: 'center'}}
                                >
                                    Submit
                                </SButton>

                            </SFlex>
                        </SCard>

                    </SFlex>
                </SForm>

            </Form>
        </Formik>

    )
}

export default connect(() => ({}), {
    setUserData
})(LoginPage)