const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const User = require('../Models/userModal');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: "test-auth-fbe3e",
        clientEmail: "firebase-adminsdk-b9mex@test-auth-fbe3e.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0tIs+3FJLRuS+\ntvqLfb+n2i+JB1yBt3vE/vrJZPoAIyLnSvQLepemDlOnW29h41gmhqH0lJGeOjFm\nYl5vNCA9LWMlFpzrHRjutRQ71c1k3I6B+J3RTDoAcRYMWSAZBRkj8UQR1VLsCzid\nPJlbVzEmEFvMVIQ4LrL/WXeZblQsuu6hGuvaZDvx22vo8p3OIXgTVm3QfPmzpRKq\ns88FzD9sqVDQTR7Jm/RKPSWdgd3wqP8PGOyhs3D5TDoxljuLogGncOaHiskLJ7Ec\nCNMMFGWfow4YAVct+yEkXtA8bAe0BaAvjtpVYjPn6+YMCbfKRkzKHji0wTea8T1J\n+4jbpTkTAgMBAAECggEACpGYp0eJhJ+T11eqVag4ImAPcas9jNSnZ4EmN8sxF/r2\nGqL2nQlBf1PNLreZTxdV24L6S+y4i5GJvBw6u7RHwmw6JTwqV1HvWF683TcG+UQx\nDYb16/zSU55JlNVNnEkBDGoa+hQI8odBe2jE62OxGzHPvKagyQxqKacY6J9cSvVW\nuvlt/81fry3hK6QfxYi578XMRjSRnN9BTHXUy1yDbMRJwm/FXjNVgvOGHDG2KC9d\nntHMSN1hDLENmb7NWhZFtjaToBp4+zmL0JZXmwR/BQ8e4C8/u000vRfPip+Sw8Kv\nVegx4PZosUOSlQOvYW66M1QJUuJ2r8cf9/C8V6QQkQKBgQDgebTpuBAt08aA+wDC\njeZTzwjzryp6bbEvb76BE5b88hG7Pwvi8MW0HbyYp+usIDq8U7rL/VXQlBRF2Irz\nxB65eI3d5zXJAu8tDZTU+nP8nWatC4J6dKzidN4vr46mwZQOpHM5I/U1BR/aQsUK\n9AV8pzU34BuQkW2Ewq+4+4OjqQKBgQDOFTipKAwXblLfvbQu5JBmJ1WOKp3HpHeV\nPY3mJOFBDr99Ew5ao20UAfSf8jFA+2hUWgdt3zqRfzFBkZZCtfj6Ah6Njn4z8mma\nScAvZsZpCdch2LnopGewRc51xtRWGuMrUUzvDs9l5UAidH70fjgFfyEP3QKEW5wu\nrD/4uZEsWwKBgDcijaYOWKL47jvF6wTeV6FkK72224cgpDGTj8YiaqaMSoCkVqYS\nH21DFIymSgOIEwUox6vM+KP3ixcwvchr9mP10VqcrKBHwTleqZy6O3zjqFF+jzjG\nqaQhsmUiCLa6u0Pxbn+tbk/sh0tTtRQgpaxdYXvs5rhWkADY1NJprIapAoGBAKJc\ng8x5mbUoHTDbc8byGnXxDW25U5+DixdQbKhia/lmliUDS27LjNeThtgw5u8sY5D5\ncRr2IV2aGQNwoTKjzami29Fo7zMcDGkbK8fsr+r3br/i0O1iAbMV/Eg8QvQnsMxi\n/Drnryy3RiUfJRqZCqgB9dlapW4EAvOej7P091Q7AoGBAI7lmGT0aMLVYqVSMpaJ\neNR9et73TyAHKDfI/RKgAtDix3yTPfbCFiGgbpZnazsQOapi3PvRAX9nuBt64jZe\nZKx4gvy8ZoMVFVABu2eGZAq/ihiTJUa0Wuy+ZlFfIkpwBMlIZitsm78ZRuA0GEnk\np12aEwGin0tkPcOE+fjFsHFw\n-----END PRIVATE KEY-----\n"
    }),
    databaseURL: "mongodb+srv://Prasannadb:Prasunoff%402004@cluster0.5phrhoj.mongodb.net/bookStore"
});

router.post('/authenticate', async (req, res) => {
    const idToken = req.body.idToken;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const email = decodedToken.email;

        let user = await User.findOne({ uid });
        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }


        res.status(200).send({ message: 'Authentication successful', uid });
    } catch (error) {
        res.status(401).send({ message: 'Authentication failed', error: error.message });
    }
});
router.post('/register', async (req, res) => {
    const idToken = req.body.idToken;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const email = decodedToken.email;

        let user = await User.findOne({ uid });
        if (user) {
            res.status(200).send({ message: "User already Exists" });
        }
        user = new User({ uid, email, favorites: [], PurchasedBooks: [] });
        await user.save();


        res.status(200).send({ message: 'Authentication successful', uid });
    } catch (error) {
        res.status(401).send({ message: 'Authentication failed', error: error.message });
    }
});



module.exports = router;