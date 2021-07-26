import React, { useState } from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPage from "./components/Auth/LoginPage"
import {Container} from "./styledComponents/baseStyledComponents"
import Header from "./components/Main/Header"
import UserPage from "./components/User/UserPage"

const App: React.FC = () => {

    return (
        <>
            <Header/>
            <Container maxWidth={1200} safePadding={15}>
                <Switch>
                    <Route path={'/login'} render={() => <LoginPage/>}/>
                    <Route path={'/userPage'} render={() => <UserPage/>}/>
                </Switch>
            </Container>
        </>

    )
}

export default App
