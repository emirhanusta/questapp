import React,{useState, useEffect} from "react";
import Post from '../Post/Post'
import "./Home.scss"
export default function Home() {
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
            <div className='container'>
                {postList.map(post=>(
                        <Post title={post.title} text={post.text}></Post>                       
                        )
                    )
                }
           </div> 
        )
    }
}
