import fs from 'fs';
import bodyParser from 'body-parser';
import jsonServer from 'json-server';
import HttpStatus from 'http-status-codes';
import { createToken, verifyToken, isAuthenticated } from './jwt-handler';

const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
const server = jsonServer.create();
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser)
const router = jsonServer.router('./database.json');

server.post('/auth/login', (req, res) => {
    const body = req.body;
    if (body.hasOwnProperty('username') && body.hasOwnProperty('password')) {
        const { username, password } = body;
        if (isAuthenticated({ username, password, userdb }) === false) {
            res.status(HttpStatus.BAD_REQUEST).json({
                'status': HttpStatus.BAD_REQUEST,
                'message': 'Bad username or password'
            });
            return;
        } else {
            res.status(200).json(createToken({ username, password }, userdb));
        }
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({
            'status': HttpStatus.BAD_REQUEST,
            'message': HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
        });
        return;
    }
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        res.status(HttpStatus.UNAUTHORIZED).json({
            'status': HttpStatus.UNAUTHORIZED,
            'message': HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)
        });
    }
    try {
        verifyToken(req.headers.authorization.split(' ')[1]);
        next();
    } catch (err) {
        res.status(HttpStatus.UNAUTHORIZED).json({
            'status': HttpStatus.UNAUTHORIZED,
            'message': HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)
        });
    }
});

server.use(router);

server.listen(3000, () => {
    console.log('Mock Server runing ...');
});