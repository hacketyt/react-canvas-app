const express = require('express');
const mongoose = require('mongoose');
const drawingRoutes = require('./routes/drawingRoutes');

const app = express();

app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://adminuser:adminuser@cluster0.c4yn0li.mongodb.net/canvas-app?retryWrites=true&w=majority&appName=cluster0';
mongoose.connect(mongoURI, {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

// Root route
app.get('/', (req, res) => res.send('Hello World'));

// Use the drawing routes
app.use('/api/drawings', drawingRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
