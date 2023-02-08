import React, { useReducer, useEffect } from "react"
import axios from "axios"

export const BlogContext = React.createContext()

const BlogInitState = {
    isLoading: false,
    isERROR: null,
    allBlogs: [],
    singleBlog: {},
}

// const GetBlogActions = {
//     SET_LOADING: "SET_LOADING",
//     SET_ERROR: "SET_ERROR",
//     GET_BLOG_SINGLE: "GET_BLOG_SINGLE",
//     GET_BLOGS: "GET_BLOGS",
// }

const BlogReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, isLoading: true }
        case "GET_BLOG_SINGLE":
            return {
                ...state,
                singleBlog: action.payload,
                isLoading: null
            }
        case "GET_BLOGS":
            return {
                ...state,
                allBlogs: action.payload,
                isLoading: null
            }
        case "SET_ERROR":
            return {
                ...state,
                isERROR: action.payload,
            }
        default:
            return state;
    }
}


const BlogProvider = ({ children }) => {

    useEffect(() => {
        const allBlogs = async () => {
            try {
                const blogs = await axios.get('http://localhost:5500/5R2I/blog')
                console.log(blogs.data);
                dispatch({
                    type: "GET_BLOGS",
                    payload: blogs.data
                })
            } catch (error) {
                dispatch({
                    type: "SET_ERROR",
                    payload: { error: error.message }
                })
            }
        }
        allBlogs();
    }, [])

    const [state, dispatch] = useReducer(BlogReducer, BlogInitState)
    const value = {
        isERROR: state.isERROR,
        isLoading: state.isLoading,
        singleBlog: state.singleBlog,
        allBlogs: state.allBlogs,
    }

    return (
        <BlogContext.Provider
            value={{
                ...value,
                dispatch,
            }}
        >
            {children}
        </BlogContext.Provider>
    )
}
export default BlogProvider