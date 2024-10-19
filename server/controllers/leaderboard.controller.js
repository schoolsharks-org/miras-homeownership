import { Admin } from '../models/admin.model.js';
import { Session } from '../models/session.model.js';
import { User } from '../models/user.model.js';

const getCurrentSession = async () => {
  const admin = await Admin.findOne();
  return admin ? admin.current_session : null;
};



export const getTopUsers = async (req,res) => {
  try {
    const currentSession = await getCurrentSession();


    if (!currentSession) {
      console.error('No current session found');
      return [];
    }

    const session=await Session.findById(currentSession)

    const data = await User.aggregate([
      { $match: { session: currentSession, answered_count: { $gt: 0 } } },
      { $addFields: { totalWealth: { $add: ["$wealth", "$investment"] } } },
      { $sort: { totalWealth: -1, avgResponseTime: 1 } },
      { $limit: 10 },
      {
        $project: {
          name: 1,
          wealth: 1,
          investment: 1,
          totalWealth: 1,
          avgResponseTime: {
            $concat: [
              { 
                $cond: [
                  { $lt: [{ $floor: { $divide: ["$avgResponseTime", 60] } }, 10] }, 
                  { $concat: ["0", { $toString: { $floor: { $divide: ["$avgResponseTime", 60] } } }] }, 
                  { $toString: { $floor: { $divide: ["$avgResponseTime", 60] } } } 
                ] 
              }, 
              ":",
              {
                $cond: [
                  { $lt: [{ $mod: ["$avgResponseTime", 60] }, 10] },
                  { $concat: ["0", { $toString: { $floor: { $mod: ["$avgResponseTime", 60] } } }] },
                  { $toString: { $floor: { $mod: ["$avgResponseTime", 60] } } }
                ]
              } 
            ]
          }
        }
      }
    ]);
    if(res){
      return res.status(200).json({leaderboard: data,totalPlayers:session?.totalPlayers || 0})
    }
    else{
      return {leaderboard: data,totalPlayers:session?.totalPlayers || 0}
    }
    
  } catch (error) {
    return res.status(500).json({message:"Something went wrong!"})
  }
};

