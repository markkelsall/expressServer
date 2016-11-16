const express = require('express');

const app = express();
let router = express.Router();

const RESPONSE_TYPE = {
    html: 'html',
    json: 'json'
};

module.exports = class Server {

    constructor (serverConfig = {}) {
        let port = serverConfig.port || 8080;
        let routes = serverConfig.routes;
        let address = '/';

        if (serverConfig.address) {
            address += serverConfig.address;
        }

        this.instance = app.listen(port);
        console.log('Server started on: ' + port);
        console.log('app address: ' + address);

        if (routes) {
            routes.forEach((route) => {
                console.log('adding route: ' + route.address);
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
