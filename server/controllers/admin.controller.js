import { Admin } from "../models/admin.model.js";
import { Session } from "../models/session.model.js";
import moment from 'moment-timezone';
import { User } from "../models/user.model.js";
import ExcelJS from 'exceljs';
import { transporter } from "../config/nodemailer.js";
import { REPORT_EMAIL, SENDING_EMAIL } from "../config/reportEmail.js";
import { getTopUsers } from "./leaderboard.controller.js";

export const createSession = async (req, res) => {
    try {
        const admin = await Admin.findOne();

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (admin.active) {
            const activeSession = await Session.findById(admin.current_session);
            if (!activeSession) {
                closeSession(req, res)
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }
            return res.status(200).json({
                message: 'A session is already active',
                session: {
                    id: activeSession._id,
                    name: activeSession.name
                }
            });
        }
        const currentDateTime = moment.tz('Asia/Kolkata').format('DD/MM/YYYY, hh:mm A');
        const newSession = new Session({
            name: `Session - ${currentDateTime}`
        });
        await newSession.save();

        admin.active = true;
        admin.current_session = newSession._id;
        await admin.save();

        return res.status(200).json({
            message: 'New session created successfully',
            session: {
                id: newSession._id,
                name: newSession.name
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const closeSession = async (req, res) => {
    try {
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (!admin.active) {
            return res.status(200).json({ message: 'No active session to close' });
        }


        const { leaderboard, totalPlayers } = await getTopUsers(admin.current_session);




        const updateFields = {
            end_time: new Date(),
            totalPlayers,
            leaderboard: leaderboard
        };

        try {
            await sendEmailReport(admin.current_session);
        } catch (emailError) {
            console.log('Error sending email report:', emailError.message);
        }

        await Session.findByIdAndUpdate(admin.current_session, updateFields);

        const currentDateTime = moment.tz('Asia/Kolkata').format('DD/MM/YYYY, hh:mm A');

        const newSession = await Session.create({
            name: `Session - ${currentDateTime}`,
            end_time: null,
            leaderboard: [],
            totalPlayers: 0,
        })

        newSession.save()

        admin.current_session = newSession._id;

        await admin.save();
        return res.status(200).json({ message: 'Session closed successfully', currentSession: newSession._id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



export const fetchSessions = async (req, res) => {
    try {
        const allSessions = await Session.find({}, { name: 1, _id: 1, createdAt: 1 }).sort({ createdAt: -1 });

        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const currentSessionId = admin.current_session;

        const sessions = [];
        let currentSession = null;

        allSessions.forEach(session => {
            if (session._id.toString() === currentSessionId?.toString()) {
                currentSession = session;
            } else {
                sessions.push(session);
            }
        });

        const response = {
            pastSessions: sessions
        };

        if (currentSession) {
            response.currentSession = {
                id: currentSession._id,
                name: currentSession.name
            };
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getPastSessionInfo = async (req, res) => {
    const { sessionId } = req.query;
    try {
        const session = await Session.findOne({ _id: sessionId });
        if (!session) {
            return res.status(404).json({ message: "Session Not Found" });
        }

        return res.status(200).json({
            leaderboard: session?.leaderboard ?? [],
            totalPlayers: session?.totalPlayers ?? 0,

        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const sendEmailReport = async (sessionId) => {
    try {
        const session = await Session.findOne({ _id: sessionId }).select('name');

        if (!session) {
            throw new Error('Session not found.');
        }

        const users = await User.find({ session: sessionId })
            .select('name email phone wealth investment connected')
            .sort({ weighted_score: -1 });

        if (!users.length) {
            throw new Error('No users found for this session.');
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('User Report');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 20 },
            { header: 'Phone', key: 'phone', width: 20 },
            { header: 'Wealth', key: 'wealth', width: 10 },
            { header: 'Investment', key: 'nps_score', width: 10 },
        ];

        users.forEach((user) => {
            worksheet.addRow({
                name: user.name,
                email: user.email,
                phone: user.phone,
                wealth: user.wealth,
                nps_score: user.nps_score,
                happiness_score: user.happiness_score,
                weighted_score: user.weighted_score,
                connected: user.connected ? "Y" : "N"
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();

        const mailOptions = {
            from: SENDING_EMAIL,
            to: REPORT_EMAIL,
            subject: `Sniff and Tail ${session.name}`,
            text: 'Attached is the user report for the session.',
        };

        const mailWithAttachment = {
            ...mailOptions,
            attachments: [
                {
                    filename: 'UserReport.xlsx',
                    content: buffer,
                    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
            ],
        };

        await transporter.sendMail(mailWithAttachment);
    } catch (error) {
        console.error('Error generating report:', error.message);
        throw new Error(`Error generating report: ${error.message}`);
    }
};

export const getEmailReport = async (req, res) => {
    const { sessionId } = req.body;

    try {
        await sendEmailReport(sessionId);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).json({ message: `${error.message}` });
    }
};