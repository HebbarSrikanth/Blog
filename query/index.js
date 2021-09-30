const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  //check if the event is for post creation if so then add to memory
  if (type === 'postCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  //check if the event is for comment creation if so then take its post and push it into comment array
  if (type === 'commentCreated') {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  //check if the event is for post updation if so, take that post and then search for the comment and then update the status
  if (type === 'commentUpdated') {
    const { id, postId, status, content } = data;
    const post = posts[postId];
    const comment = post.comments.find((c) => c.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  console.log(`${req.method} - ${req.method}`);
  res.status(200).json(posts);
});

app.post('/events', (req, res) => {
  console.log(`${req.method} - ${req.method}`);
  const { type, data } = req.body;

  handleEvents(type, data);

  res.status(201).json({ message: 'Successfully inserted in query service' });
});

app.listen(4002, async () => {
  console.log(`Query Service is running in the port 4002`);

  const { data } = await axios.get('http://event-clu-srv:4001/events');

  for (let i of data) {
    handleEvents(i.type, i.data);
  }
});
