import React from 'react'

export const CategoryPageContent: React.FC = () => {
    return <section className='content'>
        <div className='product_wrapper'>
            {Array(7).fill(null).map(() => <div className='product'>
                <div className='head'></div>
                <div className='image_wrapper'>
                    <img
                        src='https://pluspng.com/img-png/tea-png-png-file-name-tea-png-clipart-dimension-1540x1084-image-type-png-posted-on-may-1st-2017-category-drink-food-tags-tea-1540.png'
                        alt='tea' />
                </div>
                <div className='name'>
                    Static iofieohoqehoqeioh
                </div>
                <div className='price'>4487 $</div>
            </div>)}

        </div>
    </section>
}