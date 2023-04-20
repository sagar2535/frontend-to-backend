import React, { useState, useEffect } from 'react';

const Backend = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://127.0.0.1:3001/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]);
        setTitle('');
        setContent('');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type='text' value={title} onChange={handleTitleChange} />
        <label>Content:</label>
        <input value={content} onChange={handleContentChange} />
        <button type='submit'>Create Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Backend;
