const port = 7777;

module.exports = {
    port,
    domain: "http://localhost",
    auth: {
        google: {
            clientID: "564377722563-ujva8g9vnhl07j2s200qqo2acmfle84t.apps.googleusercontent.com",
            clientSecret: "pn9Qr_e0V5pelNRL8nLDE2WY",
            callbackURL: `http://localhost:${port}/auth/google/callback`
        },
        vk: {
            clientID: "6262544",
            clientSecret: "bPWvd7Zlh2I4jgJ81etI",
            callbackURL: `http://localhost:${port}/auth/vkontakte/callback`
        }
    },
    db: {
        options: {
            host: "localhost",
            dialect: "sqlite",
            name: "chat",
            logging: false,
            storage: "./chat.sqlite"
        }
    }
}