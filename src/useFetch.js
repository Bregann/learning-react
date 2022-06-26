import { useState, useEffect } from "react";

//custom hooks ALWAYS have to start with use
const useFetch = (url) => {
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal }) //do an api request
            .then(res => { //once the api responds 
                console.log(res);
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json(); //convert it to json and return it
            })
            .then(data => { //then get the json data here
                console.log(data); //log it
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => { //catch any sort of network error and log it

                if(err.name === 'AbortError'){
                    console.log('fetch aborted');
                }
                else{
                    console.log(err.message);
                    setError(err.message);
                    setIsPending(false);
                }
            })

        return () => abortCont.abort();
    }, []); //empty array to fire only at the start

    return { data, setData, isPending, error } //return all the data to the component that used it. You can also pass back the set methods too incase you want to manipulate the data.

}

const useRemoveBlog = (blogs, blogId) => {
    const [data, setData] = useState([]);

    const newBlogs = blogs.filter(blog => blog.id !== blogId);
    setData(newBlogs);
}

export default useFetch; //it has to be exported so it can be used in other files