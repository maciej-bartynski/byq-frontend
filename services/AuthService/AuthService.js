const jwt = require('express-jwt').expressjwt;
const jwksRsa = require('jwks-rsa');
const EnvsService = require('./../EnvsService');

const AuthService = {
    checkJwt: (req, res, next) => {
        next();
    },

    config(authConfig) {
        if (!EnvsService.env.SKIP_AUTH0) {
            this.checkJwt = jwt({
                secret: jwksRsa.expressJwtSecret({
                    cache: true,
                    rateLimit: true,
                    jwksRequestsPerMinute: 5,
                    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
                }),
                audience: authConfig.audience,
                issuer: `https://${authConfig.domain}/`,
                algorithms: ['RS256'],
            })
        }
    }
}

module.exports = AuthService;