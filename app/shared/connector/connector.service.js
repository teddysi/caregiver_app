"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var data_service_1 = require("../data/data.service");
var router_1 = require("@angular/router");
var connector_1 = require("./connector");
var connectivity = require("connectivity");
require("rxjs/add/operator/map");
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
    return ConnectorService;
}());
ConnectorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone, http_1.Http, router_1.Router, data_service_1.DataService])
], ConnectorService);
exports.ConnectorService = ConnectorService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJEO0FBQzNELHNDQUF3RDtBQUd4RCxxREFBbUQ7QUFFbkQsMENBQXlDO0FBQ3pDLHlDQUF3QztBQUt4QywyQ0FBNkM7QUFDN0MsaUNBQStCO0FBRy9CLElBQWEsZ0JBQWdCO0lBT3pCLDBCQUFvQixJQUFZLEVBQVUsSUFBVSxFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUExRixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUNqQyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDLE1BQU07UUFDcEUseUVBQXlFO0lBRzdFLENBQUM7SUFDRCxtQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUNELDRDQUFpQixHQUFqQjtRQUNJLElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ2pDLE1BQU0sQ0FBQyxNQUFN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LGtCQUFrQixDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBQ00sdUNBQVksR0FBbkI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ00sNENBQWlCLEdBQXhCLFVBQXlCLFVBQVU7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQzVDLENBQUM7SUFDTSxzQ0FBVyxHQUFsQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUF6S0QsSUF5S0M7QUF6S1ksZ0JBQWdCO0lBRDVCLGlCQUFVLEVBQUU7cUNBUWlCLGFBQU0sRUFBZ0IsV0FBSSxFQUFrQixlQUFNLEVBQXVCLDBCQUFXO0dBUHJHLGdCQUFnQixDQXlLNUI7QUF6S1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vZGF0YS9kYXRhXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL2RhdGEvZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3IgfSBmcm9tIFwiLi9jb25uZWN0b3JcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi91c2VyL3VzZXJcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi4vZGF0YS9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uLy4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5cclxuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29ubmVjdG9yU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0b3I6IENvbm5lY3RvcjtcclxuICAgIHByaXZhdGUgdXNlcjogVXNlcjtcclxuICAgIHByaXZhdGUgZGF0YTogYW55O1xyXG4gICAgcHVibGljIGNvbm5lY3Rpb25UeXBlOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBDb25uZWN0b3JTZXJ2aWNlIScpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3RvciA9IG5ldyBDb25uZWN0b3IoKTtcclxuICAgICAgICAvL1JlY2ViZSBlIG1vbm90b3JpemEgbyB0aXBvIGRlIGNvbmV4w6NvXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IHRoaXMuZ2V0Q29ubmVjdGlvblR5cGUoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGlvbiBUWVBFOiAnICsgdGhpcy5jb25uZWN0aW9uVHlwZSk7XHJcbiAgICAgICAgdGhpcy5zdGFydENvbm5lY3Rpb25Nb25pdG9yKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCA9ICczNS4xODQuMjQ0LjQxL2NhcmVnaXZlcnMvcHVibGljJzsgLy9MSVZFXHJcbiAgICAgICAgLy90aGlzLmNvbm5lY3Rvci5zZXJ2ZXJVUkwgPSAnMTkyLjE2OC45OS4xMDAvY2FyZWdpdmVycy9wdWJsaWMnOyAvL1ZNLURFVlxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZ2V0Q29ubmVjdGlvblR5cGUoKSB7XHJcbiAgICAgICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gY29ubmVjdGl2aXR5LmdldENvbm5lY3Rpb25UeXBlKCk7XHJcbiAgICAgICAgc3dpdGNoIChjb25uZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5ub25lOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTm9uZVwiO1xyXG4gICAgICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS53aWZpOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiV2ktRmlcIjtcclxuICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubW9iaWxlOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTW9iaWxlXCI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJVbmtub3duXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhcnRDb25uZWN0aW9uTW9uaXRvcigpIHtcclxuICAgICAgICBjb25uZWN0aXZpdHkuc3RhcnRNb25pdG9yaW5nKChuZXdDb25uZWN0aW9uVHlwZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChuZXdDb25uZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSBcIk5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byBub25lLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUud2lmaTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IFwiV2ktRmlcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byBXaUZpLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubW9iaWxlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gXCJNb2JpbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byBtb2JpbGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gXCJVbmtub3duXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0eXBlIGNoYW5nZWQgdG8gdW5rbm93bi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlcXVlc3RMb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpOiBPYnNlcnZhYmxlPFVzZXI+IHtcclxuICAgICAgICAgY29uc29sZS5sb2coJ0EgZmF6ZXIgbG9naW4nKTtcclxuICAgICAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlTG9naW5IZWFkZXIoKTtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS9sb2dpbic7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgICAgICAgcmVxdWVzdCxcclxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH0sXHJcbiAgICAgICAgICAgICB7Ym9keTp7IHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0gfVxyXG4gICAgICAgICAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudHNEYXRhKCk6IE9ic2VydmFibGU8UGF0aWVudFtdPlxyXG4gICAge1xyXG4gICAgICAgICBjb25zb2xlLmxvZygnQSBmYXplciBvIHJlcXVlc3QgZG9zIGRhZG9zIGFvIHNlcnZlcicpO1xyXG4gICAgICAgIC8vc2UgbsOjbyB0ZW0gY29uZXRpdmlkYWRlXHJcbiAgICAgICAgLyppZighdGhpcy5pc0Nvbm5lY3RlZCgpIHx8ICF0aGlzLmZpcnN0RGF0YVJlcXVlc3QpIHsgLy9Db20gRVJST1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgICAgICB9Ki9cclxuICAgICAgICAvL3NlIHRlbSBjb25ldGl2aWRhZGVcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gJ2h0dHA6Ly8nICsgdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMICsgJy9jYXJlZ2l2ZXJzQVBJLycgKyB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJJRCgpICsgJy9wYXRpZW50cydcclxuICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHJlcXVlc3QsIHsgaGVhZGVyczogaGVhZGVycyB9KSAvL1RpYWdvXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuZ2V0UGF0aWVudHNEYXRhKCk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgZ2V0QWxsRGF0YSgpOiBPYnNlcnZhYmxlPERhdGFbXT4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBcImh0dHA6Ly9cIiArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArIFwiaXIgYnVzY2FyIHRvZG9zIG9zIG1hdGVyaWFpc1wiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHJlcXVlc3QsIHsgaGVhZGVyczogaGVhZGVycyB9KS5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN5bmMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N5bmNpbmcnKTtcclxuICAgICAgICB0aGlzLnN5bmNEYXRhKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICAgICAgKTsgXHJcbiAgICB9XHJcblxyXG4gICAgc3luY0RhdGEoKTogT2JzZXJ2YWJsZTxEYXRhW10+IHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0IHRvIHNlcnZlcicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KENvbmZpZy5hcGlVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIERhdGFTZXJ2aWNlLnByb3RvdHlwZS5zZXREYXRhKHJlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnRzXCJdKTtcclxuICAgICAgICAvL2FkaWNpb25hciBpdGVtcyDDoCBsaXN0YSBkZSBwYWNpZW50ZXMgZG8gc2VydmljZVxyXG4gICAgICAgIC8vdGhpcy5EYXRhU2VydmljZS5zZXRQYXRpZW50cyh0aGlzLnBhdGllbnRzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB2ZXJpZmljYXIgc2UgYSBsaXN0YSB0ZW0gc28gdW0gcGFjaWVudGUgcGFyYSBwb2RlciBpciBsb2dvIHBhcmEgYSAgbGlzdGEgZGUgbmVjZXNzaWRhZGVzICBcclxuICAgICAgICAvL2lmICh0aGlzLnBhdGllbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnQvMS9uZWVkc1wiXSk7XHJcbiAgICAgICAgLy8gfSAgIFxyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIC8qKlxyXG4gICAgIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KFJlc3BvbnNlIHwgYW55KX0gZXJyb3IgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJPZiBJdGVtc0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgXCJcIjtcclxuICAgICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgZXJyKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY3JlYXRlUmVxdWVzdEhlYWRlcigpIHtcclxuICAgICAgICAgY29uc29sZS5sb2coJ0EgY29uc3RydWlyIG8gSGVhZGVyIHBhcmEgbyByZXF1ZXN0IGRvcyBkYWRvcyBkb3MgcGFjaWVudGVzJyk7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCB0aGlzLmRhdGFTZXJ2aWNlLmdldFRva2VuKCkpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuICAgIHByaXZhdGUgY3JlYXRlTG9naW5IZWFkZXIoKSB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKCdBIGNyaWFyIG8gSGVhZGVyIHBhcmEgbyBsb2dpbicpO1xyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRoS2V5XCIsIFwibXkta2V5XCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aFRva2VuXCIsIFwibXktdG9rZW5cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENvbm5lY3RvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q29ubmVjdG9yVG9rZW4odXNlcl90b2tlbikge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yLmFjY2Vzc1Rva2VuID0gdXNlcl90b2tlbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc0Nvbm5lY3RlZCgpIHtcclxuICAgICAgICBpZih0aGlzLmNvbm5lY3Rpb25UeXBlID09ICdOb25lJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59Il19