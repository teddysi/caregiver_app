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
    EvaluationListComponent.prototype.getQuizLabel = function (quizType) {
        switch (quizType) {
            case 'caregiver': return 'Cuidador';
            case 'material': return 'Material';
            case 'patient': return 'Paciente';
            default:
                return 'Sem nome';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV2YWx1YXRpb24tbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCxpQ0FBb0M7QUFDcEMsMENBQWlEO0FBS2pELDhEQUE0RDtBQVM1RCwyRUFBeUU7QUFXekUsSUFBYSx1QkFBdUI7SUFNaEMsaUNBQ1ksY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsZ0JBQWtDO1FBRmxDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBRTFDLENBQUM7SUFFTCwwQ0FBUSxHQUFSO1FBQUEsaUJBc0JDO1FBckJHLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQTtRQUU1Qyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLHNCQUFzQixHQUFDLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ25GLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDN0MsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDSCw0RUFBNEU7UUFFNUUsaUJBQWlCO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNELENBQUM7SUFFTCxDQUFDO0lBQ0QsOENBQVksR0FBWixVQUFhLFFBQVE7UUFDakIsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssV0FBVyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEMsS0FBSyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxLQUFLLFNBQVMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDO1lBRWxDO2dCQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDMUIsQ0FBQztJQUNMLENBQUM7SUFFRCxpREFBZSxHQUFmO1FBQ0ksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7SUFDTCxDQUFDO0lBRUQsNkNBQVcsR0FBWDtRQUNJLG9DQUFvQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNkLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckYsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsMkNBQVMsR0FBVCxVQUFVLElBQUk7UUFDVixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixNQUFNLENBQUM7SUFFWCxDQUFDO0lBS0wsOEJBQUM7QUFBRCxDQUFDLEFBN0VELElBNkVDO0FBN0VZLHVCQUF1QjtJQVBuQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLGtDQUFrQztRQUMvQyxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztLQUNqRCxDQUFDO3FDQVM4QixnQ0FBYztRQUN2Qix1QkFBYztRQUNILG9DQUFnQjtHQVRyQyx1QkFBdUIsQ0E2RW5DO0FBN0VZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbC9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBFdmFsdWF0aW9uIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vZXZhbHVhdGlvblwiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgYnV0dG9uTW9kdWxlID0gcmVxdWlyZShcInVpL2J1dHRvblwiKTtcclxuaW1wb3J0IHsgb3BlbkFwcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtb3Blbi1hcHBcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5cclxuXHJcbmltcG9ydCB7IFF1ZXN0aW9ubmFpcmUgfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvbm5haXJlXCI7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25cIjtcclxuXHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdldmFsdWF0aW9uLWxpc3QnLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9ldmFsdWF0aW9uLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZXZhbHVhdGlvbi1saXN0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2YWx1YXRpb25MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHBhdGllbnRzOiBQYXRpZW50W107XHJcbiAgICBwdWJsaWMgY2FyZWdpdmVyUXVlc3Rpb25haXJlczogUXVlc3Rpb25uYWlyZVtdO1xyXG4gICAgcHVibGljIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXNUZW1wOiBRdWVzdGlvbm5haXJlW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZVxyXG4gICAgICAgIFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5UIExJU1QgRVZBTFVBVElPTlMgXCIpXHJcblxyXG4gICAgICAgIC8vT25seSBxdWVzdGlvbm5haXJlcyBub3QgZG9uZVxyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcz1bXTtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNUZW1wID0gdGhpcy5wYXRpZW50U2VydmljZS5nZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcygpO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1RlbXAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKCFlbGVtZW50LmRvbmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5wdXNoKGVsZW1lbnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudC5uYW1lICsgXCIgLT4gRE9ORTogXCIgKyBlbGVtZW50LmRvbmUpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiMgUVVFU1RJT05OQUlSRVMgOlwiICsgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLnRvU3RyaW5nKCkpXHJcblxyXG4gICAgICAgIC8vdGVzdCBjb25uZWN0aW9uXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSkgeyAgICAgICBcclxuICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmRpc3BsYXlOb3RpZmljYXRpb24oJ25vIG5ldCBxdWl6cycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBnZXRRdWl6TGFiZWwocXVpelR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHF1aXpUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2NhcmVnaXZlcic6IHJldHVybiAnQ3VpZGFkb3InO1xyXG4gICAgICAgICAgICBjYXNlICdtYXRlcmlhbCc6IHJldHVybiAnTWF0ZXJpYWwnO1xyXG4gICAgICAgICAgICBjYXNlICdwYXRpZW50JzogcmV0dXJuICdQYWNpZW50ZSc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1NlbSBub21lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICBhcHAuYW5kcm9pZC5vbihhcHAuQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICAvLyBjbGVhbmluZyB1cCByZWZlcmVuY2VzL2xpc3RlbmVycy5cclxuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgYXBwLmFuZHJvaWQub2ZmKGFwcC5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLmJhY2tFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gZGlzYWJsZSBiYWNrIGJ1dHRvbiBvbiBhbmRyb2lkXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBhcmdzIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBiYWNrRXZlbnQoYXJncykge1xyXG4gICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxufSJdfQ==