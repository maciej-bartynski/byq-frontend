
const express = require('express');
const https = require('https');
const http = require('http');
const proxy = require('express-http-proxy');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());

app.use('/auth-config', proxy(`${process.env.REACT_APP_API_SERVER}`, {
    proxyReqPathResolver: function (req) {
        const domain = process.env.REACT_APP_API_SERVER;
        const url = `${domain}${req.baseUrl}${req.url}`;
        return url
    }
}));
app.use(process.env.REACT_APP_API_PATH, proxy(process.env.REACT_APP_API_SERVER, {
    proxyReqPathResolver: function (req) {
        const domain = process.env.REACT_APP_API_SERVER;
        const url = `${domain}${req.baseUrl}${req.url}`;
        return url
    }
}));
app.use('/mocked-me', proxy(process.env.REACT_APP_API_SERVER, {
    proxyReqPathResolver: function (req) {
        const domain = process.env.REACT_APP_API_SERVER;
        const url = `${domain}${req.baseUrl}${req.url}`;
        return url
    }
}))

app.use(express.static('./react-app/build'));

app.get('*', function (req, res) {
    res.sendFile(`${__dirname}/react-app/build/index.html`);
});

const httpsServerOptions = process.env.HTTPS === 'true'
    ? {
        key: fs.readFileSync(`${process.env.CERTS_STORE_PATH}/private.key`),
        cert: fs.readFileSync(`${process.env.CERTS_STORE_PATH}/certificate.crt`),
        ca: fs.readFileSync(`${process.env.CERTS_STORE_PATH}/ca_bundle.crt`),
    }
    : undefined

if (process.env.HTTPS === 'false') {
    http.createServer(httpsServerOptions, app).listen(port, () => {
        console.log(`Listening on port ${port}, server HTTP`)
    })
} else {
    https.createServer(httpsServerOptions, app).listen(port, () => {
        console.log(`Listening on port ${port}, server HTTPS`)
    })
}