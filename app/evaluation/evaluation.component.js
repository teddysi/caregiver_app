"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var EvaluationComponent = (function () {
    function EvaluationComponent(patientService, route) {
        this.patientService = patientService;
        this.route = route;
    }
    EvaluationComponent.prototype.ngOnInit = function () {
        console.log("# COMPONENT EVALUATION ");
        //************************************************************************* */
        //para teste -> depois substituir pelo formulario que vem do servidor
        /*this.evaluations = [];
        this.evaluations.push(new Evaluation())
        this.evaluations[0].id = 0;
        this.evaluations[0].description = "Nivel de facilidade";
        this.evaluations.push(new Evaluation())
        this.evaluations[1].id = 1;
        this.evaluations[1].description = "Esta apto para continuar?";
        this.evaluations.push(new Evaluation())
        this.evaluations[2].id = 2;
        this.evaluations[2].description = "Tem experiencia na aplicacao deste material ?";
        //****************************************************************************** */
        //router params
        var ref_questionnaire = +this.route.snapshot.params["ref_questionnaire"];
        //Get Questionnaire
        this.questionnaire = this.patientService.caregiverQuestionaires.filter(function (questionnaire) { return questionnaire.ref_questionnaire === ref_questionnaire + ""; })[0];
        //transform radio buttons
        this.transformRadioButtons();
        console.log("# COMPOMENTE EVALUATION [questionnaire] :" + ref_questionnaire + " " + this.questionnaire);
    };
    EvaluationComponent.prototype.transformRadioButtons = function () {
        this.questionnaire.questions.forEach(function (element) {
            if (element.type == "radio") {
                var a = element.values.split(";");
                console.log("# COMPOMENTE EVALUATION valuesToRadio :" + a);
                a.pop();
                element["valuesToRadio"] = a;
            }
            else {
                element.response = " ";
            }
        });
    };
    /**
     *
     *
     *
     * @memberof EvaluationComponent
     */
    EvaluationComponent.prototype.submeterAvaliacao = function () {
        console.log("# Evaluation 0 -> " + this.questionnaire.questions[0].response);
        console.log("# Evaluation 0 -> " + this.questionnaire.questions[1].response);
        console.log("# Evaluation 0 -> " + this.questionnaire.questions[2].response);
        //  console.log("# Evaluation 1 -> " + this.evaluations[].response)
    };
    return EvaluationComponent;
}());
EvaluationComponent = __decorate([
    core_1.Component({
        selector: 'evaluation',
        moduleId: module.id,
        templateUrl: './evaluation.component.html',
        styleUrls: ['./evaluation.component.css']
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.ActivatedRoute])
], EvaluationComponent);
exports.EvaluationComponent = EvaluationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmFsdWF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUtqRCw4REFBNEQ7QUFnQjVELElBQWEsbUJBQW1CO0lBSTVCLDZCQUNZLGNBQThCLEVBQzlCLEtBQXFCO1FBRHJCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUM3QixDQUFDO0lBRUwsc0NBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQTtRQUV0Qyw4RUFBOEU7UUFDOUUscUVBQXFFO1FBQ3JFOzs7Ozs7Ozs7OzJGQVVtRjtRQUVuRixlQUFlO1FBQ2YsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTNFLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFVBQUEsYUFBYSxJQUFJLE9BQUEsYUFBYSxDQUFDLGlCQUFpQixLQUFLLGlCQUFpQixHQUFDLEVBQUUsRUFBeEQsQ0FBd0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJKLHlCQUF5QjtRQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUVoQyxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxHQUFFLGlCQUFpQixHQUFHLEdBQUcsR0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkcsQ0FBQztJQUdELG1EQUFxQixHQUFyQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFFekMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsR0FBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNSLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBQyxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUFDLElBQUksQ0FBQSxDQUFDO2dCQUNILE9BQU8sQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQzNCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNILCtDQUFpQixHQUFqQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzVFLG1FQUFtRTtJQUNyRSxDQUFDO0lBRUwsMEJBQUM7QUFBRCxDQUFDLEFBbkVELElBbUVDO0FBbkVZLG1CQUFtQjtJQVAvQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7S0FDNUMsQ0FBQztxQ0FPOEIsZ0NBQWM7UUFDdkIsdUJBQWM7R0FOeEIsbUJBQW1CLENBbUUvQjtBQW5FWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWwvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgRXZhbHVhdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL2V2YWx1YXRpb25cIjtcclxuaW1wb3J0IHsgTmVlZCB9IGZyb20gXCIuLi9uZWVkL25lZWRcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcbmltcG9ydCB7IFF1ZXN0aW9ubmFpcmUgfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvbm5haXJlXCI7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25cIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZXZhbHVhdGlvbicsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2V2YWx1YXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZXZhbHVhdGlvbi5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmFsdWF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuIFxyXG4gICAgcXVlc3Rpb25uYWlyZTogUXVlc3Rpb25uYWlyZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5UIEVWQUxVQVRJT04gXCIpXHJcblxyXG4gICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgICAgIC8vcGFyYSB0ZXN0ZSAtPiBkZXBvaXMgc3Vic3RpdHVpciBwZWxvIGZvcm11bGFyaW8gcXVlIHZlbSBkbyBzZXJ2aWRvclxyXG4gICAgICAgIC8qdGhpcy5ldmFsdWF0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnMucHVzaChuZXcgRXZhbHVhdGlvbigpKVxyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnNbMF0uaWQgPSAwO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnNbMF0uZGVzY3JpcHRpb24gPSBcIk5pdmVsIGRlIGZhY2lsaWRhZGVcIjtcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zLnB1c2gobmV3IEV2YWx1YXRpb24oKSlcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zWzFdLmlkID0gMTtcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zWzFdLmRlc2NyaXB0aW9uID0gXCJFc3RhIGFwdG8gcGFyYSBjb250aW51YXI/XCI7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9ucy5wdXNoKG5ldyBFdmFsdWF0aW9uKCkpXHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9uc1syXS5pZCA9IDI7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9uc1syXS5kZXNjcmlwdGlvbiA9IFwiVGVtIGV4cGVyaWVuY2lhIG5hIGFwbGljYWNhbyBkZXN0ZSBtYXRlcmlhbCA/XCI7XHJcbiAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICAgICAgLy9yb3V0ZXIgcGFyYW1zXHJcbiAgICAgICAgY29uc3QgcmVmX3F1ZXN0aW9ubmFpcmUgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJyZWZfcXVlc3Rpb25uYWlyZVwiXTtcclxuICAgICAgICBcclxuICAgICAgICAvL0dldCBRdWVzdGlvbm5haXJlXHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbm5haXJlID0gdGhpcy5wYXRpZW50U2VydmljZS5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmZpbHRlcihxdWVzdGlvbm5haXJlID0+IHF1ZXN0aW9ubmFpcmUucmVmX3F1ZXN0aW9ubmFpcmUgPT09IHJlZl9xdWVzdGlvbm5haXJlK1wiXCIpWzBdO1xyXG4gICAgICAgICBcclxuICAgICAgICAvL3RyYW5zZm9ybSByYWRpbyBidXR0b25zXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1SYWRpb0J1dHRvbnMoKTtcclxuICAgICBcclxuICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9NRU5URSBFVkFMVUFUSU9OIFtxdWVzdGlvbm5haXJlXSA6XCIrIHJlZl9xdWVzdGlvbm5haXJlICsgXCIgXCIgK3RoaXMucXVlc3Rpb25uYWlyZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRyYW5zZm9ybVJhZGlvQnV0dG9ucygpe1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25uYWlyZS5xdWVzdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgaWYgKGVsZW1lbnQudHlwZT09XCJyYWRpb1wiKSB7XHJcbiAgICAgICAgICAgICAgIHZhciBhID0gZWxlbWVudC52YWx1ZXMuc3BsaXQoXCI7XCIpO1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9NRU5URSBFVkFMVUFUSU9OIHZhbHVlc1RvUmFkaW8gOlwiICthKTtcclxuICAgICAgICAgICAgICAgYS5wb3AoKTtcclxuICAgICAgICAgICAgICAgZWxlbWVudFtcInZhbHVlc1RvUmFkaW9cIl09YTtcclxuICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgIGVsZW1lbnQucmVzcG9uc2UgPSBcIiBcIjtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIEV2YWx1YXRpb25Db21wb25lbnRcclxuICAgICAqL1xyXG4gICAgc3VibWV0ZXJBdmFsaWFjYW8oKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiIyBFdmFsdWF0aW9uIDAgLT4gXCIgKyB0aGlzLnF1ZXN0aW9ubmFpcmUucXVlc3Rpb25zWzBdLnJlc3BvbnNlKVxyXG4gICAgICBjb25zb2xlLmxvZyhcIiMgRXZhbHVhdGlvbiAwIC0+IFwiICsgdGhpcy5xdWVzdGlvbm5haXJlLnF1ZXN0aW9uc1sxXS5yZXNwb25zZSlcclxuICAgICAgY29uc29sZS5sb2coXCIjIEV2YWx1YXRpb24gMCAtPiBcIiArIHRoaXMucXVlc3Rpb25uYWlyZS5xdWVzdGlvbnNbMl0ucmVzcG9uc2UpXHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyhcIiMgRXZhbHVhdGlvbiAxIC0+IFwiICsgdGhpcy5ldmFsdWF0aW9uc1tdLnJlc3BvbnNlKVxyXG4gICAgfVxyXG5cclxufSJdfQ==