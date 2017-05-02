"use strict";
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var data_service_1 = require("../shared/data/data.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var PatientService = (function () {
    function PatientService(http, dataService) {
        this.http = http;
        this.dataService = dataService;
    }
    PatientService.prototype.getPatients = function () {
        //se tem conetividade:
        //futuramente adicionar o token
        var headers = this.createRequestHeader();
        // return this.http.get("http://192.168.0.102:8080/api/v1/patients", { headers: headers }) //Teddy
        return this.http.get("http://192.168.1:100:8080/api/v1/patients", { headers: headers }) //Tiago
            .map(function (res) { return res.json(); });
        //se não tem conetividade
        //return this.dataService.getData();
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
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxpQ0FBK0I7QUFFL0Isc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUV4RCw0REFBMEQ7QUFFMUQsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUc5QixJQUFhLGNBQWM7SUFJdkIsd0JBQW9CLElBQVUsRUFBVSxXQUF3QjtRQUE1QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDaEUsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxzQkFBc0I7UUFDckIsK0JBQStCO1FBRWhDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzFDLGtHQUFrRztRQUNqRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO2FBQzFGLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztRQUM1Qix5QkFBeUI7UUFDekIsb0NBQW9DO0lBQ3hDLENBQUM7SUFHTSxvQ0FBVyxHQUFsQixVQUFtQixRQUFRO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsRUFBVTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssNENBQW1CLEdBQTNCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1Qix3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQUtpQixXQUFJLEVBQXVCLDBCQUFXO0dBSnZELGNBQWMsQ0E0QzFCO0FBNUNZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4vcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQYXRpZW50U2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzOiBQYXRpZW50W11cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXRpZW50cygpOiBPYnNlcnZhYmxlPFBhdGllbnRbXT4ge1xyXG4gICAgICAgIC8vc2UgdGVtIGNvbmV0aXZpZGFkZTpcclxuICAgICAgICAgLy9mdXR1cmFtZW50ZSBhZGljaW9uYXIgbyB0b2tlblxyXG4gICAgICAgICBcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgLy8gcmV0dXJuIHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vMTkyLjE2OC4wLjEwMjo4MDgwL2FwaS92MS9wYXRpZW50c1wiLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkgLy9UZWRkeVxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFwiaHR0cDovLzE5Mi4xNjguMToxMDA6ODA4MC9hcGkvdjEvcGF0aWVudHNcIiwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pIC8vVGlhZ29cclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICAgICAgLy9zZSBuw6NvIHRlbSBjb25ldGl2aWRhZGVcclxuICAgICAgICAvL3JldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmdldERhdGEoKTtcclxuICAgIH0gXHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXRQYXRpZW50cyhwYXRpZW50cykge1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSBwYXRpZW50cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXRpZW50KGlkOiBudW1iZXIpOiBQYXRpZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyT2YgSXRlbVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBzZXQgaGVhZGVycyBoZXJlIGUuZy5cclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhLZXlcIiwgXCJteS1rZXlcIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRoVG9rZW5cIiwgXCJteS10b2tlblwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==