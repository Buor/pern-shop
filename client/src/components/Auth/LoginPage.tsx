import {Formik, Field, Form} from "formik"
import { Flex } from "../../styledComponents/baseStyledComponents"
import {login} from "../../DAL/auth/authApi"

export const LoginPage = () => {

    return (
        <div>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                onSubmit={values => {
                    login(values)
                }}
            >
                <Form>
                    <Flex flexDirection={'column'} align={'center'}>
                        <Flex flexDirection={'column'} width={500}>
                            <Field name={'email'} type={'text'}/>
                            <Field name={'password'} type={'password'}/>
                            <button type={'submit'}>Submit</button>
                        </Flex>
                    </Flex>
                </Form>
            </Formik>
        </div>
    )
}