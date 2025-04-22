const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const secret_key = process.env.SECRET_KEY;

function input_validation(input) {

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phone_regex = /^(\+972|0)?5[0-9]{8}$/;
    return email_regex.test(input) || phone_regex.test(input);
};

async function registration(req, res) {
    try {

        const { username, password, role } = req.body;
        if (!username || !password || !role || !input_validation(username)) {
            return res.status(400).json({ message: 'Request should contain valid username and valid password' });
        }

        const hashed_password = await bcrypt.hash(password, 16);
        const user = {
            username: username,
            password: hashed_password,
            role: role
        };

        await User.create(user);

        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {

        if (error.code == 11000) {
            return res.status(400).json({ message: 'User already exist' });
        }

        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

async function login(req, res) {
    try {

        const { username, password, cookie } = req.body;
        if (!username || !password || !input_validation(username)) {
            return res.status(400).json({ message: 'Request should contain valid username and valid password' });
        }

        const user = await User.findOne({ username: username });

        const validation = user && await bcrypt.compare(password, user.password);
        if (!validation) {
            return res.status(404).json({ message: 'Incorrect username or password' });
        }

        const token = jwt.sign(
            { username: user.username, role: user.role },
            secret_key,
            { expiresIn: '1h' }
        );

        if (cookie) {
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 3600000
            });
        }

        return res.status(200).json({
            message: 'Successful authorization',
            token: token,
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const authorization_controller = {

    async authorization(req, res) {

        if (req.body.mode) {
            return registration(req, res);
        } else {
            return login(req, res);
        }
    }
}

module.exports = { authorization_controller };