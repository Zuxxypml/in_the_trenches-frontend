import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import { Delete, MoreHoriz, ThumbUpAlt } from "@material-ui/icons";
import moment from "moment";
import { deletePost, likePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHoriz fontSize="medium" />
        </Button>
      </div>
      <CardContent>
        <Typography color="textSecondary" variant="h5">
          {post.message.substring(0, 45)}...
        </Typography>
      </CardContent>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          By {post.creator}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <ThumbUpAlt fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(deletePost(post._id));
          }}
        >
          <Delete fontSize="small" />
          &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
