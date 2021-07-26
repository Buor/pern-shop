import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {LoginPage} from "./components/Auth/LoginPage"
import {Container} from "./styledComponents/baseStyledComponents"

function App() {
    return (
        <Container maxWidth={1200} safePadding={15}>
            <Switch>
                <Route path={'/login'} render={() => <LoginPage/>}/>
            </Switch>
        </Container>
    )
}

export default App
