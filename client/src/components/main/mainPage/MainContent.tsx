import React from 'react'
import { Card } from '../../../utils/uiComponents/Card'

const MainContent: React.FC = () => {

    return (
        <div className={'main_content'}>
            <h1>Welcome to Tea Shop!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, beatae cupiditate delectus dicta dolor,
                doloremque eligendi enim fugiat incidunt minus mollitia nam nulla officia quae qui, rerum sequi. Ab
                architecto eius fugiat harum perspiciatis sit. Ab alias aliquam cum delectus dolores facere laborum
                molestias, necessitatibus provident, quo quos ratione veniam.
            </p>
            <h2>Check out best <span>categories!</span></h2>
            <div className='cards_wrapper'>
                <Card title='Title'
                      description='Desc'
                      backgroundUrl='https://avatars.mds.yandex.net/get-zen_doc/1895194/pub_5ea08c7a88edb84e60bfcce5_5ea0901e6647a20c331969ea/scale_1200'
                      textColor='white'
                      onClick={() => {console.log('click')}}
                />
                <Card title='Title'
                      description='Desc'
                      backgroundUrl='https://avatars.mds.yandex.net/get-zen_doc/1895194/pub_5ea08c7a88edb84e60bfcce5_5ea0901e6647a20c331969ea/scale_1200'
                      textColor='white'
                      onClick={() => {console.log('click')}}
                />
                <Card title='Title'
                      description='Desc'
                      backgroundUrl='https://avatars.mds.yandex.net/get-zen_doc/1895194/pub_5ea08c7a88edb84e60bfcce5_5ea0901e6647a20c331969ea/scale_1200'
                      textColor='white'
                      onClick={() => {console.log('click')}}
                />
            </div>
        </div>
    )
}
export default MainContent