const express = require('express');
const Client = require("jscent");
const _ = require("lodash");
const moment = require("moment");

const db = require('../db');
const router = express.Router();

const centClient = new Client({ url: "http://localhost:8000", secret: "secret" });

let rooms = [];

class Message {
    constructor(message, authorId) {
        this.time = moment().format('LT');
        this.message = message;
        this.author = authorId;
    }
}

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

        centClient.publish(channel, new Message(message, userId), (err, response) => {
            res.json({ error: false, response });
        });
    });

    router.get('/rooms', function(req, res) {
        res.json({ rooms });
    });

    router.post('/create', function(req, res) {
        const body = req.body;

        const userId = body.userId;
        const channel = body.channel;
        const userName = body.userName;

        const room = _.find(rooms, (chan) => {
            return chan.id === channel;
        });
        if (!room) {
            rooms.push({
                id: channel,
                userId,
                name: `chat with ${userName}`
            });
        } else {
            room.operator = null;
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

        centClient.publish(channel, new Message(`Hello. I'm ${userName}. Can i help you?`, userId),
            (err, response) => {
                res.json({ error: false, response });
            });
    });

    router.post('/leave', function(req, res) {
        const body = req.body;

        const userId = body.userId;
        const channel = body.channel;

        if (!userId || !channel) {
            return res.json({ error: true });
        }

        const room = _.find(rooms, (chan) => {
            return chan.id === channel;
        });

        if (!room) {
            return res.json({ error: "no room" });
        }

        room.operator = null;

        centClient.publish(channel, new Message(`See you.`, userId), (err, response) => {
            res.json({ error: false, response });
        });
    });

    router.post('/thanks', function(req, res) {
        const body = req.body;
        const channel = body.channel;
        const userId = body.userId;

        if (!userId || !channel) {
            return res.json({ error: true });
        }

        rooms = _.filter(rooms, (chan) => {
            return chan.id !== channel;
        });

        centClient.publish(channel, new Message(`Thanks. Goodbye.`, userId), (err, response) => {
            res.json({ error: false, response });
        });
    });

    router.get('/clear', function(req, res) {
        rooms = [];
        res.json({ error: false });
    });

    return router;
}