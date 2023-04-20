import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
let posts = [];

// Route to create a new post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.json(newPost);
});

// Route to retrieve all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.listen(3001, () => console.log('API running on port 3001'));
