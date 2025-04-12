const express = require('express');
const { connectDB } = require('./config/db.config');
const notesRoutes = require('./routes/notes.routes');
const errorHandler = require('./utils/errorHandler');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration - Allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

// Database Connection
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Ini adalah api catatan sederhana dengan Node.js Express.js!')
})
app.use('/api/notes', notesRoutes);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 9876;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
