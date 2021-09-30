const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
app.get('/posts', (req, res) => {
  console.log(`${req.method} - ${req.url}`);
  res.status(200).json(posts);
});

app.post('/posts/create', async (req, res) => {
  //Create a id
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  //Add the post to the memory with the above id as the key in the object
  posts[id] = {
    id,
    title,
  };

  //Post to the event bus which then pushes to all the other services inclucing this
  await axios.post('http://event-clu-srv:4001/events', {
    type: 'postCreated',
    data: {
      id,
      title,
    },
  });

  res.status(201).json(posts[id]);
});

//To handle the event that is being emitted by the event bus
app.post('/events', (req, res) => {
  console.log(`${req.method} - ${req.url}`);
  return res.status(200).json({ message: 'Event received' });
});

app.listen(4000, () => {
  console.log('Post Service is running on the port 4000');
});
