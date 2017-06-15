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
            this.patientService.checkQuizsToSubmit();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFDbEQsaUNBQW9DO0FBRXBDLHFEQUFtRDtBQUtuRCwwQ0FBeUM7QUFHekMsNERBQTBEO0FBRTFELDJFQUF5RTtBQUN6RSxvQ0FBdUM7QUFVdkMsSUFBYSxpQkFBaUI7SUFlMUIsMkJBQ1ksY0FBOEIsRUFDOUIsTUFBYyxFQUNkLFdBQXdCLEVBQ3hCLGdCQUFrQztRQUhsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFmOUMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHVCQUFrQixHQUFHLEtBQUssQ0FBQyxDQUFDLGlEQUFpRDtRQU90RSxrQkFBYSxHQUFZLEtBQUssQ0FBQztJQVN0QyxDQUFDO0lBQ0Qsb0NBQVEsR0FBUjtRQUFBLGlCQTRCQztRQTNCRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixtREFBbUQ7UUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FDdkMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQTdCLENBQTZCLEVBQ3pDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFD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LFNBQVMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsMkNBQWUsR0FBZjtRQUNJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRixDQUFDO0lBQ0wsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDSSxvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILHFDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsTUFBTSxDQUFDO0lBRVgsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQXpPRCxJQXlPQztBQXpPWSxpQkFBaUI7SUFQN0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixTQUFTLEVBQUUsRUFBRTtRQUNiLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1FBQ25DLFdBQVcsRUFBRSwyQkFBMkI7S0FDM0MsQ0FBQztxQ0FpQjhCLGdDQUFjO1FBQ3RCLGVBQU07UUFDRCwwQkFBVztRQUNOLG9DQUFnQjtHQW5CckMsaUJBQWlCLENBeU83QjtBQXpPWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuL3BhdGllbnRcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFF1ZXN0aW9ubmFpcmUgfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvbm5haXJlXCI7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gXCIuL25vdGlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IENyZWF0ZVZpZXdFdmVudERhdGEgfSBmcm9tIFwidWkvcGxhY2Vob2xkZXJcIjtcclxuXHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcbmltcG9ydCB7IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHByb3ZpZGVyczogW10sXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vcGF0aWVudC1jb21tb24uY3NzXCJdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYXRpZW50cy5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIGNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzOiBRdWVzdGlvbm5haXJlW107XHJcbiAgICBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbjtcclxuICAgIGxpc3RMb2FkZWQgPSBmYWxzZTtcclxuICAgIGlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgaGFzRXZhbHVhdGlvbnNUb0RvID0gZmFsc2U7IC8vY29uZGl0aW9uIHRvIGVuYWJsZSBhY3Rpb24gYmFyIGljb24gZXZhbHVhdGlvbnNcclxuICAgIHB1YmxpYyBkaXJlY3Rpb246IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgZmlsZVRleHRDb250ZW50OiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIHN1Y2Nlc3NNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgd3JpdHRlbkNvbnRlbnQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc0l0ZW1WaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2VcclxuICAgICkge1xyXG5cclxuICAgIH1cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2codGhpcy5wYXRpZW50U2VydmljZS5pc0Nvbm5lY3RlZCgpKTtcclxuICAgICAgICBpZiAoIXRoaXMucGF0aWVudFNlcnZpY2UuaXNGaXJzdFJlcXVlc3QoKSAmJiB0aGlzLnBhdGllbnRTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5jaGVja1F1aXpzVG9TdWJtaXQoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50cygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhcIkEgbW9zdHJhciBkYSBCRFwiKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50cyA9IHRoaXMucGF0aWVudFNlcnZpY2UuZ2V0UGF0aWVudHNfQkQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy90aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpID8gdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0cnVlIDogdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy92ZXJpZnkgYW5kIG5vdGlmaWNhdGUgaWYgaGFzIGV2YWx1YXRpb25zIHRvIGRvXHJcblxyXG4gICAgICAgIC8vdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRoaXMucGF0aWVudFNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCk7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKFwiRVZBTFVBVElPTlMgVE8gRE86IFwiICsgdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8pO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0V2YWx1YXRpb25zVG9Ebykge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmRpc3BsYXlOb3RpZmljYXRpb24oJ3BlbmRpbmcgZXZhbHVhdGlvbnMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gbG9hZCBkYXRhIHdoZW4gaHR0cCBnZXQgZGF0YSBzdWNjZXNzXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzdWx0IFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlc3VsdCkge1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhcIkEgdHJhdGFyIGRhZG9zIGRwIGRvIHBlZGlkbyFcIilcclxuICAgICAgICAvLy8vLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3Jlc3VsdF06IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy8vLy8vY29uc29sZS5sb2coXCIjIENPTVBPTkVOVEUgUEFUSUVOVEVTIFtxdWl6c11cIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC5xdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSByZXN1bHQucGF0aWVudHM7IC8vdGVkZHlcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzID0gcmVzdWx0LnF1aXpzOyAvL3RlZGR5XHJcbiAgICAgICAgdGhpcy5sb2FkQWxsUXVlc3Rpb25uYWlyZXNGcm9tUmVzcG9uc2UoKTtcclxuXHJcbiAgICAgICAgLy8vLy8vY29uc29sZS5sb2coXCIjIENPTVBPTkVOVEUgUEFUSUVOVEVTIFtyZXN1bHQucXVpenNdXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQucXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAvLy8vLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW2NhcmVnaXZlclF1ZXN0aW9ubmFpcmVzIF1cIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMsIG51bGwsIDQpKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5zZXRQYXRpZW50cyh0aGlzLnBhdGllbnRzKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5zZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyh0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKTtcclxuICAgICAgICAvLyB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZSk7IFRPRE9cclxuXHJcbiAgICAgICAgLy8gdmVyaWZpY2FyIHNlIGEgbGlzdGEgdGVtIHNvIHVtIHBhY2llbnRlIHBhcmEgcG9kZXIgaXIgbG9nbyBwYXJhIGEgIGxpc3RhIGRlIG5lY2Vzc2lkYWRlcyAgXHJcbiAgICAgICAgLyppZiAodGhpcy5wYXRpZW50cy5sZW5ndGggPT0gMSAmJiB0aGlzLmZpcnN0VGltZT09dHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2U7Ki9cclxuICAgICAgICAvLy8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnBhdGllbnRzWzBdLCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGF0aWVudC9cIiArIHRoaXMucGF0aWVudHNbMF0uaWQgKyBcIi9uZWVkc1wiXSk7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKFwiVGVybWlub3UgZGUgdHJhdGFyIGRhZG9zIGRwIGRvIHBlZGlkbyEhIVwiKSAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBsb2FkIGRhdGEgd2hlbiBodHRwIGdldCBkYXRhIEVycm9yXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0geyhSZXNwb25zZSB8IGFueSl9IGVycm9yIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcclxuICAgICAgICAvLy8vLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3Jlc3VsdF1cIiArIEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCA0KSk7XHJcbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PSAnNDAxJykge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmRpc3BsYXlOb3RpZmljYXRpb24oJ2Vycm9yLWF1dGgnKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS51c2VyT3V0ZGF0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGxvYWQgcXVlc3Rpb25uYWlyZXMgZnJvbSBzZXJ2ZXIgcmVzcG9uc2UgdG8gdmFyIGNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFBhdGllbnRzQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGxvYWRBbGxRdWVzdGlvbm5haXJlc0Zyb21SZXNwb25zZSgpIHtcclxuICAgICAgICAvL3NpemUgb2YgaW5pY2lhbCBhcnJheVxyXG4gICAgICAgIGxldCBzaXplSW5pdGlhbCA9IHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMubGVuZ3RoO1xyXG4gICAgICAgIC8vc2V0IHJlZlxyXG4gICAgICAgIHRoaXMucGF0aWVudHMuZm9yRWFjaChlbGVtZW50X3AgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudF9wLnF1aXpzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50X3AucXVpenMuZm9yRWFjaChlbGVtZW50X3EgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMucHVzaChlbGVtZW50X3EpXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9xW1wicmVmX3F1ZXN0aW9ubmFpcmVcIl0gPSAoc2l6ZUluaXRpYWwpICsgXCJcIlxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzaXplSW5pdGlhbCsrO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbWVudF9wLm5lZWRzLmZvckVhY2goZWxlbWVudF9uZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRfbmVlZC5tYXRlcmlhbHMuZm9yRWFjaChlbGVtZW50X21hdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9tYXQucXVpenMuZm9yRWFjaChlbGVtZW50X3F1ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5wdXNoKGVsZW1lbnRfcXUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfcXVbXCJyZWZfcXVlc3Rpb25uYWlyZVwiXSA9IChzaXplSW5pdGlhbCkgKyBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVJbml0aWFsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlZl9xdWVzdGlvbm5haXJlID0gaW5kZXggKyBcIlwiO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAvL3F1ZXN0aW9ubmFpcmUgbm90IGhhdmUgcmVzcG9uc2UgeWV0XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIG5hdmlnYXRlIHRvIHBhY2llbnQvbWF0ZXJpYWxzXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXRpZW50X2lkIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgZ29Ub01hdGVyaWFsc09mUGF0aWVudChwYXRpZW50X2lkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3BhdGllbnQnLCBwYXRpZW50X2lkLCAnbWF0ZXJpYWxzJ10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQXZpc28gLSBQYWNpZW50ZXMgXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkVuY29udHJhLXNlIHNlbSBhY2Vzc28gw6AgaW50ZXJuZXQuIE7Do28gw6kgcG9zc8OtdmVsIHZpc3VhbGl6YXIgb3MgbWF0ZXJpYWlzIGRpc3BvbsOtdmVpcyBwYXJhIGVzdGUgcGFjaWVudGUuXCIsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuY2hlY2tRdWl6c1RvU3VibWl0KCk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50cygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvL3RoaXMucGF0aWVudFNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCkgPyB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRydWUgOiB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL3ZlcmlmeSBhbmQgbm90aWZpY2F0ZSBpZiBoYXMgZXZhbHVhdGlvbnMgdG8gZG9cclxuXHJcbiAgICAgICAgLy90aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRoaXMucGF0aWVudFNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5kaXNwbGF5Tm90aWZpY2F0aW9uKCdwZW5kaW5nIGV2YWx1YXRpb25zJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVudGlvbiB0byByZWZyZXNoIGFsbCBkYXRhIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVmcmVzaERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIH1cclxuICAgIG9uU3dpcGUoYXJnczogU3dpcGVHZXN0dXJlRXZlbnREYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTd2lwZSFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPYmplY3QgdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50OiBcIiArIGFyZ3Mub2JqZWN0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZpZXcgdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50OiBcIiArIGFyZ3Mudmlldyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCBuYW1lOiBcIiArIGFyZ3MuZXZlbnROYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN3aXBlIERpcmVjdGlvbjogXCIgKyBhcmdzLmRpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gYXJncy5kaXJlY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICBhcHAuYW5kcm9pZC5vbihhcHAuQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICAvLyBjbGVhbmluZyB1cCByZWZlcmVuY2VzL2xpc3RlbmVycy5cclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgYXBwLmFuZHJvaWQub2ZmKGFwcC5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLmJhY2tFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gZGlzYWJsZSBiYWNrIGJ1dHRvbiBvbiBhbmRyb2lkXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBhcmdzIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBiYWNrRXZlbnQoYXJncykge1xyXG4gICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==