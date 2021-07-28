import React, { useState } from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPage from "./components/Auth/LoginPage"
import {Container} from "./styledComponents/baseStyledComponents"
import Header from "./components/Main/Header"
import UserPage from "./components/User/UserPage"
import {ThemeProvider} from "styled-components"

import './styledComponents/base.css'

const theme = {
    palette: {
        success: '#00a046',
        successLight: '#01cb59'
    },
    fonts: {
        base: 'Arial, serif'
    }
}
const App: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Container maxWidth={1200} safePadding={15}>
                <Switch>
                    <Route path={'/login'} render={() => <LoginPage/>}/>
                    <Route path={'/userPage'} render={() => <UserPage/>}/>
                </Switch>
            </Container>
        </ThemeProvider>

    )
}

export default App
