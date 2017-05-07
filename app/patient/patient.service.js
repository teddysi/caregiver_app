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
        //futuramente adicionar o token console.log("ZZZ -> "+this.dataService.getUserId)
        var headers = this.createRequestHeader();
        var request = 'http://35.184.17.4/caregivers/public/caregiversAPI/' + this.dataService.getUserID() + '/patients';
        //let request = 'http://192.168.0.35/caregiversAPI/' + "15"+ '/patients'
        // return this.http.get("http://192.168.0.102:8080/api/v1/patients", { headers: headers }) //Teddy
        return this.http.get(request, { headers: headers }) //Tiago
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
        // headers.append("AuthKey", "my-key");
        //headers.append("AuthToken", "my-token");
        //headers.append("Content-Type", "application/json");
        // headers.append("Authorization","75fQ2nX1M2k2zey0WpIw34JJmqWhzegHfMhU2XN821DGq96Epz37unFZYH1H");
        headers.append("Authorization", this.dataService.getToken());
        return headers;
    };
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxpQ0FBK0I7QUFFL0Isc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUV4RCw0REFBMEQ7QUFJMUQsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUc5QixJQUFhLGNBQWM7SUFLdkIsd0JBQW9CLElBQVUsRUFBVSxXQUF3QjtRQUE1QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFFaEUsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxzQkFBc0I7UUFDckIsaUZBQWlGO1FBQ2xGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXpDLElBQUksT0FBTyxHQUFHLHFEQUFxRCxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEdBQUcsV0FBVyxDQUFBO1FBQ2hILHdFQUF3RTtRQUN6RSxrR0FBa0c7UUFDakcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87YUFDdEQsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDO1FBQzVCLHlCQUF5QjtRQUN6QixvQ0FBb0M7SUFDeEMsQ0FBQztJQUdNLG9DQUFXLEdBQWxCLFVBQW1CLFFBQVE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxFQUFVO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyw0Q0FBbUIsR0FBM0I7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLHdCQUF3QjtRQUN6Qix1Q0FBdUM7UUFDdEMsMENBQTBDO1FBQzFDLHFEQUFxRDtRQUN0RCxrR0FBa0c7UUFDckcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQWxERCxJQWtEQztBQWxEWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBTWlCLFdBQUksRUFBdUIsMEJBQVc7R0FMdkQsY0FBYyxDQWtEMUI7QUFsRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudFNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBwYXRpZW50czogUGF0aWVudFtdXHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCkgeyAgXHJcbiAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldFBhdGllbnRzKCk6IE9ic2VydmFibGU8UGF0aWVudFtdPiB7XHJcbiAgICAgICAgLy9zZSB0ZW0gY29uZXRpdmlkYWRlOlxyXG4gICAgICAgICAvL2Z1dHVyYW1lbnRlIGFkaWNpb25hciBvIHRva2VuIGNvbnNvbGUubG9nKFwiWlpaIC0+IFwiK3RoaXMuZGF0YVNlcnZpY2UuZ2V0VXNlcklkKVxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gJ2h0dHA6Ly8zNS4xODQuMTcuNC9jYXJlZ2l2ZXJzL3B1YmxpYy9jYXJlZ2l2ZXJzQVBJLycgKyB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJJRCgpICsgJy9wYXRpZW50cydcclxuICAgICAgICAvL2xldCByZXF1ZXN0ID0gJ2h0dHA6Ly8xOTIuMTY4LjAuMzUvY2FyZWdpdmVyc0FQSS8nICsgXCIxNVwiKyAnL3BhdGllbnRzJ1xyXG4gICAgICAgLy8gcmV0dXJuIHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vMTkyLjE2OC4wLjEwMjo4MDgwL2FwaS92MS9wYXRpZW50c1wiLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkgLy9UZWRkeVxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHJlcXVlc3QsIHsgaGVhZGVyczogaGVhZGVycyB9KSAvL1RpYWdvXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xyXG4gICAgICAgIC8vc2UgbsOjbyB0ZW0gY29uZXRpdmlkYWRlXHJcbiAgICAgICAgLy9yZXR1cm4gdGhpcy5kYXRhU2VydmljZS5nZXREYXRhKCk7XHJcbiAgICB9IFxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0UGF0aWVudHMocGF0aWVudHMpIHtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gcGF0aWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudChpZDogbnVtYmVyKTogUGF0aWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlck9mIEl0ZW1TZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlUmVxdWVzdEhlYWRlcigpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXHJcbiAgICAgICAvLyBoZWFkZXJzLmFwcGVuZChcIkF1dGhLZXlcIiwgXCJteS1rZXlcIik7XHJcbiAgICAgICAgLy9oZWFkZXJzLmFwcGVuZChcIkF1dGhUb2tlblwiLCBcIm15LXRva2VuXCIpO1xyXG4gICAgICAgIC8vaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgLy8gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsXCI3NWZRMm5YMU0yazJ6ZXkwV3BJdzM0SkptcVdoemVnSGZNaFUyWE44MjFER3E5NkVwejM3dW5GWllIMUhcIik7XHJcbiAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgdGhpcy5kYXRhU2VydmljZS5nZXRUb2tlbigpKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuIl19