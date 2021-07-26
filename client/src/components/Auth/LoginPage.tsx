import {Formik, Field, Form} from "formik"
import {Flex} from "../../styledComponents/baseStyledComponents"
import {login} from "../../DAL/auth/authApi"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import {setUserData} from "../../redux/auth/authReducer"

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
                        history.push('/')
                    }
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

export default connect(() => {
}, {
    setUserData
})(LoginPage)