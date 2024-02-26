import React, { useState } from 'react';
import imageSubs from '../assets/defaultImages.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const BlogDetail = () => {

    const [blog, setBlog] = useState();
    const [allBlogs, setAllBlogs] = useState();
    const [imageBlog, setImageBlog] = useState([]);

    let location = useLocation();
    const id = location.pathname.slice(6)
    const navigate = useNavigate();
    const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL, })


    //--slider
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
    };

    React.useEffect(() => {
        const coba = async () => {
            try {
                const getData = await axiosInstance.get(`blog/${id}`)
                console.log(getData.data, 'isi blog single')
                setBlog(getData.data)
                setImageBlog(
                    getData.data.photos.length === 0 ? [imageSubs] :
                        getData.data.photos.map(item => {
                            return (item)
                        })
                )

            } catch (error) {
                console.log(error.data);
            }
        }
        coba();
        const getBlogs = async () => {
            try {
                const getBlogs = await axiosInstance.get(`blog`)
                setAllBlogs(getBlogs.data)
            } catch (error) {
                console.log(error.data);
            }
        }
        getBlogs();
    }, [id])

    return (
        <div className="bdContainer">
            <Slider {...settings}>
                {
                    imageBlog.map((item, index) => {
                        return (
                            <div key={index} className='card'>
                                <img src={item} alt="gambar blog" className="blogBanner" />
                            </div>
                        )
                    })
                }
            </Slider>
            <div className="bdContents">
                <ul>
                    {allBlogs?.map(item =>
                        <li
                            key={item._id}
                            onClick={() => navigate(`/blog/${item._id}`)}>
                            {item.title}
                        </li>
                    )}
                </ul>
                <div className="bdDetail">
                    <h1> {blog?.title}</h1>
                    <article>
                        {blog?.content}
                    </article>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail