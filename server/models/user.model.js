import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
  responses: [{
    quesId: {
      type: Number,
      required: true,
    },
    response: {
      type: String,
      enum: ['A', 'B', ''],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  sq: {
    type: String,
    required: true,
  },
  answered_count: {
    type: Number,
    required: true,
    default: 0,
  },
  wealth: {
    type: Number,
    required: true,
    default: 0,
  },
  investment: {
    type: Number,
    required: true,
    default: 0,
  },

  avgResponseTime: {
    type: Number,
    default: 0,
  },


  version: {
    type: Number,
    default: 0
  }
}, { timestamps: true, versionKey: false });

// Index definitions
userSchema.index({ session: 1 }); 
userSchema.index({ wealth: -1 }); 
userSchema.index({ investment: -1 }); 

const User = mongoose.model('User', userSchema);

export { User };