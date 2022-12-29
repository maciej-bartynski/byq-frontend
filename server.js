
const express = require('express');
const https = require('https');
const http = require('http');
const proxy = require('express-http-proxy');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const authConfig = require('./react-app/public/auth-config/auth_config.staging.json');
const mockUserMe = require('./react-app/public/mock-user-me/mock_user_me.json');
const mockOtherUsers = require('./react-app/public/mock-other-users/mock_other_users.json');
const EnvsService = require('./services/EnvsService');
const AuthService = require('./services/AuthService');
const AuthManagementService = require('./services/AuthManagementService');

dotenv.config();
EnvsService.config(process.env);
AuthService.config(authConfig);
AuthManagementService.config(authConfig, mockOtherUsers);

const app = express();
const port = EnvsService.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/auth-config/auth_config.staging.json', (req, res) => res.status(200).json(authConfig));
app.use('/mock-user-me/mock_user_me.json', (req, res) => res.status(200).json({
    message: 'Me',
    data: mockUserMe
}))
app.use('/users', AuthService.checkJwt, (req, res, next) => AuthManagementService.fetchAuth0Users.bind(AuthManagementService)(req, res, next) );

app.use('/api', AuthService.checkJwt, proxy(EnvsService.env.API_SERVER, {
    proxyReqPathResolver: function (req) {
        const domain = EnvsService.env.API_SERVER;
        const url = `${domain}${req.baseUrl}${req.url}`;
        return url
    }
}));

app.use(express.static('./react-app/build'));

app.get('*', function (req, res) {
    res.sendFile(`${__dirname}/react-app/build/index.html`);
});

if (EnvsService.env.HTTPS) {
    https.createServer({
        key: fs.readFileSync(`./cert/private.key`),
        cert: fs.readFileSync(`./cert/certificate.crt`),
        ca: fs.readFileSync(`./cert/ca_bundle.crt`),
    }, app).listen(port, () => {
        console.log(`Listening on port ${port}, server HTTPS`)
    })
} else {
    http.createServer(undefined, app).listen(port, () => {
        console.log(`Listening on port ${port}, server HTTP`)
    })
}