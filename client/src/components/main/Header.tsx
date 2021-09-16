import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import tea_shop_logo from '../../styles/images/icons/tea_shop_logo.png'
import burger_menu from '../../styles/images/icons/burger_menu.svg'
import categories from '../../styles/images/icons/categories.svg'
import search from '../../styles/images/icons/search.svg'
import orders from '../../styles/images/icons/orders.svg'
import shopping_cart from '../../styles/images/icons/shopping_cart.svg'
import user from '../../styles/images/icons/user.svg'
import useIsVerified from '../../utils/customHooks/useIsVerified'
import { connect } from 'react-redux'
import { Basket } from '../basket/Basket'
import { LoginForm } from '../auth/LoginForm'

interface HeaderProps {
    isAuth: boolean
}

const Header: React.FC<HeaderProps> = ({ isAuth }) => {

    const isVerified = useIsVerified()

    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false)
    const [isBasketVisible, setIsBasketVisible] = useState(false)

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
                        <img src={burger_menu} alt='burger_menu' />
                    </button>
                    <NavLink to={'/'} className={'logo_link'}>
                        <img src={tea_shop_logo} alt='logo' />
                    </NavLink>
                    <button className={'btn_categories'}>
                        <img src={categories} alt='categories' />
                        <div className={'btn_text'}>
                            Categories
                        </div>
                    </button>
                    <div className='search_wrapper'>
                        <img className={'search_icon'} src={search} alt='search_icon' />
                        <input type='text' />
                        <button>Search</button>
                    </div>

                    {isVerified === 'true' || isAuth
                        ? <button className={'btn_orders'}>
                            <img src={orders} alt='orders' />
                        </button>
                        : <button className={'btn_login'} onClick={handleLoginBtnClick}>
                            <img src={user} alt='orders' />
                        </button>
                    }

                    <button className={'btn_shopping_card'} onClick={() => setIsBasketVisible(true)}>
                        <img src={shopping_cart} alt='shopping cart' />
                    </button>
                </div>
            </header>

            {isLoginFormVisible
                ? <LoginForm closeFunc={hideLoginForm} />
                : null
            }

            {isBasketVisible
                ? <Basket closeFunc={() => setIsBasketVisible(false)} />
                : null
            }

        </>
    )
}

export default connect(
    (state: any) => {
        return { isAuth: state.auth.isAuth }
    }
)(Header)