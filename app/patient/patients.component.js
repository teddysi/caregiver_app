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
        ////console.log(this.patientService.isConnected());
        if (!this.patientService.isFirstRequest() && this.patientService.isConnected()) {
            //this.patientService.checkQuizsToSubmit();
            this.patientService.getPatients().subscribe(function (result) { return _this.onGetDataSuccess(result); }, function (error) { return _this.onGetDataError(error); });
        }
        else {
            ////console.log("A mostrar da BD");
            this.patients = this.patientService.getPatients_BD();
        }
        this.isLoading = false;
        this.listLoaded = true;
        //this.patientService.hasEvaluationsToDo() ? this.hasEvaluationsToDo = true : this.hasEvaluationsToDo = false;
        //verify and notificate if has evaluations to do
        //this.hasEvaluationsToDo = true;
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
        ////console.log("EVALUATIONS TO DO: " + this.hasEvaluationsToDo);
        if (this.hasEvaluationsToDo) {
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
        ////console.log("A tratar dados dp do pedido!")
        //////console.log("# COMPONENTE PATIENTES [result]: " + JSON.stringify(result, null, 4));
        //////console.log("# COMPONENTE PATIENTES [quizs]" + JSON.stringify(result.quizs, null, 4));
        this.patients = result.patients; //teddy
        this.caregiverQuestionnaires = result.quizs; //teddy
        this.loadAllQuestionnairesFromResponse();
        //////console.log("# COMPONENTE PATIENTES [result.quizs]" + JSON.stringify(result.quizs, null, 4));
        //////console.log("# COMPONENTE PATIENTES [caregiverQuestionnaires ]" + JSON.stringify(this.caregiverQuestionnaires, null, 4));
        this.patientService.setPatients(this.patients);
        this.patientService.setCaregiverQuestionnaires(this.caregiverQuestionnaires);
        // this.patientService.setCaregiverQuestionnaires(this.caregiverQuestionnaire); TODO
        // verificar se a lista tem so um paciente para poder ir logo para a  lista de necessidades  
        /*if (this.patients.length == 1 && this.firstTime==true) {
        this.firstTime = false;*/
        //////console.log(JSON.stringify(this.patients[0], null, 4));
        //this.router.navigate(["/patient/" + this.patients[0].id + "/needs"]);
        //}
        ////console.log("Terminou de tratar dados dp do pedido!!!")  
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
        //////console.log("# COMPONENTE PATIENTES [result]" + JSON.stringify(error, null, 4));
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
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
        this.init();
    };
    PatientsComponent.prototype.onSwipe = function (args) {
        console.log("Swipe!");
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);
        console.log("Swipe Direction: " + args.direction);
        this.direction = args.direction;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFHbEQscURBQW1EO0FBS25ELDBDQUF5QztBQUd6Qyw0REFBMEQ7QUFFMUQsMkVBQXlFO0FBQ3pFLG9DQUF1QztBQVV2QyxJQUFhLGlCQUFpQjtJQWUxQiwyQkFDWSxjQUE4QixFQUM5QixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDO1FBSGxDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWY5QyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDLENBQUMsaURBQWlEO1FBT3RFLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBU3RDLENBQUM7SUFDRCxvQ0FBUSxHQUFSO1FBQUEsaUJBNkJDO1FBM0JHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG1EQUFtRDtRQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0UsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUN2QyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBN0IsQ0FBNkIsRUFDekMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUExQixDQUEwQixDQUN4QyxDQUFDO1FBQ04sQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6RCxDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdkIsOEdBQThHO1FBRTlHLGdEQUFnRDtRQUVoRCxpQ0FBaUM7UUFFakMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNuRSxpRUFBaUU7UUFDakUsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkUsQ0FBQztJQUNMLENBQUM7SUFHRDs7Ozs7OztPQU9HO0lBQ0ssNENBQWdCLEdBQXhCLFVBQXlCLE1BQU07UUFDM0IsK0NBQStDO1FBQy9DLHlGQUF5RjtRQUN6Riw0RkFBNEY7UUFDNUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTztRQUN4QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU87UUFDcEQsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7UUFFekMsbUdBQW1HO1FBQ25HLCtIQUErSDtRQUUvSCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM3RSxvRkFBb0Y7UUFFcEYsNkZBQTZGO1FBQzdGO2lDQUN5QjtRQUN6Qiw2REFBNkQ7UUFDN0QsdUVBQXVFO1FBQ3ZFLEdBQUc7UUFDSCw2REFBNkQ7SUFDakUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSywwQ0FBYyxHQUF0QixVQUF1QixLQUFxQjtRQUN4QyxzRkFBc0Y7UUFDdEYsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDO0lBQ0wsQ0FBQztJQUlEOzs7OztPQUtHO0lBQ0gsNkRBQWlDLEdBQWpDO1FBQUEsaUJBK0JDO1FBOUJHLHVCQUF1QjtRQUN2QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDO1FBQ3RELFNBQVM7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7WUFDM0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztvQkFDN0IsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFDNUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUE7b0JBRW5ELFdBQVcsRUFBRSxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFlBQVk7Z0JBQ2hDLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsV0FBVztvQkFDdEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO3dCQUNoQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO3dCQUM3QyxVQUFVLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDcEQsV0FBVyxFQUFFLENBQUM7b0JBQ2xCLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3hDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3ZDLEtBQUssRUFBRSxDQUFDO1lBQ1IscUNBQXFDO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdEOzs7Ozs7T0FNRztJQUNILGtEQUFzQixHQUF0QixVQUF1QixVQUFVO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixLQUFLLEVBQUUsb0JBQW9CO2dCQUMzQixPQUFPLEVBQUUsMkdBQTJHO2dCQUNwSCxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUE7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQUVMLGdDQUFJLEdBQUo7UUFBQSxpQkFvQkM7UUFsQk8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQ25DLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUE3QixDQUE2QixFQUN6QyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQTFCLENBQTBCLENBQ3hDLENBQUM7UUFHTixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUV2Qiw4R0FBOEc7UUFFOUcsZ0RBQWdEO1FBRWhELGlDQUFpQztRQUVqQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkUsQ0FBQztJQUNULENBQUM7SUFFRzs7Ozs7T0FLRztJQUNJLHVDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEIsQ0FBQztJQUNELG1DQUFPLEdBQVAsVUFBUSxJQUEyQjtRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDcEMsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQS9NRCxJQStNQztBQS9NWSxpQkFBaUI7SUFQN0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixTQUFTLEVBQUUsRUFBRTtRQUNiLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1FBQ25DLFdBQVcsRUFBRSwyQkFBMkI7S0FDM0MsQ0FBQztxQ0FpQjhCLGdDQUFjO1FBQ3RCLGVBQU07UUFDRCwwQkFBVztRQUNOLG9DQUFnQjtHQW5CckMsaUJBQWlCLENBK003QjtBQS9NWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuL3BhdGllbnRcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFF1ZXN0aW9ubmFpcmUgfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvbm5haXJlXCI7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gXCIuL25vdGlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IENyZWF0ZVZpZXdFdmVudERhdGEgfSBmcm9tIFwidWkvcGxhY2Vob2xkZXJcIjtcclxuXHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcbmltcG9ydCB7IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHByb3ZpZGVyczogW10sXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vcGF0aWVudC1jb21tb24uY3NzXCJdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYXRpZW50cy5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIGNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzOiBRdWVzdGlvbm5haXJlW107XHJcbiAgICBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbjtcclxuICAgIGxpc3RMb2FkZWQgPSBmYWxzZTtcclxuICAgIGlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgaGFzRXZhbHVhdGlvbnNUb0RvID0gZmFsc2U7IC8vY29uZGl0aW9uIHRvIGVuYWJsZSBhY3Rpb24gYmFyIGljb24gZXZhbHVhdGlvbnNcclxuICAgIHB1YmxpYyBkaXJlY3Rpb246IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgZmlsZVRleHRDb250ZW50OiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIHN1Y2Nlc3NNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgd3JpdHRlbkNvbnRlbnQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc0l0ZW1WaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2VcclxuICAgICkge1xyXG5cclxuICAgIH1cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2codGhpcy5wYXRpZW50U2VydmljZS5pc0Nvbm5lY3RlZCgpKTtcclxuICAgICAgICBpZiAoIXRoaXMucGF0aWVudFNlcnZpY2UuaXNGaXJzdFJlcXVlc3QoKSAmJiB0aGlzLnBhdGllbnRTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgLy90aGlzLnBhdGllbnRTZXJ2aWNlLmNoZWNrUXVpenNUb1N1Ym1pdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnRzKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKFwiQSBtb3N0cmFyIGRhIEJEXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRzID0gdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50c19CRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvL3RoaXMucGF0aWVudFNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCkgPyB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRydWUgOiB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL3ZlcmlmeSBhbmQgbm90aWZpY2F0ZSBpZiBoYXMgZXZhbHVhdGlvbnMgdG8gZG9cclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRoaXMucGF0aWVudFNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCk7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKFwiRVZBTFVBVElPTlMgVE8gRE86IFwiICsgdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8pO1xyXG4gICAgICAgIGlmKHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZGlzcGxheU5vdGlmaWNhdGlvbigncGVuZGluZyBldmFsdWF0aW9ucycpO1xyXG4gICAgICAgIH0gICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBsb2FkIGRhdGEgd2hlbiBodHRwIGdldCBkYXRhIHN1Y2Nlc3NcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7YW55fSByZXN1bHQgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KSB7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKFwiQSB0cmF0YXIgZGFkb3MgZHAgZG8gcGVkaWRvIVwiKVxyXG4gICAgICAgIC8vLy8vL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbcmVzdWx0XTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDQpKTtcclxuICAgICAgICAvLy8vLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3F1aXpzXVwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHJlc3VsdC5wYXRpZW50czsgLy90ZWRkeVxyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMgPSByZXN1bHQucXVpenM7IC8vdGVkZHlcclxuICAgICAgICB0aGlzLmxvYWRBbGxRdWVzdGlvbm5haXJlc0Zyb21SZXNwb25zZSgpO1xyXG5cclxuICAgICAgICAvLy8vLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3Jlc3VsdC5xdWl6c11cIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC5xdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vLy8vL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMgXVwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcywgbnVsbCwgNCkpO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldFBhdGllbnRzKHRoaXMucGF0aWVudHMpO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMpO1xyXG4gICAgICAgIC8vIHRoaXMucGF0aWVudFNlcnZpY2Uuc2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXModGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlKTsgVE9ET1xyXG5cclxuICAgICAgICAvLyB2ZXJpZmljYXIgc2UgYSBsaXN0YSB0ZW0gc28gdW0gcGFjaWVudGUgcGFyYSBwb2RlciBpciBsb2dvIHBhcmEgYSAgbGlzdGEgZGUgbmVjZXNzaWRhZGVzICBcclxuICAgICAgICAvKmlmICh0aGlzLnBhdGllbnRzLmxlbmd0aCA9PSAxICYmIHRoaXMuZmlyc3RUaW1lPT10cnVlKSB7XHJcbiAgICAgICAgdGhpcy5maXJzdFRpbWUgPSBmYWxzZTsqL1xyXG4gICAgICAgIC8vLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMucGF0aWVudHNbMF0sIG51bGwsIDQpKTtcclxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50L1wiICsgdGhpcy5wYXRpZW50c1swXS5pZCArIFwiL25lZWRzXCJdKTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvLy8vY29uc29sZS5sb2coXCJUZXJtaW5vdSBkZSB0cmF0YXIgZGFkb3MgZHAgZG8gcGVkaWRvISEhXCIpICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGxvYWQgZGF0YSB3aGVuIGh0dHAgZ2V0IGRhdGEgRXJyb3JcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KFJlc3BvbnNlIHwgYW55KX0gZXJyb3IgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG4gICAgICAgIC8vLy8vL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbcmVzdWx0XVwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDQpKTtcclxuICAgICAgICBpZihlcnJvci5zdGF0dXMgPT0gJzQwMScpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5kaXNwbGF5Tm90aWZpY2F0aW9uKCdlcnJvci1hdXRoJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UudXNlck91dGRhdGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBsb2FkIHF1ZXN0aW9ubmFpcmVzIGZyb20gc2VydmVyIHJlc3BvbnNlIHRvIHZhciBjYXJlZ2l2ZXJRdWVzdGlvbm5haXJlc1xyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBsb2FkQWxsUXVlc3Rpb25uYWlyZXNGcm9tUmVzcG9uc2UoKSB7XHJcbiAgICAgICAgLy9zaXplIG9mIGluaWNpYWwgYXJyYXlcclxuICAgICAgICBsZXQgc2l6ZUluaXRpYWwgPSB0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzLmxlbmd0aDtcclxuICAgICAgICAvL3NldCByZWZcclxuICAgICAgICB0aGlzLnBhdGllbnRzLmZvckVhY2goZWxlbWVudF9wID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRfcC5xdWl6cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudF9wLnF1aXpzLmZvckVhY2goZWxlbWVudF9xID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzLnB1c2goZWxlbWVudF9xKVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcVtcInJlZl9xdWVzdGlvbm5haXJlXCJdID0gKHNpemVJbml0aWFsKSArIFwiXCJcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzaXplSW5pdGlhbCsrO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbWVudF9wLm5lZWRzLmZvckVhY2goZWxlbWVudF9uZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRfbmVlZC5tYXRlcmlhbHMuZm9yRWFjaChlbGVtZW50X21hdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9tYXQucXVpenMuZm9yRWFjaChlbGVtZW50X3F1ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5wdXNoKGVsZW1lbnRfcXUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcXVbXCJyZWZfcXVlc3Rpb25uYWlyZVwiXSA9IChzaXplSW5pdGlhbCkgKyBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVJbml0aWFsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlZl9xdWVzdGlvbm5haXJlID0gaW5kZXggKyBcIlwiO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAvL3F1ZXN0aW9ubmFpcmUgbm90IGhhdmUgcmVzcG9uc2UgeWV0XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIG5hdmlnYXRlIHRvIHBhY2llbnQvbWF0ZXJpYWxzXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXRpZW50X2lkIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZ29Ub01hdGVyaWFsc09mUGF0aWVudChwYXRpZW50X2lkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3BhdGllbnQnLCBwYXRpZW50X2lkLCAnbWF0ZXJpYWxzJ10pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkF2aXNvIC0gUGFjaWVudGVzIFwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFbmNvbnRyYS1zZSBzZW0gYWNlc3NvIMOgIGludGVybmV0LiBOw6NvIMOpIHBvc3PDrXZlbCB2aXN1YWxpemFyIG9zIG1hdGVyaWFpcyBkaXNwb27DrXZlaXMgcGFyYSBlc3RlIHBhY2llbnRlLlwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5pbml0KCl7XHJcbiAgICBcclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnRzKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy90aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpID8gdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0cnVlIDogdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy92ZXJpZnkgYW5kIG5vdGlmaWNhdGUgaWYgaGFzIGV2YWx1YXRpb25zIHRvIGRvXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZGlzcGxheU5vdGlmaWNhdGlvbigncGVuZGluZyBldmFsdWF0aW9ucycpO1xyXG4gICAgICAgIH0gICAgICBcclxufVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVudGlvbiB0byByZWZyZXNoIGFsbCBkYXRhIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVmcmVzaERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgb25Td2lwZShhcmdzOiBTd2lwZUdlc3R1cmVFdmVudERhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN3aXBlIVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9iamVjdCB0aGF0IHRyaWdnZXJlZCB0aGUgZXZlbnQ6IFwiICsgYXJncy5vYmplY3QpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmlldyB0aGF0IHRyaWdnZXJlZCB0aGUgZXZlbnQ6IFwiICsgYXJncy52aWV3KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50IG5hbWU6IFwiICsgYXJncy5ldmVudE5hbWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3dpcGUgRGlyZWN0aW9uOiBcIiArIGFyZ3MuZGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBhcmdzLmRpcmVjdGlvbjtcclxuICAgIH1cclxufVxyXG4iXX0=