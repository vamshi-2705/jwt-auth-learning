const pool = require("../config/db");

const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            "SELECT id, name, email, created_at FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    getProfile
};