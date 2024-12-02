const Assignment = require('../models/Assignment');

exports.getAssignments = async (req, res) => {
    try {
        console.log("Fetching assignments for admin with ID:", req.user.id);  // Debugging line
        const assignments = await Assignment.find({ adminId: req.user.id }).populate('userId', 'username');
        console.log("Authenticated user ID:", req.user.id);

        console.log("Fetched assignments:", assignments);  // Debugging line

        if (assignments.length === 0) {
            return res.status(200).json({ msg: 'No assignments found for this admin.' });  // Better response message
        }

        res.json(assignments);
    } catch (err) {
        console.error("Error fetching assignments:", err);  // Error log for better debugging
        res.status(500).json({ error: err.message });
    }
};


exports.acceptAssignment = async (req, res) => {
    try {
        await Assignment.findByIdAndUpdate(req.params.id, { status: 'Accepted' });
        res.json({ msg: 'Assignment accepted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.rejectAssignment = async (req, res) => {
    try {
        await Assignment.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
        res.json({ msg: 'Assignment rejected' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
