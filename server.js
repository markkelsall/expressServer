const express = require('express');
const logger = require('./logger');

const RESPONSE_TYPE = {
    html: 'html',
    json: 'json'
};

const app = express();
let router = express.Router();

module.exports = class Server {
    constructor (serverConfig = {}) {
        let port = serverConfig.port || 8080;
        let routes = serverConfig.routes;
        let address = '/';

        if (serverConfig.address) {
            address += serverConfig.address;
        }

        this.instance = app.listen(port);
        logger.debug('Server started on: ' + port);
        logger.debug('app address: ' + address);

        if (routes) {
            routes.forEach((route) => {
                logger.debug('adding route: ' + route.address);
                switch (route.method) {
                case 'GET':
                    if (route.responseType === RESPONSE_TYPE.html) {
                        router.get(route.address, (req, res) => {
                            res.sendFile(serverConfig.projectAddress + '/' + route.response);
                        });
                    } else {
                        router.get(route.address, (req, res) => {
                            res.json(route.action());
                        });
                    }
                    break;
                default:
                    router.get(route.address, (req, res) => {
                        res.sendFile(serverConfig.projectAddress + '/' + route.response);
                    });
                }
            });
        }

        app.use(address, router);
    }

    getInstance () {
        return this.instance;
    }

    close () {
        this.getInstance().close();
    }
};
