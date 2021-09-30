const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const comments = {};

//To fetch all the comments for a particular post using the postID
app.get('/posts/:id/comments', (req, res) => {
  console.log(`${req.method} - ${req.url}`);
  res.status(200).json(comments[req.params.id] || []);
});

//To store the new comment for the post using its ID sent through params
app.post('/posts/:id/comments', async (req, res) => {
  console.log(`${req.method} - ${req.url}`);
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comment = comments[req.params.id] || [];
  comment.push({ id, content });
  comments[req.params.id] = comment;

  //Emit to Event-Bus stating that comment has been created
  await axios.post('http://event-clu-srv:4001/events', {
    type: 'commentCreated',
    data: {
      id,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).json(comment);
});

app.post('/events', async (req, res) => {
  console.log(`${req.method} - ${req.url}`);
  const { type, data } = req.body;

  //If the event is commentModerated then take the event and do the required tasks
  if (type === 'commentModerated') {
    //Data contains a comment
    const { id, postId, status } = data;
    //Fetch all the comments for that particular post ID
    const comment = comments[postId];

    //Search for that particular comment in comments
    const specificComment = comment.find((c) => c.id === id);
    //UPdate the status
    specificComment.status = status;

    //Emit event to event bus for the updation
    await axios.post('http://event-clu-srv:4001/events', {
      type: 'commentUpdated',
      data: {
        ...data,
      },
    });
  }

  res.status(200).json({ message: 'Event received from event-bus' });
});

app.listen(5000, () => {
  console.log(`Comment service is listening in the port 5000`);
});
