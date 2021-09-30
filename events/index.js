const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const eventDB = [];

//Send out the events that are present in eventDB
app.get('/events', (req, res) => {
  console.log(`${req.url} - ${req.method}`);
  res.json(eventDB);
});

//Take the incoming events and then emit accross all the events
app.post('/events', (req, res) => {
  const events = req.body;

  eventDB.push(events);

  axios.post('http://post-clu-srv:4000/events', events);
  axios.post('http://comments-clu-srv:5000/events', events);
  axios.post('http://query-clu-srv:4002/events', events);
  axios.post('http://moderation-clu-srv:4003/events', events);

  return res.status(200).json({ message: 'Events emitted' });
});

app.listen(4001, () => {
  console.log(`Event service is running in the port 4001`);
});
