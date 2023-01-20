import React, { useContext, useState, useEffect } from 'react'
import { BlogContext } from '../contextBlog'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

// const BlogContainer = styled.div`
//     margin: 70px auto 0 auto;
//     width: 80vw;
// `
// const BlogImage = styled.img`
//     width: 100%;
//     height: 270px;
// `
// const BlogContent = styled.div`
//     display: flex;
//     width: 100%;
//     margin-top: 35px;
// `
// const BlogLink = styled.div`
//     width: 30%;
//     display: inline-block;
//     text-align: center;
// `
// const BlogText = styled.div`
//     width: 70%;
//     font-weight: 400;
// `

const BlogDetail = () => {
    const { value } = useContext(BlogContext)
    // const bude = value.singleBlog.blogData.photos
    console.log('ini all Blogs', value,);


    const images = [9, 8, 7, 6, 5].map((number) => ({
        src: `https://placedog.net/${number}00/${number}00?id=${number}`
    }));

    return (
        <div className="bdContainer">
            <div className="bdWrapper">
                <Carousel
                    className='carousel'
                    images={images}
                    style={{ height: 500, width: 800 }}
                    hasMediaButton={false}
                    hasThumbnails={false}
                />

                <img src='' alt='' />
                <div className="bdContents">
                    <ul>
                        <li>holla 1</li>
                        <li>holla 2</li>
                        <li>holla 3</li>
                    </ul>
                    <div className="bdDetail">
                        <h1>{value.singleBlog.title}</h1>
                        <article>
                            {value.singleBlog.content}
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail