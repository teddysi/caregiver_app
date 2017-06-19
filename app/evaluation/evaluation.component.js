"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app = require("application");
var patient_service_1 = require("../patient/patient.service");
var data_service_1 = require("../shared/data/data.service");
var router_2 = require("@angular/router");
var questionnaire_1 = require("../evaluation/questionnaire");
var connector_service_1 = require("../shared/connector/connector.service");
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
        //console.log("# COMPONENT EVALUATION ")
        //router params
        var ref_questionnaire = +this.route.snapshot.params["ref_questionnaire"];
        //console.log("REF_QUEST: " + ref_questionnaire);
        //Dá erro depois de apagar um questionário, no caso de ficar com a mesma ref
        this.questionnaire = this.dataService.getQuizs().filter(function (questionnaire) { return questionnaire.ref_questionnaire === ref_questionnaire + ""; })[0];
        //transform radio buttons
        this.transformRadioButtons();
        //console.log("# COMPOMENTE EVALUATION [questionnaire] :" + ref_questionnaire + " " + this.questionnaire);
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
                // //console.log("# COMPOMENTE EVALUATION valuesToRadio :" + a + " TAMANHO:" + a.length);
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
        console.log("RESPONSE DE RADIO BUTTONS: " + response);
        this.questionnaire.questions[indexQuestion].response = response;
    };
    /**
     *
     *
     * FÕ,Nuntion to save evaluation
     *
     * @memberof EvaluationComponent
     */
    EvaluationComponent.prototype.submitEvaluation = function (questionnaire) {
        //set questionnaire done
        this.questionnaire.done = true;
        for (var i = 0; i < this.questionnaire.questions.length; i++) {
            if (this.questionnaire.questions[i]['valuesToRadio']) {
                for (var j = 0; j < this.questionnaire.questions[i]['valuesToRadio'].length; j++) {
                    //console.log( this.questionnaire.questions[i]['valuesToRadio'].length);
                    if (this.questionnaire.questions[i]['valuesToRadio'][j] === questionnaire.questions[i].response) {
                        this.questionnaire.questions[i].response = j.toString();
                    }
                }
            }
        }
        //update local data
        ////console.log(JSON.stringify(this.questionnaire), null, 4);
        this.patientService.updateQuizStatus(this.questionnaire);
        //test connection
        if (!this.connectorService.isConnected()) {
            this.patientService.displayNotification('no net quizs');
        }
        //return to the list od of questionnaires
        this.router.navigate(['/patients']);
    };
    EvaluationComponent.prototype.ngAfterViewInit = function () {
        if (app.android) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    };
    EvaluationComponent.prototype.ngOnDestroy = function () {
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
    EvaluationComponent.prototype.backEvent = function (args) {
        args.cancel = true;
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmFsdWF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCxpQ0FBb0M7QUFLcEMsOERBQTREO0FBQzVELDREQUEwRDtBQUkxRCwwQ0FBeUM7QUFFekMsNkRBQTREO0FBRzVELDJFQUF5RTtBQVl6RSxJQUFhLG1CQUFtQjtJQUk1Qiw2QkFDWSxjQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDO1FBSmxDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUUxQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0ksd0NBQXdDO1FBRXhDLGVBQWU7UUFDZixJQUFNLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDM0UsaURBQWlEO1FBQ2pELDRFQUE0RTtRQUM1RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQUEsYUFBYSxJQUFJLE9BQUEsYUFBYSxDQUFDLGlCQUFpQixLQUFLLGlCQUFpQixHQUFHLEVBQUUsRUFBMUQsQ0FBMEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hJLHlCQUF5QjtRQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QiwwR0FBMEc7SUFHOUcsQ0FBQztJQUtEOzs7OztPQUtHO0lBQ0gsbURBQXFCLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1QseUZBQXlGO2dCQUN4RixPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFLRDs7Ozs7OztPQU9HO0lBQ0kseUNBQVcsR0FBbEIsVUFBbUIsUUFBUSxFQUFFLGFBQWE7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCw4Q0FBZ0IsR0FBaEIsVUFBaUIsYUFBYTtRQUMxQix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQy9CLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNsRix3RUFBd0U7b0JBQ3BFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDN0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDNUQsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFDRCxtQkFBbUI7UUFDbkIsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBR3pELGlCQUFpQjtRQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsNkNBQWUsR0FBZjtRQUNJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRixDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDSSxvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILHVDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsTUFBTSxDQUFDO0lBRVgsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQS9IRCxJQStIQztBQS9IWSxtQkFBbUI7SUFQL0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzVDLENBQUM7cUNBTzhCLGdDQUFjO1FBQ3ZCLHVCQUFjO1FBQ2IsZUFBTTtRQUNELDBCQUFXO1FBQ04sb0NBQWdCO0dBVHJDLG1CQUFtQixDQStIL0I7QUEvSFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IEV2YWx1YXRpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9ldmFsdWF0aW9uXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgYnV0dG9uTW9kdWxlID0gcmVxdWlyZShcInVpL2J1dHRvblwiKTtcclxuaW1wb3J0IHsgb3BlbkFwcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtb3Blbi1hcHBcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBRdWVzdGlvbm5haXJlIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25uYWlyZVwiO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9uXCI7XHJcblxyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2V2YWx1YXRpb24nLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9ldmFsdWF0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2V2YWx1YXRpb24uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRXZhbHVhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcXVlc3Rpb25uYWlyZTogUXVlc3Rpb25uYWlyZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbm5haXJlID0gbmV3IFF1ZXN0aW9ubmFpcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiIyBDT01QT05FTlQgRVZBTFVBVElPTiBcIilcclxuICAgICAgIFxyXG4gICAgICAgIC8vcm91dGVyIHBhcmFtc1xyXG4gICAgICAgIGNvbnN0IHJlZl9xdWVzdGlvbm5haXJlID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wicmVmX3F1ZXN0aW9ubmFpcmVcIl07XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJFRl9RVUVTVDogXCIgKyByZWZfcXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgLy9Ew6EgZXJybyBkZXBvaXMgZGUgYXBhZ2FyIHVtIHF1ZXN0aW9uw6FyaW8sIG5vIGNhc28gZGUgZmljYXIgY29tIGEgbWVzbWEgcmVmXHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbm5haXJlID0gdGhpcy5kYXRhU2VydmljZS5nZXRRdWl6cygpLmZpbHRlcihxdWVzdGlvbm5haXJlID0+IHF1ZXN0aW9ubmFpcmUucmVmX3F1ZXN0aW9ubmFpcmUgPT09IHJlZl9xdWVzdGlvbm5haXJlICsgXCJcIilbMF07XHJcbiAgICAgICAgLy90cmFuc2Zvcm0gcmFkaW8gYnV0dG9uc1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtUmFkaW9CdXR0b25zKCk7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIjIENPTVBPTUVOVEUgRVZBTFVBVElPTiBbcXVlc3Rpb25uYWlyZV0gOlwiICsgcmVmX3F1ZXN0aW9ubmFpcmUgKyBcIiBcIiArIHRoaXMucXVlc3Rpb25uYWlyZSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bnRpb24gdG8gY3JlYXRlIGFycmF5IG9mIHZhbHVlcyB0byBwdXQgb24gcmFkaW9idXR0b24ncyBxdWVzdGlvbnNcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgRXZhbHVhdGlvbkNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICB0cmFuc2Zvcm1SYWRpb0J1dHRvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbm5haXJlLnF1ZXN0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC50eXBlID09IFwicmFkaW9cIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBlbGVtZW50LnZhbHVlcy5zcGxpdChcIjtcIik7XHJcbiAgICAgICAgICAgICAgICBhLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAvLyAvL2NvbnNvbGUubG9nKFwiIyBDT01QT01FTlRFIEVWQUxVQVRJT04gdmFsdWVzVG9SYWRpbyA6XCIgKyBhICsgXCIgVEFNQU5ITzpcIiArIGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRbXCJ2YWx1ZXNUb1JhZGlvXCJdID0gYTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzcG9uc2UgIHJlc3BvbnNlIG9mIHRoZSByYWRpb2J1dHRvbiBxdWVzdGlvblxyXG4gICAgICogQHBhcmFtIHthbnl9IGluZGV4UXVlc3Rpb24gaW5kZXggb2YgdGhlIHF1ZXN0aW9uIG9mIHF1ZXN0aW9ubmFpcmVcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIEV2YWx1YXRpb25Db21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFJlc3BvbnNlKHJlc3BvbnNlLCBpbmRleFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSRVNQT05TRSBERSBSQURJTyBCVVRUT05TOiBcIiArIHJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9ubmFpcmUucXVlc3Rpb25zW2luZGV4UXVlc3Rpb25dLnJlc3BvbnNlID0gcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogICBcclxuICAgICAqIEbDlSxOdW50aW9uIHRvIHNhdmUgZXZhbHVhdGlvblxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgRXZhbHVhdGlvbkNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBzdWJtaXRFdmFsdWF0aW9uKHF1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICAvL3NldCBxdWVzdGlvbm5haXJlIGRvbmVcclxuICAgICAgICB0aGlzLnF1ZXN0aW9ubmFpcmUuZG9uZSA9IHRydWU7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25uYWlyZS5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5xdWVzdGlvbm5haXJlLnF1ZXN0aW9uc1tpXVsndmFsdWVzVG9SYWRpbyddKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5xdWVzdGlvbm5haXJlLnF1ZXN0aW9uc1tpXVsndmFsdWVzVG9SYWRpbyddLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCB0aGlzLnF1ZXN0aW9ubmFpcmUucXVlc3Rpb25zW2ldWyd2YWx1ZXNUb1JhZGlvJ10ubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnF1ZXN0aW9ubmFpcmUucXVlc3Rpb25zW2ldWyd2YWx1ZXNUb1JhZGlvJ11bal0gPT09IHF1ZXN0aW9ubmFpcmUucXVlc3Rpb25zW2ldLnJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25uYWlyZS5xdWVzdGlvbnNbaV0ucmVzcG9uc2UgPSBqLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy91cGRhdGUgbG9jYWwgZGF0YVxyXG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnF1ZXN0aW9ubmFpcmUpLCBudWxsLCA0KTtcclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnVwZGF0ZVF1aXpTdGF0dXModGhpcy5xdWVzdGlvbm5haXJlKTtcclxuICAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgIC8vdGVzdCBjb25uZWN0aW9uXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmRpc3BsYXlOb3RpZmljYXRpb24oJ25vIG5ldCBxdWl6cycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZXR1cm4gdG8gdGhlIGxpc3Qgb2Qgb2YgcXVlc3Rpb25uYWlyZXNcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wYXRpZW50cyddKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIGFwcC5hbmRyb2lkLm9uKGFwcC5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLmJhY2tFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIC8vIGNsZWFuaW5nIHVwIHJlZmVyZW5jZXMvbGlzdGVuZXJzLlxyXG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICBhcHAuYW5kcm9pZC5vZmYoYXBwLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0V2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBkaXNhYmxlIGJhY2sgYnV0dG9uIG9uIGFuZHJvaWRcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGFyZ3MgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIFBhdGllbnRzQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGJhY2tFdmVudChhcmdzKSB7XHJcbiAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG59Il19