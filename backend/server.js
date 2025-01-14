const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); 

app.use('/api/transactions', transactionRoutes); 


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.error('MongoDB connection error:', error));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
