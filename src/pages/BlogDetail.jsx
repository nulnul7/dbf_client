import React, { useState } from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import imageSubs from '../assets/defaultImages.jpeg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const BlogDetail = () => {

    const [blog, setBlog] = useState({})

    let location = useLocation();
    const id = location.pathname.slice(6)

    React.useEffect(() => {
        const coba = async () => {
            const getData = await axios.get(`http://localhost:5500/5R2I/blog/${id}`)
            setBlog(getData.data)
            console.log(getData.data, 'isi blog single')
        }
        coba();
    }, [id])


    const images = blog.photos?.map((number) => ({
        src: `${number}`
    }));

    return (
        <div className="bdContainer">
            <div className="bdWrapper">
                <div className="carousel">
                    {
                        images ?
                            <Carousel
                                images={images}
                                style={{ height: 250, width: 1050 }}
                                hasMediaButton={false}
                                hasThumbnails={false}
                                objectFit='cover'
                            /> : <img src={imageSubs} alt="nkri" className='altPicts' />
                    }
                </div>
                <img src='' alt='' />
                <div className="bdContents">
                    <ul>
                        <li>halo 1</li>
                        <li>halo 2</li>
                        <li>halo 3</li>

                    </ul>
                    <div className="bdDetail">
                        <h1>{blog.title}</h1>
                        <article>
                            {blog.content}
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail