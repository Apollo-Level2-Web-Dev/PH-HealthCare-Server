import jwt from 'jsonwebtoken';

const generateToken = (payload: any, secret: string, expiresIn: string) => {
    const token = jwt.sign(
        payload,
        secret,
        {
            algorithm: 'HS256',
            expiresIn
        }
    );

    return token;
};

export const jwtHelpers = {
    generateToken
}