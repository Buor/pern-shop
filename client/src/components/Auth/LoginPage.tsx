import React from 'react';
import {Formik, Field, Form} from "formik"
import {Flex} from "../../styledComponents/baseStyledComponents"
import {login} from "../../DAL/auth/authApi"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import {setUserData} from "../../redux/auth/authReducer"
import { Button } from '../../styledComponents/inputStyledComponents';
import { Input } from '../../styledComponents/inputStyledComponents';

interface IProps {
    setUserData: Function
}

const LoginPage: React.FC<IProps> = ({setUserData}) => {

    const history = useHistory()

    return (
        <div>
            Login form
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
                    console.log('login error!');
                }}
            >
                <Form>
                    <Flex flexDirection={'column'} align={'center'}>
                        <Flex flexDirection={'column'} width={500}>
                            <Field name={'email'} type={'text'}/>
                            <Field name={'password'} type={'password'}/>

                            <Button type={'submit'}
                                    hover={"base"}
                                    borderRadius={20}
                                    color={'white'}
                                    padding={'10px 15px'}
                            >
                                Submit
                            </Button>

                        </Flex>
                    </Flex>
                </Form>
            </Formik>
        </div>
    )
}

export default connect(() => ({}), {
    setUserData
})(LoginPage)