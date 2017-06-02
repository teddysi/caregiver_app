"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var EvaluationListComponent = (function () {
    function EvaluationListComponent(patientService, route) {
        this.patientService = patientService;
        this.route = route;
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
        router_1.ActivatedRoute])
], EvaluationListComponent);
exports.EvaluationListComponent = EvaluationListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV2YWx1YXRpb24tbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFLakQsOERBQTREO0FBaUI1RCxJQUFhLHVCQUF1QjtJQU1oQyxpQ0FDWSxjQUE4QixFQUM5QixLQUFxQjtRQURyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFDN0IsQ0FBQztJQUVMLDBDQUFRLEdBQVI7UUFBQSxpQkFnQkM7UUFmRyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUE7UUFFNUMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxzQkFBc0IsR0FBQyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNuRixJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUMzQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzdDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ0gsNEVBQTRFO0lBQ2hGLENBQUM7SUFJTCw4QkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUEvQlksdUJBQXVCO0lBUG5DLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO0tBQ2pELENBQUM7cUNBUzhCLGdDQUFjO1FBQ3ZCLHVCQUFjO0dBUnhCLHVCQUF1QixDQStCbkM7QUEvQlksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IEV2YWx1YXRpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9ldmFsdWF0aW9uXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5pbXBvcnQgeyBvcGVuQXBwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1vcGVuLWFwcFwiO1xyXG5pbXBvcnQgeyBvcGVuVXJsIH0gZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgUXVlc3Rpb25uYWlyZSB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9ubmFpcmVcIjtcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvblwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdldmFsdWF0aW9uLWxpc3QnLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9ldmFsdWF0aW9uLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZXZhbHVhdGlvbi1saXN0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2YWx1YXRpb25MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHBhdGllbnRzOiBQYXRpZW50W107XHJcbiAgICBwdWJsaWMgY2FyZWdpdmVyUXVlc3Rpb25haXJlczogUXVlc3Rpb25uYWlyZVtdO1xyXG4gICAgcHVibGljIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXNUZW1wOiBRdWVzdGlvbm5haXJlW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiIyBDT01QT05FTlQgTElTVCBFVkFMVUFUSU9OUyBcIilcclxuXHJcbiAgICAgICAgLy9Pbmx5IHF1ZXN0aW9ubmFpcmVzIG5vdCBkb25lXHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzPVtdO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1RlbXAgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKCk7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzVGVtcC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQuZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLnB1c2goZWxlbWVudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50Lm5hbWUgKyBcIiAtPiBET05FOiBcIiArIGVsZW1lbnQuZG9uZSlcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiIyBRVUVTVElPTk5BSVJFUyA6XCIgKyB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMudG9TdHJpbmcoKSlcclxuICAgIH1cclxuXHJcblxyXG5cclxufSJdfQ==