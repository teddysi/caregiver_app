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
        //console.log('A enviar questionário');
        if (!this.isConnected()) {
            return null;
        }
        var headers = this.createLoginHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/quizs/submit';
        //console.log(JSON.stringify(headers), null, 4);
        //console.log(JSON.stringify(questionnaire), null, 4);
        return this.http.post(request, { headers: headers }, { body: questionnaire }).map(function (res) { return res.json(); });
    };
    ConnectorService.prototype.sendAcessedMaterial = function (patient, user, material) {
        var headers = this.createLoginHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/accesses/create';
        console.log(JSON.stringify(patient, null, 4));
        return this.http.post(request, { headers: headers }, { body: {
                "id": user.id,
                "patient_id": "",
                "material": material.id
            } }).map(function (res) { return res.json(); });
    };
    ConnectorService.prototype.sendMaterialRating = function (user, rating) {
        var headers = this.createLoginHeader();
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/' + this.dataService.getUserID() + '/evaluations/create';
        return this.http.post(request, { headers: headers }, {
            body: {
                "user_id": user.id,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJEO0FBQzNELHNDQUF3RDtBQUd4RCxxREFBbUQ7QUFFbkQsMENBQXlDO0FBQ3pDLHlDQUF3QztBQU14QyxnQ0FBa0M7QUFDbEMsMkNBQTZDO0FBQzdDLGlDQUErQjtBQUMvQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHM0IsSUFBYSxnQkFBZ0I7SUFPekIsMEJBQW9CLElBQVksRUFBVSxJQUFVLEVBQVUsTUFBYyxFQUFVLFdBQXdCO1FBQzFHLGdEQUFnRDtRQURoQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUcxRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDO1FBQ2pDLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQy9DLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDLE1BQU07UUFDcEUseUVBQXlFO0lBRzdFLENBQUM7SUFDRCxtQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUNELDRDQUFpQixHQUFqQjtRQUNJLElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsS0FBSyxZQUFZ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LEdBQUcsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQztRQUU5SCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ2pCLE9BQU8sRUFDUCxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFDcEI7WUFDSSxJQUFJLEVBQUU7Z0JBQ04sU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNsQixhQUFhLEVBQUUsTUFBTSxDQUFDLFdBQVc7Z0JBQ2pDLFlBQVksRUFBRSxNQUFNLENBQUMsVUFBVTthQUM5QjtTQUNKLENBQ0EsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxBQXhQRCxJQXdQQztBQXhQWSxnQkFBZ0I7SUFENUIsaUJBQVUsRUFBRTtxQ0FRaUIsYUFBTSxFQUFnQixXQUFJLEVBQWtCLGVBQU0sRUFBdUIsMEJBQVc7R0FQckcsZ0JBQWdCLENBd1A1QjtBQXhQWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkluaXQsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi9kYXRhL2RhdGFcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvciB9IGZyb20gXCIuL2Nvbm5lY3RvclwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3VzZXIvdXNlclwiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuLi9kYXRhL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29ubmVjdG9yU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0b3I6IENvbm5lY3RvcjtcclxuICAgIHByaXZhdGUgdXNlcjogVXNlcjtcclxuICAgIHByaXZhdGUgZGF0YTogYW55O1xyXG4gICAgcHVibGljIGNvbm5lY3Rpb25UeXBlOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnSW5zdGFuY2lvdSAtIENvbm5lY3RvclNlcnZpY2UhJyk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yID0gbmV3IENvbm5lY3RvcigpO1xyXG4gICAgICAgIC8vUmVjZWJlIGUgbW9ub3Rvcml6YSBvIHRpcG8gZGUgY29uZXjDo29cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gdGhpcy5nZXRDb25uZWN0aW9uVHlwZSgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0Nvbm5lY3Rpb24gVFlQRTogJyArIHRoaXMuY29ubmVjdGlvblR5cGUpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRDb25uZWN0aW9uTW9uaXRvcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3Rvci5zZXJ2ZXJVUkwgPSAnMzUuMTg0LjI0NC40MS9jYXJlZ2l2ZXJzL3B1YmxpYyc7IC8vTElWRVxyXG4gICAgICAgIC8vdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMID0gJzE5Mi4xNjguOTkuMTAwL2NhcmVnaXZlcnMvcHVibGljJzsgLy9WTS1ERVZcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGdldENvbm5lY3Rpb25UeXBlKCkge1xyXG4gICAgICAgIGxldCBjb25uZWN0aW9uVHlwZSA9IGNvbm5lY3Rpdml0eS5nZXRDb25uZWN0aW9uVHlwZSgpO1xyXG4gICAgICAgIHN3aXRjaCAoY29ubmVjdGlvblR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubm9uZTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIk5vbmVcIjtcclxuICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUud2lmaTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIldpLUZpXCI7XHJcbiAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm1vYmlsZTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIk1vYmlsZVwiO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiVW5rbm93blwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXJ0Q29ubmVjdGlvbk1vbml0b3IoKSB7XHJcbiAgICAgICAgY29ubmVjdGl2aXR5LnN0YXJ0TW9uaXRvcmluZygobmV3Q29ubmVjdGlvblR5cGU6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAobmV3Q29ubmVjdGlvblR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5ub25lOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gXCJOb25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byBub25lLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUud2lmaTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IFwiV2ktRmlcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdHlwZSBjaGFuZ2VkIHRvIFdpRmkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5tb2JpbGU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSBcIk1vYmlsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0eXBlIGNoYW5nZWQgdG8gbW9iaWxlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IFwiVW5rbm93blwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0eXBlIGNoYW5nZWQgdG8gdW5rbm93bi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlcXVlc3RMb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpOiBPYnNlcnZhYmxlPFVzZXI+IHtcclxuICAgICAgICAgLy9jb25zb2xlLmxvZygnQSBmYXplciBsb2dpbicpO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVMb2dpbkhlYWRlcigpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gJ2h0dHA6Ly8nICsgdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMICsgJy9jYXJlZ2l2ZXJzQVBJL2xvZ2luJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICAgICAgICByZXF1ZXN0LFxyXG4gICAgICAgICAgICB7IGhlYWRlcnM6IGhlYWRlcnMgfSxcclxuICAgICAgICAgICAgIHtib2R5OnsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfSB9XHJcbiAgICAgICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXRpZW50c0RhdGEoKTogT2JzZXJ2YWJsZTxQYXRpZW50W10+XHJcbiAgICB7XHJcbiAgICAgICAgIC8vY29uc29sZS5sb2coJ0EgZmF6ZXIgbyByZXF1ZXN0IGRvcyBkYWRvcyBhbyBzZXJ2ZXInKTtcclxuICAgICAgICAvL3NlIG7Do28gdGVtIGNvbmV0aXZpZGFkZVxyXG4gICAgICAgIC8qaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSB8fCAhdGhpcy5maXJzdERhdGFSZXF1ZXN0KSB7IC8vQ29tIEVSUk9cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuZ2V0UGF0aWVudHNEYXRhKCk7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgLy9zZSB0ZW0gY29uZXRpdmlkYWRlXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS8nICsgdGhpcy5kYXRhU2VydmljZS5nZXRVc2VySUQoKSArICcvcGF0aWVudHMnXHJcbiAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChyZXF1ZXN0LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkgLy9UaWFnb1xyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgICAgICBcclxuICAgICAgICAvL3JldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmdldFBhdGllbnRzRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRlc3RpbmdEb3dubG9hZCgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdEb3dubG9hZCBTdGFydGVkJyk7XHJcbiAgICAgICAgdmFyIGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB2YXIgcGF0aCA9IGZzLnBhdGguam9pbihkb2N1bWVudHMucGF0aCwgXCJhcHAvdGVzdC5wbmdcIik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkb2N1bWVudHMucGF0aCk7XHJcbiAgICAgICAgLy92YXIgZmlsZVBhdGggPSBmcy5wYXRoLmpvaW4ocGF0aCwgXCJ0ZXN0LnBuZ1wiKTtcclxuICAgICAgICBodHRwLmdldEZpbGUoXCJodHRwczovL2h0dHBiaW4ub3JnL2ltYWdlL3BuZ1wiLCBwYXRoKS50aGVuKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHIsIG51bGwsIDQpKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdmFyIHBhdGggPSBmcy5wYXRoLmpvaW4oZG9jdW1lbnRzLnBhdGgsIFwiYXBwL21hdGVyaWFsc1wiKTtcclxuICAgICAgICB2YXIgZm9sZGVyID0gZnMuRm9sZGVyLmZyb21QYXRoKHBhdGgpO1xyXG5cclxuICAgICAgICBmb2xkZXIuZ2V0RW50aXRpZXMoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChlbnRpdGllcykge1xyXG4gICAgICAgICAgICAvLyBlbnRpdGllcyBpcyBhcnJheSB3aXRoIHRoZSBkb2N1bWVudCdzIGZpbGVzIGFuZCBmb2xkZXJzLlxyXG4gICAgICAgICAgICBlbnRpdGllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRpdHkpIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZW50aXR5LCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRvY3VtZW50cywgbnVsbCwgNCkpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICovXHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgZ2V0QWxsRGF0YSgpOiBPYnNlcnZhYmxlPERhdGFbXT4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBcImh0dHA6Ly9cIiArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArIFwiaXIgYnVzY2FyIHRvZG9zIG9zIG1hdGVyaWFpc1wiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHJlcXVlc3QsIHsgaGVhZGVyczogaGVhZGVycyB9KS5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN5bmMoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnc3luY2luZycpO1xyXG4gICAgICAgIHRoaXMuc3luY0RhdGEoKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApOyBcclxuICAgIH1cclxuXHJcbiAgICBzeW5jRGF0YSgpOiBPYnNlcnZhYmxlPERhdGFbXT4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnUmVxdWVzdCB0byBzZXJ2ZXInKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChDb25maWcuYXBpVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIERhdGFTZXJ2aWNlLnByb3RvdHlwZS5zZXREYXRhKHJlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnRzXCJdKTtcclxuICAgICAgICAvL2FkaWNpb25hciBpdGVtcyDDoCBsaXN0YSBkZSBwYWNpZW50ZXMgZG8gc2VydmljZVxyXG4gICAgICAgIC8vdGhpcy5EYXRhU2VydmljZS5zZXRQYXRpZW50cyh0aGlzLnBhdGllbnRzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB2ZXJpZmljYXIgc2UgYSBsaXN0YSB0ZW0gc28gdW0gcGFjaWVudGUgcGFyYSBwb2RlciBpciBsb2dvIHBhcmEgYSAgbGlzdGEgZGUgbmVjZXNzaWRhZGVzICBcclxuICAgICAgICAvL2lmICh0aGlzLnBhdGllbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnQvMS9uZWVkc1wiXSk7XHJcbiAgICAgICAgLy8gfSAgIFxyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIC8qKlxyXG4gICAgIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KFJlc3BvbnNlIHwgYW55KX0gZXJyb3IgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJPZiBJdGVtc0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgXCJcIjtcclxuICAgICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJvbkdldERhdGFFcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xyXG4gICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGNvbnN0cnVpciBvIEhlYWRlciBwYXJhIG8gcmVxdWVzdCBkb3MgZGFkb3MgZG9zIHBhY2llbnRlcycpO1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgdGhpcy5kYXRhU2VydmljZS5nZXRUb2tlbigpKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNyZWF0ZUxvZ2luSGVhZGVyKCkge1xyXG4gICAgICAgICAvL2NvbnNvbGUubG9nKCdBIGNyaWFyIG8gSGVhZGVyIHBhcmEgbyBsb2dpbicpO1xyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRoS2V5XCIsIFwibXkta2V5XCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aFRva2VuXCIsIFwibXktdG9rZW5cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENvbm5lY3RvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q29ubmVjdG9yVG9rZW4odXNlcl90b2tlbikge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yLmFjY2Vzc1Rva2VuID0gdXNlcl90b2tlbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc0Nvbm5lY3RlZCgpIHtcclxuICAgICAgICBpZih0aGlzLmNvbm5lY3Rpb25UeXBlID09ICdOb25lJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZSk6IE9ic2VydmFibGU8SHR0cD4ge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0EgZW52aWFyIHF1ZXN0aW9uw6FyaW8nKTtcclxuICAgICAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlTG9naW5IZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS8nICsgdGhpcy5kYXRhU2VydmljZS5nZXRVc2VySUQoKSArICcvcXVpenMvc3VibWl0JztcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShoZWFkZXJzKSwgbnVsbCwgNCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlKSwgbnVsbCwgNCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICAgICAgICByZXF1ZXN0LFxyXG4gICAgICAgICAgICB7IGhlYWRlcnM6IGhlYWRlcnMgfSxcclxuICAgICAgICAgICAge2JvZHk6IHF1ZXN0aW9ubmFpcmV9XHJcbiAgICAgICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kQWNlc3NlZE1hdGVyaWFsKHBhdGllbnQsIHVzZXIsIG1hdGVyaWFsKTogT2JzZXJ2YWJsZTxIdHRwPiB7XHJcblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVMb2dpbkhlYWRlcigpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gJ2h0dHA6Ly8nICsgdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMICsgJy9jYXJlZ2l2ZXJzQVBJLycgKyB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJJRCgpICsgJy9hY2Nlc3Nlcy9jcmVhdGUnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhdGllbnQsIG51bGwsIDQpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXHJcbiAgICAgICAgICAgIHJlcXVlc3QsXHJcbiAgICAgICAgICAgIHsgaGVhZGVyczogaGVhZGVycyB9LFxyXG4gICAgICAgICAgICB7Ym9keToge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgXCJwYXRpZW50X2lkXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCI6IG1hdGVyaWFsLmlkXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICkubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kTWF0ZXJpYWxSYXRpbmcodXNlcixyYXRpbmcpOiBPYnNlcnZhYmxlPEh0dHA+IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlTG9naW5IZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS8nICsgdGhpcy5kYXRhU2VydmljZS5nZXRVc2VySUQoKSArICcvZXZhbHVhdGlvbnMvY3JlYXRlJztcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXHJcbiAgICAgICAgICAgIHJlcXVlc3QsXHJcbiAgICAgICAgICAgIHsgaGVhZGVyczogaGVhZGVycyB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBib2R5OiB7XHJcbiAgICAgICAgICAgICAgICBcInVzZXJfaWRcIjogdXNlci5pZCxcclxuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxfaWRcIjogcmF0aW5nLmlkX21hdGVyaWFsLFxyXG4gICAgICAgICAgICAgICAgXCJldmFsdWF0aW9uXCI6IHJhdGluZy5ldmFsdWF0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgfVxyXG59Il19