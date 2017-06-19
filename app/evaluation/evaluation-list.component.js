"use strict";
var core_1 = require("@angular/core");
var app = require("application");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var connector_service_1 = require("../shared/connector/connector.service");
var EvaluationListComponent = (function () {
    function EvaluationListComponent(patientService, route, connectorService) {
        this.patientService = patientService;
        this.route = route;
        this.connectorService = connectorService;
    }
    EvaluationListComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("# COMPONENT LIST EVALUATIONS ");
        //Only questionnaires not done
        this.caregiverQuestionaires = [];
        this.caregiverQuestionairesTemp = this.patientService.getCaregiverQuestionnaires();
        this.caregiverQuestionairesTemp.forEach(function (element) {
            if (!element.done) {
                _this.caregiverQuestionaires.push(element);
            }
        });
        this.caregiverQuestionaires.forEach(function (element) {
            console.log(element.name + " -> DONE: " + element.done);
        });
        //console.log("# QUESTIONNAIRES :" + this.caregiverQuestionaires.toString())
        //test connection
        if (!this.connectorService.isConnected()) {
            this.patientService.displayNotification('no net quizs');
        }
    };
    EvaluationListComponent.prototype.ngAfterViewInit = function () {
        if (app.android) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    };
    EvaluationListComponent.prototype.ngOnDestroy = function () {
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
    EvaluationListComponent.prototype.backEvent = function (args) {
        args.cancel = true;
        return;
    };
    return EvaluationListComponent;
}());
EvaluationListComponent = __decorate([
    core_1.Component({
        selector: 'evaluation-list',
        moduleId: module.id,
        templateUrl: './evaluation-list.component.html',
        styleUrls: ['./evaluation-list.component.css']
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.ActivatedRoute,
        connector_service_1.ConnectorService])
], EvaluationListComponent);
exports.EvaluationListComponent = EvaluationListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV2YWx1YXRpb24tbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCxpQ0FBb0M7QUFDcEMsMENBQWlEO0FBS2pELDhEQUE0RDtBQVM1RCwyRUFBeUU7QUFXekUsSUFBYSx1QkFBdUI7SUFNaEMsaUNBQ1ksY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsZ0JBQWtDO1FBRmxDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBRTFDLENBQUM7SUFFTCwwQ0FBUSxHQUFSO1FBQUEsaUJBc0JDO1FBckJHLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQTtRQUU1Qyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLHNCQUFzQixHQUFDLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ25GLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDN0MsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDSCw0RUFBNEU7UUFFNUUsaUJBQWlCO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNELENBQUM7SUFFTCxDQUFDO0lBRUQsaURBQWUsR0FBZjtRQUNJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRixDQUFDO0lBQ0wsQ0FBQztJQUVELDZDQUFXLEdBQVg7UUFDSSxvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILDJDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsTUFBTSxDQUFDO0lBRVgsQ0FBQztJQUtMLDhCQUFDO0FBQUQsQ0FBQyxBQW5FRCxJQW1FQztBQW5FWSx1QkFBdUI7SUFQbkMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsU0FBUyxFQUFFLENBQUMsaUNBQWlDLENBQUM7S0FDakQsQ0FBQztxQ0FTOEIsZ0NBQWM7UUFDdkIsdUJBQWM7UUFDSCxvQ0FBZ0I7R0FUckMsdUJBQXVCLENBbUVuQztBQW5FWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWwvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgRXZhbHVhdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL2V2YWx1YXRpb25cIjtcclxuaW1wb3J0IHsgTmVlZCB9IGZyb20gXCIuLi9uZWVkL25lZWRcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBRdWVzdGlvbm5haXJlIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25uYWlyZVwiO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9uXCI7XHJcblxyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZXZhbHVhdGlvbi1saXN0JyxcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZXZhbHVhdGlvbi1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2V2YWx1YXRpb24tbGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmFsdWF0aW9uTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwYXRpZW50czogUGF0aWVudFtdO1xyXG4gICAgcHVibGljIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXM6IFF1ZXN0aW9ubmFpcmVbXTtcclxuICAgIHB1YmxpYyBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzVGVtcDogUXVlc3Rpb25uYWlyZVtdO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2VcclxuICAgICAgICBcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTkVOVCBMSVNUIEVWQUxVQVRJT05TIFwiKVxyXG5cclxuICAgICAgICAvL09ubHkgcXVlc3Rpb25uYWlyZXMgbm90IGRvbmVcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXM9W107XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzVGVtcCA9IHRoaXMucGF0aWVudFNlcnZpY2UuZ2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMoKTtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNUZW1wLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5kb25lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMucHVzaChlbGVtZW50KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQubmFtZSArIFwiIC0+IERPTkU6IFwiICsgZWxlbWVudC5kb25lKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIjIFFVRVNUSU9OTkFJUkVTIDpcIiArIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcy50b1N0cmluZygpKVxyXG5cclxuICAgICAgICAvL3Rlc3QgY29ubmVjdGlvblxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHsgICAgICAgXHJcbiAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5kaXNwbGF5Tm90aWZpY2F0aW9uKCdubyBuZXQgcXVpenMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgYXBwLmFuZHJvaWQub24oYXBwLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0V2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy8gY2xlYW5pbmcgdXAgcmVmZXJlbmNlcy9saXN0ZW5lcnMuXHJcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGFwcC5hbmRyb2lkLm9mZihhcHAuQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGRpc2FibGUgYmFjayBidXR0b24gb24gYW5kcm9pZFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJncyBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYmFja0V2ZW50KGFyZ3MpIHtcclxuICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn0iXX0=