const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['Groceries', 'Party', 'Food', 'Clothing', 'Gaming', 'Others'], 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Income', 'Expense'], 
    required: true 
  },
  necessityLevel: { 
    type: String, 
    enum: ['Necessity', 'Comfort', 'Luxury'], 
    required: true 
  },
  description: { type: String, maxlength: 200 },
  paymentMethod: { 
    type: String, 
    enum: ['Cash', 'Card', 'UPI', 'Others'], 
    default: 'Others' 
  },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
