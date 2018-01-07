const express = require('express');

const db = require('../db');

const router = express.Router();

module.exports = (app) => {

    const dbInstance = db.instance();
    const User = dbInstance.models.User;

    router.post('/role', function(req, res) {
        const body = req.body;

        if (!body.userId || !body.roleId) {
            return res.json({ error: true });
        }

        const userId = body.userId;
        const roleId = body.roleId;

        User.update({ role: roleId }, { where: { id: userId } })
            .then((result) => {
                res.json({ error: null });
            });
    });

    return router;
}