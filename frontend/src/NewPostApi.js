import React, { useEffect, useState } from 'react';

const NewPostApi = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await fetch('http://127.0.0.1:3001/api/posts');
    const newPost = await res.json();
    // console.log(newPost);
    setPosts(newPost);
  };
  useEffect(() => {
    getPosts();
  }, []);
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const createPosts = async () => {
      const res = await fetch('http://127.0.0.1:3001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      setPosts([...posts, data]);
      setTitle('');
      setContent('');
    };
    createPosts();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title : </label>
        <input type='text' value={title} onChange={handleChangeTitle} />
        <label>Content : </label>
        <input type='text' value={content} onChange={handleChangeContent} />
        <button type='submit'>Create Post</button>
      </form>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewPostApi;
