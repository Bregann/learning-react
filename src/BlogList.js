import { Link } from 'react-router-dom';

/* props is properties - it's used for parsing in data to the comp

*/

const BlogList = (props) => {
    return ( 
        <div className="blog-list">
            <h2> { props.title } </h2>

            {/* loop through with a map which creates text each time */}
            {props.blogs.map(blog => (
                <div className="blog-preview" key={blog.id}>
                <Link to = {`/blogs/${blog.id}`}>
                    <h2>{ blog.title }</h2>
                </Link>
                <p>Written by { blog.author }</p>
                <button onClick={() => props.handleDelete(blog.id)}>Delete Blog</button>
                </div>
            ))}
        </div>
     );
}
 
export default BlogList;