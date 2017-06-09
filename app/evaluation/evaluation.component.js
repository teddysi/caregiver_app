"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var data_service_1 = require("../shared/data/data.service");
var router_2 = require("@angular/router");
var questionnaire_1 = require("../evaluation/questionnaire");
var connector_service_1 = require("../shared/connector/connector.service");
var dialogs = require("ui/dialogs");
var EvaluationComponent = (function () {
    function EvaluationComponent(patientService, route, router, dataService, connectorService) {
        this.patientService = patientService;
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.connectorService = connectorService;
        this.questionnaire = new questionnaire_1.Questionnaire();
    }
    EvaluationComponent.prototype.ngOnInit = function () {
        console.log("# COMPONENT EVALUATION ");
        //router params
        var ref_questionnaire = +this.route.snapshot.params["ref_questionnaire"];
        //Get Questionnaire
        //console.log(JSON.stringify(this.patientService.caregiverQuestionaires, null, 4));
        //this.questionnaire = this.patientService.caregiverQuestionaires.filter(questionnaire => questionnaire.ref_questionnaire === ref_questionnaire + "")[0];
        this.questionnaire = this.dataService.getQuizs().filter(function (questionnaire) { return questionnaire.ref_questionnaire === ref_questionnaire + ""; })[0];
        //transform radio buttons
        this.transformRadioButtons();
        console.log("# COMPOMENTE EVALUATION [questionnaire] :" + ref_questionnaire + " " + this.questionnaire);
    };
    /**
     * Funtion to create array of values to put on radiobutton's questions
     *
     *
     * @memberof EvaluationComponent
     */
    EvaluationComponent.prototype.transformRadioButtons = function () {
        this.questionnaire.questions.forEach(function (element) {
            if (element.type == "radio") {
                var a = element.values.split(";");
                a.pop();
                // console.log("# COMPOMENTE EVALUATION valuesToRadio :" + a + " TAMANHO:" + a.length);
                element["valuesToRadio"] = a;
            }
        });
    };
    /**
     *
     *
     * @param {any} response  response of the radiobutton question
     * @param {any} indexQuestion index of the question of questionnaire
     *
     * @memberof EvaluationComponent
     */
    EvaluationComponent.prototype.setResponse = function (response, indexQuestion) {
        this.questionnaire.questions[indexQuestion].response = indexQuestion;
    };
    /**
     *
     *
     * FÕ,Nuntion to save evaluation
     *
     * @memberof EvaluationComponent
     */
    EvaluationComponent.prototype.submmitEvaluation = function () {
        //set questionnaire done
        //this.questionnaire.done = true;
        //update local data
        //console.log(JSON.stringify(this.questionnaire), null, 4);
        this.patientService.updateQuizStatus(this.questionnaire);
        //test connection
        if (!this.connectorService.isConnected()) {
            dialogs.alert({
                title: "Aviso - Avaliações ",
                message: "Encontra-se sem acesso à internet. O seu questionário apena será submetido quando tiver novamente acesso.",
                okButtonText: "OK"
            });
        }
        //return to the list od of questionnaires
        this.router.navigate(['/evaluations']);
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
        router_2.Router,
        data_service_1.DataService,
        connector_service_1.ConnectorService])
], EvaluationComponent);
exports.EvaluationComponent = EvaluationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmFsdWF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUtqRCw4REFBNEQ7QUFDNUQsNERBQTBEO0FBSTFELDBDQUF5QztBQUV6Qyw2REFBNEQ7QUFHNUQsMkVBQXlFO0FBQ3pFLG9DQUF1QztBQVd2QyxJQUFhLG1CQUFtQjtJQUk1Qiw2QkFDWSxjQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDO1FBSmxDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUUxQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO1FBRXRDLGVBQWU7UUFDZixJQUFNLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFM0UsbUJBQW1CO1FBQ25CLG1GQUFtRjtRQUNuRix5SkFBeUo7UUFDekosSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFBLGFBQWEsSUFBSSxPQUFBLGFBQWEsQ0FBQyxpQkFBaUIsS0FBSyxpQkFBaUIsR0FBRyxFQUFFLEVBQTFELENBQTBELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4SSx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsR0FBRyxpQkFBaUIsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRzVHLENBQUM7SUFLRDs7Ozs7T0FLRztJQUNILG1EQUFxQixHQUFyQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNULHVGQUF1RjtnQkFDdEYsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBS0Q7Ozs7Ozs7T0FPRztJQUNJLHlDQUFXLEdBQWxCLFVBQW1CLFFBQVEsRUFBRSxhQUFhO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILCtDQUFpQixHQUFqQjtRQUNJLHdCQUF3QjtRQUN4QixpQ0FBaUM7UUFDakMsbUJBQW1CO1FBQ25CLDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUd6RCxpQkFBaUI7UUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsT0FBTyxFQUFFLDJHQUEyRztnQkFDcEgsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELHlDQUF5QztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQS9GRCxJQStGQztBQS9GWSxtQkFBbUI7SUFQL0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzVDLENBQUM7cUNBTzhCLGdDQUFjO1FBQ3ZCLHVCQUFjO1FBQ2IsZUFBTTtRQUNELDBCQUFXO1FBQ04sb0NBQWdCO0dBVHJDLG1CQUFtQixDQStGL0I7QUEvRlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IEV2YWx1YXRpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9ldmFsdWF0aW9uXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgYnV0dG9uTW9kdWxlID0gcmVxdWlyZShcInVpL2J1dHRvblwiKTtcclxuaW1wb3J0IHsgb3BlbkFwcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtb3Blbi1hcHBcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBRdWVzdGlvbm5haXJlIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25uYWlyZVwiO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9uXCI7XHJcblxyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2V2YWx1YXRpb24nLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9ldmFsdWF0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2V2YWx1YXRpb24uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRXZhbHVhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcXVlc3Rpb25uYWlyZTogUXVlc3Rpb25uYWlyZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbm5haXJlID0gbmV3IFF1ZXN0aW9ubmFpcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5UIEVWQUxVQVRJT04gXCIpXHJcbiAgICAgICBcclxuICAgICAgICAvL3JvdXRlciBwYXJhbXNcclxuICAgICAgICBjb25zdCByZWZfcXVlc3Rpb25uYWlyZSA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcInJlZl9xdWVzdGlvbm5haXJlXCJdO1xyXG5cclxuICAgICAgICAvL0dldCBRdWVzdGlvbm5haXJlXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnBhdGllbnRTZXJ2aWNlLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMsIG51bGwsIDQpKTtcclxuICAgICAgICAvL3RoaXMucXVlc3Rpb25uYWlyZSA9IHRoaXMucGF0aWVudFNlcnZpY2UuY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5maWx0ZXIocXVlc3Rpb25uYWlyZSA9PiBxdWVzdGlvbm5haXJlLnJlZl9xdWVzdGlvbm5haXJlID09PSByZWZfcXVlc3Rpb25uYWlyZSArIFwiXCIpWzBdO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25uYWlyZSA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0UXVpenMoKS5maWx0ZXIocXVlc3Rpb25uYWlyZSA9PiBxdWVzdGlvbm5haXJlLnJlZl9xdWVzdGlvbm5haXJlID09PSByZWZfcXVlc3Rpb25uYWlyZSArIFwiXCIpWzBdO1xyXG4gICAgICAgIC8vdHJhbnNmb3JtIHJhZGlvIGJ1dHRvbnNcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybVJhZGlvQnV0dG9ucygpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9NRU5URSBFVkFMVUFUSU9OIFtxdWVzdGlvbm5haXJlXSA6XCIgKyByZWZfcXVlc3Rpb25uYWlyZSArIFwiIFwiICsgdGhpcy5xdWVzdGlvbm5haXJlKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVudGlvbiB0byBjcmVhdGUgYXJyYXkgb2YgdmFsdWVzIHRvIHB1dCBvbiByYWRpb2J1dHRvbidzIHF1ZXN0aW9uc1xyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBFdmFsdWF0aW9uQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHRyYW5zZm9ybVJhZGlvQnV0dG9ucygpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9ubmFpcmUucXVlc3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnR5cGUgPT0gXCJyYWRpb1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYSA9IGVsZW1lbnQudmFsdWVzLnNwbGl0KFwiO1wiKTtcclxuICAgICAgICAgICAgICAgIGEucG9wKCk7XHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIyBDT01QT01FTlRFIEVWQUxVQVRJT04gdmFsdWVzVG9SYWRpbyA6XCIgKyBhICsgXCIgVEFNQU5ITzpcIiArIGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRbXCJ2YWx1ZXNUb1JhZGlvXCJdID0gYTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzcG9uc2UgIHJlc3BvbnNlIG9mIHRoZSByYWRpb2J1dHRvbiBxdWVzdGlvblxyXG4gICAgICogQHBhcmFtIHthbnl9IGluZGV4UXVlc3Rpb24gaW5kZXggb2YgdGhlIHF1ZXN0aW9uIG9mIHF1ZXN0aW9ubmFpcmVcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIEV2YWx1YXRpb25Db21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFJlc3BvbnNlKHJlc3BvbnNlLCBpbmRleFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbm5haXJlLnF1ZXN0aW9uc1tpbmRleFF1ZXN0aW9uXS5yZXNwb25zZSA9IGluZGV4UXVlc3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogICBcclxuICAgICAqIEbDlSxOdW50aW9uIHRvIHNhdmUgZXZhbHVhdGlvblxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgRXZhbHVhdGlvbkNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBzdWJtbWl0RXZhbHVhdGlvbigpIHtcclxuICAgICAgICAvL3NldCBxdWVzdGlvbm5haXJlIGRvbmVcclxuICAgICAgICAvL3RoaXMucXVlc3Rpb25uYWlyZS5kb25lID0gdHJ1ZTtcclxuICAgICAgICAvL3VwZGF0ZSBsb2NhbCBkYXRhXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnF1ZXN0aW9ubmFpcmUpLCBudWxsLCA0KTtcclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnVwZGF0ZVF1aXpTdGF0dXModGhpcy5xdWVzdGlvbm5haXJlKTtcclxuICAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgIC8vdGVzdCBjb25uZWN0aW9uXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkF2aXNvIC0gQXZhbGlhw6fDtWVzIFwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFbmNvbnRyYS1zZSBzZW0gYWNlc3NvIMOgIGludGVybmV0LiBPIHNldSBxdWVzdGlvbsOhcmlvIGFwZW5hIHNlcsOhIHN1Ym1ldGlkbyBxdWFuZG8gdGl2ZXIgbm92YW1lbnRlIGFjZXNzby5cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JldHVybiB0byB0aGUgbGlzdCBvZCBvZiBxdWVzdGlvbm5haXJlc1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2V2YWx1YXRpb25zJ10pO1xyXG4gICAgfVxyXG5cclxufSJdfQ==