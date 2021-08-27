import React,  { useState, useEffect, useRef } from 'react';


const Search = (props) => {
    const {postList, setPostList} = props
    const [searchTerm, setSearchTerm] = useState('')
    const resettingRef = useRef(false);
    const reset = (e) => {
    resettingRef.current = true;
    setSearchTerm(e);
    }
    useEffect(() => {
        if(resettingRef.current){
        resettingRef.current = false;
        searchHandler();
        }
    },[searchTerm])


    const searchHandler = () =>{
        const newPostList = postList.filter(
            (post)=> {
                return post.title.toLowerCase().includes(searchTerm.toLowerCase())
            }
        )
        console.log(newPostList)
        setPostList(newPostList)
    }

    return <section> 
        <form >
            <div>
                <label>Search </label>
                <input type="text"
                placeholder="Search" 
                value = {searchTerm} 
                onChange={(e)=> {
                    reset(e.target.value)
                    }
                }
                />
                
            </div>
            
        </form>
    </section>
}

export default Search;