import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    end_time: {
        type: Date
    },

    leaderboard: [{
        name: String,
        wealth: Number,
        investment: Number,
        totalWealth: Number,
        avgResponseTime: String,
    }],
    totalPlayers: {
        type: Number,
        default: 0
    },


}, { timestamps: true });

export const Session = mongoose.model('Session', sessionSchema);