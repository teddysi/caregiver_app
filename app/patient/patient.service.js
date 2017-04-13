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
        //futuramente adicionar o token
        var headers = this.createRequestHeader();
        return this.http.get("http://192.168.0.102:8080/api/v1/patients", { headers: headers })
            .map(function (res) { return res.json(); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQSxpQ0FBK0I7QUFHL0Isc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUd4RCxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBRzlCLElBQWEsY0FBYztJQUt2Qix3QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBR25DLG9DQUFXLEdBQVg7UUFDSywrQkFBK0I7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2xGLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztJQUVoQyxDQUFDO0lBR00sb0NBQVcsR0FBbEIsVUFBbUIsUUFBUTtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtJQUM1QixDQUFDO0lBSUQsbUNBQVUsR0FBVixVQUFXLEVBQVU7UUFFakIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBR0Q7Ozs7Ozs7T0FPRztJQUNLLDRDQUFtQixHQUEzQjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIsd0JBQXdCO1FBQ3hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBN0NELElBNkNDO0FBN0NZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtxQ0FNaUIsV0FBSTtHQUxyQixjQUFjLENBNkMxQjtBQTdDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XG5cblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcblxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGF0aWVudFNlcnZpY2Uge1xuXG4gICAgcHVibGljIHBhdGllbnRzOiBQYXRpZW50W11cblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuXG4gICAgZ2V0UGF0aWVudHMoKTogT2JzZXJ2YWJsZTxQYXRpZW50W10+IHtcbiAgICAgICAgIC8vZnV0dXJhbWVudGUgYWRpY2lvbmFyIG8gdG9rZW5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vMTkyLjE2OC4wLjEwMjo4MDgwL2FwaS92MS9wYXRpZW50c1wiLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpO1xuXG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2V0UGF0aWVudHMocGF0aWVudHMpIHtcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHBhdGllbnRzXG4gICAgfVxuXG5cbiAgIFxuICAgIGdldFBhdGllbnQoaWQ6IG51bWJlcik6IFBhdGllbnQge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybnMgXG4gICAgICogXG4gICAgICogQG1lbWJlck9mIEl0ZW1TZXJ2aWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIC8vIHNldCBoZWFkZXJzIGhlcmUgZS5nLlxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhLZXlcIiwgXCJteS1rZXlcIik7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aFRva2VuXCIsIFwibXktdG9rZW5cIik7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxufVxuXG5cblxuXG4iXX0=