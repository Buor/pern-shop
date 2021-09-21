import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/main/Header'
import UserPage from './components/user/UserPage'
import MainPage from './components/main/mainPage/MainPage'
import CategoryPage from './components/categories/CategoryPage'
import { ProductPage } from './components/product/ProductPage'

const App: React.FC = () => {
    return (
        <>
            <Header />
            <div className={'container'}>
                <Switch>
                    <Route path={'/'} exact render={() => <MainPage />} />
                    <Route path={'/userPage'} render={() => <UserPage />} />
                    <Route path={'/category'} render={() => <CategoryPage />} />
                    <Route path={'/product'} render={() => <ProductPage />} />
                </Switch>
            </div>
        </>
    )
}

export default App
