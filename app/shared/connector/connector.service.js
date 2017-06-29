"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var data_service_1 = require("../data/data.service");
var router_1 = require("@angular/router");
var connector_1 = require("./connector");
var connectivity = require("connectivity");
require("rxjs/add/operator/map");
var http = require("http");
var ConnectorService = (function () {
    function ConnectorService(zone, http, router, dataService) {
        //console.log('Instanciou - ConnectorService!');
        this.zone = zone;
        this.http = http;
        this.router = router;
        this.dataService = dataService;
        this.connector = new connector_1.Connector();
        //Recebe e monotoriza o tipo de conexão
        this.connectionType = this.getConnectionType();
        //console.log('Connection TYPE: ' + this.connectionType);
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
                        //console.log("Connection type changed to none.");
                        break;
                    case connectivity.connectionType.wifi:
                        _this.connectionType = "Wi-Fi";
                        //console.log("Connection type changed to WiFi.");
                        break;
                    case connectivity.connectionType.mobile:
                        _this.connectionType = "Mobile";
                        //console.log("Connection type changed to mobile.");
                        break;
                    default:
                        _this.connectionType = "Unknown";
                        //console.log("Connection type changed to unknown.");
                        break;
                }
            });
        });
    };
    ConnectorService.prototype.requestLogin = function (username, password) {
        if (!this.isConnected()) {
            return null;
        }
        var headers = this.createLoginHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/login';
        return this.http.post(request, { headers: headers }, { body: { username: username, password: password } }).map(function (res) { return res.json(); });
    };
    ConnectorService.prototype.getPatientsData = function () {
        //console.log('A fazer o request dos dados ao server');
        //se não tem conetividade
        /*if(!this.isConnected() || !this.firstDataRequest) { //Com ERRO
            return this.dataService.getPatientsData();
        }*/
        //se tem conetividade
        var headers = this.createRequestHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/patients';
        console.log("Vai devolver os quizs");
        return this.http.get(request, { headers: headers }) //Tiago
            .map(function (res) { return res.json(); });
        //return this.dataService.getPatientsData();
    };
    ConnectorService.prototype.testingDownload = function () {
        //console.log('Download Started');
        /*
        var localr;
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "app/materials/test.png");
        console.log(documents.path);
        //var filePath = fs.path.join(path, "test.png");
        http.getFile("https://httpbin.org/image/png", path).then(function (r) {
            console.log(JSON.stringify(r, null, 4));
            localr = r;
        }, function (e) {
            console.log(e);
        });

        var saved =localr.saveToFile(path, "png");
        console.log(saved);
        */
        /*
        var path = fs.path.join(documents.path, "app/localmaterials");
        var folder = fs.Folder.fromPath(path);
        
        folder.getEntities()
        .then(function (entities) {
            // entities is array with the document's files and folders.
            entities.forEach(function (entity) {
                console.log(JSON.stringify(entity, null, 4));
            });
            //console.log(JSON.stringify(documents, null, 4));
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
        //console.log('syncing');
        this.syncData()
            .subscribe(
            (result) => this.onGetDataSuccess(result),
            (error) => this.onGetDataError(error)
            );
    }

    syncData(): Observable<Data[]> {
        let headers = this.createRequestHeader();
        //console.log('Request to server');
        return this.http.get(Config.apiUrl, { headers: headers })
            .map(res => res.json());
    }
    private onGetDataSuccess(res) {
        //console.log(res);
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
        //console.log("onGetDataError: " + err);
    };
    ConnectorService.prototype.createRequestHeader = function () {
        //console.log('A construir o Header para o request dos dados dos pacientes');
        var headers = new http_1.Headers();
        headers.append("Authorization", this.dataService.getToken());
        headers.append("Content-Type", "application/json");
        return headers;
    };
    ConnectorService.prototype.createLoginHeader = function () {
        //console.log('A criar o Header para o login');
        var headers = new http_1.Headers();
        // set headers here e.g.
        //headers.append("AuthKey", "my-key");
        //headers.append("AuthToken", "my-token");
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
        //console.log('A enviar questionário');
        if (!this.isConnected()) {
            return null;
        }
        var headers = this.createLoginHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/quizs/submit';
        //console.log(JSON.stringify(headers), null, 4);
        //console.log(JSON.stringify(questionnaire), null, 4);
        console.log("A enviar quiz guardado: ");
        console.log(JSON.stringify(questionnaire, null, 4));
        return this.http.post(request, { headers: headers }, { body: questionnaire }).map(function (res) { return res.json(); });
    };
    ConnectorService.prototype.sendAcessedMaterial = function (patient, user, material) {
        var headers = this.createLoginHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/accesses/create';
        return this.http.post(request, { headers: headers }, { body: {
                "patient_id": patient.id,
                "material_id": material.id
            } }).map(function (res) { return res.json(); });
    };
    ConnectorService.prototype.sendMaterialRating = function (user, rating) {
        var headers = this.createLoginHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/evaluations/create';
        console.log(JSON.stringify(rating, null, 4));
        return this.http.post(request, { headers: headers }, { body: {
                "material_id": rating.id_material,
                "evaluation": rating.evaluation
            }
        }).map(function (res) { return res.json(); });
    };
    return ConnectorService;
}());
ConnectorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone, http_1.Http, router_1.Router, data_service_1.DataService])
], ConnectorService);
exports.ConnectorService = ConnectorService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJEO0FBQzNELHNDQUF3RDtBQUd4RCxxREFBbUQ7QUFFbkQsMENBQXlDO0FBQ3pDLHlDQUF3QztBQU94QywyQ0FBNkM7QUFDN0MsaUNBQStCO0FBQy9CLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUczQixJQUFhLGdCQUFnQjtJQU96QiwwQkFBb0IsSUFBWSxFQUFVLElBQVUsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFDMUcsZ0RBQWdEO1FBRGhDLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBRzFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDakMsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0MseURBQXlEO1FBQ3pELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRTlCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLGlDQUFpQyxDQUFDLENBQUMsTUFBTTtRQUNwRSx5RUFBeUU7SUFHN0UsQ0FBQztJQUNELG1DQUFRLEdBQVI7SUFFQSxDQUFDO0lBQ0QsNENBQWlCLEdBQWpCO1FBQ0ksSUFBSSxjQUFjLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdEQsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSTtnQkFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixLQUFLLFlBQVksQ0FBQyxjQUFjLENB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QUM7QUFBRCxDQUFDLEFBN1BELElBNlBDO0FBN1BZLGdCQUFnQjtJQUQ1QixpQkFBVSxFQUFFO3FDQVFpQixhQUFNLEVBQWdCLFdBQUksRUFBa0IsZUFBTSxFQUF1QiwwQkFBVztHQVByRyxnQkFBZ0IsQ0E2UDVCO0FBN1BZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uSW5pdCwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uL2RhdGEvZGF0YVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhL2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yIH0gZnJvbSBcIi4vY29ubmVjdG9yXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vdXNlci91c2VyXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4uL2RhdGEvZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi8uLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgKiBhcyBjb25uZWN0aXZpdHkgZnJvbSBcImNvbm5lY3Rpdml0eVwiO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0b3JTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3RvcjogQ29ubmVjdG9yO1xyXG4gICAgcHJpdmF0ZSB1c2VyOiBVc2VyO1xyXG4gICAgcHJpdmF0ZSBkYXRhOiBhbnk7XHJcbiAgICBwdWJsaWMgY29ubmVjdGlvblR5cGU6IHN0cmluZztcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdJbnN0YW5jaW91IC0gQ29ubmVjdG9yU2VydmljZSEnKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3IgPSBuZXcgQ29ubmVjdG9yKCk7XHJcbiAgICAgICAgLy9SZWNlYmUgZSBtb25vdG9yaXphIG8gdGlwbyBkZSBjb25leMOjb1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSB0aGlzLmdldENvbm5lY3Rpb25UeXBlKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQ29ubmVjdGlvbiBUWVBFOiAnICsgdGhpcy5jb25uZWN0aW9uVHlwZSk7XHJcbiAgICAgICAgdGhpcy5zdGFydENvbm5lY3Rpb25Nb25pdG9yKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCA9ICczNS4xODQuMjQ0LjQxL2NhcmVnaXZlcnMvcHVibGljJzsgLy9MSVZFXHJcbiAgICAgICAgLy90aGlzLmNvbm5lY3Rvci5zZXJ2ZXJVUkwgPSAnMTkyLjE2OC45OS4xMDAvY2FyZWdpdmVycy9wdWJsaWMnOyAvL1ZNLURFVlxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZ2V0Q29ubmVjdGlvblR5cGUoKSB7XHJcbiAgICAgICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gY29ubmVjdGl2aXR5LmdldENvbm5lY3Rpb25UeXBlKCk7XHJcbiAgICAgICAgc3dpdGNoIChjb25uZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5ub25lOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTm9uZVwiO1xyXG4gICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS53aWZpOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiV2ktRmlcIjtcclxuICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubW9iaWxlOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTW9iaWxlXCI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJVbmtub3duXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhcnRDb25uZWN0aW9uTW9uaXRvcigpIHtcclxuICAgICAgICBjb25uZWN0aXZpdHkuc3RhcnRNb25pdG9yaW5nKChuZXdDb25uZWN0aW9uVHlwZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChuZXdDb25uZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSBcIk5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIG5vbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS53aWZpOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gXCJXaS1GaVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0eXBlIGNoYW5nZWQgdG8gV2lGaS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm1vYmlsZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IFwiTW9iaWxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byBtb2JpbGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gXCJVbmtub3duXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byB1bmtub3duLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVxdWVzdExvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCk6IE9ic2VydmFibGU8VXNlcj4ge1xyXG4gICAgICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVMb2dpbkhlYWRlcigpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gJ2h0dHA6Ly8nICsgdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMICsgJy9jYXJlZ2l2ZXJzQVBJL2xvZ2luJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICAgICAgICByZXF1ZXN0LFxyXG4gICAgICAgICAgICB7IGhlYWRlcnM6IGhlYWRlcnMgfSxcclxuICAgICAgICAgICAgIHtib2R5OnsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfSB9XHJcbiAgICAgICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXRpZW50c0RhdGEoKTogT2JzZXJ2YWJsZTxQYXRpZW50W10+XHJcbiAgICB7XHJcbiAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgZmF6ZXIgbyByZXF1ZXN0IGRvcyBkYWRvcyBhbyBzZXJ2ZXInKTtcclxuICAgICAgICAvL3NlIG7Do28gdGVtIGNvbmV0aXZpZGFkZVxyXG4gICAgICAgIC8qaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSB8fCAhdGhpcy5maXJzdERhdGFSZXF1ZXN0KSB7IC8vQ29tIEVSUk9cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuZ2V0UGF0aWVudHNEYXRhKCk7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgLy9zZSB0ZW0gY29uZXRpdmlkYWRlXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS8nICsgdGhpcy5kYXRhU2VydmljZS5nZXRVc2VySUQoKSArICcvcGF0aWVudHMnXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYWkgZGV2b2x2ZXIgb3MgcXVpenNcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocmVxdWVzdCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pIC8vVGlhZ29cclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9yZXR1cm4gdGhpcy5kYXRhU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICB0ZXN0aW5nRG93bmxvYWQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnRG93bmxvYWQgU3RhcnRlZCcpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIGxvY2FscjtcclxuICAgICAgICB2YXIgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHZhciBwYXRoID0gZnMucGF0aC5qb2luKGRvY3VtZW50cy5wYXRoLCBcImFwcC9tYXRlcmlhbHMvdGVzdC5wbmdcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coZG9jdW1lbnRzLnBhdGgpO1xyXG4gICAgICAgIC8vdmFyIGZpbGVQYXRoID0gZnMucGF0aC5qb2luKHBhdGgsIFwidGVzdC5wbmdcIik7XHJcbiAgICAgICAgaHR0cC5nZXRGaWxlKFwiaHR0cHM6Ly9odHRwYmluLm9yZy9pbWFnZS9wbmdcIiwgcGF0aCkudGhlbihmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIGxvY2FsciA9IHI7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBzYXZlZCA9bG9jYWxyLnNhdmVUb0ZpbGUocGF0aCwgXCJwbmdcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2F2ZWQpO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgLypcclxuICAgICAgICB2YXIgcGF0aCA9IGZzLnBhdGguam9pbihkb2N1bWVudHMucGF0aCwgXCJhcHAvbG9jYWxtYXRlcmlhbHNcIik7XHJcbiAgICAgICAgdmFyIGZvbGRlciA9IGZzLkZvbGRlci5mcm9tUGF0aChwYXRoKTtcclxuICAgICAgICBcclxuICAgICAgICBmb2xkZXIuZ2V0RW50aXRpZXMoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChlbnRpdGllcykge1xyXG4gICAgICAgICAgICAvLyBlbnRpdGllcyBpcyBhcnJheSB3aXRoIHRoZSBkb2N1bWVudCdzIGZpbGVzIGFuZCBmb2xkZXJzLlxyXG4gICAgICAgICAgICBlbnRpdGllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRpdHkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVudGl0eSwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkb2N1bWVudHMsIG51bGwsIDQpKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICB9KTtcclxuICAgICAgICAqL1xyXG5cclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBnZXRBbGxEYXRhKCk6IE9ic2VydmFibGU8RGF0YVtdPiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IFwiaHR0cDovL1wiICsgdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMICsgXCJpciBidXNjYXIgdG9kb3Mgb3MgbWF0ZXJpYWlzXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocmVxdWVzdCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3luYygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdzeW5jaW5nJyk7XHJcbiAgICAgICAgdGhpcy5zeW5jRGF0YSgpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7IFxyXG4gICAgfVxyXG5cclxuICAgIHN5bmNEYXRhKCk6IE9ic2VydmFibGU8RGF0YVtdPiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdSZXF1ZXN0IHRvIHNlcnZlcicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KENvbmZpZy5hcGlVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgRGF0YVNlcnZpY2UucHJvdG90eXBlLnNldERhdGEocmVzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGF0aWVudHNcIl0pO1xyXG4gICAgICAgIC8vYWRpY2lvbmFyIGl0ZW1zIMOgIGxpc3RhIGRlIHBhY2llbnRlcyBkbyBzZXJ2aWNlXHJcbiAgICAgICAgLy90aGlzLkRhdGFTZXJ2aWNlLnNldFBhdGllbnRzKHRoaXMucGF0aWVudHMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHZlcmlmaWNhciBzZSBhIGxpc3RhIHRlbSBzbyB1bSBwYWNpZW50ZSBwYXJhIHBvZGVyIGlyIGxvZ28gcGFyYSBhICBsaXN0YSBkZSBuZWNlc3NpZGFkZXMgIFxyXG4gICAgICAgIC8vaWYgKHRoaXMucGF0aWVudHMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAvLyAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGF0aWVudC8xL25lZWRzXCJdKTtcclxuICAgICAgICAvLyB9ICAgXHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgLyoqXHJcbiAgICAgXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsoUmVzcG9uc2UgfCBhbnkpfSBlcnJvciBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlck9mIEl0ZW1zQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGVycm9yLmpzb24oKSB8fCBcIlwiO1xyXG4gICAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm9uR2V0RGF0YUVycm9yOiBcIiArIGVycik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgY29uc3RydWlyIG8gSGVhZGVyIHBhcmEgbyByZXF1ZXN0IGRvcyBkYWRvcyBkb3MgcGFjaWVudGVzJyk7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCB0aGlzLmRhdGFTZXJ2aWNlLmdldFRva2VuKCkpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuICAgIHByaXZhdGUgY3JlYXRlTG9naW5IZWFkZXIoKSB7XHJcbiAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgY3JpYXIgbyBIZWFkZXIgcGFyYSBvIGxvZ2luJyk7XHJcbiAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBzZXQgaGVhZGVycyBoZXJlIGUuZy5cclxuICAgICAgICAvL2hlYWRlcnMuYXBwZW5kKFwiQXV0aEtleVwiLCBcIm15LWtleVwiKTtcclxuICAgICAgICAvL2hlYWRlcnMuYXBwZW5kKFwiQXV0aFRva2VuXCIsIFwibXktdG9rZW5cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENvbm5lY3RvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q29ubmVjdG9yVG9rZW4odXNlcl90b2tlbikge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yLmFjY2Vzc1Rva2VuID0gdXNlcl90b2tlbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc0Nvbm5lY3RlZCgpIHtcclxuICAgICAgICBpZih0aGlzLmNvbm5lY3Rpb25UeXBlID09ICdOb25lJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZSk6IE9ic2VydmFibGU8SHR0cD4ge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgZW52aWFyIHF1ZXN0aW9uw6FyaW8nKTtcclxuICAgICAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlTG9naW5IZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS8nICsgdGhpcy5kYXRhU2VydmljZS5nZXRVc2VySUQoKSArICcvcXVpenMvc3VibWl0JztcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShoZWFkZXJzKSwgbnVsbCwgNCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlKSwgbnVsbCwgNCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBIGVudmlhciBxdWl6IGd1YXJkYWRvOiBcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVlc3Rpb25uYWlyZSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgICAgICAgcmVxdWVzdCxcclxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH0sXHJcbiAgICAgICAgICAgIHtib2R5OiBxdWVzdGlvbm5haXJlfVxyXG4gICAgICAgICAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZEFjZXNzZWRNYXRlcmlhbChwYXRpZW50LCB1c2VyLCBtYXRlcmlhbCk6IE9ic2VydmFibGU8SHR0cD4ge1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlTG9naW5IZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS8nICsgdGhpcy5kYXRhU2VydmljZS5nZXRVc2VySUQoKSArICcvYWNjZXNzZXMvY3JlYXRlJztcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgICAgICAgcmVxdWVzdCxcclxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH0sXHJcbiAgICAgICAgICAgIHtib2R5OiB7XHJcbiAgICAgICAgICAgICAgICBcInBhdGllbnRfaWRcIjogcGF0aWVudC5pZCxcclxuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxfaWRcIjogbWF0ZXJpYWwuaWRcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRNYXRlcmlhbFJhdGluZyh1c2VyLHJhdGluZyk6IE9ic2VydmFibGU8SHR0cD4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVMb2dpbkhlYWRlcigpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gJ2h0dHA6Ly8nICsgdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMICsgJy9jYXJlZ2l2ZXJzQVBJLycgKyB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJJRCgpICsgJy9ldmFsdWF0aW9ucy9jcmVhdGUnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJhdGluZywgbnVsbCwgNCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgICAgICAgcmVxdWVzdCxcclxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH0sXHJcbiAgICAgICAgICAgIHtib2R5OiB7XHJcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsX2lkXCI6IHJhdGluZy5pZF9tYXRlcmlhbCxcclxuICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvblwiOiByYXRpbmcuZXZhbHVhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxufSJdfQ==