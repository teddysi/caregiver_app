"use strict";
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var PatientService = (function () {
    function PatientService(http) {
        this.http = http;
    }
    PatientService.prototype.getPatients = function () {
        //se tem conetividade:
        //futuramente adicionar o token
        var headers = this.createRequestHeader();
        return this.http.get("http://10.200.19.57:8080/api/v1/patients", { headers: headers })
            .map(function (res) { return res.json(); });
        //se não tem conetividade
    };
    PatientService.prototype.setPatients = function (patients) {
        this.patients = patients;
    };
    PatientService.prototype.getPatient = function (id) {
        return this.patients.filter(function (patient) { return patient.id === id; })[0];
    };
    /**
     *
     *
     * @private
     * @returns
     *
     * @memberOf ItemService
     */
    PatientService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        // set headers here e.g.
        headers.append("AuthKey", "my-key");
        headers.append("AuthToken", "my-token");
        headers.append("Content-Type", "application/json");
        return headers;
    };
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxpQ0FBK0I7QUFFL0Isc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUd4RCxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBRzlCLElBQWEsY0FBYztJQUl2Qix3QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFDOUIsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxzQkFBc0I7UUFDckIsK0JBQStCO1FBQ2hDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNqRixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFFNUIseUJBQXlCO0lBQzdCLENBQUM7SUFHTSxvQ0FBVyxHQUFsQixVQUFtQixRQUFRO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsRUFBVTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssNENBQW1CLEdBQTNCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1Qix3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7QUExQ1ksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQUtpQixXQUFJO0dBSnJCLGNBQWMsQ0EwQzFCO0FBMUNZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4vcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcblxyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgcGF0aWVudHM6IFBhdGllbnRbXVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudHMoKTogT2JzZXJ2YWJsZTxQYXRpZW50W10+IHtcclxuICAgICAgICAvL3NlIHRlbSBjb25ldGl2aWRhZGU6XHJcbiAgICAgICAgIC8vZnV0dXJhbWVudGUgYWRpY2lvbmFyIG8gdG9rZW5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFwiaHR0cDovLzEwLjIwMC4xOS41Nzo4MDgwL2FwaS92MS9wYXRpZW50c1wiLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcblxyXG4gICAgICAgIC8vc2UgbsOjbyB0ZW0gY29uZXRpdmlkYWRlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXRQYXRpZW50cyhwYXRpZW50cykge1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSBwYXRpZW50cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXRpZW50KGlkOiBudW1iZXIpOiBQYXRpZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyT2YgSXRlbVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBzZXQgaGVhZGVycyBoZXJlIGUuZy5cclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhLZXlcIiwgXCJteS1rZXlcIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRoVG9rZW5cIiwgXCJteS10b2tlblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==