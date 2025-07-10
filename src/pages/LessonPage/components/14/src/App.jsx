import Poaster from "./Poaster"
import BoxShadowWrapper from "./Wrapper"

import './index.css'

const MOVIE = [
    {
        id:  2, 
        title: 'Титаник',
        description: 'Гагаусы наступают',
        img: 'https://avatars.mds.yandex.net/i?id=f7b9f32c16145f7f2f8f4db375533f9736527340-4238102-images-thumbs&n=13'
    },
    {
        id: 3, 
        title: 'Дом 52',
        description: 'Рамсы попутали',
        author: { fullName: 'Nicolas Cage', age: 23},
        img: 'https://m.wsj.net/video/20140829/082914mazerunnerclip/082914mazerunnerclip_1280x720.jpg'
    },
    {
        id: 5, 
        title: 'Шук',
        img: 'https://avatars.mds.yandex.net/i?id=6390c7610446626129c0930f4c34515a74b1b2b8-4592776-images-thumbs&n=13'
    },
]

const App = () => {
    

    return (
        <div className="wrapper">
            {MOVIE.map( movie => 
                <BoxShadowWrapper key={movie.id} >
                    <Poaster 
                        title={movie.title}
                        img={movie.img}
                        description={movie.description}
                        authorFullName={movie.author?.fullName}
                    />
                </BoxShadowWrapper>
            )}
        </div>
    )
}

export default App;