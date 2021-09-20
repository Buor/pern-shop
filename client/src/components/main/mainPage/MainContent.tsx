import React from 'react'
import { Card } from '../../../utils/uiComponents/Card'
import { useHistory } from 'react-router-dom'

const MainContent: React.FC = () => {

    const history = useHistory()

    const redirectToCategory = (categoryName: string) => {
        history.push(`/category/${categoryName}`)
    }

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
                <Card title='Tea'
                      description='Tea is a main thing of out shop!'
                      backgroundUrl='https://avatars.mds.yandex.net/get-zen_doc/1895194/pub_5ea08c7a88edb84e60bfcce5_5ea0901e6647a20c331969ea/scale_1200'
                      textColor='white'
                      onClick={() => redirectToCategory('tea')}
                />
                <Card title='Coffee'
                      description='The aroma of fine coffee will help you in any situation!'
                      backgroundUrl='https://phonoteka.org/uploads/posts/2021-05/1621032878_6-phonoteka_org-p-kofe-zernovoi-fon-12.jpg'
                      textColor='white'
                      onClick={() => redirectToCategory('coffee')}
                />
                <Card title='Chicory'
                      description='Chicory does not contain caffeine at all, and is not inferior in quality to coffee!'
                      backgroundUrl='https://img5.goodfon.com/original/2560x1440/b/b7/tsvetok-tsikorii-goluboi-tsvet.jpg'
                      textColor='white'
                      onClick={() => redirectToCategory('chicory')}
                />
            </div>
        </div>
    )
}
export default MainContent