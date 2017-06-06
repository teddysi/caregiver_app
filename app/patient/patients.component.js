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
        //this.patientService.hasEvaluationsToDo() ? this.hasEvaluationsToDo = true : this.hasEvaluationsToDo = false;
        //verify and notificate if has evaluations to do
        //this.patientService.hasEvaluationsToDo = true;
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
        if (this.hasEvaluationsToDo) {
            dialogs.alert({
                title: "Aviso - Avaliações ",
                message: "Existem avaliações pendentes. Por favor aceda às avaliações no canto superior direito.",
                okButtonText: "OK"
            });
        }
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
        console.log("# COMPONENTE PATIENTES [result]" + JSON.stringify(result, null, 4));
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
        //console.log("# COMPONENTE PATIENTES [result]" + JSON.stringify(error, null, 4));
        if (error.status == '401') {
            dialogs.alert({
                title: "Aviso",
                message: "O acesso aos pacientes não foi autorizado. Por favor reinicie a aplicação.",
                okButtonText: "OK"
            });
            this.patientService.userOutdated();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFHbEQscURBQW1EO0FBSW5ELDBDQUF5QztBQUd6Qyw0REFBMEQ7QUFFMUQsMkVBQXlFO0FBQ3pFLG9DQUF1QztBQVN2QyxJQUFhLGlCQUFpQjtJQWMxQiwyQkFDWSxjQUE4QixFQUM5QixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDO1FBSGxDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWQ5QyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDLENBQUMsaURBQWlEO1FBTXRFLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBU3RDLENBQUM7SUFDRCxvQ0FBUSxHQUFSO1FBQUEsaUJBK0JDO1FBN0JHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FDdkMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQTdCLENBQTZCLEVBQ3pDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBMUIsQ0FBMEIsQ0FDeEMsQ0FBQztRQUNOLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekQsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCLDhHQUE4RztRQUU5RyxnREFBZ0Q7UUFFaEQsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDbkUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNWLEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCLE9BQU8sRUFBRSx3RkFBd0Y7Z0JBQ2pHLFlBQVksRUFBRSxJQUFJO2FBQ3JCLENBQUMsQ0FBQTtRQUNOLENBQUM7SUFFTCxDQUFDO0lBR0Q7Ozs7Ozs7T0FPRztJQUNLLDRDQUFnQixHQUF4QixVQUF5QixNQUFNO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTztRQUN4QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU87UUFDcEQsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7UUFFekMsK0ZBQStGO1FBQy9GLDJIQUEySDtRQUUzSCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM3RSxvRkFBb0Y7UUFFcEYsNkZBQTZGO1FBQzdGO3FDQUM2QjtRQUM3Qix5REFBeUQ7UUFDekQsdUVBQXVFO1FBQ3ZFLE1BQU07SUFFVixDQUFDO0lBR0Q7Ozs7Ozs7T0FPRztJQUNLLDBDQUFjLEdBQXRCLFVBQXVCLEtBQXFCO1FBQ3hDLGtGQUFrRjtRQUNsRixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDUCxLQUFLLEVBQUUsT0FBTztnQkFDZCxPQUFPLEVBQUUsNEVBQTRFO2dCQUNyRixZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUM7SUFDTCxDQUFDO0lBSUQ7Ozs7O09BS0c7SUFDSCw2REFBaUMsR0FBakM7UUFBQSxpQkE4QkM7UUE3QkcsdUJBQXVCO1FBQ3ZCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUM7UUFDdEQsU0FBUztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztZQUMzQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTO29CQUM3QixLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO29CQUM1QyxTQUFTLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtvQkFDbkQsV0FBVyxFQUFFLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUNELFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsWUFBWTtnQkFDaEMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXO29CQUN0QyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7d0JBQ2hDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7d0JBQzdDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFBO3dCQUNwRCxXQUFXLEVBQUUsQ0FBQztvQkFDbEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDeEMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDdkMsS0FBSyxFQUFFLENBQUM7WUFDUixxQ0FBcUM7WUFDckMsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0Q7Ozs7OztPQU1HO0lBQ0gsa0RBQXNCLEdBQXRCLFVBQXVCLFVBQVU7UUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNWLEtBQUssRUFBRSxvQkFBb0I7Z0JBQzNCLE9BQU8sRUFBRSwyR0FBMkc7Z0JBQ3BILFlBQVksRUFBRSxJQUFJO2FBQ3JCLENBQUMsQ0FBQTtRQUNOLENBQUM7SUFDTCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBdEtELElBc0tDO0FBdEtZLGlCQUFpQjtJQVA3QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFNBQVMsRUFBRSxFQUFFO1FBQ2IsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7UUFDbkMsV0FBVyxFQUFFLDJCQUEyQjtLQUMzQyxDQUFDO3FDQWdCOEIsZ0NBQWM7UUFDdEIsZUFBTTtRQUNELDBCQUFXO1FBQ04sb0NBQWdCO0dBbEJyQyxpQkFBaUIsQ0FzSzdCO0FBdEtZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuL3BhdGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4vcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBRdWVzdGlvbm5haXJlIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25uYWlyZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDcmVhdGVWaWV3RXZlbnREYXRhIH0gZnJvbSBcInVpL3BsYWNlaG9sZGVyXCI7XHJcblxyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHByb3ZpZGVyczogW10sXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vcGF0aWVudC1jb21tb24uY3NzXCJdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYXRpZW50cy5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIGNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzOiBRdWVzdGlvbm5haXJlW107XHJcblxyXG4gICAgbGlzdExvYWRlZCA9IGZhbHNlO1xyXG4gICAgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG8gPSBmYWxzZTsgLy9jb25kaXRpb24gdG8gZW5hYmxlIGFjdGlvbiBiYXIgaWNvbiBldmFsdWF0aW9uc1xyXG5cclxuICAgIHB1YmxpYyBmaWxlVGV4dENvbnRlbnQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgc3VjY2Vzc01lc3NhZ2U6IHN0cmluZztcclxuICAgIHB1YmxpYyB3cml0dGVuQ29udGVudDogc3RyaW5nO1xyXG4gICAgcHVibGljIGlzSXRlbVZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhdGllbnRTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpO1xyXG4gICAgICAgIGlmICghdGhpcy5wYXRpZW50U2VydmljZS5pc0ZpcnN0UmVxdWVzdCgpICYmIHRoaXMucGF0aWVudFNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnRzKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIG1vc3RyYXIgZGEgQkRcIik7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnRzX0JEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKSA/IHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdHJ1ZSA6IHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vdmVyaWZ5IGFuZCBub3RpZmljYXRlIGlmIGhhcyBldmFsdWF0aW9ucyB0byBkb1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuICAgICAgICBpZiAodGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8pIHtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJBdmlzbyAtIEF2YWxpYcOnw7VlcyBcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRXhpc3RlbSBhdmFsaWHDp8O1ZXMgcGVuZGVudGVzLiBQb3IgZmF2b3IgYWNlZGEgw6BzIGF2YWxpYcOnw7VlcyBubyBjYW50byBzdXBlcmlvciBkaXJlaXRvLlwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gbG9hZCBkYXRhIHdoZW4gaHR0cCBnZXQgZGF0YSBzdWNjZXNzXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzdWx0IFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlc3VsdCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbcmVzdWx0XVwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCA0KSk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHJlc3VsdC5wYXRpZW50czsgLy90ZWRkeVxyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMgPSByZXN1bHQucXVpenM7IC8vdGVkZHlcclxuICAgICAgICB0aGlzLmxvYWRBbGxRdWVzdGlvbm5haXJlc0Zyb21SZXNwb25zZSgpO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbcmVzdWx0LnF1aXpzXVwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW2NhcmVnaXZlclF1ZXN0aW9ubmFpcmVzIF1cIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMsIG51bGwsIDQpKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5zZXRQYXRpZW50cyh0aGlzLnBhdGllbnRzKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMpO1xyXG4gICAgICAgIC8vIHRoaXMucGF0aWVudFNlcnZpY2Uuc2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXModGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlKTsgVE9ET1xyXG5cclxuICAgICAgICAvLyB2ZXJpZmljYXIgc2UgYSBsaXN0YSB0ZW0gc28gdW0gcGFjaWVudGUgcGFyYSBwb2RlciBpciBsb2dvIHBhcmEgYSAgbGlzdGEgZGUgbmVjZXNzaWRhZGVzICBcclxuICAgICAgICAvKmlmICh0aGlzLnBhdGllbnRzLmxlbmd0aCA9PSAxICYmIHRoaXMuZmlyc3RUaW1lPT10cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2U7Ki9cclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMucGF0aWVudHNbMF0sIG51bGwsIDQpKTtcclxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50L1wiICsgdGhpcy5wYXRpZW50c1swXS5pZCArIFwiL25lZWRzXCJdKTtcclxuICAgICAgICAvL30gICBcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gbG9hZCBkYXRhIHdoZW4gaHR0cCBnZXQgZGF0YSBFcnJvclxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsoUmVzcG9uc2UgfCBhbnkpfSBlcnJvciBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFBhdGllbnRzQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3Jlc3VsdF1cIiArIEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCA0KSk7XHJcbiAgICAgICAgaWYoZXJyb3Iuc3RhdHVzID09ICc0MDEnKSB7XHJcbiAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQXZpc29cIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTyBhY2Vzc28gYW9zIHBhY2llbnRlcyBuw6NvIGZvaSBhdXRvcml6YWRvLiBQb3IgZmF2b3IgcmVpbmljaWUgYSBhcGxpY2HDp8Ojby5cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UudXNlck91dGRhdGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBsb2FkIHF1ZXN0aW9ubmFpcmVzIGZyb20gc2VydmVyIHJlc3BvbnNlIHRvIHZhciBjYXJlZ2l2ZXJRdWVzdGlvbm5haXJlc1xyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBsb2FkQWxsUXVlc3Rpb25uYWlyZXNGcm9tUmVzcG9uc2UoKSB7XHJcbiAgICAgICAgLy9zaXplIG9mIGluaWNpYWwgYXJyYXlcclxuICAgICAgICBsZXQgc2l6ZUluaXRpYWwgPSB0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzLmxlbmd0aDtcclxuICAgICAgICAvL3NldCByZWZcclxuICAgICAgICB0aGlzLnBhdGllbnRzLmZvckVhY2goZWxlbWVudF9wID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRfcC5xdWl6cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudF9wLnF1aXpzLmZvckVhY2goZWxlbWVudF9xID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzLnB1c2goZWxlbWVudF9xKVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcVtcInJlZl9xdWVzdGlvbm5haXJlXCJdID0gKHNpemVJbml0aWFsKSArIFwiXCJcclxuICAgICAgICAgICAgICAgICAgICBzaXplSW5pdGlhbCsrO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbWVudF9wLm5lZWRzLmZvckVhY2goZWxlbWVudF9uZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRfbmVlZC5tYXRlcmlhbHMuZm9yRWFjaChlbGVtZW50X21hdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9tYXQucXVpenMuZm9yRWFjaChlbGVtZW50X3F1ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5wdXNoKGVsZW1lbnRfcXUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcXVbXCJyZWZfcXVlc3Rpb25uYWlyZVwiXSA9IChzaXplSW5pdGlhbCkgKyBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVJbml0aWFsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlZl9xdWVzdGlvbm5haXJlID0gaW5kZXggKyBcIlwiO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAvL3F1ZXN0aW9ubmFpcmUgbm90IGhhdmUgcmVzcG9uc2UgeWV0XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIG5hdmlnYXRlIHRvIHBhY2llbnQvbWF0ZXJpYWxzXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXRpZW50X2lkIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZ29Ub01hdGVyaWFsc09mUGF0aWVudChwYXRpZW50X2lkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3BhdGllbnQnLCBwYXRpZW50X2lkLCAnbWF0ZXJpYWxzJ10pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkF2aXNvIC0gUGFjaWVudGVzIFwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFbmNvbnRyYS1zZSBzZW0gYWNlc3NvIMOgIGludGVybmV0LiBOw6NvIMOpIHBvc3PDrXZlbCB2aXN1YWxpemFyIG9zIG1hdGVyaWFpcyBkaXNwb27DrXZlaXMgcGFyYSBlc3RlIHBhY2llbnRlLlwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19