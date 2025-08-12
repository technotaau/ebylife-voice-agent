require('dotenv').config();
console.log('1. Starting server...');
const express = require('express');
console.log('2. Express loaded');
const cors = require('cors');
console.log('3. CORS loaded');

const app = express();
console.log('4. App created');

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://ebylife-ai.vercel.app', 'https://ebylife.com'] 
    : 'http://localhost:3000',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
console.log('5. CORS middleware added');
app.use(express.json());
console.log('6. JSON middleware added');

// Routes
console.log('7. About to load chat route');
try {
  const chatRoute = require('./routes/chat');
  console.log('8. Chat route loaded');
  app.use('/api/chat', chatRoute);
  console.log('9. Chat route mounted');
} catch (error) {
  console.error('Error loading chat route:', error);
}
 app.use('/api/voice', require('./routes/voice')); // TODO: Implement voice route

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
console.log('About to listen on port:', PORT);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});