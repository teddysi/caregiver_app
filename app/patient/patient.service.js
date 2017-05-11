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
        //let request = 'http://192.168.99.100/caregivers/public/caregiversAPI/' + this.dataService.getUserID() + '/patients'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxpQ0FBK0I7QUFFL0Isc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUV4RCw0REFBMEQ7QUFJMUQsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUc5QixJQUFhLGNBQWM7SUFLdkIsd0JBQW9CLElBQVUsRUFBVSxXQUF3QjtRQUE1QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFFaEUsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxzQkFBc0I7UUFDckIsaUZBQWlGO1FBQ2xGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXpDLElBQUksT0FBTyxHQUFHLHFEQUFxRCxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEdBQUcsV0FBVyxDQUFBO1FBQ2hILHFIQUFxSDtRQUNySCxrR0FBa0c7UUFDbEcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87YUFDdEQsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDO1FBQzVCLHlCQUF5QjtRQUN6QixvQ0FBb0M7SUFDeEMsQ0FBQztJQUdNLG9DQUFXLEdBQWxCLFVBQW1CLFFBQVE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxFQUFVO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyw0Q0FBbUIsR0FBM0I7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLHdCQUF3QjtRQUN6Qix1Q0FBdUM7UUFDdEMsMENBQTBDO1FBQzFDLHFEQUFxRDtRQUN0RCxrR0FBa0c7UUFDakcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQWxERCxJQWtEQztBQWxEWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBTWlCLFdBQUksRUFBdUIsMEJBQVc7R0FMdkQsY0FBYyxDQWtEMUI7QUFsRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudFNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBwYXRpZW50czogUGF0aWVudFtdXHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCkgeyAgXHJcbiAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldFBhdGllbnRzKCk6IE9ic2VydmFibGU8UGF0aWVudFtdPiB7XHJcbiAgICAgICAgLy9zZSB0ZW0gY29uZXRpdmlkYWRlOlxyXG4gICAgICAgICAvL2Z1dHVyYW1lbnRlIGFkaWNpb25hciBvIHRva2VuIGNvbnNvbGUubG9nKFwiWlpaIC0+IFwiK3RoaXMuZGF0YVNlcnZpY2UuZ2V0VXNlcklkKVxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gJ2h0dHA6Ly8zNS4xODQuMTcuNC9jYXJlZ2l2ZXJzL3B1YmxpYy9jYXJlZ2l2ZXJzQVBJLycgKyB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJJRCgpICsgJy9wYXRpZW50cydcclxuICAgICAgICAvL2xldCByZXF1ZXN0ID0gJ2h0dHA6Ly8xOTIuMTY4Ljk5LjEwMC9jYXJlZ2l2ZXJzL3B1YmxpYy9jYXJlZ2l2ZXJzQVBJLycgKyB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJJRCgpICsgJy9wYXRpZW50cydcclxuICAgICAgICAvLyByZXR1cm4gdGhpcy5odHRwLmdldChcImh0dHA6Ly8xOTIuMTY4LjAuMTAyOjgwODAvYXBpL3YxL3BhdGllbnRzXCIsIHsgaGVhZGVyczogaGVhZGVycyB9KSAvL1RlZGR5XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocmVxdWVzdCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pIC8vVGlhZ29cclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICAgICAgLy9zZSBuw6NvIHRlbSBjb25ldGl2aWRhZGVcclxuICAgICAgICAvL3JldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmdldERhdGEoKTtcclxuICAgIH0gXHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXRQYXRpZW50cyhwYXRpZW50cykge1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSBwYXRpZW50cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXRpZW50KGlkOiBudW1iZXIpOiBQYXRpZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyT2YgSXRlbVNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBzZXQgaGVhZGVycyBoZXJlIGUuZy5cclxuICAgICAgIC8vIGhlYWRlcnMuYXBwZW5kKFwiQXV0aEtleVwiLCBcIm15LWtleVwiKTtcclxuICAgICAgICAvL2hlYWRlcnMuYXBwZW5kKFwiQXV0aFRva2VuXCIsIFwibXktdG9rZW5cIik7XHJcbiAgICAgICAgLy9oZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAvLyBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIixcIjc1ZlEyblgxTTJrMnpleTBXcEl3MzRKSm1xV2h6ZWdIZk1oVTJYTjgyMURHcTk2RXB6Mzd1bkZaWUgxSFwiKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgdGhpcy5kYXRhU2VydmljZS5nZXRUb2tlbigpKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuIl19