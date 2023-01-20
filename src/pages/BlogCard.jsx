const BlogCard = ({ date, topic, blogTitle, glance, author, clickHandler }) => {
    return (
        <>
            <div onClick={clickHandler} className='blogRow'>
                <span className="grid-3"> {date} </span>
                <span className="grid-4"> {topic} </span>
                <h1 className="grid-5"> {blogTitle} </h1>
                <span className="grid-6"> {glance} </span>
                <span className="grid-7"> {author} </span>
            </div>
            {/* <hr className="garisHr" /> */}
        </>

    )
}
export default BlogCard