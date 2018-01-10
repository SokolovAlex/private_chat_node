const express = require('express');
const Client = require("jscent");
const _ = require("lodash");

const db = require('../db');

const router = express.Router();

var centClient = new Client({ url: "http://localhost:8000", secret: "secret" });

const rooms = [];

module.exports = (app) => {

    const dbInstance = db.instance();
    const User = dbInstance.models.User;

    router.post('/send', function(req, res) {
        const body = req.body;

        const userId = body.userId;
        const channel = body.channel;
        const message = body.message;

        if (!message || !channel || !userId) {
            return res.json({ error: true });
        }

        centClient.publish(channel, { message, author: userId }, (err, response) => {
            res.json({ error: false, response });
        });
    });

    router.get('/rooms', function(req, res) {
        // centClient.channels((err, resp) => {
        //     console.log(resp);
        // })
        res.json({ rooms });
    });

    router.post('/create', function(req, res) {
        const body = req.body;

        const userId = body.userId;
        const channel = body.channel;
        const userName = body.userName;

        if (rooms.every(room => room.id !== channel)) {
            rooms.push({
                id: channel,
                userId,
                name: `chat with ${userName}`
            });
        }

        res.json({ error: false, rooms });
    });

    router.post('/join', function(req, res) {
        const body = req.body;

        const userId = body.userId;
        const channel = body.channel;
        const userName = body.userName;

        if (!userId || !channel || !userName) {
            return res.json({ error: true });
        }

        const room = _.find(rooms, (chan) => {
            return chan.id === channel;
        });

        if (!room) {
            return res.json({ error: "no room" });
        }

        room.operator = userName;

        centClient.publish(channel, {
            message: `Hello. I'm ${userName}. Can i help you?`,
            author: userId
        }, (err, response) => {
            res.json({ error: false, response });
        });
    });

    return router;
}