"use strict";
var core_1 = require("@angular/core");
var patient_service_1 = require("./patient.service");
var router_1 = require("@angular/router");
var user_service_1 = require("../shared/user/user.service");
var dialogs = require("ui/dialogs");
var PatientsComponent = (function () {
    function PatientsComponent(patientService, router, userService) {
        this.patientService = patientService;
        this.router = router;
        this.userService = userService;
        this.listLoaded = false;
        this.isLoading = false;
        this.hasEvaluationsToDo = true; //condition to enable action bar icon evaluations
        this.isItemVisible = false;
        this.firstTime = true;
    }
    PatientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        console.log(this.firstTime);
        if (this.firstTime) {
            this.firstTime = false;
            console.log('Pedido à Cloud');
            this.patientService.getPatients()
                .subscribe(function (result) { return _this.onGetDataSuccess(result); }, function (error) { return _this.onGetDataError(error); });
            this.isLoading = false;
            this.listLoaded = true;
        }
        else {
            console.log('Pedido à BD');
            this.patients = this.patientService.getPatients_BD();
        }
        //verify and notificate if has evaluations to do
        if (this.hasEvaluationsToDo) {
            dialogs.alert({
                title: "Aviso - Avaliações ",
                message: "Existem avaliações pendentes. Por favor aceda às avaliações no canto superior direito.",
                okButtonText: "OK"
            });
        }
    };
    PatientsComponent.prototype.onGetDataSuccess = function (result) {
        this.patients = result;
        this.patientService.setPatients(this.patients);
        // verificar se a lista tem so um paciente para poder ir logo para a  lista de necessidades  
        if (this.patients.length == 1 && this.firstTime == true) {
            this.firstTime = false;
        }
    };
    PatientsComponent.prototype.onGetDataError = function (error) {
        console.log(error.json());
    };
    PatientsComponent.prototype.goToAvaliationsList = function () {
        //TODO
    };
    return PatientsComponent;
}());
PatientsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        providers: [],
        styleUrls: ["./patient-common.css"],
        templateUrl: "./patients.component.html",
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService, router_1.Router, user_service_1.UserService])
], PatientsComponent);
exports.PatientsComponent = PatientsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFHbEQscURBQW1EO0FBR25ELDBDQUF5QztBQUd6Qyw0REFBMEQ7QUFFMUQsb0NBQXVDO0FBU3ZDLElBQWEsaUJBQWlCO0lBYTFCLDJCQUFvQixjQUE4QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUF4RixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFYNUcsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHVCQUFrQixHQUFFLElBQUksQ0FBQyxDQUFDLGlEQUFpRDtRQU1wRSxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixjQUFTLEdBQVksSUFBSSxDQUFDO0lBSWpDLENBQUM7SUFDRCxvQ0FBUSxHQUFSO1FBQUEsaUJBMkJDO1FBMUJHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRTtpQkFDaEMsU0FBUyxDQUNWLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUE3QixDQUE2QixFQUN6QyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQTFCLENBQTBCLENBQ3BDLENBQUM7WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUUzQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6RCxDQUFDO1FBRUQsZ0RBQWdEO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixLQUFLLEVBQUUscUJBQXFCO2dCQUM1QixPQUFPLEVBQUUsd0ZBQXdGO2dCQUNqRyxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUE7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQUNPLDRDQUFnQixHQUF4QixVQUF5QixNQUFNO1FBRTNCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBRXZCLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUvQyw2RkFBNkY7UUFDN0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUczQixDQUFDO0lBRUwsQ0FBQztJQUNPLDBDQUFjLEdBQXRCLFVBQXVCLEtBQXFCO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELCtDQUFtQixHQUFuQjtRQUNJLE1BQU07SUFDVixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBakVELElBaUVDO0FBakVZLGlCQUFpQjtJQVA3QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFNBQVMsRUFBRSxFQUFFO1FBQ2IsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7UUFDbkMsV0FBVyxFQUFFLDJCQUEyQjtLQUMzQyxDQUFDO3FDQWNzQyxnQ0FBYyxFQUFrQixlQUFNLEVBQXVCLDBCQUFXO0dBYm5HLGlCQUFpQixDQWlFN0I7QUFqRVksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IENyZWF0ZVZpZXdFdmVudERhdGEgfSBmcm9tIFwidWkvcGxhY2Vob2xkZXJcIjtcclxuXHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBwcm92aWRlcnM6IFtdLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BhdGllbnQtY29tbW9uLmNzc1wiXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGF0aWVudHMuY29tcG9uZW50Lmh0bWxcIiwgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYXRpZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwYXRpZW50czogUGF0aWVudFtdO1xyXG4gICAgbGlzdExvYWRlZCA9IGZhbHNlO1xyXG4gICAgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG89IHRydWU7IC8vY29uZGl0aW9uIHRvIGVuYWJsZSBhY3Rpb24gYmFyIGljb24gZXZhbHVhdGlvbnNcclxuICAgXHJcbiAgICBwdWJsaWMgZmlsZVRleHRDb250ZW50OiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIHN1Y2Nlc3NNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgd3JpdHRlbkNvbnRlbnQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc0l0ZW1WaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZmlyc3RUaW1lOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHsgXHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpcnN0VGltZSk7XHJcbiAgICAgICAgaWYodGhpcy5maXJzdFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maXJzdFRpbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BlZGlkbyDDoCBDbG91ZCcpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnRzKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BlZGlkbyDDoCBCRCcpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRzID0gdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50c19CRCgpOyAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy92ZXJpZnkgYW5kIG5vdGlmaWNhdGUgaWYgaGFzIGV2YWx1YXRpb25zIHRvIGRvXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvKSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQXZpc28gLSBBdmFsaWHDp8O1ZXMgXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkV4aXN0ZW0gYXZhbGlhw6fDtWVzIHBlbmRlbnRlcy4gUG9yIGZhdm9yIGFjZWRhIMOgcyBhdmFsaWHDp8O1ZXMgbm8gY2FudG8gc3VwZXJpb3IgZGlyZWl0by5cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlc3VsdCkge1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHJlc3VsdDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldFBhdGllbnRzKHRoaXMucGF0aWVudHMpO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8gdmVyaWZpY2FyIHNlIGEgbGlzdGEgdGVtIHNvIHVtIHBhY2llbnRlIHBhcmEgcG9kZXIgaXIgbG9nbyBwYXJhIGEgIGxpc3RhIGRlIG5lY2Vzc2lkYWRlcyAgXHJcbiAgICAgICAgaWYgKHRoaXMucGF0aWVudHMubGVuZ3RoID09IDEgJiYgdGhpcy5maXJzdFRpbWU9PXRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maXJzdFRpbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnBhdGllbnRzWzBdLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnQvXCIgKyB0aGlzLnBhdGllbnRzWzBdLmlkICsgXCIvbmVlZHNcIl0pO1xyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yLmpzb24oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29Ub0F2YWxpYXRpb25zTGlzdCgpe1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG59XHJcbiJdfQ==