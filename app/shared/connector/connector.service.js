"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var data_service_1 = require("../data/data.service");
var router_1 = require("@angular/router");
var connector_1 = require("./connector");
var fs = require("file-system");
var connectivity = require("connectivity");
require("rxjs/add/operator/map");
var http = require("http");
var ConnectorService = (function () {
    function ConnectorService(zone, http, router, dataService) {
        this.zone = zone;
        this.http = http;
        this.router = router;
        this.dataService = dataService;
        console.log('Instanciou - ConnectorService!');
        this.connector = new connector_1.Connector();
        //Recebe e monotoriza o tipo de conexão
        this.connectionType = this.getConnectionType();
        console.log('Connection TYPE: ' + this.connectionType);
        this.startConnectionMonitor();
        this.connector.serverURL = '35.184.244.41/caregivers/public'; //LIVE
        //this.connector.serverURL = '192.168.99.100/caregivers/public'; //VM-DEV
    }
    ConnectorService.prototype.ngOnInit = function () {
    };
    ConnectorService.prototype.getConnectionType = function () {
        var connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                return "None";
            case connectivity.connectionType.wifi:
                return "Wi-Fi";
            case connectivity.connectionType.mobile:
                return "Mobile";
            default:
                return "Unknown";
        }
    };
    ConnectorService.prototype.startConnectionMonitor = function () {
        var _this = this;
        connectivity.startMonitoring(function (newConnectionType) {
            _this.zone.run(function () {
                switch (newConnectionType) {
                    case connectivity.connectionType.none:
                        _this.connectionType = "None";
                        console.log("Connection type changed to none.");
                        break;
                    case connectivity.connectionType.wifi:
                        _this.connectionType = "Wi-Fi";
                        console.log("Connection type changed to WiFi.");
                        break;
                    case connectivity.connectionType.mobile:
                        _this.connectionType = "Mobile";
                        console.log("Connection type changed to mobile.");
                        break;
                    default:
                        _this.connectionType = "Unknown";
                        console.log("Connection type changed to unknown.");
                        break;
                }
            });
        });
    };
    ConnectorService.prototype.requestLogin = function (username, password) {
        console.log('A fazer login');
        if (!this.isConnected()) {
            return null;
        }
        var headers = this.createLoginHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/login';
        return this.http.post(request, { headers: headers }, { body: { username: username, password: password } }).map(function (res) { return res.json(); });
    };
    ConnectorService.prototype.getPatientsData = function () {
        console.log('A fazer o request dos dados ao server');
        //se não tem conetividade
        /*if(!this.isConnected() || !this.firstDataRequest) { //Com ERRO
            return this.dataService.getPatientsData();
        }*/
        //se tem conetividade
        var headers = this.createRequestHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/patients';
        return this.http.get(request, { headers: headers }) //Tiago
            .map(function (res) { return res.json(); });
        //return this.dataService.getPatientsData();
    };
    ConnectorService.prototype.testingDownload = function () {
        console.log('Download Started');
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "app/test.png");
        console.log(documents.path);
        //var filePath = fs.path.join(path, "test.png");
        http.getFile("https://httpbin.org/image/png", path).then(function (r) {
            console.log(JSON.stringify(r, null, 4));
        }, function (e) {
            console.log(e);
        });
        /*
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "app/materials");
        var folder = fs.Folder.fromPath(path);

        folder.getEntities()
        .then(function (entities) {
            // entities is array with the document's files and folders.
            entities.forEach(function (entity) {
                console.log(JSON.stringify(entity, null, 4));
            });
            console.log(JSON.stringify(documents, null, 4));
        }, function (error) {
        });
        */
    };
    /*
    getAllData(): Observable<Data[]> {
        let headers = this.createRequestHeader();
        let request = "http://" + this.connector.serverURL + "ir buscar todos os materiais";
        
        return this.http.get(request, { headers: headers }).map(res => res.json());
    }

    sync() {
        console.log('syncing');
        this.syncData()
            .subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
            );
    }

    syncData(): Observable<Data[]> {
        let headers = this.createRequestHeader();
        console.log('Request to server');
        return this.http.get(Config.apiUrl, { headers: headers })
            .map(res => res.json());
    }
    private onGetDataSuccess(res) {
        console.log(res);
        DataService.prototype.setData(res);
        
        this.router.navigate(["/patients"]);
        //adicionar items à lista de pacientes do service
        //this.DataService.setPatients(this.patients);
        
        // verificar se a lista tem so um paciente para poder ir logo para a  lista de necessidades
        //if (this.patients.length == 1) {
        //    this.router.navigate(["/patient/1/needs"]);
        // }
    }
    */
    /**
     
     * @private
     * @param {(Response | any)} error
     *
     * @memberOf ItemsComponent
     */
    ConnectorService.prototype.onGetDataError = function (error) {
        var body = error.json() || "";
        var err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    };
    ConnectorService.prototype.createRequestHeader = function () {
        console.log('A construir o Header para o request dos dados dos pacientes');
        var headers = new http_1.Headers();
        headers.append("Authorization", this.dataService.getToken());
        headers.append("Content-Type", "application/json");
        return headers;
    };
    ConnectorService.prototype.createLoginHeader = function () {
        console.log('A criar o Header para o login');
        var headers = new http_1.Headers();
        // set headers here e.g.
        headers.append("AuthKey", "my-key");
        headers.append("AuthToken", "my-token");
        headers.append("Content-Type", "application/json");
        return headers;
    };
    ConnectorService.prototype.getConnector = function () {
        return this.connector;
    };
    ConnectorService.prototype.setConnectorToken = function (user_token) {
        this.connector.accessToken = user_token;
    };
    ConnectorService.prototype.isConnected = function () {
        if (this.connectionType == 'None') {
            return false;
        }
        return true;
    };
    ConnectorService.prototype.updateQuizStatus = function (questionnaire) {
        console.log('A enviar questionário');
        if (!this.isConnected()) {
            return null;
        }
        var headers = this.createLoginHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/quizs/submit';

        console.log(JSON.stringify(headers), null, 4);
        console.log(JSON.stringify(questionnaire), null, 4);
        return this.http.post(request, { headers: headers }, { body: questionnaire }).map(function (res) { return res.json(); });
    };
    return ConnectorService;
}());
ConnectorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone, http_1.Http, router_1.Router, data_service_1.DataService])
], ConnectorService);
exports.ConnectorService = ConnectorService;