"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var data_service_1 = require("../shared/data/data.service");
var router_2 = require("@angular/router");
var questionnaire_1 = require("../evaluation/questionnaire");
var EvaluationComponent = (function () {
    function EvaluationComponent(patientService, route, router, dataService) {
        this.patientService = patientService;
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.questionnaire = new questionnaire_1.Questionnaire();
    }
    EvaluationComponent.prototype.ngOnInit = function () {
        console.log("# COMPONENT EVALUATION ");
        //router params
        var ref_questionnaire = +this.route.snapshot.params["ref_questionnaire"];
        //Get Questionnaire
        console.log(JSON.stringify(this.patientService.caregiverQuestionaires, null, 4));
        this.questionnaire = this.patientService.caregiverQuestionaires.filter(function (questionnaire) { return questionnaire.ref_questionnaire === ref_questionnaire + ""; })[0];
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
     * Funtion to save evaluation
     *
     * @memberof EvaluationComponent
     */
    EvaluationComponent.prototype.submmitEvaluation = function () {
        //set questionnaire done
        this.questionnaire.done = true;
        //update local data
        this.dataService.updateQuizStatus(this.questionnaire);
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
        data_service_1.DataService])
], EvaluationComponent);
exports.EvaluationComponent = EvaluationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmFsdWF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUtqRCw4REFBNEQ7QUFDNUQsNERBQTBEO0FBSTFELDBDQUF5QztBQUV6Qyw2REFBNEQ7QUFZNUQsSUFBYSxtQkFBbUI7SUFJNUIsNkJBQ1ksY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLFdBQXdCO1FBSHhCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDZCQUFhLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQTtRQUV0QyxlQUFlO1FBQ2YsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTNFLG1CQUFtQjtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFVBQUEsYUFBYSxJQUFJLE9BQUEsYUFBYSxDQUFDLGlCQUFpQixLQUFLLGlCQUFpQixHQUFHLEVBQUUsRUFBMUQsQ0FBMEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZKLHlCQUF5QjtRQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxHQUFHLGlCQUFpQixHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUcsQ0FBQztJQUtEOzs7OztPQUtHO0lBQ0gsbURBQXFCLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1QsdUZBQXVGO2dCQUN0RixPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFLRDs7Ozs7OztPQU9HO0lBQ0kseUNBQVcsR0FBbEIsVUFBbUIsUUFBUSxFQUFFLGFBQWE7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNwRSxDQUFDO0lBSUQ7Ozs7O09BS0c7SUFDSCwrQ0FBaUIsR0FBakI7UUFDSSx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQy9CLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RCx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTCwwQkFBQztBQUFELENBQUMsQUFqRkQsSUFpRkM7QUFqRlksbUJBQW1CO0lBUC9CLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztLQUM1QyxDQUFDO3FDQU84QixnQ0FBYztRQUN2Qix1QkFBYztRQUNiLGVBQU07UUFDRCwwQkFBVztHQVIzQixtQkFBbUIsQ0FpRi9CO0FBakZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbC9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBFdmFsdWF0aW9uIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vZXZhbHVhdGlvblwiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgUXVlc3Rpb25uYWlyZSB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9ubmFpcmVcIjtcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvblwiO1xyXG5cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZXZhbHVhdGlvbicsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2V2YWx1YXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZXZhbHVhdGlvbi5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmFsdWF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBxdWVzdGlvbm5haXJlOiBRdWVzdGlvbm5haXJlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25uYWlyZSA9IG5ldyBRdWVzdGlvbm5haXJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTkVOVCBFVkFMVUFUSU9OIFwiKVxyXG5cclxuICAgICAgICAvL3JvdXRlciBwYXJhbXNcclxuICAgICAgICBjb25zdCByZWZfcXVlc3Rpb25uYWlyZSA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcInJlZl9xdWVzdGlvbm5haXJlXCJdO1xyXG5cclxuICAgICAgICAvL0dldCBRdWVzdGlvbm5haXJlXHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wYXRpZW50U2VydmljZS5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbm5haXJlID0gdGhpcy5wYXRpZW50U2VydmljZS5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmZpbHRlcihxdWVzdGlvbm5haXJlID0+IHF1ZXN0aW9ubmFpcmUucmVmX3F1ZXN0aW9ubmFpcmUgPT09IHJlZl9xdWVzdGlvbm5haXJlICsgXCJcIilbMF07XHJcblxyXG4gICAgICAgIC8vdHJhbnNmb3JtIHJhZGlvIGJ1dHRvbnNcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybVJhZGlvQnV0dG9ucygpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMgQ09NUE9NRU5URSBFVkFMVUFUSU9OIFtxdWVzdGlvbm5haXJlXSA6XCIgKyByZWZfcXVlc3Rpb25uYWlyZSArIFwiIFwiICsgdGhpcy5xdWVzdGlvbm5haXJlKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bnRpb24gdG8gY3JlYXRlIGFycmF5IG9mIHZhbHVlcyB0byBwdXQgb24gcmFkaW9idXR0b24ncyBxdWVzdGlvbnNcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgRXZhbHVhdGlvbkNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICB0cmFuc2Zvcm1SYWRpb0J1dHRvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbm5haXJlLnF1ZXN0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC50eXBlID09IFwicmFkaW9cIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBlbGVtZW50LnZhbHVlcy5zcGxpdChcIjtcIik7XHJcbiAgICAgICAgICAgICAgICBhLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiMgQ09NUE9NRU5URSBFVkFMVUFUSU9OIHZhbHVlc1RvUmFkaW8gOlwiICsgYSArIFwiIFRBTUFOSE86XCIgKyBhLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50W1widmFsdWVzVG9SYWRpb1wiXSA9IGE7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IHJlc3BvbnNlICByZXNwb25zZSBvZiB0aGUgcmFkaW9idXR0b24gcXVlc3Rpb25cclxuICAgICAqIEBwYXJhbSB7YW55fSBpbmRleFF1ZXN0aW9uIGluZGV4IG9mIHRoZSBxdWVzdGlvbiBvZiBxdWVzdGlvbm5haXJlXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBFdmFsdWF0aW9uQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRSZXNwb25zZShyZXNwb25zZSwgaW5kZXhRdWVzdGlvbikge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25uYWlyZS5xdWVzdGlvbnNbaW5kZXhRdWVzdGlvbl0ucmVzcG9uc2UgPSByZXNwb25zZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBGdW50aW9uIHRvIHNhdmUgZXZhbHVhdGlvblxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgRXZhbHVhdGlvbkNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBzdWJtbWl0RXZhbHVhdGlvbigpIHtcclxuICAgICAgICAvL3NldCBxdWVzdGlvbm5haXJlIGRvbmVcclxuICAgICAgICB0aGlzLnF1ZXN0aW9ubmFpcmUuZG9uZSA9IHRydWU7XHJcbiAgICAgICAgLy91cGRhdGUgbG9jYWwgZGF0YVxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyh0aGlzLnF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgIC8vcmV0dXJuIHRvIHRoZSBsaXN0IG9kIG9mIHF1ZXN0aW9ubmFpcmVzXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZXZhbHVhdGlvbnMnXSk7XHJcbiAgICB9XHJcblxyXG59Il19