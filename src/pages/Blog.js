import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard'
import { useNavigate } from 'react-router-dom'

import { BlogContext } from '../contextBlog'

const Blog = () => {

  const [blog, setBlog] = useState([])
  const [blogId, setBlogId] = useState()

  const { dispatch, value } = useContext(BlogContext)

  useEffect(() => {
    const getBlog = async () => {
      try {
        const dataBlog = await axios.get('http://localhost:5500/5R2I/blog')
        setBlog(dataBlog.data)
      } catch (error) {
        console.log(error.message);
      }
    }
    getBlog()
  }, [])

  console.log('isi dari data detil', blog)
  const navigate = useNavigate()
  const clickHandler = (id) => {
    const getBlogSingle = async () => {
      try {
        const blog = await axios.get(`http://localhost:5500/5R2I/blog/${id}`)
        setBlogId(blog.data)
        dispatch({
          type: "GET_BLOG_SINGLE",
          payload: blog.data
        })
        return blog.data
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error.message
        })
      }
    }
    getBlogSingle()
    console.log('isi singleBlog', value, blog);
    navigate(`/blog/${id}`)
  }

  return (
    <div className="blogContainer">
      <div className='blogHeader'>
        <h1 className="blogTitle grid-1">Latest Stories</h1>
        <span className='subHeader grid-2'>simply thought or just curiosity</span>
      </div>
      {
        blog.map(item => {
          let gdate = item.createdAt?.slice(0, 10);
          return (
            <BlogCard
              key={item._id}
              date={gdate || '12/02/2025'}
              topic={item.category}
              blogTitle={item.title}
              glance={item.glance}
              author={item?.author}
              clickHandler={() => clickHandler(item._id)}
            />
          )
        })
      }
    </div>

  )
}

export default Blog
