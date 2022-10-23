import React,{useState, useEffect} from "react";
import Post from '../Post/Post'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import PostForm from "../Post/PostForm";

const useStyles=makeStyles((theme)=>({
    container:{
        justifyContent : "center",
        alignItems : "center",
        display: "block",
        padding: "10px",
        //backgroundColor:"#d5ebe9",
        
    }
}))

export default function Home() {
    const [error, setError]= useState(null);
    const [isLoaded, setIsLoaded]= useState(false);
    const [postList, setPostList]= useState([]);
    const classes = useStyles();

    const refreshPost = () => {
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
    }

    useEffect(()=>{
        refreshPost()
    },[postList])


    if (error) { 
        return <div>ERROR !!!</div>
    }else if (!isLoaded) {
        return <div>LOADİNG ...</div>
    }else{
        return(
            <div fixed className={classes.container}>
                <PostForm userName="name" userId={1} refreshPost={refreshPost}/>
                {postList.map(post=>(
                        <Post userName={post.userName} userId={post.userId} title={post.title} text={post.text} ></Post>                       
                        )
                    )
                }
           </div> 
        )
    }
}
