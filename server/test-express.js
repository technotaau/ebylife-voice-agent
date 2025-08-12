console.log('1. Starting...');
const express = require('express');
console.log('2. Express loaded');
const app = express();
console.log('3. App created');

app.get('/', (req, res) => {
  res.send('Hello');
});
console.log('4. Route added');

const PORT = 3003;
console.log('5. About to listen on port:', PORT);
app.listen(PORT, () => {
  console.log('6. Server is running on port', PORT);
});
console.log('7. Listen called');