
import { useState, useEffect, useContext } from "react";

import { PostContext } from "../providers/postProvider";
import { GetPosts } from "../api";
export const usePosts = () => {
  return useContext(PostContext);
};
export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const resp = GetPosts(1, 10);
    resp
      .then((response: any) => {
        console.log("----", response);
        return response.data;
      })
      .then((data: any) => {
        setPosts(data.posts);
        setLoading(false);
      });
  }, []);
  const addPostsToState = (post: any) => {
    const newPosts: any = [post, ...posts];
    setPosts(newPosts);
  };
  const addComment = (comment: string, postId: string) => {
    const newPost: any = posts.map((post: any) => {
      if (post._id === postId) {
        //post.comments.push
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    setPosts(newPost);
  };
  return {
    posts: posts,
    loading,
    addPostsToState,
    addComment,

  };
};
