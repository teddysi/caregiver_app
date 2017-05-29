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