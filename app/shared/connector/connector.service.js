"use strict";
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var http_1 = require("@angular/http");
var data_service_1 = require("../data/data.service");
var config_1 = require("../config");
var router_1 = require("@angular/router");
var ConnectorService = (function () {
    function ConnectorService(http, router) {
        this.http = http;
        this.router = router;
        //this.connector.serverURL = Config.apiUrl;
    }
    ConnectorService.prototype.ngOnInit = function () {
    };
    ConnectorService.prototype.requestLogin = function (username, password) {
        var headers = this.createLoginHeader();
        //let request = "http://192.168.1.100/" + '/caregivers/login?username=' + username + '&' + 'password=' + password;
        var request = "http://192.168.1.100/caregivers/login?username=fidel46&password=carepw";
        return this.http.post(request, { headers: headers })
            .map(function (res) { return res.json(); });
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
    return ConnectorService;
}());
ConnectorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], ConnectorService);
exports.ConnectorService = ConnectorService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW1EO0FBQ25ELGlDQUErQjtBQUMvQixzQ0FBd0Q7QUFHeEQscURBQW1EO0FBQ25ELG9DQUFtQztBQUNuQywwQ0FBeUM7QUFPekMsSUFBYSxnQkFBZ0I7SUFNekIsMEJBQW9CLElBQVUsRUFBVSxNQUFjO1FBQWxDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2xELDJDQUEyQztJQUMvQyxDQUFDO0lBRUQsbUNBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCx1Q0FBWSxHQUFaLFVBQWEsUUFBUSxFQUFFLFFBQVE7UUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsa0hBQWtIO1FBQ2xILElBQUksT0FBTyxHQUFHLHdFQUF3RSxDQUFDO1FBRXZGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDL0MsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCwrQkFBSSxHQUFKO1FBQUEsaUJBT0M7UUFORyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUU7YUFDVixTQUFTLENBQ1YsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQTdCLENBQTZCLEVBQ3pDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBMUIsQ0FBMEIsQ0FDcEMsQ0FBQztJQUNWLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3BELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBR1csMkNBQWdCLEdBQXhCLFVBQXlCLEdBQUc7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQiwwQkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLGlEQUFpRDtRQUNqRCw4Q0FBOEM7UUFFOUMsNkZBQTZGO1FBQzdGLGtDQUFrQztRQUNsQyxpREFBaUQ7UUFDbEQsT0FBTztJQUVWLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyx5Q0FBYyxHQUF0QixVQUF1QixLQUFxQjtRQUN4QyxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ2hDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyw4Q0FBbUIsR0FBM0I7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTyw0Q0FBaUIsR0FBekI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzFCLHdCQUF3QjtRQUN4QixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4QyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxBQW5GRCxJQW1GQztBQW5GWSxnQkFBZ0I7SUFENUIsaUJBQVUsRUFBRTtxQ0FPaUIsV0FBSSxFQUFrQixlQUFNO0dBTjdDLGdCQUFnQixDQW1GNUI7QUFuRlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vZGF0YS9kYXRhXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL2RhdGEvZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3IgfSBmcm9tIFwiLi9jb25uZWN0b3JcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi91c2VyL3VzZXJcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi4vZGF0YS9kYXRhYmFzZVwiO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbm5lY3RvclNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdG9yOiBDb25uZWN0b3I7XHJcbiAgICBwcml2YXRlIHVzZXI6IFVzZXI7XHJcbiAgICBwcml2YXRlIGRhdGE6IGFueTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICAgICAgLy90aGlzLmNvbm5lY3Rvci5zZXJ2ZXJVUkwgPSBDb25maWcuYXBpVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RMb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpOiBPYnNlcnZhYmxlPFVzZXI+IHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlTG9naW5IZWFkZXIoKTtcclxuICAgICAgICAvL2xldCByZXF1ZXN0ID0gXCJodHRwOi8vMTkyLjE2OC4xLjEwMC9cIiArICcvY2FyZWdpdmVycy9sb2dpbj91c2VybmFtZT0nICsgdXNlcm5hbWUgKyAnJicgKyAncGFzc3dvcmQ9JyArIHBhc3N3b3JkO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gXCJodHRwOi8vMTkyLjE2OC4xLjEwMC9jYXJlZ2l2ZXJzL2xvZ2luP3VzZXJuYW1lPWZpZGVsNDYmcGFzc3dvcmQ9Y2FyZXB3XCI7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChyZXF1ZXN0LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICB9IFxyXG5cclxuICAgIHN5bmMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N5bmNpbmcnKTtcclxuICAgICAgICB0aGlzLnN5bmNEYXRhKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICAgICAgKTsgXHJcbiAgICB9XHJcblxyXG4gICAgc3luY0RhdGEoKTogT2JzZXJ2YWJsZTxEYXRhW10+IHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0IHRvIHNlcnZlcicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KENvbmZpZy5hcGlVcmwsIHsgaGVhZGVyczogaGVhZGVycyB9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIERhdGFTZXJ2aWNlLnByb3RvdHlwZS5zZXREYXRhKHJlcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnRzXCJdKTtcclxuICAgICAgICAvL2FkaWNpb25hciBpdGVtcyDDoCBsaXN0YSBkZSBwYWNpZW50ZXMgZG8gc2VydmljZVxyXG4gICAgICAgIC8vdGhpcy5EYXRhU2VydmljZS5zZXRQYXRpZW50cyh0aGlzLnBhdGllbnRzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB2ZXJpZmljYXIgc2UgYSBsaXN0YSB0ZW0gc28gdW0gcGFjaWVudGUgcGFyYSBwb2RlciBpciBsb2dvIHBhcmEgYSAgbGlzdGEgZGUgbmVjZXNzaWRhZGVzICBcclxuICAgICAgICAvL2lmICh0aGlzLnBhdGllbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnQvMS9uZWVkc1wiXSk7XHJcbiAgICAgICAvLyB9ICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KFJlc3BvbnNlIHwgYW55KX0gZXJyb3IgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJPZiBJdGVtc0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgXCJcIjtcclxuICAgICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCB0aGlzLmNvbm5lY3Rvci5hY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTG9naW5IZWFkZXIoKSB7XHJcbiAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBzZXQgaGVhZGVycyBoZXJlIGUuZy5cclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhLZXlcIiwgXCJteS1rZXlcIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRoVG9rZW5cIiwgXCJteS10b2tlblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcbn0iXX0=