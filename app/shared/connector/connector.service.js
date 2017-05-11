"use strict";
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var http_1 = require("@angular/http");
var data_service_1 = require("../data/data.service");
var config_1 = require("../config");
var router_1 = require("@angular/router");
var connector_1 = require("./connector");
var ConnectorService = (function () {
    function ConnectorService(http, router, dataService) {
        this.http = http;
        this.router = router;
        this.dataService = dataService;
        this.connector = new connector_1.Connector();
        this.connector.serverURL = '35.184.17.4/caregivers/public';
        //this.connector.serverURL = '192.168.99.100/caregivers/public';
    }
    ConnectorService.prototype.ngOnInit = function () {
    };
    ConnectorService.prototype.requestLogin = function (username, password) {
        var headers = this.createLoginHeader();
        //link server virtual box
        var request = 'http://' + this.connector.serverURL + '/caregiversAPI/login';
        return this.http.post(request, { headers: headers }, { body: { username: username, password: password } }).map(function (res) { return res.json(); });
    };
    ConnectorService.prototype.getAllData = function () {
        var headers = this.createRequestHeader();
        var request = "http://" + this.connector.serverURL + "ir buscar todos os materiais";
        return this.http.get(request, { headers: headers }).map(function (res) { return res.json(); });
    };
    ConnectorService.prototype.sync = function () {
        var _this = this;
        console.log('syncing');
        this.syncData()
            .subscribe(function (result) { return _this.onGetDataSuccess(result); }, function (error) { return _this.onGetDataError(error); });
    };
    ConnectorService.prototype.syncData = function () {
        var headers = this.createRequestHeader();
        console.log('Request to server');
        return this.http.get(config_1.Config.apiUrl, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ConnectorService.prototype.onGetDataSuccess = function (res) {
        console.log(res);
        data_service_1.DataService.prototype.setData(res);
        this.router.navigate(["/patients"]);
        //adicionar items à lista de pacientes do service
        //this.DataService.setPatients(this.patients);
        // verificar se a lista tem so um paciente para poder ir logo para a  lista de necessidades  
        //if (this.patients.length == 1) {
        //    this.router.navigate(["/patient/1/needs"]);
        // }   
    };
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
        var headers = new http_1.Headers();
        headers.append("Authorization", this.connector.accessToken);
        headers.append("Content-Type", "application/json");
        return headers;
    };
    ConnectorService.prototype.createLoginHeader = function () {
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
    return ConnectorService;
}());
ConnectorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, data_service_1.DataService])
], ConnectorService);
exports.ConnectorService = ConnectorService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW1EO0FBQ25ELGlDQUErQjtBQUMvQixzQ0FBd0Q7QUFHeEQscURBQW1EO0FBQ25ELG9DQUFtQztBQUNuQywwQ0FBeUM7QUFDekMseUNBQXdDO0FBTXhDLElBQWEsZ0JBQWdCO0lBTXpCLDBCQUFvQixJQUFVLEVBQVUsTUFBYyxFQUFVLFdBQXdCO1FBQXBFLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDcEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRywrQkFBK0IsQ0FBQztRQUMzRCxnRUFBZ0U7SUFDcEUsQ0FBQztJQUVELG1DQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsdUNBQVksR0FBWixVQUFhLFFBQVEsRUFBRSxRQUFRO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hDLHlCQUF5QjtRQUN4QixJQUFJLE9BQU8sR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsc0JBQXNCLENBQUM7UUFFNUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNqQixPQUFPLEVBQ1AsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQ25CLEVBQUMsSUFBSSxFQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FDbEQsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUM7SUFDakMsQ0FB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QWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTSx1Q0FBWSxHQUFuQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDTSw0Q0FBaUIsR0FBeEIsVUFBeUIsVUFBVTtRQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDNUMsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxBQW5HRCxJQW1HQztBQW5HWSxnQkFBZ0I7SUFENUIsaUJBQVUsRUFBRTtxQ0FPaUIsV0FBSSxFQUFrQixlQUFNLEVBQXVCLDBCQUFXO0dBTi9FLGdCQUFnQixDQW1HNUI7QUFuR1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vZGF0YS9kYXRhXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL2RhdGEvZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3IgfSBmcm9tIFwiLi9jb25uZWN0b3JcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi91c2VyL3VzZXJcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi4vZGF0YS9kYXRhYmFzZVwiO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbm5lY3RvclNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdG9yOiBDb25uZWN0b3I7XHJcbiAgICBwcml2YXRlIHVzZXI6IFVzZXI7XHJcbiAgICBwcml2YXRlIGRhdGE6IGFueTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yID0gbmV3IENvbm5lY3RvcigpO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCA9ICczNS4xODQuMTcuNC9jYXJlZ2l2ZXJzL3B1YmxpYyc7XHJcbiAgICAgICAgLy90aGlzLmNvbm5lY3Rvci5zZXJ2ZXJVUkwgPSAnMTkyLjE2OC45OS4xMDAvY2FyZWdpdmVycy9wdWJsaWMnO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RMb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpOiBPYnNlcnZhYmxlPFVzZXI+IHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlTG9naW5IZWFkZXIoKTtcclxuICAgICAgIC8vbGluayBzZXJ2ZXIgdmlydHVhbCBib3hcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICdodHRwOi8vJyArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArICcvY2FyZWdpdmVyc0FQSS9sb2dpbic7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgICAgICAgcmVxdWVzdCxcclxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH0sXHJcbiAgICAgICAgICAgICB7Ym9keTp7IHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0gfVxyXG4gICAgICAgICAgICApLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsRGF0YSgpOiBPYnNlcnZhYmxlPERhdGFbXT4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBcImh0dHA6Ly9cIiArIHRoaXMuY29ubmVjdG9yLnNlcnZlclVSTCArIFwiaXIgYnVzY2FyIHRvZG9zIG9zIG1hdGVyaWFpc1wiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHJlcXVlc3QsIHsgaGVhZGVyczogaGVhZGVycyB9KS5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN5bmMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N5bmNpbmcnKTtcclxuICAgICAgICB0aGlzLnN5bmNEYXRhKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICAgICAgKTsgXHJcbiAgICB9XHJcblxyXG4gICAgc3luY0RhdGEoKTogT2JzZXJ2YWJsZTxEYXRhW10+IHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0IHRvIHNlcnZlcicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KENvbmZpZy5hcGlVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIERhdGFTZXJ2aWNlLnByb3RvdHlwZS5zZXREYXRhKHJlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnRzXCJdKTtcclxuICAgICAgICAvL2FkaWNpb25hciBpdGVtcyDDoCBsaXN0YSBkZSBwYWNpZW50ZXMgZG8gc2VydmljZVxyXG4gICAgICAgIC8vdGhpcy5EYXRhU2VydmljZS5zZXRQYXRpZW50cyh0aGlzLnBhdGllbnRzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB2ZXJpZmljYXIgc2UgYSBsaXN0YSB0ZW0gc28gdW0gcGFjaWVudGUgcGFyYSBwb2RlciBpciBsb2dvIHBhcmEgYSAgbGlzdGEgZGUgbmVjZXNzaWRhZGVzICBcclxuICAgICAgICAvL2lmICh0aGlzLnBhdGllbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnQvMS9uZWVkc1wiXSk7XHJcbiAgICAgICAgLy8gfSAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KFJlc3BvbnNlIHwgYW55KX0gZXJyb3IgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJPZiBJdGVtc0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgXCJcIjtcclxuICAgICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgdGhpcy5jb25uZWN0b3IuYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUxvZ2luSGVhZGVyKCkge1xyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRoS2V5XCIsIFwibXkta2V5XCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aFRva2VuXCIsIFwibXktdG9rZW5cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb25uZWN0b3IoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldENvbm5lY3RvclRva2VuKHVzZXJfdG9rZW4pIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rvci5hY2Nlc3NUb2tlbiA9IHVzZXJfdG9rZW47XHJcbiAgICB9XHJcbn0iXX0=