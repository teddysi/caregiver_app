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
        /* //request to node server
       let headers = this.createRequestHeader();
      // return this.http.get("http://192.168.0.102:8080/api/v1/patients", { headers: headers }) //Teddy
       return this.http.get("http://192.168.1:100:8080/api/v1/patients", { headers: headers }) //Tiago
           .map(res => res.json());
       //se não tem conetividade
       //return this.dataService.getData();
       */
        /**
         * Get data vai buscar todos os dados para usar a flow já implementada. No futuro vai buscar os dados dos pacientes
         */
        return this.dataService.getAllData();
    };
    PatientService.prototype.setPatients = function (patients) {
        this.patients = patients;
    };
    PatientService.prototype.getPatient = function (id) {
        return this.patients.filter(function (patient) { return patient.id === id; })[0];
    };
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxpQ0FBK0I7QUFFL0Isc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUV4RCw0REFBMEQ7QUFHMUQsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUc5QixJQUFhLGNBQWM7SUFJdkIsd0JBQW9CLElBQVUsRUFBVSxXQUF3QjtRQUE1QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDaEUsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxzQkFBc0I7UUFDckIsK0JBQStCO1FBQy9COzs7Ozs7O1NBT0M7UUFDRjs7V0FFRztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFHTSxvQ0FBVyxHQUFsQixVQUFtQixRQUFRO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsRUFBVTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFoQ0QsSUFnQ0M7QUFoQ1ksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQUtpQixXQUFJLEVBQXVCLDBCQUFXO0dBSnZELGNBQWMsQ0FnQzFCO0FBaENZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4vcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5cclxuXHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudFNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBwYXRpZW50czogUGF0aWVudFtdXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkgeyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudHMoKSB7XHJcbiAgICAgICAgLy9zZSB0ZW0gY29uZXRpdmlkYWRlOlxyXG4gICAgICAgICAvL2Z1dHVyYW1lbnRlIGFkaWNpb25hciBvIHRva2VuXHJcbiAgICAgICAgIC8qIC8vcmVxdWVzdCB0byBub2RlIHNlcnZlclxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAvLyByZXR1cm4gdGhpcy5odHRwLmdldChcImh0dHA6Ly8xOTIuMTY4LjAuMTAyOjgwODAvYXBpL3YxL3BhdGllbnRzXCIsIHsgaGVhZGVyczogaGVhZGVycyB9KSAvL1RlZGR5XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vMTkyLjE2OC4xOjEwMDo4MDgwL2FwaS92MS9wYXRpZW50c1wiLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSkgLy9UaWFnb1xyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgICAgICAvL3NlIG7Do28gdGVtIGNvbmV0aXZpZGFkZVxyXG4gICAgICAgIC8vcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuZ2V0RGF0YSgpO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IGRhdGEgdmFpIGJ1c2NhciB0b2RvcyBvcyBkYWRvcyBwYXJhIHVzYXIgYSBmbG93IGrDoSBpbXBsZW1lbnRhZGEuIE5vIGZ1dHVybyB2YWkgYnVzY2FyIG9zIGRhZG9zIGRvcyBwYWNpZW50ZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5nZXRBbGxEYXRhKCk7XHJcbiAgICB9IFxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0UGF0aWVudHMocGF0aWVudHMpIHtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gcGF0aWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudChpZDogbnVtYmVyKTogUGF0aWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgfSAgICBcclxufSJdfQ==