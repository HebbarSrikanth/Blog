const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  //Check if the comment has been created and then check if its content has orange in it
  if (type === 'commentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    //Emit out an event saying that event has been moderated
    await axios.post('http://event-clu-srv:4001/events', {
      type: 'commentModerated',
      data: {
        ...data,
        status: status,
      },
    });
  }
  res.status(201).json({ message: 'Events Received' });
});

app.listen(4003, () => {
  console.log(`Moderation is listening in the port 4003`);
});
