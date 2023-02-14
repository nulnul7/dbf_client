import React, { useState } from 'react';
import imageSubs from '../assets/defaultImages.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import { BlogContext } from '../contextBlog';


const BlogDetail = () => {

    const [blog, setBlog] = useState();
    const [allBlogs, setAllBlogs] = useState();
    // const { state } = useContext(BlogContext);
    // console.log(state, "isi state context")

    let location = useLocation();
    const id = location.pathname.slice(6)
    const navigate = useNavigate()

    React.useEffect(() => {
        const coba = async () => {
            try {
                const getData = await axios.get(`http://localhost:5500/5R2I/blog/${id}`)
                console.log(getData.data, 'isi blog single')
                setBlog(getData.data)

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


    // const images = blog.photos?.map((number) => ({
    //     src: `${number}` || imageSubs
    // }));

    return (
        <div className="bdContainer">
            <div className="bdWrapper">

                <img src={imageSubs} alt='blogImage' className='blogBanner' />
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