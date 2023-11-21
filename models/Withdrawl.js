const mongoose = require('mongoose');

const withdrawlSchema = new mongoose.Schema({
   // Your withdrawal schema fields
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   amount: { type: Number, required: true },
   status: { type: String, enum: ['pending', 'approved', 'disapproved'], default: 'pending' },
   // ... other fields
}, { timestamps: true });

const Withdrawl = mongoose.model('Withdrawal', withdrawlSchema);

module.exports = Withdrawl;
