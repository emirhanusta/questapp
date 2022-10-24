import React, { useState,isInitialMount,useEffect } from "react";
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom'
import { useRef } from "react";
import Comment from "../Comment/Comment";
import Container from '@material-ui/core/Container';
import CommentForm from "../Comment/CommentForm";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
      margin: 20,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    avatar: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    },
    link:{
      textDecoration:"none",
      boxShadow:"none",
      color: "white"
    },
  }));

function Post(props) {

    const {title,text,userName,userId,postId}=props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLiked]=useState(false);
    const [error, setError]= useState(null);
    const [isLoaded, setIsLoaded]= useState(false);
    const [commentList, setCommentList]= useState([]);
    const isInitialMount=useRef(true);

    const handleExpandClick = () => {
      setExpanded(!expanded);
      refreshComments();
      console.log(commentList);
    };

    const handleLike=()=>{
      setLiked(!liked);
    }

    const refreshComments = () => {
      fetch("/comments?postId="+postId) 
      .then(res=>res.json())
      .then(
          (result)=>{
              setIsLoaded(true);
              setCommentList(result);
          },
          (error)=>{
              setIsLoaded(true);
              setError(error);
          }
      )
  }

  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current=false;
    } else 
      refreshComments()
},[commentList])

    return(
        <div className="postContainer">
          <Card className={classes.root}>
            <CardHeader
                avatar={
                  <Link className={classes.link} to={{pathname: '/users/'+userId}}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                    {userName.charAt(0).toUpperCase()}
                    </Avatar>
                  </Link>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleLike}>
                <FavoriteIcon style={liked ? {color: "red" }:null}/>
                </IconButton>

                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <CommentIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Container fixed className={classes.container}>
                {error? "error" :
                    isLoaded? commentList.map(comment => (
                      <Comment userId = {1} userName = {"user"} text = {comment.text}></Comment>
                    )) : "Loading"}
                    <CommentForm userId = {1} userName = {"user"} postId = {postId}></CommentForm>
                </Container>
            </Collapse>
            </Card>
        </div>
    )
}
export default  Post;