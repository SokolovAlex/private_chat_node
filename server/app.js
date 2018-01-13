const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const Client = require("jscent");

const boot = require('./boot');
const config = require('./config');
const authApi = require('./api/auth');
const userApi = require('./api/user');
const chatApi = require('./api/chat');
const app = express();

app.set('view engine', 'pug');
app.set('views', './public/views')

app.use(express.static(__dirname + '/../public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

boot(app, passport);

authApi(app);

app.use('/api', userApi());
app.use('/api/chat', chatApi());

app.use('/', (req, res, next) => {
    const timestamp = parseInt(new Date().getTime() / 1000).toString();
    const userId = req.isAuthenticated() ? req.user.id.toString() : timestamp.toString();
    let token = new Client.Token("secret");
    token = token.clientToken(userId, timestamp, "");
    const config = { timestamp, token, user: userId };

    return res.render('main', {
        user: req.isAuthenticated() ? req.user : null,
        config
    });
});

const port = config.port;
app.listen(port, () => {
    console.log(`Chat starting on port ${port}!`);
});