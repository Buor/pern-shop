import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"

import './styles/mainStyles/styles.css'
//@ts-ignore
import store from './redux/store'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

export type RootState = ReturnType<typeof store.getState>
//todo remove on deploy
//@ts-ignore
window.store = store;