"use strict";
var core_1 = require("@angular/core");
var data_service_1 = require("./shared/data/data.service");
var user_service_1 = require("./shared/user/user.service");
var connector_service_1 = require("./shared/connector/connector.service");
var patient_service_1 = require("./patient/patient.service");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "Caregiver",
        templateUrl: "app.component.html",
        providers: [data_service_1.DataService, user_service_1.UserService, connector_service_1.ConnectorService, patient_service_1.PatientService]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEwQztBQUMxQywyREFBeUQ7QUFDekQsMkRBQXdEO0FBQ3hELDBFQUF1RTtBQUN2RSw2REFBMkQ7QUFPM0QsSUFBYSxZQUFZO0lBQXpCO0lBQTRCLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFBN0IsSUFBNkI7QUFBaEIsWUFBWTtJQUx4QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLG9CQUFvQjtRQUNqQyxTQUFTLEVBQUUsQ0FBQywwQkFBVyxFQUFFLDBCQUFXLEVBQUUsb0NBQWdCLEVBQUUsZ0NBQWMsQ0FBQztLQUMxRSxDQUFDO0dBQ1csWUFBWSxDQUFJO0FBQWhCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2V9IGZyb20gXCIuL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlfSBmcm9tIFwiLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiQ2FyZWdpdmVyXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHByb3ZpZGVyczogW0RhdGFTZXJ2aWNlLCBVc2VyU2VydmljZSwgQ29ubmVjdG9yU2VydmljZSwgUGF0aWVudFNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgeyB9XHJcbiJdfQ==