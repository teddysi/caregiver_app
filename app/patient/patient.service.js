"use strict";
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var data_service_1 = require("../shared/data/data.service");
var connector_service_1 = require("../shared/connector/connector.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var PatientService = (function () {
    function PatientService(http, dataService, connectorService) {
        this.http = http;
        this.dataService = dataService;
        this.connectorService = connectorService;
    }
    PatientService.prototype.getPatients = function () {
        /*
        //se tem conetividade:
         //futuramente adicionar o token console.log("ZZZ -> "+this.dataService.getUserId)
        let headers = this.createRequestHeader();

        //let request = 'http://35.184.17.4/caregivers/public/caregiversAPI/' + this.dataService.getUserID() + '/patients'
        let request = 'http://192.168.99.100/caregivers/public/caregiversAPI/' + this.dataService.getUserID() + '/patients'
        // return this.http.get("http://192.168.0.102:8080/api/v1/patients", { headers: headers }) //Teddy
        return this.http.get(request, { headers: headers }) //Tiago
            .map(res => res.json());
        //se não tem conetividade
        //return this.dataService.getData();
        */
        return this.connectorService.getPatientsData();
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
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService, connector_service_1.ConnectorService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxpQ0FBK0I7QUFFL0Isc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUV4RCw0REFBMEQ7QUFDMUQsMkVBQXlFO0FBR3pFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUIsSUFBYSxjQUFjO0lBS3ZCLHdCQUFvQixJQUFVLEVBQVUsV0FBd0IsRUFBVSxnQkFBa0M7UUFBeEYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUU1RyxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUVJOzs7Ozs7Ozs7Ozs7VUFZRTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUM7SUFFbkQsQ0FBQztJQUdNLG9DQUFXLEdBQWxCLFVBQW1CLFFBQVE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxFQUFVO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyw0Q0FBbUIsR0FBM0I7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLHdCQUF3QjtRQUN6Qix1Q0FBdUM7UUFDdEMsMENBQTBDO1FBQzFDLHFEQUFxRDtRQUN0RCxrR0FBa0c7UUFDakcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXZERCxJQXVEQztBQXZEWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBTWlCLFdBQUksRUFBdUIsMEJBQVcsRUFBNEIsb0NBQWdCO0dBTG5HLGNBQWMsQ0F1RDFCO0FBdkRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4vcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgcGF0aWVudHM6IFBhdGllbnRbXVxyXG4gICAgXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlKSB7ICBcclxuICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudHMoKVxyXG4gICAge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgLy9zZSB0ZW0gY29uZXRpdmlkYWRlOlxyXG4gICAgICAgICAvL2Z1dHVyYW1lbnRlIGFkaWNpb25hciBvIHRva2VuIGNvbnNvbGUubG9nKFwiWlpaIC0+IFwiK3RoaXMuZGF0YVNlcnZpY2UuZ2V0VXNlcklkKVxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcblxyXG4gICAgICAgIC8vbGV0IHJlcXVlc3QgPSAnaHR0cDovLzM1LjE4NC4xNy40L2NhcmVnaXZlcnMvcHVibGljL2NhcmVnaXZlcnNBUEkvJyArIHRoaXMuZGF0YVNlcnZpY2UuZ2V0VXNlcklEKCkgKyAnL3BhdGllbnRzJ1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gJ2h0dHA6Ly8xOTIuMTY4Ljk5LjEwMC9jYXJlZ2l2ZXJzL3B1YmxpYy9jYXJlZ2l2ZXJzQVBJLycgKyB0aGlzLmRhdGFTZXJ2aWNlLmdldFVzZXJJRCgpICsgJy9wYXRpZW50cydcclxuICAgICAgICAvLyByZXR1cm4gdGhpcy5odHRwLmdldChcImh0dHA6Ly8xOTIuMTY4LjAuMTAyOjgwODAvYXBpL3YxL3BhdGllbnRzXCIsIHsgaGVhZGVyczogaGVhZGVycyB9KSAvL1RlZGR5XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocmVxdWVzdCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pIC8vVGlhZ29cclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSk7XHJcbiAgICAgICAgLy9zZSBuw6NvIHRlbSBjb25ldGl2aWRhZGVcclxuICAgICAgICAvL3JldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmdldERhdGEoKTtcclxuICAgICAgICAqL1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvclNlcnZpY2UuZ2V0UGF0aWVudHNEYXRhKCk7XHJcblxyXG4gICAgfSBcclxuXHJcblxyXG4gICAgcHVibGljIHNldFBhdGllbnRzKHBhdGllbnRzKSB7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHBhdGllbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBhdGllbnQoaWQ6IG51bWJlcik6IFBhdGllbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJPZiBJdGVtU2VydmljZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIC8vIHNldCBoZWFkZXJzIGhlcmUgZS5nLlxyXG4gICAgICAgLy8gaGVhZGVycy5hcHBlbmQoXCJBdXRoS2V5XCIsIFwibXkta2V5XCIpO1xyXG4gICAgICAgIC8vaGVhZGVycy5hcHBlbmQoXCJBdXRoVG9rZW5cIiwgXCJteS10b2tlblwiKTtcclxuICAgICAgICAvL2hlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgIC8vIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLFwiNzVmUTJuWDFNMmsyemV5MFdwSXczNEpKbXFXaHplZ0hmTWhVMlhOODIxREdxOTZFcHozN3VuRlpZSDFIXCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCB0aGlzLmRhdGFTZXJ2aWNlLmdldFRva2VuKCkpO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=