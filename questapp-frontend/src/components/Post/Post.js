import axios from "axios";
import React,{useState, useEffect} from "react";
import { ReactDOM } from "react-dom";

function Post() {
    const [error, setError]= useState(null);
    const [isLoaded, setIsLoaded]= useState(false);
    const [postList, setPostList]= useState([]);
    
    useEffect(()=>{
        fetch("/posts") 
        .then(res=>res.json())
        .then(
            (result)=>{
                setIsLoaded(true);
                setPostList(result);
            },
            (error)=>{
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])
    if (error) { 
        return <div>ERROR !!!</div>
    }else if (!isLoaded) {
        return <div>LOADİNG ...</div>
    }else{
        return(
            <ul>
                {postList.map(
                    post=>(
                       <li>
                        {post.title} {post.text}
                       </li> 
                    )
                )}
            </ul>
        )
    }
}
export default  Post;