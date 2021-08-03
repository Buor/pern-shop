import React from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginPage from "./Components/Auth/LoginPage"
import Header from "./Components/Main/Header"
import UserPage from "./Components/User/UserPage"

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
