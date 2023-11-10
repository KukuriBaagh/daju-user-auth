const express = require('express');
const auth = require('./routes/auth');
const post = require('./routes/posts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', auth);
app.use('/posts', post);

app.get('/', (req, res) => {
  res.send('<h3>Hi i am working</h3>');
});

app.listen(5000, () => {
  console.log('Now running on port 5000');
});
