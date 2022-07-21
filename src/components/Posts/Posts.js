import React, { useEffect } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  console.log(posts);
  useEffect(() => {}, [posts]);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      spacing={3}
      alignItems="stretch"
    >
      {posts.map((post) => (
        <Grid item xs={12} key={post._id} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
