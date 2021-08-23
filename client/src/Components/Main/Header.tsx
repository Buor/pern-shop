import React, { useState } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import tea_shop_logo from "./../../Styles/Images/Icons/tea_shop_logo.png"
import burger_menu from "./../../Styles/Images/Icons/burger_menu.svg"
import categories from "./../../Styles/Images/Icons/categories.svg"
import search from "./../../Styles/Images/Icons/search.svg"
import orders from "./../../Styles/Images/Icons/orders.svg"
import shopping_cart from "./../../Styles/Images/Icons/shopping_cart.svg"
import user from "./../../Styles/Images/Icons/user.svg"
import useIsVerified from "../../Utils/CustomHooks/useIsVerified";
import {connect} from "react-redux";
import LoginForm from '../Auth/LoginForm'

interface HeaderProps {
    isAuth: boolean
}

const Header: React.FC<HeaderProps> = ({isAuth}) => {

    const isVerified = useIsVerified();
    const history = useHistory();

    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false)

    const handleLoginBtnClick = () => {
        setIsLoginFormVisible(true)
    }

    const hideLoginForm = () => {
        setIsLoginFormVisible(false)
    }

    return (
        <>

        <header className={'main_header'}>
            <div className={'header_wrapper container'}>
                <button className={'btn_burger_menu'}>
                    <img src={burger_menu} alt="burger_menu"/>
                </button>
                <NavLink to={'/'} className={'logo_link'}>
                    <img src={tea_shop_logo} alt="logo"/>
                </NavLink>
                <button className={'btn_categories'}>
                    <img src={categories} alt="categories"/>
                    <div className={'btn_text'}>
                        Categories
                    </div>
                </button>
                <div className="search_wrapper">
                    <img className={'search_icon'} src={search} alt="search_icon"/>
                    <input type="text"/>
                    <button>Search</button>
                </div>

                {isVerified === "true" || isAuth
                    ? <button className={'btn_orders'}>
                        <img src={orders} alt="orders"/>
                    </button>
                    : <button className={'btn_login'} onClick={handleLoginBtnClick}>
                        <img src={user} alt="orders"/>
                    </button>
                }

                <button className={'btn_shopping_card'}>
                    <img src={shopping_cart} alt="shopping cart"/>
                </button>
            </div>
        </header>

            {isLoginFormVisible
                ? <LoginForm closeFunc={hideLoginForm}/>
                : null
            }

        </>
    )
}

export default connect(
    (state: any) => {
        return {isAuth: state.auth.isAuth}
    }
)(Header)