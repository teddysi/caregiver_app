"use strict";
var user_service_1 = require("./shared/user/user.service");
var connector_service_1 = require("./shared/connector/connector.service");
var patient_service_1 = require("./patient/patient.service");
var data_service_1 = require("./shared/data/data.service");
var database_1 = require("./shared/data/database");
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "Caregiver",
        templateUrl: "app.component.html",
        providers: [data_service_1.DataService, user_service_1.UserService, connector_service_1.ConnectorService, patient_service_1.PatientService, database_1.Database]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJEQUF3RDtBQUN4RCwwRUFBdUU7QUFDdkUsNkRBQTJEO0FBQzNELDJEQUF5RDtBQUN6RCxtREFBa0Q7QUFDbEQsc0NBQTBDO0FBTzFDLElBQWEsWUFBWTtJQUF6QjtJQUE0QixDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBQTdCLElBQTZCO0FBQWhCLFlBQVk7SUFMeEIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSxvQkFBb0I7UUFDakMsU0FBUyxFQUFFLENBQUMsMEJBQVcsRUFBRSwwQkFBVyxFQUFFLG9DQUFnQixFQUFFLGdDQUFjLEVBQUUsbUJBQVEsQ0FBQztLQUNwRixDQUFDO0dBQ1csWUFBWSxDQUFJO0FBQWhCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlclNlcnZpY2V9IGZyb20gXCIuL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlfSBmcm9tIFwiLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2UgfSBmcm9tIFwiLi9zaGFyZWQvZGF0YS9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJDYXJlZ2l2ZXJcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgcHJvdmlkZXJzOiBbRGF0YVNlcnZpY2UsIFVzZXJTZXJ2aWNlLCBDb25uZWN0b3JTZXJ2aWNlLCBQYXRpZW50U2VydmljZSwgRGF0YWJhc2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgeyB9XHJcbiJdfQ==