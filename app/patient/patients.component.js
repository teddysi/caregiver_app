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
    }
    PatientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        console.log(this.patientService.isConnected());
        if (!this.patientService.isFirstRequest() && this.patientService.isConnected()) {
            this.patientService.getPatients().subscribe(function (result) { return _this.onGetDataSuccess(result); }, function (error) { return _this.onGetDataError(error); });
        }
        else {
            console.log("A mostrar da BD");
            this.patients = this.patientService.getPatients_BD();
        }
        this.isLoading = false;
        this.listLoaded = true;
        //verify and notificate if has evaluations to do
        this.patientService.hasEvaluationsToDo = true;
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo;
        if (this.hasEvaluationsToDo) {
            dialogs.alert({
                title: "Aviso - Avaliações ",
                message: "Existem avaliações pendentes. Por favor aceda às avaliações no canto superior direito.",
                okButtonText: "OK"
            });
        }
    };
    PatientsComponent.prototype.onGetDataSuccess = function (result) {
        this.patients = result.patients; //teddy
        this.caregiverQuestionnaires = result.quizs; //teddy
        this.loadAllQuestionnairesFromResponse();
        console.log("# COMPONENTE PATIENTES [result.quizs]" + JSON.stringify(result.quizs, null, 4));
        console.log("# COMPONENTE PATIENTES [caregiverQuestionnaires ]" + JSON.stringify(this.caregiverQuestionnaires, null, 4));
        this.patientService.setPatients(this.patients);
        this.patientService.setCaregiverQuestionnaires(this.caregiverQuestionnaires);
        // this.patientService.setCaregiverQuestionnaires(this.caregiverQuestionnaire); TODO
        // verificar se a lista tem so um paciente para poder ir logo para a  lista de necessidades  
        /*if (this.patients.length == 1 && this.firstTime==true) {
            this.firstTime = false;*/
        //console.log(JSON.stringify(this.patients[0], null, 4));
        //this.router.navigate(["/patient/" + this.patients[0].id + "/needs"]);
        //}   
    };
    PatientsComponent.prototype.onGetDataError = function (error) {
        console.log(error.json());
    };
    PatientsComponent.prototype.loadAllQuestionnairesFromResponse = function () {
        var _this = this;
        //set ref
        this.patients.forEach(function (element_p) {
            if (element_p.quizs) {
                element_p.quizs.forEach(function (element_q) {
                    _this.caregiverQuestionnaires.push(element_q);
                });
            }
            element_p.needs.forEach(function (element_need) {
                element_need.materials.forEach(function (element_mat) {
                    element_mat.quizs.forEach(function (element_qu) {
                        _this.caregiverQuestionnaires.push(element_qu);
                    });
                });
            });
        });
        var index = 0;
        this.caregiverQuestionnaires.forEach(function (element) {
            element.ref_questionnaire = index + "";
            index++;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFHbEQscURBQW1EO0FBSW5ELDBDQUF5QztBQUd6Qyw0REFBMEQ7QUFFMUQsb0NBQXVDO0FBU3ZDLElBQWEsaUJBQWlCO0lBYzFCLDJCQUFvQixjQUE4QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUF4RixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWNUcsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHVCQUFrQixHQUFHLElBQUksQ0FBQyxDQUFDLGlEQUFpRDtRQU1yRSxrQkFBYSxHQUFZLEtBQUssQ0FBQztJQUl0QyxDQUFDO0lBQ0Qsb0NBQVEsR0FBUjtRQUFBLGlCQTZCQztRQTNCRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQ3ZDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUE3QixDQUE2QixFQUN6QyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQTFCLENBQTBCLENBQ3hDLENBQUM7UUFDTixDQUFDO1FBQUMsSUFB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QixDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDeEMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDdkMsS0FBSyxFQUFFLENBQUM7UUFFWixDQUFDLENBQUMsQ0FBQztJQUdQLENBQUM7SUFFTCx3QkFBQztBQUFELENBQUMsQUFuR0QsSUFtR0M7QUFuR1ksaUJBQWlCO0lBUDdCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsU0FBUyxFQUFFLEVBQUU7UUFDYixTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztRQUNuQyxXQUFXLEVBQUUsMkJBQTJCO0tBQzNDLENBQUM7cUNBZXNDLGdDQUFjLEVBQWtCLGVBQU0sRUFBdUIsMEJBQVc7R0FkbkcsaUJBQWlCLENBbUc3QjtBQW5HWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuL3BhdGllbnRcIjtcclxuaW1wb3J0IHsgUXVlc3Rpb25uYWlyZSB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9ubmFpcmVcIjtcclxuXHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ3JlYXRlVmlld0V2ZW50RGF0YSB9IGZyb20gXCJ1aS9wbGFjZWhvbGRlclwiO1xyXG5cclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHByb3ZpZGVyczogW10sXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vcGF0aWVudC1jb21tb24uY3NzXCJdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYXRpZW50cy5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIGNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzOiBRdWVzdGlvbm5haXJlW107XHJcblxyXG4gICAgbGlzdExvYWRlZCA9IGZhbHNlO1xyXG4gICAgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG8gPSB0cnVlOyAvL2NvbmRpdGlvbiB0byBlbmFibGUgYWN0aW9uIGJhciBpY29uIGV2YWx1YXRpb25zXHJcblxyXG4gICAgcHVibGljIGZpbGVUZXh0Q29udGVudDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBzdWNjZXNzTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHdyaXR0ZW5Db250ZW50OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXNJdGVtVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wYXRpZW50U2VydmljZS5pc0Nvbm5lY3RlZCgpKTtcclxuICAgICAgICBpZiAoIXRoaXMucGF0aWVudFNlcnZpY2UuaXNGaXJzdFJlcXVlc3QoKSAmJiB0aGlzLnBhdGllbnRTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50cygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQSBtb3N0cmFyIGRhIEJEXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRzID0gdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50c19CRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgLy92ZXJpZnkgYW5kIG5vdGlmaWNhdGUgaWYgaGFzIGV2YWx1YXRpb25zIHRvIGRvXHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG87XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvKSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQXZpc28gLSBBdmFsaWHDp8O1ZXMgXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkV4aXN0ZW0gYXZhbGlhw6fDtWVzIHBlbmRlbnRlcy4gUG9yIGZhdm9yIGFjZWRhIMOgcyBhdmFsaWHDp8O1ZXMgbm8gY2FudG8gc3VwZXJpb3IgZGlyZWl0by5cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25HZXREYXRhU3VjY2VzcyhyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHJlc3VsdC5wYXRpZW50czsgLy90ZWRkeVxyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMgPSByZXN1bHQucXVpenM7IC8vdGVkZHlcclxuICAgICAgICB0aGlzLmxvYWRBbGxRdWVzdGlvbm5haXJlc0Zyb21SZXNwb25zZSgpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3Jlc3VsdC5xdWl6c11cIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC5xdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMgXVwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcywgbnVsbCwgNCkpO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldFBhdGllbnRzKHRoaXMucGF0aWVudHMpO1xyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2Uuc2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXModGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyk7XHJcbiAgICAgICAgLy8gdGhpcy5wYXRpZW50U2VydmljZS5zZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyh0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmUpOyBUT0RPXHJcblxyXG4gICAgICAgIC8vIHZlcmlmaWNhciBzZSBhIGxpc3RhIHRlbSBzbyB1bSBwYWNpZW50ZSBwYXJhIHBvZGVyIGlyIGxvZ28gcGFyYSBhICBsaXN0YSBkZSBuZWNlc3NpZGFkZXMgIFxyXG4gICAgICAgIC8qaWYgKHRoaXMucGF0aWVudHMubGVuZ3RoID09IDEgJiYgdGhpcy5maXJzdFRpbWU9PXRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maXJzdFRpbWUgPSBmYWxzZTsqL1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wYXRpZW50c1swXSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnQvXCIgKyB0aGlzLnBhdGllbnRzWzBdLmlkICsgXCIvbmVlZHNcIl0pO1xyXG4gICAgICAgIC8vfSAgIFxyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IuanNvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkQWxsUXVlc3Rpb25uYWlyZXNGcm9tUmVzcG9uc2UoKSB7XHJcbiAgICAgICAgLy9zZXQgcmVmXHJcbiAgICAgICAgdGhpcy5wYXRpZW50cy5mb3JFYWNoKGVsZW1lbnRfcCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50X3AucXVpenMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRfcC5xdWl6cy5mb3JFYWNoKGVsZW1lbnRfcSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5wdXNoKGVsZW1lbnRfcSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsZW1lbnRfcC5uZWVkcy5mb3JFYWNoKGVsZW1lbnRfbmVlZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50X25lZWQubWF0ZXJpYWxzLmZvckVhY2goZWxlbWVudF9tYXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfbWF0LnF1aXpzLmZvckVhY2goZWxlbWVudF9xdSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMucHVzaChlbGVtZW50X3F1KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZWZfcXVlc3Rpb25uYWlyZSA9IGluZGV4ICsgXCJcIjtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19