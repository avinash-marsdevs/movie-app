import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const authController = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.create({ email, password });
            const sanitizedUser = {
                _id: user._id,
                email: user.email
            }
            return res.status(201).json({ status: true, message: 'User registered successfully', data: sanitizedUser });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: error.message || 'Something went wrong', data: {} });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ status: false, message: 'Invalid credentials', data: {} });
            }

            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ status: true, message: 'Login successful', data: { token } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: error.message || 'Something went wrong', data: {} });
        }
    },

};

export default authController;
