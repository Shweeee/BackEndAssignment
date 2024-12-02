const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Assignment = require('../models/Assignment');

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ user: { id: user._id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.uploadAssignment = async (req, res) => {
    const { task, adminId } = req.body;
    try {
        const assignment = new Assignment({ userId: req.user.id, task, adminId });
        await assignment.save();
        res.status(201).json({ msg: 'Assignment uploaded successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'Admin' }).select('username');
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
