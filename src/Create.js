import { useState } from "react";
import { useNavigate } from 'react-router-dom'
const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault(); //this stops it from refreshing instantly
        const blog = { title, body, author }; //these variables automatically fill out due to them having the same name as the const declared above

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json '},
            body: JSON.stringify(blog)
        }).then(() =>{
            console.log('new blog added');
            setIsPending(false);
            navigate('/');
        });

    }


    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input 
                type="text" 
                required
                value={title}
                onChange={e => setTitle(e.target.value)} /* whenever being typed into the onChange event fires. The function updates the variable */
                />

                <label>Blog body</label>
                <textarea
                required 
                value={body}
                onChange={e => setBody(e.target.value)}/>
                
                <label>Blog Author:</label>
                <select
                value='author'
                onChange={e => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add form</button> }
                { isPending && <button disabled>Adding blog...</button> }
            </form>
        </div>
     );
}
 
export default Create;