const express = require('express');
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const session = require('express-session');
const server = express.Router();
const { User } = require('../database/index.js');

server.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        secure: true
    }
}));

server.use(passport.initialize()); 
server.use(passport.session());

passport.use(new PassportLocal({ usernameField: "email", passwordField: "password", session: true },
    async (email, password, done) => {
        const user = await User.findOne({ where: { email } });
        const match = await bcrypt.compare(password, user.password);
        if (!user) {
            console.log('No existe el usuario')
            return done(null, false)
        };
        if (!match) {
            console.log('No coincide la contraseña')
            return done(null, false)
        };
        return done(null, {
            id: user.id,
            name: user.name,
            lastname: user.lastname
        });
}))

passport.serializeUser((user, done) => {
    const id = user.id
    done(null, id)
})

passport.deserializeUser((id, done) => {
    User.findByPk(id)
    .then((user) => { 
        done(null, user) // this is the fix
    })
})

//Ruta de login
server.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(400).send("Los datos ingresados no son correctos"); }
        const userData = {
            token: jwt.sign(user, "secreto"),
            user
        }
        return res.status(201).send(userData)
    })(req, res, next);
});

//Ruta de registro
server.post('/register', async (req, res, next) => {
    const {name, lastname, email, password} = req.body.data;
    try {
		const user = await User.create({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1),
            email,
            password
        });
        return res.status(201).send(user);
	} catch (error) {
		return next(error);
	}
});

module.exports = server;
