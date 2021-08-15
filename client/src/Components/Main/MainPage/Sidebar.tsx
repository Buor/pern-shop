import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import tea_cup from './../../../Styles/Images/Icons/tea-cup.svg'
import coffee from './../../../Styles/Images/Icons/coffee.svg'
import dishes from './../../../Styles/Images/Icons/dishes.svg'
import sweets from './../../../Styles/Images/Icons/sweets.svg'
import { GetTypesDTO } from '../../../../../@types/DTO/typeDTOs'
import { getTypes } from '../../../DAL/type/typeAPI'

const Sidebar: React.FC = () => {

    const [types, setTypes] = useState<GetTypesDTO[] | null>(null)

    useEffect(() => {
        (async () => {
            const types = await getTypes()
            setTypes(types)
        })()
    }, [])

    return (
        <div className={'sidebar'}>
            <ul className={'categories_wrapper'}>
                {types && types?.map(type => {
                    return <li className={'category_item'}>
                        <img className={'category_image'} src={tea_cup} alt='icon' />
                        <NavLink className={'category_link'} to={'/'}>Tea</NavLink>
                    </li>
                })}
                <li className={'category_item'}>
                    <img className={'category_image'} src={tea_cup} alt='icon' />
                    <NavLink className={'category_link'} to={'/'}>Tea</NavLink>
                </li>
                <li className={'category_item'}>
                    <img className={'category_image'} src={coffee} alt='icon' />
                    <NavLink className={'category_link'} to={'/'}>Coffee</NavLink>
                </li>
                <li className={'category_item'}>
                    <img className={'category_image'} src={dishes} alt='icon' />
                    <NavLink className={'category_link'} to={'/'}>Dishes</NavLink>
                </li>
                <li className={'category_item'}>
                    <img className={'category_image'} src={sweets} alt='icon' />
                    <NavLink className={'category_link'} to={'/'}>Sweets</NavLink>
                </li>
            </ul>
            <ul className='socials'>
                <li>
                    <img src='' alt='' />
                </li>
            </ul>
        </div>
    )
}
export default Sidebar