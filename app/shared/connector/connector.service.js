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
        //console.log('A fazer login');
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
        var documents = fs.knownFolders.documents();
        var path = fs.path.join(documents.path, "app/test.png");
        //console.log(documents.path);
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
                //console.log(JSON.stringify(entity, null, 4));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJEO0FBQzNELHNDQUF3RDtBQUd4RCxxREFBbUQ7QUFFbkQsMENBQXlDO0FBQ3pDLHlDQUF3QztBQU14QyxnQ0FBa0M7QUFDbEMsMkNBQTZDO0FBQzdDLGlDQUErQjtBQUMvQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHM0IsSUFBYSxnQkFBZ0I7SUFPekIsMEJBQW9CLElBQVksRUFBVSxJQUFVLEVBQVUsTUFBYyxFQUFVLFdBQXdCO1FBQzFHLGdEQUFnRDtRQURoQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUcxRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDO1FBQ2pDLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQy9DLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDLE1BQU07UUFDcEUseUVBQXlFO0lBRzdFLENBQUM7SUFDRCxtQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUNELDRDQUFpQixHQUFqQjtRQUNJLElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsS0FBSyxZQUFZ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QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEdBQUcscUJBQXFCLENBQUM7UUFDOUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2pCLE9BQU8sRUFDUCxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFDcEIsRUFBQyxJQUFJLEVBQUU7Z0JBQ0gsYUFBYSxFQUFFLE1BQU0sQ0FBQyxXQUFXO2dCQUNqQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFVBQVU7YUFDOUI7U0FDSixDQUNBLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUF2UEQsSUF1UEM7QUF2UFksZ0JBQWdCO0lBRDVCLGlCQUFVLEVBQUU7cUNBUWlCLGFBQU0sRUFBZ0IsV0FBSSxFQUFrQixlQUFNLEVBQXVCLDBCQUFXO0dBUHJHLGdCQUFnQixDQXVQNUI7QUF2UFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vZGF0YS9kYXRhXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL2RhdGEvZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3IgfSBmcm9tIFwiLi9jb25uZWN0b3JcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi91c2VyL3VzZXJcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi4vZGF0YS9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uLy4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAqIGFzIGNvbm5lY3Rpdml0eSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbm5lY3RvclNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdG9yOiBDb25uZWN0b3I7XHJcbiAgICBwcml2YXRlIHVzZXI6IFVzZXI7XHJcbiAgICBwcml2YXRlIGRhdGE6IGFueTtcclxuICAgIHB1YmxpYyBjb25uZWN0aW9uVHlwZTogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBDb25uZWN0b3JTZXJ2aWNlIScpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3RvciA9IG5ldyBDb25uZWN0b3IoKTtcclxuICAgICAgICAvL1JlY2ViZSBlIG1vbm90b3JpemEgbyB0aXBvIGRlIGNvbmV4w6NvXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IHRoaXMuZ2V0Q29ubmVjdGlvblR5cGUoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdDb25uZWN0aW9uIFRZUEU6ICcgKyB0aGlzLmNvbm5lY3Rpb25UeXBlKTtcclxuICAgICAgICB0aGlzLnN0YXJ0Q29ubmVjdGlvbk1vbml0b3IoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMID0gJzM1LjE4NC4yNDQuNDEvY2FyZWdpdmVycy9wdWJsaWMnOyAvL0xJVkVcclxuICAgICAgICAvL3RoaXMuY29ubmVjdG9yLnNlcnZlclVSTCA9ICcxOTIuMTY4Ljk5LjEwMC9jYXJlZ2l2ZXJzL3B1YmxpYyc7IC8vVk0tREVWXHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBnZXRDb25uZWN0aW9uVHlwZSgpIHtcclxuICAgICAgICBsZXQgY29ubmVjdGlvblR5cGUgPSBjb25uZWN0aXZpdHkuZ2V0Q29ubmVjdGlvblR5cGUoKTtcclxuICAgICAgICBzd2l0Y2ggKGNvbm5lY3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJOb25lXCI7XHJcbiAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLndpZmk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJXaS1GaVwiO1xyXG4gICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5tb2JpbGU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJNb2JpbGVcIjtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlVua25vd25cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGFydENvbm5lY3Rpb25Nb25pdG9yKCkge1xyXG4gICAgICAgIGNvbm5lY3Rpdml0eS5zdGFydE1vbml0b3JpbmcoKG5ld0Nvbm5lY3Rpb25UeXBlOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5ld0Nvbm5lY3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubm9uZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IFwiTm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0eXBlIGNoYW5nZWQgdG8gbm9uZS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLndpZmk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSBcIldpLUZpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byBXaUZpLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubW9iaWxlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gXCJNb2JpbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIG1vYmlsZS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSBcIlVua25vd25cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIHVua25vd24uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0TG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKTogT2JzZXJ2YWJsZTxVc2VyPiB7XHJcbiAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgZmF6ZXIgbG9naW4nKTtcclxuICAgICAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlTG9naW5IZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS9sb2dpbic7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgICAgICAgcmVxdWVzdCxcclxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH0sXHJcbiAgICAgICAgICAgICB7Ym9keTp7IHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0gfVxyXG4gICAgICAgICAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudHNEYXRhKCk6IE9ic2VydmFibGU8UGF0aWVudFtdPlxyXG4gICAge1xyXG4gICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGZhemVyIG8gcmVxdWVzdCBkb3MgZGFkb3MgYW8gc2VydmVyJyk7XHJcbiAgICAgICAgLy9zZSBuw6NvIHRlbSBjb25ldGl2aWRhZGVcclxuICAgICAgICAvKmlmKCF0aGlzLmlzQ29ubmVjdGVkKCkgfHwgIXRoaXMuZmlyc3REYXRhUmVxdWVzdCkgeyAvL0NvbSBFUlJPXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmdldFBhdGllbnRzRGF0YSgpO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIC8vc2UgdGVtIGNvbmV0aXZpZGFkZVxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSAnaHR0cDovLycgKyB0aGlzLmNvbm5lY3Rvci5zZXJ2ZXJVUkwgKyAnL2NhcmVnaXZlcnNBUEkvJyArIHRoaXMuZGF0YVNlcnZpY2UuZ2V0VXNlcklEKCkgKyAnL3BhdGllbnRzJ1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFpIGRldm9sdmVyIG9zIHF1aXpzXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHJlcXVlc3QsIHsgaGVhZGVyczogaGVhZGVycyB9KSAvL1RpYWdvXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuZ2V0UGF0aWVudHNEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGVzdGluZ0Rvd25sb2FkKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0Rvd25sb2FkIFN0YXJ0ZWQnKTtcclxuICAgICAgICB2YXIgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHZhciBwYXRoID0gZnMucGF0aC5qb2luKGRvY3VtZW50cy5wYXRoLCBcImFwcC90ZXN0LnBuZ1wiKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGRvY3VtZW50cy5wYXRoKTtcclxuICAgICAgICAvL3ZhciBmaWxlUGF0aCA9IGZzLnBhdGguam9pbihwYXRoLCBcInRlc3QucG5nXCIpO1xyXG4gICAgICAgIGh0dHAuZ2V0RmlsZShcImh0dHBzOi8vaHR0cGJpbi5vcmcvaW1hZ2UvcG5nXCIsIHBhdGgpLnRoZW4oZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkociwgbnVsbCwgNCkpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB2YXIgcGF0aCA9IGZzLnBhdGguam9pbihkb2N1bWVudHMucGF0aCwgXCJhcHAvbWF0ZXJpYWxzXCIpO1xyXG4gICAgICAgIHZhciBmb2xkZXIgPSBmcy5Gb2xkZXIuZnJvbVBhdGgocGF0aCk7XHJcblxyXG4gICAgICAgIGZvbGRlci5nZXRFbnRpdGllcygpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGVudGl0aWVzKSB7XHJcbiAgICAgICAgICAgIC8vIGVudGl0aWVzIGlzIGFycmF5IHdpdGggdGhlIGRvY3VtZW50J3MgZmlsZXMgYW5kIGZvbGRlcnMuXHJcbiAgICAgICAgICAgIGVudGl0aWVzLmZvckVhY2goZnVuY3Rpb24gKGVudGl0eSkge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlbnRpdHksIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZG9jdW1lbnRzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgKi9cclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBnZXRBbGxEYXRhKCk6IE9ic2VydmFibGU8RGF0YVtdPiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IFwiaHR0cDovL1wiICsgdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMICsgXCJpciBidXNjYXIgdG9kb3Mgb3MgbWF0ZXJpYWlzXCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocmVxdWVzdCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3luYygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdzeW5jaW5nJyk7XHJcbiAgICAgICAgdGhpcy5zeW5jRGF0YSgpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7IFxyXG4gICAgfVxyXG5cclxuICAgIHN5bmNEYXRhKCk6IE9ic2VydmFibGU8RGF0YVtdPiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdSZXF1ZXN0IHRvIHNlcnZlcicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KENvbmZpZy5hcGlVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgRGF0YVNlcnZpY2UucHJvdG90eXBlLnNldERhdGEocmVzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGF0aWVudHNcIl0pO1xyXG4gICAgICAgIC8vYWRpY2lvbmFyIGl0ZW1zIMOgIGxpc3RhIGRlIHBhY2llbnRlcyBkbyBzZXJ2aWNlXHJcbiAgICAgICAgLy90aGlzLkRhdGFTZXJ2aWNlLnNldFBhdGllbnRzKHRoaXMucGF0aWVudHMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHZlcmlmaWNhciBzZSBhIGxpc3RhIHRlbSBzbyB1bSBwYWNpZW50ZSBwYXJhIHBvZGVyIGlyIGxvZ28gcGFyYSBhICBsaXN0YSBkZSBuZWNlc3NpZGFkZXMgIFxyXG4gICAgICAgIC8vaWYgKHRoaXMucGF0aWVudHMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAvLyAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGF0aWVudC8xL25lZWRzXCJdKTtcclxuICAgICAgICAvLyB9ICAgXHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgLyoqXHJcbiAgICAgXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsoUmVzcG9uc2UgfCBhbnkpfSBlcnJvciBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlck9mIEl0ZW1zQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGVycm9yLmpzb24oKSB8fCBcIlwiO1xyXG4gICAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm9uR2V0RGF0YUVycm9yOiBcIiArIGVycik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgY29uc3RydWlyIG8gSGVhZGVyIHBhcmEgbyByZXF1ZXN0IGRvcyBkYWRvcyBkb3MgcGFjaWVudGVzJyk7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCB0aGlzLmRhdGFTZXJ2aWNlLmdldFRva2VuKCkpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuICAgIHByaXZhdGUgY3JlYXRlTG9naW5IZWFkZXIoKSB7XHJcbiAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgY3JpYXIgbyBIZWFkZXIgcGFyYSBvIGxvZ2luJyk7XHJcbiAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBzZXQgaGVhZGVycyBoZXJlIGUuZy5cclxuICAgICAgICAvL2hlYWRlcnMuYXBwZW5kKFwiQXV0aEtleVwiLCBcIm15LWtleVwiKTtcclxuICAgICAgICAvL2hlYWRlcnMuYXBwZW5kKFwiQXV0aFRva2VuXCIsIFwibXktdG9rZW5cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENvbm5lY3RvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q29ubmVjdG9yVG9rZW4odXNlcl90b2tlbikge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yLmFjY2Vzc1Rva2VuID0gdXNlcl90b2tlbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc0Nvbm5lY3RlZCgpIHtcclxuICAgICAgICBpZih0aGlzLmNvbm5lY3Rpb25UeXBlID09ICdOb25lJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZSk6IE9ic2VydmFibGU8SHR0cD4ge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgZW52aWFyIHF1ZXN0aW9uw6FyaW8nKTtcclxuICAgICAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlTG9naW5IZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS8nICsgdGhpcy5kYXRhU2VydmljZS5nZXRVc2VySUQoKSArICcvcXVpenMvc3VibWl0JztcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShoZWFkZXJzKSwgbnVsbCwgNCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlKSwgbnVsbCwgNCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBIGVudmlhciBxdWl6IGd1YXJkYWRvOiBcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVlc3Rpb25uYWlyZSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgICAgICAgcmVxdWVzdCxcclxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH0sXHJcbiAgICAgICAgICAgIHtib2R5OiBxdWVzdGlvbm5haXJlfVxyXG4gICAgICAgICAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZEFjZXNzZWRNYXRlcmlhbChwYXRpZW50LCB1c2VyLCBtYXRlcmlhbCk6IE9ic2VydmFibGU8SHR0cD4ge1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlTG9naW5IZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS8nICsgdGhpcy5kYXRhU2VydmljZS5nZXRVc2VySUQoKSArICcvYWNjZXNzZXMvY3JlYXRlJztcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgICAgICAgcmVxdWVzdCxcclxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH0sXHJcbiAgICAgICAgICAgIHtib2R5OiB7XHJcbiAgICAgICAgICAgICAgICBcInBhdGllbnRfaWRcIjogcGF0aWVudC5pZCxcclxuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxfaWRcIjogbWF0ZXJpYWwuaWRcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRNYXRlcmlhbFJhdGluZyh1c2VyLHJhdGluZyk6IE9ic2VydmFibGU8SHR0cD4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVMb2dpbkhlYWRlcigpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gJ2h0dHA6Ly8nICsgdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMICsgJy9jYXJlZ2l2ZXJzQVBJLycgKyB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJJRCgpICsgJy9ldmFsdWF0aW9ucy9jcmVhdGUnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJhdGluZywgbnVsbCwgNCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgICAgICAgcmVxdWVzdCxcclxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH0sXHJcbiAgICAgICAgICAgIHtib2R5OiB7XHJcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsX2lkXCI6IHJhdGluZy5pZF9tYXRlcmlhbCxcclxuICAgICAgICAgICAgICAgIFwiZXZhbHVhdGlvblwiOiByYXRpbmcuZXZhbHVhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxufSJdfQ==