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
            if (this.patientService.isConnected()) {
                this.patientService.checkQuizsToSubmit();
            }
            this.patients = this.patientService.getPatients_BD();
        }
        this.isLoading = false;
        this.listLoaded = true;
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
        console.log("Has notifications to do: " + this.hasEvaluationsToDo);
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
        this.patientService.checkQuizsToSubmit();
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
        this.patientService.getPatients().subscribe(function (result) { return _this.onGetDataSuccess(result); }, function (error) { return _this.onGetDataError(error); });
        this.isLoading = false;
        this.listLoaded = true;
        //this.patientService.hasEvaluationsToDo() ? this.hasEvaluationsToDo = true : this.hasEvaluationsToDo = false;
        //verify and notificate if has evaluations to do
        //this.hasEvaluationsToDo = true;
        this.patientService.checkQuizsToSubmit();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFDbEQsaUNBQW9DO0FBRXBDLHFEQUFtRDtBQUtuRCwwQ0FBeUM7QUFHekMsNERBQTBEO0FBRTFELDJFQUF5RTtBQUN6RSxvQ0FBdUM7QUFVdkMsSUFBYSxpQkFBaUI7SUFlMUIsMkJBQ1ksY0FBOEIsRUFDOUIsTUFBYyxFQUNkLFdBQXdCLEVBQ3hCLGdCQUFrQztRQUhsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFmOUMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHVCQUFrQixHQUFHLEtBQUssQ0FBQyxDQUFDLGlEQUFpRDtRQU90RSxrQkFBYSxHQUFZLEtBQUssQ0FBQztJQVN0QyxDQUFDO0lBQ0Qsb0NBQVEsR0FBUjtRQUFBLGlCQXVCQztRQXRCRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixtREFBbUQ7UUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdFLDJDQUEyQztZQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FDdkMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQTdCLENBQTZCLEVBQ3pDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBMUIsQ0FB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QUU7UUFDbkIsU0FBUyxFQUFFLEVBQUU7UUFDYixTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztRQUNuQyxXQUFXLEVBQUUsMkJBQTJCO0tBQzNDLENBQUM7cUNBaUI4QixnQ0FBYztRQUN0QixlQUFNO1FBQ0QsMEJBQVc7UUFDTixvQ0FBZ0I7R0FuQnJDLGlCQUFpQixDQTJPN0I7QUEzT1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBRdWVzdGlvbm5haXJlIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25uYWlyZVwiO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tIFwiLi9ub3RpZmljYXRpb25cIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDcmVhdGVWaWV3RXZlbnREYXRhIH0gZnJvbSBcInVpL3BsYWNlaG9sZGVyXCI7XHJcblxyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5pbXBvcnQgeyBTd2lwZUdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBwcm92aWRlcnM6IFtdLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BhdGllbnQtY29tbW9uLmNzc1wiXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGF0aWVudHMuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHBhdGllbnRzOiBQYXRpZW50W107XHJcbiAgICBjYXJlZ2l2ZXJRdWVzdGlvbm5haXJlczogUXVlc3Rpb25uYWlyZVtdO1xyXG4gICAgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb247XHJcbiAgICBsaXN0TG9hZGVkID0gZmFsc2U7XHJcbiAgICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgIGhhc0V2YWx1YXRpb25zVG9EbyA9IGZhbHNlOyAvL2NvbmRpdGlvbiB0byBlbmFibGUgYWN0aW9uIGJhciBpY29uIGV2YWx1YXRpb25zXHJcbiAgICBwdWJsaWMgZGlyZWN0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGZpbGVUZXh0Q29udGVudDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBzdWNjZXNzTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHdyaXR0ZW5Db250ZW50OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXNJdGVtVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKHRoaXMucGF0aWVudFNlcnZpY2UuaXNDb25uZWN0ZWQoKSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBhdGllbnRTZXJ2aWNlLmlzRmlyc3RSZXF1ZXN0KCkgJiYgdGhpcy5wYXRpZW50U2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wYXRpZW50U2VydmljZS5jaGVja1F1aXpzVG9TdWJtaXQoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50cygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZyhcIkEgbW9zdHJhciBkYSBCRFwiKTtcclxuICAgICAgICAgICAgaWYodGhpcy5wYXRpZW50U2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmNoZWNrUXVpenNUb1N1Ym1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnRzX0JEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhhcyBub3RpZmljYXRpb25zIHRvIGRvOiBcIiArIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gbG9hZCBkYXRhIHdoZW4gaHR0cCBnZXQgZGF0YSBzdWNjZXNzXHJcbiAgICAgKiBcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzdWx0IFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlc3VsdCkge1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhcIkEgdHJhdGFyIGRhZG9zIGRwIGRvIHBlZGlkbyFcIilcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbcmVzdWx0XTogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDQpKTtcclxuICAgICAgICAvLy8vLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3F1aXpzXVwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LnF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHJlc3VsdC5wYXRpZW50czsgLy90ZWRkeVxyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMgPSByZXN1bHQucXVpenM7IC8vdGVkZHlcclxuICAgICAgICB0aGlzLmxvYWRBbGxRdWVzdGlvbm5haXJlc0Zyb21SZXNwb25zZSgpO1xyXG5cclxuICAgICAgICAvLy8vLy9jb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5URSBQQVRJRU5URVMgW3Jlc3VsdC5xdWl6c11cIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC5xdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vLy8vL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMgXVwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcywgbnVsbCwgNCkpO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldFBhdGllbnRzKHRoaXMucGF0aWVudHMpO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMpO1xyXG4gICAgICAgIC8vIHRoaXMucGF0aWVudFNlcnZpY2Uuc2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXModGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlKTsgVE9ET1xyXG5cclxuICAgICAgICAvLyB2ZXJpZmljYXIgc2UgYSBsaXN0YSB0ZW0gc28gdW0gcGFjaWVudGUgcGFyYSBwb2RlciBpciBsb2dvIHBhcmEgYSAgbGlzdGEgZGUgbmVjZXNzaWRhZGVzICBcclxuICAgICAgICAvKmlmICh0aGlzLnBhdGllbnRzLmxlbmd0aCA9PSAxICYmIHRoaXMuZmlyc3RUaW1lPT10cnVlKSB7XHJcbiAgICAgICAgdGhpcy5maXJzdFRpbWUgPSBmYWxzZTsqL1xyXG4gICAgICAgIC8vLy8vL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMucGF0aWVudHNbMF0sIG51bGwsIDQpKTtcclxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wYXRpZW50L1wiICsgdGhpcy5wYXRpZW50c1swXS5pZCArIFwiL25lZWRzXCJdKTtcclxuICAgICAgICAvL31cclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmNoZWNrUXVpenNUb1N1Ym1pdCgpO1xyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhcIlRlcm1pbm91IGRlIHRyYXRhciBkYWRvcyBkcCBkbyBwZWRpZG8hISFcIilcclxuICAgICAgICAgIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuICAgICAgICAvLy8vY29uc29sZS5sb2coXCJFVkFMVUFUSU9OUyBUTyBETzogXCIgKyB0aGlzLmhhc0V2YWx1YXRpb25zVG9Ebyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZGlzcGxheU5vdGlmaWNhdGlvbigncGVuZGluZyBldmFsdWF0aW9ucycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhhcyBub3RpZmljYXRpb25zIHRvIGRvOiBcIiArIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGxvYWQgZGF0YSB3aGVuIGh0dHAgZ2V0IGRhdGEgRXJyb3JcclxuICAgICAqIFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7KFJlc3BvbnNlIHwgYW55KX0gZXJyb3IgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG4gICAgICAgIC8vLy8vL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlRFIFBBVElFTlRFUyBbcmVzdWx0XVwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDQpKTtcclxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09ICc0MDEnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZGlzcGxheU5vdGlmaWNhdGlvbignZXJyb3ItYXV0aCcpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnVzZXJPdXRkYXRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gbG9hZCBxdWVzdGlvbm5haXJlcyBmcm9tIHNlcnZlciByZXNwb25zZSB0byB2YXIgY2FyZWdpdmVyUXVlc3Rpb25uYWlyZXNcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgbG9hZEFsbFF1ZXN0aW9ubmFpcmVzRnJvbVJlc3BvbnNlKCkge1xyXG4gICAgICAgIC8vc2l6ZSBvZiBpbmljaWFsIGFycmF5XHJcbiAgICAgICAgbGV0IHNpemVJbml0aWFsID0gdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5sZW5ndGg7XHJcbiAgICAgICAgLy9zZXQgcmVmXHJcbiAgICAgICAgdGhpcy5wYXRpZW50cy5mb3JFYWNoKGVsZW1lbnRfcCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50X3AucXVpenMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRfcC5xdWl6cy5mb3JFYWNoKGVsZW1lbnRfcSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcy5wdXNoKGVsZW1lbnRfcSlcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50X3FbXCJyZWZfcXVlc3Rpb25uYWlyZVwiXSA9IChzaXplSW5pdGlhbCkgKyBcIlwiXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNpemVJbml0aWFsKys7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbGVtZW50X3AubmVlZHMuZm9yRWFjaChlbGVtZW50X25lZWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudF9uZWVkLm1hdGVyaWFscy5mb3JFYWNoKGVsZW1lbnRfbWF0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50X21hdC5xdWl6cy5mb3JFYWNoKGVsZW1lbnRfcXUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzLnB1c2goZWxlbWVudF9xdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9xdVtcInJlZl9xdWVzdGlvbm5haXJlXCJdID0gKHNpemVJbml0aWFsKSArIFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZUluaXRpYWwrKztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9ubmFpcmVzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVmX3F1ZXN0aW9ubmFpcmUgPSBpbmRleCArIFwiXCI7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIC8vcXVlc3Rpb25uYWlyZSBub3QgaGF2ZSByZXNwb25zZSB5ZXRcclxuICAgICAgICAgICAgZWxlbWVudC5kb25lID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gbmF2aWdhdGUgdG8gcGFjaWVudC9tYXRlcmlhbHNcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IHBhdGllbnRfaWQgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBnb1RvTWF0ZXJpYWxzT2ZQYXRpZW50KHBhdGllbnRfaWQpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcGF0aWVudCcsIHBhdGllbnRfaWQsICdtYXRlcmlhbHMnXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJBdmlzbyAtIFBhY2llbnRlcyBcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRW5jb250cmEtc2Ugc2VtIGFjZXNzbyDDoCBpbnRlcm5ldC4gTsOjbyDDqSBwb3Nzw612ZWwgdmlzdWFsaXphciBvcyBtYXRlcmlhaXMgZGlzcG9uw612ZWlzIHBhcmEgZXN0ZSBwYWNpZW50ZS5cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50cygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcilcclxuICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvL3RoaXMucGF0aWVudFNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCkgPyB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRydWUgOiB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL3ZlcmlmeSBhbmQgbm90aWZpY2F0ZSBpZiBoYXMgZXZhbHVhdGlvbnMgdG8gZG9cclxuXHJcbiAgICAgICAgLy90aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5jaGVja1F1aXpzVG9TdWJtaXQoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZGlzcGxheU5vdGlmaWNhdGlvbigncGVuZGluZyBldmFsdWF0aW9ucycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bnRpb24gdG8gcmVmcmVzaCBhbGwgZGF0YSBmcm9tIHRoZSBzZXJ2ZXJcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZnJlc2hEYXRhKCkge1xyXG4gICAgICAgIHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICB9XHJcbiAgICBvblN3aXBlKGFyZ3M6IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3dpcGUhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoZSBldmVudDogXCIgKyBhcmdzLm9iamVjdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWaWV3IHRoYXQgdHJpZ2dlcmVkIHRoZSBldmVudDogXCIgKyBhcmdzLnZpZXcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgbmFtZTogXCIgKyBhcmdzLmV2ZW50TmFtZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTd2lwZSBEaXJlY3Rpb246IFwiICsgYXJncy5kaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGFyZ3MuZGlyZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgYXBwLmFuZHJvaWQub24oYXBwLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0V2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy8gY2xlYW5pbmcgdXAgcmVmZXJlbmNlcy9saXN0ZW5lcnMuXHJcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGFwcC5hbmRyb2lkLm9mZihhcHAuQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGRpc2FibGUgYmFjayBidXR0b24gb24gYW5kcm9pZFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJncyBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYmFja0V2ZW50KGFyZ3MpIHtcclxuICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=