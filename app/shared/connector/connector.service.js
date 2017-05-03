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
        var request = ' http://192.168.1.84/' + '/caregivers/login?username=' + username + '&' + 'password=' + password;
        //let request = "http://192.168.1.86/caregivers/login?username=fidel46&password=carepw";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW1EO0FBQ25ELGlDQUErQjtBQUMvQixzQ0FBd0Q7QUFHeEQscURBQW1EO0FBQ25ELG9DQUFtQztBQUNuQywwQ0FBeUM7QUFPekMsSUFBYSxnQkFBZ0I7SUFNekIsMEJBQW9CLElBQVUsRUFBVSxNQUFjO1FBQWxDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2xELDJDQUEyQztJQUMvQyxDQUFDO0lBRUQsbUNBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCx1Q0FBWSxHQUFaLFVBQWEsUUFBUSxFQUFFLFFBQVE7UUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkMsSUFBSSxPQUFPLEdBQUcsdUJBQXVCLEdBQUcsNkJBQTZCLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQ2hILHdGQUF3RjtRQUV4RixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQy9DLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsK0JBQUksR0FBSjtRQUFBLGlCQU9DO1FBTkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFO2FBQ1YsU0FBUyxDQUNWLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUE3QixDQUE2QixFQUN6QyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQTFCLENBQTBCLENBQ3BDLENBQUM7SUFDVixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNwRCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUdXLDJDQUFnQixHQUF4QixVQUF5QixHQUFHO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsMEJBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwQyxpREFBaUQ7UUFDakQsOENBQThDO1FBRTlDLDZGQUE2RjtRQUM3RixrQ0FBa0M7UUFDbEMsaURBQWlEO1FBQ2xELE9BQU87SUFFVixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0sseUNBQWMsR0FBdEIsVUFBdUIsS0FBcUI7UUFDeEMsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sOENBQW1CLEdBQTNCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRU8sNENBQWlCLEdBQXpCO1FBQ0UsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUMxQix3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFuRkQsSUFtRkM7QUFuRlksZ0JBQWdCO0lBRDVCLGlCQUFVLEVBQUU7cUNBT2lCLFdBQUksRUFBa0IsZUFBTTtHQU43QyxnQkFBZ0IsQ0FtRjVCO0FBbkZZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uL2RhdGEvZGF0YVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhL2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yIH0gZnJvbSBcIi4vY29ubmVjdG9yXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vdXNlci91c2VyXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4uL2RhdGEvZGF0YWJhc2VcIjtcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0b3JTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3RvcjogQ29ubmVjdG9yO1xyXG4gICAgcHJpdmF0ZSB1c2VyOiBVc2VyO1xyXG4gICAgcHJpdmF0ZSBkYXRhOiBhbnk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgIC8vdGhpcy5jb25uZWN0b3Iuc2VydmVyVVJMID0gQ29uZmlnLmFwaVVybDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0TG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKTogT2JzZXJ2YWJsZTxVc2VyPiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZUxvZ2luSGVhZGVyKCk7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSAnIGh0dHA6Ly8xOTIuMTY4LjEuODQvJyArICcvY2FyZWdpdmVycy9sb2dpbj91c2VybmFtZT0nICsgdXNlcm5hbWUgKyAnJicgKyAncGFzc3dvcmQ9JyArIHBhc3N3b3JkO1xyXG4gICAgICAgIC8vbGV0IHJlcXVlc3QgPSBcImh0dHA6Ly8xOTIuMTY4LjEuODYvY2FyZWdpdmVycy9sb2dpbj91c2VybmFtZT1maWRlbDQ2JnBhc3N3b3JkPWNhcmVwd1wiO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QocmVxdWVzdCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgfSBcclxuXHJcbiAgICBzeW5jKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzeW5jaW5nJyk7XHJcbiAgICAgICAgdGhpcy5zeW5jRGF0YSgpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7IFxyXG4gICAgfVxyXG5cclxuICAgIHN5bmNEYXRhKCk6IE9ic2VydmFibGU8RGF0YVtdPiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnUmVxdWVzdCB0byBzZXJ2ZXInKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChDb25maWcuYXBpVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICBEYXRhU2VydmljZS5wcm90b3R5cGUuc2V0RGF0YShyZXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50c1wiXSk7XHJcbiAgICAgICAgLy9hZGljaW9uYXIgaXRlbXMgw6AgbGlzdGEgZGUgcGFjaWVudGVzIGRvIHNlcnZpY2VcclxuICAgICAgICAvL3RoaXMuRGF0YVNlcnZpY2Uuc2V0UGF0aWVudHModGhpcy5wYXRpZW50cyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdmVyaWZpY2FyIHNlIGEgbGlzdGEgdGVtIHNvIHVtIHBhY2llbnRlIHBhcmEgcG9kZXIgaXIgbG9nbyBwYXJhIGEgIGxpc3RhIGRlIG5lY2Vzc2lkYWRlcyAgXHJcbiAgICAgICAgLy9pZiAodGhpcy5wYXRpZW50cy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgIC8vICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50LzEvbmVlZHNcIl0pO1xyXG4gICAgICAgLy8gfSAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyhSZXNwb25zZSB8IGFueSl9IGVycm9yIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyT2YgSXRlbXNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8IFwiXCI7XHJcbiAgICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uR2V0RGF0YUVycm9yOiBcIiArIGVycik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgdGhpcy5jb25uZWN0b3IuYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUxvZ2luSGVhZGVyKCkge1xyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRoS2V5XCIsIFwibXkta2V5XCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aFRva2VuXCIsIFwibXktdG9rZW5cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG59Il19