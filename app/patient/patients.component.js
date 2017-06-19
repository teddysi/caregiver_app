"use strict";
var core_1 = require("@angular/core");
var app = require("application");
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
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
        console.log("Has notifications to do: " + this.hasEvaluationsToDo);
        if (this.patientService.isConnected()) {
            this.patientService.checkQuizsToSubmit();
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
        //console.log("# COMPONENTE PATIENTES [result]: " + JSON.stringify(result, null, 4));
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
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
        ////console.log("EVALUATIONS TO DO: " + this.hasEvaluationsToDo);
        if (this.hasEvaluationsToDo) {
            this.patientService.displayNotification('pending evaluations');
        }
        console.log("Has notifications to do: " + this.hasEvaluationsToDo);
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
        this.patientService.checkQuizsToSubmit();
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
    PatientsComponent.prototype.ngAfterViewInit = function () {
        if (app.android) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    };
    PatientsComponent.prototype.ngOnDestroy = function () {
        // cleaning up references/listeners.
        if (app.android) {
            app.android.off(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    };
    /**
     * Function to disable back button on android
     *
     * @param {any} args
     * @returns
     *
     * @memberof PatientsComponent
     */
    PatientsComponent.prototype.backEvent = function (args) {
        args.cancel = true;
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFDbEQsaUNBQW9DO0FBRXBDLHFEQUFtRDtBQUtuRCwwQ0FBeUM7QUFHekMsNERBQTBEO0FBRTFELDJFQUF5RTtBQUN6RSxvQ0FBdUM7QUFVdkMsSUFBYSxpQkFBaUI7SUFlMUIsMkJBQ1ksY0FBOEIsRUFDOUIsTUFBYyxFQUNkLFdBQXdCLEVBQ3hCLGdCQUFrQztRQUhsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFmOUMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHVCQUFrQixHQUFHLEtBQUssQ0FBQyxDQUFDLGlEQUFpRDtRQU90RSxrQkFBYSxHQUFZLEtBQUssQ0FBQztJQVN0QyxDQUFDO0lBQ0Qsb0NBQVEsR0FBUjtRQUFBLGlCQXdCQztRQXZCRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixtREFBbUQ7UUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdFLDJDQUEyQztZQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FDdkMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQTdCLENBQTZCLEVBQ3pDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBMUIsQ0FBMEIsQ0FDeEMsQ0FBQztRQUNOLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLG1DQUFtQztZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekQsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVuRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDN0MsQ0FBQztJQUVMLENBQUM7SUFHRDs7Ozs7OztPQU9HO0lBQ0ssNENBQWdCLEdBQXhCLFVBQXlCLE1BQU07UUFDM0IsK0NBQStDO1FBQy9DLHFGQUFxRjtRQUNyRiw0RkFBNEY7UUFDNUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTztRQUN4QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU87UUFDcEQsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7UUFFekMsbUdBQW1HO1FBQ25HLCtIQUErSDtRQUUvSCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM3RSxvRkFBb0Y7UUFFcEYsNkZBQTZGO1FBQzdGO2lDQUN5QjtRQUN6Qiw2REFBNkQ7UUFDN0QsdUVBQXVFO1FBQ3ZFLEdBQUc7UUFFSCwyREFBMkQ7UUFDekQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNyRSxpRUFBaUU7UUFDakUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSywwQ0FBYyxHQUF0QixVQUF1QixLQUFxQjtRQUN4QyxzRkFBc0Y7UUFDdEYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDO0lBQ0wsQ0FBQztJQUlEOzs7OztPQUtHO0lBQ0gsNkRBQWlDLEdBQWpDO1FBQUEsaUJBK0JDO1FBOUJHLHVCQUF1QjtRQUN2QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDO1FBQ3RELFNBQVM7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7WUFDM0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztvQkFDN0IsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFDNUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUE7b0JBRW5ELFdBQVcsRUFBRSxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFlBQVk7Z0JBQ2hDLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsV0FBVztvQkFDdEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO3dCQUNoQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO3dCQUM3QyxVQUFVLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDcEQsV0FBVyxFQUFFLENBQUM7b0JBQ2xCLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3hDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3ZDLEtBQUssRUFBRSxDQUFDO1lBQ1IscUNBQXFDO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdEOzs7Ozs7T0FNRztJQUNILGtEQUFzQixHQUF0QixVQUF1QixVQUFVO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixLQUFLLEVBQUUsb0JBQW9CO2dCQUMzQixPQUFPLEVBQUUsMkdBQTJHO2dCQUNwSCxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUE7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFJLEdBQUo7UUFBQSxpQkFvQkM7UUFuQkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUN2QyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBN0IsQ0FBNkIsRUFDekMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUExQixDQUEwQixDQUN4QyxDQUFDO1FBR0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdkIsOEdBQThHO1FBRTlHLGdEQUFnRDtRQUVoRCxpQ0FBaUM7UUFFakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSx1Q0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDbkUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhCLENBQUM7SUFDRCxtQ0FBTyxHQUFQLFVBQVEsSUFBMkI7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0ksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUNJLG9DQUFvQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNkLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckYsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gscUNBQVMsR0FBVCxVQUFVLElBQUk7UUFDVixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixNQUFNLENBQUM7SUFFWCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBNU9ELElBNE9DO0FBNU9ZLGlCQUFpQjtJQVA3QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFNBQVMsRUFBRSxFQUFFO1FBQ2IsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7UUFDbkMsV0FBVyxFQUFFLDJCQUEyQjtLQUMzQyxDQUFDO3FDQWlCOEIsZ0NBQWM7UUFDdEIsZUFBTTtRQUNELDBCQUFXO1FBQ04sb0NBQWdCO0dBbkJyQyxpQkFBaUIsQ0E0TzdCO0FBNU9ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuL3BhdGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4vcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgUXVlc3Rpb25uYWlyZSB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9ubmFpcmVcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSBcIi4vbm90aWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ3JlYXRlVmlld0V2ZW50RGF0YSB9IGZyb20gXCJ1aS9wbGFjZWhvbGRlclwiO1xyXG5cclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgcHJvdmlkZXJzOiBbXSxcclxuICAgIHN0eWxlVXJsczogW1wiLi9wYXRpZW50LWNvbW1vbi5jc3NcIl0sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhdGllbnRzLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYXRpZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwYXRpZW50czogUGF0aWVudFtdO1xyXG4gICAgY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXM6IFF1ZXN0aW9ubmFpcmVbXTtcclxuICAgIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uO1xyXG4gICAgbGlzdExvYWRlZCA9IGZhbHNlO1xyXG4gICAgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG8gPSBmYWxzZTsgLy9jb25kaXRpb24gdG8gZW5hYmxlIGFjdGlvbiBiYXIgaWNvbiBldmFsdWF0aW9uc1xyXG4gICAgcHVibGljIGRpcmVjdGlvbjogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBmaWxlVGV4dENvbnRlbnQ6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgc3VjY2Vzc01lc3NhZ2U6IHN0cmluZztcclxuICAgIHB1YmxpYyB3cml0dGVuQ29udGVudDogc3RyaW5nO1xyXG4gICAgcHVibGljIGlzSXRlbVZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyh0aGlzLnBhdGllbnRTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpO1xyXG4gICAgICAgIGlmICghdGhpcy5wYXRpZW50U2VydmljZS5pc0ZpcnN0UmVxdWVzdCgpICYmIHRoaXMucGF0aWVudFNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICAvL3RoaXMucGF0aWVudFNlcnZpY2UuY2hlY2tRdWl6c1RvU3VibWl0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZ2V0UGF0aWVudHMoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KSxcclxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coXCJBIG1vc3RyYXIgZGEgQkRcIik7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnRzX0JEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhhcyBub3RpZmljYXRpb25zIHRvIGRvOiBcIiArIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5wYXRpZW50U2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuY2hlY2tRdWl6c1RvU3VibWl0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBsb2FkIGRhdGEgd2hlbiBodHRwIGdldCBkYXRhIHN1Y2Nlc3NcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7YW55fSByZXN1bHQgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uR2V0RGF0YVN1Y2Nlc3MocmVzdWx0KSB7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKFwiQSB0cmF0YXIgZGFkb3MgZHAgZG8gcGVkaWRvIVwiKVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIjIENPTVBPTkVOVEUgUEFUSUVOVEVTIFtyZXN1bHRdOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vLy8vL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbcXVpenNdXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQucXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gcmVzdWx0LnBhdGllbnRzOyAvL3RlZGR5XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyA9IHJlc3VsdC5xdWl6czsgLy90ZWRkeVxyXG4gICAgICAgIHRoaXMubG9hZEFsbFF1ZXN0aW9ubmFpcmVzRnJvbVJlc3BvbnNlKCk7XHJcblxyXG4gICAgICAgIC8vLy8vL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbcmVzdWx0LnF1aXpzXVwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy8vLy8vY29uc29sZS5sb2coXCIjIENPTVBPTkVOVEUgUEFUSUVOVEVTIFtjYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyBdXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzLCBudWxsLCA0KSk7XHJcblxyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2Uuc2V0UGF0aWVudHModGhpcy5wYXRpZW50cyk7XHJcblxyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2Uuc2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXModGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyk7XHJcbiAgICAgICAgLy8gdGhpcy5wYXRpZW50U2VydmljZS5zZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyh0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmUpOyBUT0RPXHJcblxyXG4gICAgICAgIC8vIHZlcmlmaWNhciBzZSBhIGxpc3RhIHRlbSBzbyB1bSBwYWNpZW50ZSBwYXJhIHBvZGVyIGlyIGxvZ28gcGFyYSBhICBsaXN0YSBkZSBuZWNlc3NpZGFkZXMgIFxyXG4gICAgICAgIC8qaWYgKHRoaXMucGF0aWVudHMubGVuZ3RoID09IDEgJiYgdGhpcy5maXJzdFRpbWU9PXRydWUpIHtcclxuICAgICAgICB0aGlzLmZpcnN0VGltZSA9IGZhbHNlOyovXHJcbiAgICAgICAgLy8vLy8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wYXRpZW50c1swXSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3BhdGllbnQvXCIgKyB0aGlzLnBhdGllbnRzWzBdLmlkICsgXCIvbmVlZHNcIl0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvLy8vY29uc29sZS5sb2coXCJUZXJtaW5vdSBkZSB0cmF0YXIgZGFkb3MgZHAgZG8gcGVkaWRvISEhXCIpXHJcbiAgICAgICAgICB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRoaXMucGF0aWVudFNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCk7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKFwiRVZBTFVBVElPTlMgVE8gRE86IFwiICsgdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8pO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0V2YWx1YXRpb25zVG9Ebykge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmRpc3BsYXlOb3RpZmljYXRpb24oJ3BlbmRpbmcgZXZhbHVhdGlvbnMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIYXMgbm90aWZpY2F0aW9ucyB0byBkbzogXCIgKyB0aGlzLmhhc0V2YWx1YXRpb25zVG9Ebyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBsb2FkIGRhdGEgd2hlbiBodHRwIGdldCBkYXRhIEVycm9yXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyhSZXNwb25zZSB8IGFueSl9IGVycm9yIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcclxuICAgICAgICAvLy8vLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3Jlc3VsdF1cIiArIEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCA0KSk7XHJcbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PSAnNDAxJykge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmRpc3BsYXlOb3RpZmljYXRpb24oJ2Vycm9yLWF1dGgnKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS51c2VyT3V0ZGF0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGxvYWQgcXVlc3Rpb25uYWlyZXMgZnJvbSBzZXJ2ZXIgcmVzcG9uc2UgdG8gdmFyIGNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFBhdGllbnRzQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGxvYWRBbGxRdWVzdGlvbm5haXJlc0Zyb21SZXNwb25zZSgpIHtcclxuICAgICAgICAvL3NpemUgb2YgaW5pY2lhbCBhcnJheVxyXG4gICAgICAgIGxldCBzaXplSW5pdGlhbCA9IHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMubGVuZ3RoO1xyXG4gICAgICAgIC8vc2V0IHJlZlxyXG4gICAgICAgIHRoaXMucGF0aWVudHMuZm9yRWFjaChlbGVtZW50X3AgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudF9wLnF1aXpzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50X3AucXVpenMuZm9yRWFjaChlbGVtZW50X3EgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMucHVzaChlbGVtZW50X3EpXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9xW1wicmVmX3F1ZXN0aW9ubmFpcmVcIl0gPSAoc2l6ZUluaXRpYWwpICsgXCJcIlxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzaXplSW5pdGlhbCsrO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbWVudF9wLm5lZWRzLmZvckVhY2goZWxlbWVudF9uZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRfbmVlZC5tYXRlcmlhbHMuZm9yRWFjaChlbGVtZW50X21hdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9tYXQucXVpenMuZm9yRWFjaChlbGVtZW50X3F1ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5wdXNoKGVsZW1lbnRfcXUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcXVbXCJyZWZfcXVlc3Rpb25uYWlyZVwiXSA9IChzaXplSW5pdGlhbCkgKyBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVJbml0aWFsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlZl9xdWVzdGlvbm5haXJlID0gaW5kZXggKyBcIlwiO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAvL3F1ZXN0aW9ubmFpcmUgbm90IGhhdmUgcmVzcG9uc2UgeWV0XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIG5hdmlnYXRlIHRvIHBhY2llbnQvbWF0ZXJpYWxzXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXRpZW50X2lkIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZ29Ub01hdGVyaWFsc09mUGF0aWVudChwYXRpZW50X2lkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3BhdGllbnQnLCBwYXRpZW50X2lkLCAnbWF0ZXJpYWxzJ10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQXZpc28gLSBQYWNpZW50ZXMgXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkVuY29udHJhLXNlIHNlbSBhY2Vzc28gw6AgaW50ZXJuZXQuIE7Do28gw6kgcG9zc8OtdmVsIHZpc3VhbGl6YXIgb3MgbWF0ZXJpYWlzIGRpc3BvbsOtdmVpcyBwYXJhIGVzdGUgcGFjaWVudGUuXCIsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuY2hlY2tRdWl6c1RvU3VibWl0KCk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50cygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvL3RoaXMucGF0aWVudFNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCkgPyB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRydWUgOiB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL3ZlcmlmeSBhbmQgbm90aWZpY2F0ZSBpZiBoYXMgZXZhbHVhdGlvbnMgdG8gZG9cclxuXHJcbiAgICAgICAgLy90aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRoaXMucGF0aWVudFNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5kaXNwbGF5Tm90aWZpY2F0aW9uKCdwZW5kaW5nIGV2YWx1YXRpb25zJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVudGlvbiB0byByZWZyZXNoIGFsbCBkYXRhIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVmcmVzaERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIH1cclxuICAgIG9uU3dpcGUoYXJnczogU3dpcGVHZXN0dXJlRXZlbnREYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTd2lwZSFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPYmplY3QgdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50OiBcIiArIGFyZ3Mub2JqZWN0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZpZXcgdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50OiBcIiArIGFyZ3Mudmlldyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCBuYW1lOiBcIiArIGFyZ3MuZXZlbnROYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN3aXBlIERpcmVjdGlvbjogXCIgKyBhcmdzLmRpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gYXJncy5kaXJlY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICBhcHAuYW5kcm9pZC5vbihhcHAuQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICAvLyBjbGVhbmluZyB1cCByZWZlcmVuY2VzL2xpc3RlbmVycy5cclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgYXBwLmFuZHJvaWQub2ZmKGFwcC5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLmJhY2tFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gZGlzYWJsZSBiYWNrIGJ1dHRvbiBvbiBhbmRyb2lkXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBhcmdzIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBiYWNrRXZlbnQoYXJncykge1xyXG4gICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==