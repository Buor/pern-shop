import React, {useRef} from 'react'
import {Formik, Field, Form} from "formik"
import {Card, Flex} from "../../styledComponents/baseStyledComponents"
import {login} from "../../DAL/auth/authApi"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import {setUserData} from "../../redux/auth/authReducer"
import {Button} from '../../styledComponents/inputStyledComponents'
import {Input} from '../../styledComponents/inputStyledComponents'
import {H2} from "../../styledComponents/titleStyles"

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
                <Flex flexDirection={'column'} align={'center'}>
                    <Card>
                        <Flex flexDirection={'column'} width={500}>
                            <H2 style={{textAlign: "center"}}>
                                Login Form
                            </H2>
                            <Field
                                name={'email'}
                                type={'text'}

                                as={Input}
                                {...inputStyles.current}
                            />

                            <Field name={'password'}
                                   type={'password'}

                                   as={Input}
                                   {...inputStyles.current}
                            />

                            <Button type={'submit'}
                                    hover={"base"}
                                    borderRadius={20}
                                    color={'white'}
                                    padding={'10px 15px'}
                                    width={150}
                                    style={{alignSelf: 'center'}}
                            >
                                Submit
                            </Button>

                        </Flex>
                    </Card>

                </Flex>
            </Form>
        </Formik>

    )
}

export default connect(() => ({}), {
    setUserData
})(LoginPage)