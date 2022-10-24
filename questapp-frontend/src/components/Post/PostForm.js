import React, { useState } from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { InputAdornment } from "@material-ui/core";
import Button from "@material-ui/core/Button";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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

function PostForm(props) {

    const {userName,userId,refreshPost}=props;
    const classes = useStyles();
    const [text, setText] = useState("");
    const [title, setTitle]=useState("");
    const [isSent, setIsSent]=useState(false);
    
    const savePost = () => {
        fetch("/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text,
            }),
        })
        .then((res)=>res.json())
        .catch((err)=> console.log("error"))
    }

    const handleSubmit=()=>{
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPost();
    }

    const handleTitle= (value)=>{
        setTitle(value);
        setIsSent(false);

    }  
    const handleText= (value)=>{
        setText(value);
        setIsSent(false);

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSent(false);
      };
    
    return(
        <div className="postContainer">
         <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
          Your post is sent!
          </Alert>
         </Snackbar>
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
                title={<OutlinedInput id="outlined-adornment-amount" multiline placeholder="Title" value={title} inputProps={{maxLength: 25}} fullWidth onChange={(i)=>handleTitle(i.target.value)}>

                </OutlinedInput>}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {<OutlinedInput id="outlined-adornment-amount" multiline placeholder="Text" inputProps={{maxLength: 250}} fullWidth onChange={(i)=>handleText(i.target.value)} value={text} endAdornment={
                    <InputAdornment position="end">
                        <Button variant="contained" style = {{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white'}} onClick={handleSubmit}>
                            Post
                        </Button>
                    </InputAdornment>
                }>

                </OutlinedInput>}
                </Typography>
            </CardContent>         
            </Card>
        </div>
    )
}
export default  PostForm;