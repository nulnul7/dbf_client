import React, { useState } from 'react';
import imageSubs from '../assets/defaultImages.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";


const BlogDetail = () => {

    const [blog, setBlog] = useState();
    const [allBlogs, setAllBlogs] = useState();
    const [imageBlog, setImageBlog] = useState([]);

    let location = useLocation();
    const id = location.pathname.slice(6)
    const navigate = useNavigate();

    //--slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    React.useEffect(() => {
        const coba = async () => {
            try {
                const getData = await axios.get(`http://localhost:5500/5R2I/blog/${id}`)
                console.log(getData.data, 'isi blog single')
                setBlog(getData.data)
                setImageBlog(
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
                const getBlogs = await axios.get(`http://localhost:5500/5R2I/blog`)
                setAllBlogs(getBlogs.data)
            } catch (error) {
                console.log(error.data);
            }
        }
        getBlogs();
    }, [id])

    console.log(imageBlog, 'isi img');

    // let images = img.length !== "" ?
    //     img.map((item, i) => {
    //         console.log(item)
    //         return (
    //             <img src={item} alt="" key={i} className='blogBanner' />
    //         )
    //     })
    //     : imageSubs;

    return (
        <div className="bdContainer">
            <div className="bdWrapper">

                <Slider {...settings}>
                    {/* <img src={"https://res.cloudinary.com/mangga/image/upload/v1674205409/portImages/Rectangle_12_nys7ue.png"} alt="" className='blogBanner' /> */}
                    <div>

                        {
                            imageBlog.map((item, index) =>
                                <img src={item} key={index} alt="" />)
                        }
                    </div>
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
        </div>
    )
}

export default BlogDetail