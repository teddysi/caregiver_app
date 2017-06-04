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
        console.log(JSON.stringify(this.patientService.caregiverQuestionaires, null, 4));
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
        this.questionnaire.questions[indexQuestion].response = response;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmFsdWF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUtqRCw4REFBNEQ7QUFDNUQsNERBQTBEO0FBSTFELDBDQUF5QztBQUV6Qyw2REFBNEQ7QUFHNUQsMkVBQXlFO0FBQ3pFLG9DQUF1QztBQVd2QyxJQUFhLG1CQUFtQjtJQUk1Qiw2QkFDWSxjQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsZ0JBQWtDO1FBSmxDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUUxQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO1FBRXRDLGVBQWU7UUFDZixJQUFNLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFM0UsbUJBQW1CO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLHlKQUF5SjtRQUN6SixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQUEsYUFBYSxJQUFJLE9BQUEsYUFBYSxDQUFDLGlCQUFpQixLQUFLLGlCQUFpQixHQUFHLEVBQUUsRUFBMUQsQ0FBMEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hJLHlCQUF5QjtRQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxHQUFHLGlCQUFpQixHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFHNUcsQ0FBQztJQUtEOzs7OztPQUtHO0lBQ0gsbURBQXFCLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1QsdUZBQXVGO2dCQUN0RixPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFLRDs7Ozs7OztPQU9HO0lBQ0kseUNBQVcsR0FBbEIsVUFBbUIsUUFBUSxFQUFFLGFBQWE7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsK0NBQWlCLEdBQWpCO1FBQ0ksd0JBQXdCO1FBQ3hCLGlDQUFpQztRQUNqQyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFHekQsaUJBQWlCO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNWLEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCLE9BQU8sRUFBRSwyR0FBMkc7Z0JBQ3BILFlBQVksRUFBRSxJQUFJO2FBQ3JCLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFRCx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTCwwQkFBQztBQUFELENBQUMsQUE5RkQsSUE4RkM7QUE5RlksbUJBQW1CO0lBUC9CLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztLQUM1QyxDQUFDO3FDQU84QixnQ0FBYztRQUN2Qix1QkFBYztRQUNiLGVBQU07UUFDRCwwQkFBVztRQUNOLG9DQUFnQjtHQVRyQyxtQkFBbUIsQ0E4Ri9CO0FBOUZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbC9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBFdmFsdWF0aW9uIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vZXZhbHVhdGlvblwiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgUXVlc3Rpb25uYWlyZSB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9ubmFpcmVcIjtcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvblwiO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdldmFsdWF0aW9uJyxcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZXZhbHVhdGlvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9ldmFsdWF0aW9uLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2YWx1YXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHF1ZXN0aW9ubmFpcmU6IFF1ZXN0aW9ubmFpcmU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25uYWlyZSA9IG5ldyBRdWVzdGlvbm5haXJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTkVOVCBFVkFMVUFUSU9OIFwiKVxyXG5cclxuICAgICAgICAvL3JvdXRlciBwYXJhbXNcclxuICAgICAgICBjb25zdCByZWZfcXVlc3Rpb25uYWlyZSA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcInJlZl9xdWVzdGlvbm5haXJlXCJdO1xyXG5cclxuICAgICAgICAvL0dldCBRdWVzdGlvbm5haXJlXHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wYXRpZW50U2VydmljZS5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy90aGlzLnF1ZXN0aW9ubmFpcmUgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMuZmlsdGVyKHF1ZXN0aW9ubmFpcmUgPT4gcXVlc3Rpb25uYWlyZS5yZWZfcXVlc3Rpb25uYWlyZSA9PT0gcmVmX3F1ZXN0aW9ubmFpcmUgKyBcIlwiKVswXTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9ubmFpcmUgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFF1aXpzKCkuZmlsdGVyKHF1ZXN0aW9ubmFpcmUgPT4gcXVlc3Rpb25uYWlyZS5yZWZfcXVlc3Rpb25uYWlyZSA9PT0gcmVmX3F1ZXN0aW9ubmFpcmUgKyBcIlwiKVswXTtcclxuICAgICAgICAvL3RyYW5zZm9ybSByYWRpbyBidXR0b25zXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1SYWRpb0J1dHRvbnMoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTUVOVEUgRVZBTFVBVElPTiBbcXVlc3Rpb25uYWlyZV0gOlwiICsgcmVmX3F1ZXN0aW9ubmFpcmUgKyBcIiBcIiArIHRoaXMucXVlc3Rpb25uYWlyZSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVudGlvbiB0byBjcmVhdGUgYXJyYXkgb2YgdmFsdWVzIHRvIHB1dCBvbiByYWRpb2J1dHRvbidzIHF1ZXN0aW9uc1xyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBFdmFsdWF0aW9uQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHRyYW5zZm9ybVJhZGlvQnV0dG9ucygpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9ubmFpcmUucXVlc3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnR5cGUgPT0gXCJyYWRpb1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYSA9IGVsZW1lbnQudmFsdWVzLnNwbGl0KFwiO1wiKTtcclxuICAgICAgICAgICAgICAgIGEucG9wKCk7XHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIyBDT01QT01FTlRFIEVWQUxVQVRJT04gdmFsdWVzVG9SYWRpbyA6XCIgKyBhICsgXCIgVEFNQU5ITzpcIiArIGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRbXCJ2YWx1ZXNUb1JhZGlvXCJdID0gYTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzcG9uc2UgIHJlc3BvbnNlIG9mIHRoZSByYWRpb2J1dHRvbiBxdWVzdGlvblxyXG4gICAgICogQHBhcmFtIHthbnl9IGluZGV4UXVlc3Rpb24gaW5kZXggb2YgdGhlIHF1ZXN0aW9uIG9mIHF1ZXN0aW9ubmFpcmVcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIEV2YWx1YXRpb25Db21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFJlc3BvbnNlKHJlc3BvbnNlLCBpbmRleFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbm5haXJlLnF1ZXN0aW9uc1tpbmRleFF1ZXN0aW9uXS5yZXNwb25zZSA9IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqICAgXHJcbiAgICAgKiBGw5UsTnVudGlvbiB0byBzYXZlIGV2YWx1YXRpb25cclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIEV2YWx1YXRpb25Db21wb25lbnRcclxuICAgICAqL1xyXG4gICAgc3VibW1pdEV2YWx1YXRpb24oKSB7XHJcbiAgICAgICAgLy9zZXQgcXVlc3Rpb25uYWlyZSBkb25lXHJcbiAgICAgICAgLy90aGlzLnF1ZXN0aW9ubmFpcmUuZG9uZSA9IHRydWU7XHJcbiAgICAgICAgLy91cGRhdGUgbG9jYWwgZGF0YVxyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyh0aGlzLnF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgLy90ZXN0IGNvbm5lY3Rpb25cclxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQXZpc28gLSBBdmFsaWHDp8O1ZXMgXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkVuY29udHJhLXNlIHNlbSBhY2Vzc28gw6AgaW50ZXJuZXQuIE8gc2V1IHF1ZXN0aW9uw6FyaW8gYXBlbmEgc2Vyw6Egc3VibWV0aWRvIHF1YW5kbyB0aXZlciBub3ZhbWVudGUgYWNlc3NvLlwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmV0dXJuIHRvIHRoZSBsaXN0IG9kIG9mIHF1ZXN0aW9ubmFpcmVzXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZXZhbHVhdGlvbnMnXSk7XHJcbiAgICB9XHJcblxyXG59Il19