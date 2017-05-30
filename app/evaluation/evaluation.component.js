"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var data_service_1 = require("../shared/data/data.service");
var EvaluationComponent = (function () {
    function EvaluationComponent(patientService, route, dataService) {
        this.patientService = patientService;
        this.route = route;
        this.dataService = dataService;
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
        console.log(JSON.stringify(this.patientService.caregiverQuestionaires, null, 4));
        this.questionnaire = this.patientService.caregiverQuestionaires.filter(function (questionnaire) { return questionnaire.ref_questionnaire === ref_questionnaire + ""; })[0];
        //transform radio buttons
        this.transformRadioButtons();
        console.log("# COMPOMENTE EVALUATION [questionnaire] :" + ref_questionnaire + " " + this.questionnaire);
    };
    EvaluationComponent.prototype.transformRadioButtons = function () {
        this.questionnaire.questions.forEach(function (element) {
            if (element.type == "radio") {
                var a = element.values.split(";");
                a.pop();
                console.log("# COMPOMENTE EVALUATION valuesToRadio :" + a + " TAMANHO:" + a.length);
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
        //set questionnaire done
        this.questionnaire.done = true;
        this.dataService.updateQuizStatus(this.questionnaire);
        console.log("# Evaluation 0 -> " + this.questionnaire.questions[0].response);
        console.log("# Evaluation 0 -> " + this.questionnaire.questions[1].response);
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
        router_1.ActivatedRoute,
        data_service_1.DataService])
], EvaluationComponent);
exports.EvaluationComponent = EvaluationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmFsdWF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUtqRCw4REFBNEQ7QUFDNUQsNERBQTBEO0FBZ0IxRCxJQUFhLG1CQUFtQjtJQUk1Qiw2QkFDWSxjQUE4QixFQUM5QixLQUFxQixFQUNyQixXQUF3QjtRQUZ4QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDaEMsQ0FBQztJQUVMLHNDQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUE7UUFFdEMsOEVBQThFO1FBQzlFLHFFQUFxRTtRQUNyRTs7Ozs7Ozs7OzsyRkFVbUY7UUFFbkYsZUFBZTtRQUNmLElBQU0saUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUUzRSxtQkFBbUI7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxVQUFBLGFBQWEsSUFBSSxPQUFBLGFBQWEsQ0FBQyxpQkFBaUIsS0FBSyxpQkFBaUIsR0FBQyxFQUFFLEVBQXhELENBQXdELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVySix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsR0FBRSxpQkFBaUIsR0FBRyxHQUFHLEdBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFHRCxtREFBcUIsR0FBckI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBRXpDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxHQUFFLENBQUMsR0FBRyxXQUFXLEdBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUVsRixPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1lBRy9CLENBQUM7WUFBQyxJQUFJLENBQUEsQ0FBQztnQkFDSCxPQUFPLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUMzQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0Q7Ozs7O09BS0c7SUFDSCwrQ0FBaUIsR0FBakI7UUFFQSx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO1FBRTdCLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBR3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUU1RSxtRUFBbUU7SUFDckUsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQS9FRCxJQStFQztBQS9FWSxtQkFBbUI7SUFQL0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzVDLENBQUM7cUNBTzhCLGdDQUFjO1FBQ3ZCLHVCQUFjO1FBQ1IsMEJBQVc7R0FQM0IsbUJBQW1CLENBK0UvQjtBQS9FWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWwvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgRXZhbHVhdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL2V2YWx1YXRpb25cIjtcclxuaW1wb3J0IHsgTmVlZCB9IGZyb20gXCIuLi9uZWVkL25lZWRcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5pbXBvcnQgeyBvcGVuQXBwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1vcGVuLWFwcFwiO1xyXG5pbXBvcnQgeyBvcGVuVXJsIH0gZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcblxyXG5pbXBvcnQgeyBRdWVzdGlvbm5haXJlIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25uYWlyZVwiO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9uXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2V2YWx1YXRpb24nLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9ldmFsdWF0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2V2YWx1YXRpb24uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRXZhbHVhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiBcclxuICAgIHF1ZXN0aW9ubmFpcmU6IFF1ZXN0aW9ubmFpcmU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTkVOVCBFVkFMVUFUSU9OIFwiKVxyXG5cclxuICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICAgICAgICAvL3BhcmEgdGVzdGUgLT4gZGVwb2lzIHN1YnN0aXR1aXIgcGVsbyBmb3JtdWxhcmlvIHF1ZSB2ZW0gZG8gc2Vydmlkb3JcclxuICAgICAgICAvKnRoaXMuZXZhbHVhdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zLnB1c2gobmV3IEV2YWx1YXRpb24oKSlcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zWzBdLmlkID0gMDtcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zWzBdLmRlc2NyaXB0aW9uID0gXCJOaXZlbCBkZSBmYWNpbGlkYWRlXCI7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9ucy5wdXNoKG5ldyBFdmFsdWF0aW9uKCkpXHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9uc1sxXS5pZCA9IDE7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9uc1sxXS5kZXNjcmlwdGlvbiA9IFwiRXN0YSBhcHRvIHBhcmEgY29udGludWFyP1wiO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnMucHVzaChuZXcgRXZhbHVhdGlvbigpKVxyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnNbMl0uaWQgPSAyO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnNbMl0uZGVzY3JpcHRpb24gPSBcIlRlbSBleHBlcmllbmNpYSBuYSBhcGxpY2FjYW8gZGVzdGUgbWF0ZXJpYWwgP1wiO1xyXG4gICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgICAgIC8vcm91dGVyIHBhcmFtc1xyXG4gICAgICAgIGNvbnN0IHJlZl9xdWVzdGlvbm5haXJlID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wicmVmX3F1ZXN0aW9ubmFpcmVcIl07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9HZXQgUXVlc3Rpb25uYWlyZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMucGF0aWVudFNlcnZpY2UuY2FyZWdpdmVyUXVlc3Rpb25haXJlcywgbnVsbCwgNCkpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25uYWlyZSA9IHRoaXMucGF0aWVudFNlcnZpY2UuY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5maWx0ZXIocXVlc3Rpb25uYWlyZSA9PiBxdWVzdGlvbm5haXJlLnJlZl9xdWVzdGlvbm5haXJlID09PSByZWZfcXVlc3Rpb25uYWlyZStcIlwiKVswXTtcclxuICAgICAgICAgXHJcbiAgICAgICAgLy90cmFuc2Zvcm0gcmFkaW8gYnV0dG9uc1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtUmFkaW9CdXR0b25zKCk7XHJcbiAgICAgXHJcbiAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTUVOVEUgRVZBTFVBVElPTiBbcXVlc3Rpb25uYWlyZV0gOlwiKyByZWZfcXVlc3Rpb25uYWlyZSArIFwiIFwiICt0aGlzLnF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0cmFuc2Zvcm1SYWRpb0J1dHRvbnMoKXtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9ubmFpcmUucXVlc3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgIGlmIChlbGVtZW50LnR5cGU9PVwicmFkaW9cIikge1xyXG4gICAgICAgICAgICAgICB2YXIgYSA9IGVsZW1lbnQudmFsdWVzLnNwbGl0KFwiO1wiKTtcclxuICAgICAgICAgICAgICAgYS5wb3AoKTtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTUVOVEUgRVZBTFVBVElPTiB2YWx1ZXNUb1JhZGlvIDpcIiArYSArIFwiIFRBTUFOSE86XCIrIGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIGVsZW1lbnRbXCJ2YWx1ZXNUb1JhZGlvXCJdPWE7XHJcblxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgZWxlbWVudC5yZXNwb25zZSA9IFwiIFwiO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgRXZhbHVhdGlvbkNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBzdWJtZXRlckF2YWxpYWNhbygpIHtcclxuXHJcbiAgICAvL3NldCBxdWVzdGlvbm5haXJlIGRvbmVcclxuICAgIHRoaXMucXVlc3Rpb25uYWlyZS5kb25lPXRydWU7XHJcbiAgICBcclxuICAgIHRoaXMuZGF0YVNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyh0aGlzLnF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgXHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIiMgRXZhbHVhdGlvbiAwIC0+IFwiICsgdGhpcy5xdWVzdGlvbm5haXJlLnF1ZXN0aW9uc1swXS5yZXNwb25zZSlcclxuICAgICAgY29uc29sZS5sb2coXCIjIEV2YWx1YXRpb24gMCAtPiBcIiArIHRoaXMucXVlc3Rpb25uYWlyZS5xdWVzdGlvbnNbMV0ucmVzcG9uc2UpXHJcblxyXG4gICAgICAvLyAgY29uc29sZS5sb2coXCIjIEV2YWx1YXRpb24gMSAtPiBcIiArIHRoaXMuZXZhbHVhdGlvbnNbXS5yZXNwb25zZSlcclxuICAgIH1cclxuXHJcbn0iXX0=