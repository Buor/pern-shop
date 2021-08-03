import React from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginPage from "./components/Auth/LoginPage"
import Header from "./components/Main/Header"
import UserPage from "./components/User/UserPage"

const App: React.FC = () => {

    return (
        <>
            <Header/>
            <div>
                <Switch>
                    <Route path={'/login'} render={() => <LoginPage/>}/>
                    <Route path={'/userPage'} render={() => <UserPage/>}/>
                </Switch>
            </div>
        </>
    )
}

export default App
