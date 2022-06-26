import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    //these are hooks for setting values. setName and setAge are methods
    // more info at https://reactjs.org/docs/hooks-intro.html
    const [name, setName] = useState('mario');
    const [age, setAge] = useState(25);
    const { data: blogs, setData, isPending, error } = useFetch('http://localhost:8000/blogs') //grab the data but call it blogs by using : 

    /* this is a state with multiple objects

    const [blogs, setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ]);*/

    //useEffect runs every time the page is rendered (e.g. when the setBlogs method is ran). This is ran on intial page load so its good for grabbing data
    useEffect(() => {
        console.log('use effect ran');
        console.log(blogs); // you can access all variables from this
    }, [name]); //use ,[] to only run the first time. Entering in values to the array will monitor only when changes are made - these are dependancies



    //to handle onClick events, setName and setAge set the text
    const handleClick = (e) => {
        console.log('hello', e);
        setName('tilly');
        setAge(73);
    }

    /*
    This is for the blogs component - it is bad to edit the object directly from the blog list
    */

    
    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setData(newBlogs);
    }


    const handleClickAgain = (name, e) => {
        console.log('hello ' + name, e.target);
    }

    return (
        <div className="home">
            <h2>Homepage</h2>

            { isPending && <div>Loading.......</div>}
            { error && <div>Error {error} </div>}

            {<BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete}/> } { /* blogs is a property - this is accessed with props in the comp. Can also pass through functions too such as handle delete*/}
            {<BlogList blogs={blogs.filter((blog) => blog.author === 'mario')} title="Mario's blogs" handleDelete={handleDelete}/> } { /* filter is like where in LINQ */ }
            <p>{ name } is { age } years old</p>
            <button onClick={handleClick}>Click me</button>
            { /* when onClick events are parsing data you have to do (e) =>  */ }
            <button onClick={(e) => handleClickAgain('tilly', e)}>Click me again</button> 
            <button onClick={() => setName('tilly2')}>Click me again again</button> 

        </div>
      );
}
 
export default Home;