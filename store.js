const expressSession = require('express-session');

const core = require('../core/core.js');
const mongo = require('../mongo/mongo.js');

class MongoSessionStore extends expressSession.Store {

    async get(id, callback) {
        try {
            const session = await mongo.open().collection('sessions').findOne({ _id: id });
            callback(null, core.data.get(session, 'data', 'object'));
        } catch (error) {
            callback(error, null);
        }
    }

    async set(id, data, callback) {
        try {
            await mongo.open().collection('sessions').updateOne(
                { _id: id },
                { $set: { updateTime: new Date(), data }, $setOnInsert: { creationTime: new Date() } },
                { upsert: true }
            );
            callback(null);
        } catch (error) {
            callback(error);
        }
    }

    async destory(id, callback) {
        try {
            await mongo.open().collection('sessions').deleteOne({ _id: id });
        } catch (error) {
            callback(error);
        }
    }

    generateId() {
        return core.random.token(32);
    }

};

const session = {

    /**
     * Creates session middleware
     * @param {string[]|string} secret Secrets used to sign cookies
     * @param {boolean} [secure] Enforces that cookies are sent over HTTPS
     * @returns 
     */
    create(secret, secure = true) {
        const store = new MongoSessionStore();
        return expressSession({
            genid: store.generateId,
            secret,
            resave: false,
            saveUninitialized: false,
            cookie: { secure },
            store
        });
    }

};

module.exports = session;