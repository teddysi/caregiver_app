"use strict";
var core_1 = require("@angular/core");
var patient_service_1 = require("./patient.service");
var router_1 = require("@angular/router");
var user_service_1 = require("../shared/user/user.service");
var connector_service_1 = require("../shared/connector/connector.service");
var dialogs = require("ui/dialogs");
var PatientsComponent = (function () {
    function PatientsComponent(patientService, router, userService, connectorService) {
        this.patientService = patientService;
        this.router = router;
        this.userService = userService;
        this.connectorService = connectorService;
        this.listLoaded = false;
        this.isLoading = false;
        this.hasEvaluationsToDo = false; //condition to enable action bar icon evaluations
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
        this.patientService.hasEvaluationsToDo() ? this.hasEvaluationsToDo = true : this.hasEvaluationsToDo = false;
        //verify and notificate if has evaluations to do
        /*
        this.patientService.hasEvaluationsToDo = true;
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo;
        if (this.hasEvaluationsToDo) {
            dialogs.alert({
                title: "Aviso - Avaliações ",
                message: "Existem avaliações pendentes. Por favor aceda às avaliações no canto superior direito.",
                okButtonText: "OK"
            })
        }
        */
    };
    /**
     * Function to load data when http get data success
     *
     * @private
     * @param {any} result
     *
     * @memberof PatientsComponent
     */
    PatientsComponent.prototype.onGetDataSuccess = function (result) {
        this.patients = result.patients; //teddy
        this.caregiverQuestionnaires = result.quizs; //teddy
        this.loadAllQuestionnairesFromResponse();
        //console.log("# COMPONENTE PATIENTES [result.quizs]" + JSON.stringify(result.quizs, null, 4));
        //console.log("# COMPONENTE PATIENTES [caregiverQuestionnaires ]" + JSON.stringify(this.caregiverQuestionnaires, null, 4));
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
    /**
     * Function to load data when http get data Error
     *
     * @private
     * @param {(Response | any)} error
     *
     * @memberof PatientsComponent
     */
    PatientsComponent.prototype.onGetDataError = function (error) {
        console.log(error.json());
    };
    /**
     * Function to load questionnaires from server response to var caregiverQuestionnaires
     *
     *
     * @memberof PatientsComponent
     */
    PatientsComponent.prototype.loadAllQuestionnairesFromResponse = function () {
        var _this = this;
        //size of inicial array
        var sizeInitial = this.caregiverQuestionnaires.length;
        //set ref
        this.patients.forEach(function (element_p) {
            if (element_p.quizs) {
                element_p.quizs.forEach(function (element_q) {
                    _this.caregiverQuestionnaires.push(element_q);
                    element_q["ref_questionnaire"] = (sizeInitial) + "";
                    sizeInitial++;
                });
            }
            element_p.needs.forEach(function (element_need) {
                element_need.materials.forEach(function (element_mat) {
                    element_mat.quizs.forEach(function (element_qu) {
                        _this.caregiverQuestionnaires.push(element_qu);
                        element_qu["ref_questionnaire"] = (sizeInitial) + "";
                        sizeInitial++;
                    });
                });
            });
        });
        var index = 0;
        this.caregiverQuestionnaires.forEach(function (element) {
            element.ref_questionnaire = index + "";
            index++;
            //questionnaire not have response yet
            element.done = false;
        });
    };
    /**
     * Function to navigate to pacient/materials
     *
     * @param {any} patient_id
     *
     * @memberof PatientsComponent
     */
    PatientsComponent.prototype.goToMaterialsOfPatient = function (patient_id) {
        if (this.connectorService.isConnected()) {
            this.router.navigate(['/patient', patient_id, 'materials']);
        }
        else {
            dialogs.alert({
                title: "Aviso - Pacientes ",
                message: "Encontra-se sem acesso à internet. Não é possível visualizar os materiais disponíveis para este paciente.",
                okButtonText: "OK"
            });
        }
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
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.Router,
        user_service_1.UserService,
        connector_service_1.ConnectorService])
], PatientsComponent);
exports.PatientsComponent = PatientsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFHbEQscURBQW1EO0FBSW5ELDBDQUF5QztBQUd6Qyw0REFBMEQ7QUFFMUQsMkVBQXlFO0FBQ3pFLG9DQUF1QztBQVN2QyxJQUFhLGlCQUFpQjtJQWMxQiwyQkFDWSxjQUE4QixFQUM5QixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDO1FBSGxDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWQ5QyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDLENBQUMsaURBQWlEO1FBTXRFLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBU3RDLENBQUM7SUFDRCxvQ0FBUSxHQUFSO1FBQUEsaUJBK0JDO1FBN0JHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FDdkMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQTdCLENBQTZCLEVBQ3pDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNB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QUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUN4QyxPQUFPLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUN2QyxLQUFLLEVBQUUsQ0FBQztZQUNSLHFDQUFxQztZQUNyQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRDs7Ozs7O09BTUc7SUFDSCxrREFBc0IsR0FBdEIsVUFBdUIsVUFBVTtRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLG9CQUFvQjtnQkFDM0IsT0FBTyxFQUFFLDJHQUEyRztnQkFDcEgsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFBO1FBQ04sQ0FBQztJQUNMLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUE5SkQsSUE4SkM7QUE5SlksaUJBQWlCO0lBUDdCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsU0FBUyxFQUFFLEVBQUU7UUFDYixTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztRQUNuQyxXQUFXLEVBQUUsMkJBQTJCO0tBQzNDLENBQUM7cUNBZ0I4QixnQ0FBYztRQUN0QixlQUFNO1FBQ0QsMEJBQVc7UUFDTixvQ0FBZ0I7R0FsQnJDLGlCQUFpQixDQThKN0I7QUE5SlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XHJcbmltcG9ydCB7IFF1ZXN0aW9ubmFpcmUgfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvbm5haXJlXCI7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IENyZWF0ZVZpZXdFdmVudERhdGEgfSBmcm9tIFwidWkvcGxhY2Vob2xkZXJcIjtcclxuXHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgcHJvdmlkZXJzOiBbXSxcclxuICAgIHN0eWxlVXJsczogW1wiLi9wYXRpZW50LWNvbW1vbi5jc3NcIl0sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhdGllbnRzLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYXRpZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwYXRpZW50czogUGF0aWVudFtdO1xyXG4gICAgY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXM6IFF1ZXN0aW9ubmFpcmVbXTtcclxuXHJcbiAgICBsaXN0TG9hZGVkID0gZmFsc2U7XHJcbiAgICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgIGhhc0V2YWx1YXRpb25zVG9EbyA9IGZhbHNlOyAvL2NvbmRpdGlvbiB0byBlbmFibGUgYWN0aW9uIGJhciBpY29uIGV2YWx1YXRpb25zXHJcblxyXG4gICAgcHVibGljIGZpbGVUZXh0Q29udGVudDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBzdWNjZXNzTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHdyaXR0ZW5Db250ZW50OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXNJdGVtVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGF0aWVudFNlcnZpY2UuaXNDb25uZWN0ZWQoKSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBhdGllbnRTZXJ2aWNlLmlzRmlyc3RSZXF1ZXN0KCkgJiYgdGhpcy5wYXRpZW50U2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZ2V0UGF0aWVudHMoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KSxcclxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkEgbW9zdHJhciBkYSBCRFwiKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50cyA9IHRoaXMucGF0aWVudFNlcnZpY2UuZ2V0UGF0aWVudHNfQkQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKSA/IHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdHJ1ZSA6IHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vdmVyaWZ5IGFuZCBub3RpZmljYXRlIGlmIGhhcyBldmFsdWF0aW9ucyB0byBkb1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG87XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvKSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQXZpc28gLSBBdmFsaWHDp8O1ZXMgXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkV4aXN0ZW0gYXZhbGlhw6fDtWVzIHBlbmRlbnRlcy4gUG9yIGZhdm9yIGFjZWRhIMOgcyBhdmFsaWHDp8O1ZXMgbm8gY2FudG8gc3VwZXJpb3IgZGlyZWl0by5cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gbG9hZCBkYXRhIHdoZW4gaHR0cCBnZXQgZGF0YSBzdWNjZXNzXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzdWx0IFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlc3VsdCkge1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gcmVzdWx0LnBhdGllbnRzOyAvL3RlZGR5XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyA9IHJlc3VsdC5xdWl6czsgLy90ZWRkeVxyXG4gICAgICAgIHRoaXMubG9hZEFsbFF1ZXN0aW9ubmFpcmVzRnJvbVJlc3BvbnNlKCk7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIjIENPTVBPTkVOVEUgUEFUSUVOVEVTIFtyZXN1bHQucXVpenNdXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQucXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMgXVwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcywgbnVsbCwgNCkpO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldFBhdGllbnRzKHRoaXMucGF0aWVudHMpO1xyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2Uuc2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXModGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyk7XHJcbiAgICAgICAgLy8gdGhpcy5wYXRpZW50U2VydmljZS5zZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyh0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmUpOyBUT0RPXHJcblxyXG4gICAgICAgIC8vIHZlcmlmaWNhciBzZSBhIGxpc3RhIHRlbSBzbyB1bSBwYWNpZW50ZSBwYXJhIHBvZGVyIGlyIGxvZ28gcGFyYSBhICBsaXN0YSBkZSBuZWNlc3NpZGFkZXMgIFxyXG4gICAgICAgIC8qaWYgKHRoaXMucGF0aWVudHMubGVuZ3RoID09IDEgJiYgdGhpcy5maXJzdFRpbWU9PXRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maXJzdFRpbWUgPSBmYWxzZTsqL1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wYXRpZW50c1swXSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnQvXCIgKyB0aGlzLnBhdGllbnRzWzBdLmlkICsgXCIvbmVlZHNcIl0pO1xyXG4gICAgICAgIC8vfSAgIFxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBsb2FkIGRhdGEgd2hlbiBodHRwIGdldCBkYXRhIEVycm9yXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyhSZXNwb25zZSB8IGFueSl9IGVycm9yIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5qc29uKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBsb2FkIHF1ZXN0aW9ubmFpcmVzIGZyb20gc2VydmVyIHJlc3BvbnNlIHRvIHZhciBjYXJlZ2l2ZXJRdWVzdGlvbm5haXJlc1xyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBsb2FkQWxsUXVlc3Rpb25uYWlyZXNGcm9tUmVzcG9uc2UoKSB7XHJcbiAgICAgICAgLy9zaXplIG9mIGluaWNpYWwgYXJyYXlcclxuICAgICAgICBsZXQgc2l6ZUluaXRpYWwgPSB0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzLmxlbmd0aDtcclxuICAgICAgICAvL3NldCByZWZcclxuICAgICAgICB0aGlzLnBhdGllbnRzLmZvckVhY2goZWxlbWVudF9wID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRfcC5xdWl6cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudF9wLnF1aXpzLmZvckVhY2goZWxlbWVudF9xID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzLnB1c2goZWxlbWVudF9xKVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcVtcInJlZl9xdWVzdGlvbm5haXJlXCJdID0gKHNpemVJbml0aWFsKSArIFwiXCJcclxuICAgICAgICAgICAgICAgICAgICBzaXplSW5pdGlhbCsrO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbWVudF9wLm5lZWRzLmZvckVhY2goZWxlbWVudF9uZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRfbmVlZC5tYXRlcmlhbHMuZm9yRWFjaChlbGVtZW50X21hdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9tYXQucXVpenMuZm9yRWFjaChlbGVtZW50X3F1ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5wdXNoKGVsZW1lbnRfcXUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcXVbXCJyZWZfcXVlc3Rpb25uYWlyZVwiXSA9IChzaXplSW5pdGlhbCkgKyBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVJbml0aWFsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlZl9xdWVzdGlvbm5haXJlID0gaW5kZXggKyBcIlwiO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAvL3F1ZXN0aW9ubmFpcmUgbm90IGhhdmUgcmVzcG9uc2UgeWV0XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIG5hdmlnYXRlIHRvIHBhY2llbnQvbWF0ZXJpYWxzXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXRpZW50X2lkIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZ29Ub01hdGVyaWFsc09mUGF0aWVudChwYXRpZW50X2lkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3BhdGllbnQnLCBwYXRpZW50X2lkLCAnbWF0ZXJpYWxzJ10pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkF2aXNvIC0gUGFjaWVudGVzIFwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFbmNvbnRyYS1zZSBzZW0gYWNlc3NvIMOgIGludGVybmV0LiBOw6NvIMOpIHBvc3PDrXZlbCB2aXN1YWxpemFyIG9zIG1hdGVyaWFpcyBkaXNwb27DrXZlaXMgcGFyYSBlc3RlIHBhY2llbnRlLlwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19