import jwt from 'jsonwebtoken';
import { settings } from './fake-api-settings'



// Create a token from a payload 
export function createToken(payload, userdb) {
    console.log(payload);
    return {
        'token': jwt.sign(payload, settings.SECRET_KEY, { 'expiresIn': settings.EXPIRES }),
        'user_id': userdb.users[userdb.users.findIndex(user => user.username === payload.username)].id
    };
}

// Verify the token 
export function verifyToken(token) {
    return jwt.verify(token, settings.SECRET_KEY);
}

// Check if the user exists in database
export function isAuthenticated({ username, password, userdb }) {
    return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1
}