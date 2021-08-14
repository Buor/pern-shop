import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../../../DAL/products/productsAPI'
import { NavLink } from 'react-router-dom'
import { GetAllProductsDTO } from '../../../../../../@types/DTO/productDTOs'

export const SectionAll: React.FC = () => {

    const [products, setProducts] = useState<GetAllProductsDTO[] | null>(null)

    useEffect(() => {
        (async () => {
            const allProducts: GetAllProductsDTO[] = (await getAllProducts()).data
            setProducts(allProducts)
        })()
    }, [])

    return <section>
        <div className='title'>All products</div>
        <div className='items_wrapper'>
            {products && products.map(product => {
                return <div className='item'>
                    <div className='item_head'>

                    </div>
                    <NavLink to={'/'}>
                        <div className='item_image_wrapper'>
                            <img className={'item_image'}
                                 src={product.img || 'http://cdn.onlinewebfonts.com/svg/img_451641.png'}
                                 alt='product_image' />
                        </div>
                    </NavLink>
                    <NavLink to={'/'}>
                        <div className='item_name'>{product.name}</div>
                    </NavLink>

                    {product.discountCost
                        ? <div className='item_discount'>
                            <span className='item_cost'>{product.discountCost}</span>
                            <span className='item_currency'>$</span>
                        </div>
                        : null
                    }

                    <div className='item_cost_wrapper'>
                        <span className='item_cost'>{product.cost}</span>
                        <span className='item_currency'>$</span>
                    </div>

                    {
                        product.count > 100
                            ? <div className='item_stock'></div>
                            :
                            product.count > 0
                                ? <div className='item_stock finishes'>Заканчивается</div>
                                : <div className='item_stock'>Нет в наличии</div>
                    }
                </div>
            })}
        </div>
    </section>
}