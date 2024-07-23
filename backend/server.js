const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let segments = [];

app.post('/segments', (req, res) => {
  const { segmentName, schema } = req.body;
console.log(req.body);

  segments.push(req.body);

  res.status(201).json(req.body);
});

app.get('/segments', (req, res) => {
  res.json(segments);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
