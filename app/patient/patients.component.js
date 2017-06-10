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
        //this.hasEvaluationsToDo = true;
        if (this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo()) {
            this.patientService.displayNotification('pending evaluations');
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
        console.log("# COMPONENTE PATIENTES [result]: " + JSON.stringify(result, null, 4));
        console.log("# COMPONENTE PATIENTES [quizs]" + JSON.stringify(result.quizs, null, 4));
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
            this.patientService.displayNotification('error-auth');
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
    PatientsComponent.prototype.init = function () {
        var _this = this;
        this.patientService.getPatients().subscribe(function (result) { return _this.onGetDataSuccess(result); }, function (error) { return _this.onGetDataError(error); });
        this.isLoading = false;
        this.listLoaded = true;
        //this.patientService.hasEvaluationsToDo() ? this.hasEvaluationsToDo = true : this.hasEvaluationsToDo = false;
        //verify and notificate if has evaluations to do
        //this.hasEvaluationsToDo = true;
        if (this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo()) {
            this.patientService.displayNotification('pending evaluations');
        }
    };
    /**
     * Funtion to refresh all data from the server
     *
     *
     * @memberof PatientsComponent
     */
    PatientsComponent.prototype.refreshData = function () {
        this.init();
        console.log("#REFRESH DATA -> Not implemented");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFHbEQscURBQW1EO0FBSW5ELDBDQUF5QztBQUd6Qyw0REFBMEQ7QUFFMUQsMkVBQXlFO0FBQ3pFLG9DQUF1QztBQVN2QyxJQUFhLGlCQUFpQjtJQWMxQiwyQkFDWSxjQUE4QixFQUM5QixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDO1FBSGxDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWQ5QyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDLENBQUMsaURBQWlEO1FBTXRFLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBU3RDLENBQUM7SUFDRCxvQ0FBUSxHQUFSO1FBQUEsaUJBMEJDO1FBeEJHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FDdkMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQTdCLENBQTZCLEVBQ3pDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNB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QWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XHJcbmltcG9ydCB7IFF1ZXN0aW9ubmFpcmUgfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvbm5haXJlXCI7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gXCIuL25vdGlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IENyZWF0ZVZpZXdFdmVudERhdGEgfSBmcm9tIFwidWkvcGxhY2Vob2xkZXJcIjtcclxuXHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgcHJvdmlkZXJzOiBbXSxcclxuICAgIHN0eWxlVXJsczogW1wiLi9wYXRpZW50LWNvbW1vbi5jc3NcIl0sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhdGllbnRzLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYXRpZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwYXRpZW50czogUGF0aWVudFtdO1xyXG4gICAgY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXM6IFF1ZXN0aW9ubmFpcmVbXTtcclxuICAgIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uO1xyXG4gICAgbGlzdExvYWRlZCA9IGZhbHNlO1xyXG4gICAgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG8gPSBmYWxzZTsgLy9jb25kaXRpb24gdG8gZW5hYmxlIGFjdGlvbiBiYXIgaWNvbiBldmFsdWF0aW9uc1xyXG5cclxuICAgIHB1YmxpYyBmaWxlVGV4dENvbnRlbnQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgc3VjY2Vzc01lc3NhZ2U6IHN0cmluZztcclxuICAgIHB1YmxpYyB3cml0dGVuQ29udGVudDogc3RyaW5nO1xyXG4gICAgcHVibGljIGlzSXRlbVZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhdGllbnRTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpO1xyXG4gICAgICAgIGlmICghdGhpcy5wYXRpZW50U2VydmljZS5pc0ZpcnN0UmVxdWVzdCgpICYmIHRoaXMucGF0aWVudFNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnRzKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIG1vc3RyYXIgZGEgQkRcIik7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnRzX0JEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKSA/IHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdHJ1ZSA6IHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vdmVyaWZ5IGFuZCBub3RpZmljYXRlIGlmIGhhcyBldmFsdWF0aW9ucyB0byBkb1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmRpc3BsYXlOb3RpZmljYXRpb24oJ3BlbmRpbmcgZXZhbHVhdGlvbnMnKTtcclxuICAgICAgICB9ICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gbG9hZCBkYXRhIHdoZW4gaHR0cCBnZXQgZGF0YSBzdWNjZXNzXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzdWx0IFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlc3VsdCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbcmVzdWx0XTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDQpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3F1aXpzXVwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHJlc3VsdC5wYXRpZW50czsgLy90ZWRkeVxyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMgPSByZXN1bHQucXVpenM7IC8vdGVkZHlcclxuICAgICAgICB0aGlzLmxvYWRBbGxRdWVzdGlvbm5haXJlc0Zyb21SZXNwb25zZSgpO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbcmVzdWx0LnF1aXpzXVwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW2NhcmVnaXZlclF1ZXN0aW9ubmFpcmVzIF1cIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMsIG51bGwsIDQpKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5zZXRQYXRpZW50cyh0aGlzLnBhdGllbnRzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMpO1xyXG4gICAgICAgIC8vIHRoaXMucGF0aWVudFNlcnZpY2Uuc2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXModGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlKTsgVE9ET1xyXG5cclxuICAgICAgICAvLyB2ZXJpZmljYXIgc2UgYSBsaXN0YSB0ZW0gc28gdW0gcGFjaWVudGUgcGFyYSBwb2RlciBpciBsb2dvIHBhcmEgYSAgbGlzdGEgZGUgbmVjZXNzaWRhZGVzICBcclxuICAgICAgICAvKmlmICh0aGlzLnBhdGllbnRzLmxlbmd0aCA9PSAxICYmIHRoaXMuZmlyc3RUaW1lPT10cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2U7Ki9cclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMucGF0aWVudHNbMF0sIG51bGwsIDQpKTtcclxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50L1wiICsgdGhpcy5wYXRpZW50c1swXS5pZCArIFwiL25lZWRzXCJdKTtcclxuICAgICAgICAvL30gICBcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gbG9hZCBkYXRhIHdoZW4gaHR0cCBnZXQgZGF0YSBFcnJvclxyXG4gICAgICogXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHsoUmVzcG9uc2UgfCBhbnkpfSBlcnJvciBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFBhdGllbnRzQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3Jlc3VsdF1cIiArIEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCA0KSk7XHJcbiAgICAgICAgaWYoZXJyb3Iuc3RhdHVzID09ICc0MDEnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZGlzcGxheU5vdGlmaWNhdGlvbignZXJyb3ItYXV0aCcpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnVzZXJPdXRkYXRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gbG9hZCBxdWVzdGlvbm5haXJlcyBmcm9tIHNlcnZlciByZXNwb25zZSB0byB2YXIgY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXNcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgbG9hZEFsbFF1ZXN0aW9ubmFpcmVzRnJvbVJlc3BvbnNlKCkge1xyXG4gICAgICAgIC8vc2l6ZSBvZiBpbmljaWFsIGFycmF5XHJcbiAgICAgICAgbGV0IHNpemVJbml0aWFsID0gdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5sZW5ndGg7XHJcbiAgICAgICAgLy9zZXQgcmVmXHJcbiAgICAgICAgdGhpcy5wYXRpZW50cy5mb3JFYWNoKGVsZW1lbnRfcCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50X3AucXVpenMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRfcC5xdWl6cy5mb3JFYWNoKGVsZW1lbnRfcSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5wdXNoKGVsZW1lbnRfcSlcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50X3FbXCJyZWZfcXVlc3Rpb25uYWlyZVwiXSA9IChzaXplSW5pdGlhbCkgKyBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZUluaXRpYWwrKztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsZW1lbnRfcC5uZWVkcy5mb3JFYWNoKGVsZW1lbnRfbmVlZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50X25lZWQubWF0ZXJpYWxzLmZvckVhY2goZWxlbWVudF9tYXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfbWF0LnF1aXpzLmZvckVhY2goZWxlbWVudF9xdSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMucHVzaChlbGVtZW50X3F1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50X3F1W1wicmVmX3F1ZXN0aW9ubmFpcmVcIl0gPSAoc2l6ZUluaXRpYWwpICsgXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplSW5pdGlhbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZWZfcXVlc3Rpb25uYWlyZSA9IGluZGV4ICsgXCJcIjtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgLy9xdWVzdGlvbm5haXJlIG5vdCBoYXZlIHJlc3BvbnNlIHlldFxyXG4gICAgICAgICAgICBlbGVtZW50LmRvbmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBuYXZpZ2F0ZSB0byBwYWNpZW50L21hdGVyaWFsc1xyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGF0aWVudF9pZCBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFBhdGllbnRzQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGdvVG9NYXRlcmlhbHNPZlBhdGllbnQocGF0aWVudF9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wYXRpZW50JywgcGF0aWVudF9pZCwgJ21hdGVyaWFscyddKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJBdmlzbyAtIFBhY2llbnRlcyBcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRW5jb250cmEtc2Ugc2VtIGFjZXNzbyDDoCBpbnRlcm5ldC4gTsOjbyDDqSBwb3Nzw612ZWwgdmlzdWFsaXphciBvcyBtYXRlcmlhaXMgZGlzcG9uw612ZWlzIHBhcmEgZXN0ZSBwYWNpZW50ZS5cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuaW5pdCgpe1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50cygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKSA/IHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdHJ1ZSA6IHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vdmVyaWZ5IGFuZCBub3RpZmljYXRlIGlmIGhhcyBldmFsdWF0aW9ucyB0byBkb1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmRpc3BsYXlOb3RpZmljYXRpb24oJ3BlbmRpbmcgZXZhbHVhdGlvbnMnKTtcclxuICAgICAgICB9ICAgICAgXHJcbn1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bnRpb24gdG8gcmVmcmVzaCBhbGwgZGF0YSBmcm9tIHRoZSBzZXJ2ZXJcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZnJlc2hEYXRhKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiI1JFRlJFU0ggREFUQSAtPiBOb3QgaW1wbGVtZW50ZWRcIilcclxuICAgIH1cclxufVxyXG4iXX0=