const express = require('express');

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
        console.log('Server started on: ' + port);
        console.log('app address: ' + address);

        if (routes) {
            routes.forEach((route) => {
                console.log('adding route: ' + route.address);
                switch (route.method) {
                case 'GET':
                    router.get(route.address, (req, res) => {
                        res.sendFile(serverConfig.projectAddress + '/' + route.response);
                    });
                    break;
                default:
                    router.get(route.address, (req, res) => {
                        res.sendFile(serverConfig.projectAddress + '/' + route.response);
                    });
                }
            });
        } else {
            console.log('no routes added');
        }

        app.use(address, router);
    }

    getInstance () {
        return this.instance;
    }

    close () {
        console.log('server closed');
        this.getInstance().close();
    }
};
