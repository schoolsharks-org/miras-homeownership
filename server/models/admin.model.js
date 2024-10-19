import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        required: true
    },
    current_session: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Session' 
    }
}, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema); 