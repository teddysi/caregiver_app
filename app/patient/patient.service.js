"use strict";
require("rxjs/add/operator/map");
var question_1 = require("../evaluation/question");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var data_service_1 = require("../shared/data/data.service");
var connector_service_1 = require("../shared/connector/connector.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var PatientService = (function () {
    function PatientService(http, dataService, connectorService) {
        this.http = http;
        this.dataService = dataService;
        this.connectorService = connectorService;
        console.log('Instanciou - PatientService!');
    }
    PatientService.prototype.isFirstRequest = function () {
        return this.dataService.isPatientsRequestDone();
    };
    PatientService.prototype.getPatients = function () {
        return this.connectorService.getPatientsData();
    };
    PatientService.prototype.getPatients_BD = function () {
        this.patients = this.dataService.getPatientsData();
        console.log(this.patients);
        return this.patients;
    };
    PatientService.prototype.setPatients = function (patients) {
        this.dataService.setPatientsData(patients);
        this.patients = patients;
    };
    PatientService.prototype.getPatient = function (id) {
        return this.patients.filter(function (patient) { return patient.id === id; })[0];
    };
    //temp
    PatientService.prototype.getCaregiverQuestionnaires = function () {
        this.caregiverQuestionaires = [];
        this.caregiverQuestionaires[0].id = 0;
        this.caregiverQuestionaires[0].name = "questionario teste de caregiver";
        this.caregiverQuestionaires[0].questions = [];
        var a = new question_1.Question();
        a.id = 0;
        a.question = "teste de questao tudo bem";
        a.type = "text";
        var b = new question_1.Question();
        a.id = 1;
        a.question = "teste de questao radio";
        a.type = "radio";
        a.values = "Sim;Não;Talvez;";
        var b = new question_1.Question();
        b.id = 0;
        b.question = "teste de questao tudo bem2";
        b.type = "text";
        var b = new question_1.Question();
        b.id = 1;
        b.question = "teste de questao radio2";
        b.type = "radio";
        b.values = "Sim;Não;Talvez;";
        this.caregiverQuestionaires[0].questions.push(a);
        return this.caregiverQuestionaires;
    };
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService, connector_service_1.ConnectorService])
], PatientService);
exports.PatientService = PatientService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxpQ0FBK0I7QUFHL0IsbURBQWtEO0FBQ2xELHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsNERBQTBEO0FBQzFELDJFQUF5RTtBQUd6RSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBRzlCLElBQWEsY0FBYztJQU92Qix3QkFBb0IsSUFBVSxFQUFVLFdBQXdCLEVBQVUsZ0JBQWtDO1FBQXhGLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDdkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRCxvQ0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUVuRCxDQUFDO0lBQ0QsdUNBQWMsR0FBZDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFTSxvQ0FBVyxHQUFsQixVQUFtQixRQUFRO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFNRCxtQ0FBVSxHQUFWLFVBQVcsRUFBVTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxNQUFNO0lBRU4sbURBQTBCLEdBQTFCO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixHQUFDLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLGlDQUFpQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFDLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLFFBQVEsR0FBQywyQkFBMkIsQ0FBQztRQUN2QyxDQUFDLENBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFFLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQztRQUN0QyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUNqQixDQUFDLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLFFBQVEsR0FBRyw0QkFBNEIsQ0FBQztRQUMxQyxDQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxRQUFRLEdBQUcseUJBQXlCLENBQUM7UUFDdkMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDakIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztRQUM3QixJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUlqRCxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDO0lBQ3ZDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFoRUQsSUFnRUM7QUFoRVksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQVFpQixXQUFJLEVBQXVCLDBCQUFXLEVBQTRCLG9DQUFnQjtHQVBuRyxjQUFjLENBZ0UxQjtBQWhFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuL3BhdGllbnRcIjtcclxuaW1wb3J0IHsgUXVlc3Rpb25uYWlyZSB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9ubmFpcmVcIjtcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvblwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIHB1YmxpYyBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzOiBRdWVzdGlvbm5haXJlW107XHJcblxyXG4gICAgcHJpdmF0ZSBmaXJzdFRpbWU6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZSkgeyAgXHJcbiAgICAgICAgIGNvbnNvbGUubG9nKCdJbnN0YW5jaW91IC0gUGF0aWVudFNlcnZpY2UhJyk7XHJcbiAgICAgICAgIHRoaXMuZmlyc3RUaW1lID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXRpZW50cygpeyAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgXHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50c19CRCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UGF0aWVudHMocGF0aWVudHMpIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFBhdGllbnRzRGF0YShwYXRpZW50cyk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHBhdGllbnRzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgIFxyXG4gIFxyXG5cclxuICAgIGdldFBhdGllbnQoaWQ6IG51bWJlcik6IFBhdGllbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuICAgIH1cclxuXHJcbiAgICAvL3RlbXBcclxuXHJcbiAgICBnZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcygpeyAvLyB0ZW1wb3JhcmlvIHBhcmEgZnV0dXJhbWVudGUgYWx0ZXJhclxyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcz1bXTtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF0uaWQ9MDtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF0ubmFtZT1cInF1ZXN0aW9uYXJpbyB0ZXN0ZSBkZSBjYXJlZ2l2ZXJcIjtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF0ucXVlc3Rpb25zPVtdO1xyXG4gICAgICAgIHZhciBhPW5ldyBRdWVzdGlvbigpO1xyXG4gICAgICAgIGEuaWQ9MDtcclxuICAgICAgICBhLnF1ZXN0aW9uPVwidGVzdGUgZGUgcXVlc3RhbyB0dWRvIGJlbVwiO1xyXG4gICAgICAgIGEudHlwZT1cInRleHRcIjtcclxuICAgICAgICB2YXIgYj0gbmV3IFF1ZXN0aW9uKCk7XHJcbiAgICAgICAgYS5pZCA9IDE7XHJcbiAgICAgICAgYS5xdWVzdGlvbiA9IFwidGVzdGUgZGUgcXVlc3RhbyByYWRpb1wiO1xyXG4gICAgICAgIGEudHlwZSA9IFwicmFkaW9cIjtcclxuICAgICAgICBhLnZhbHVlcyA9IFwiU2ltO07Do287VGFsdmV6O1wiO1xyXG4gICAgICAgIHZhciBiID0gbmV3IFF1ZXN0aW9uKCk7XHJcbiAgICAgICAgYi5pZCA9IDA7XHJcbiAgICAgICAgYi5xdWVzdGlvbiA9IFwidGVzdGUgZGUgcXVlc3RhbyB0dWRvIGJlbTJcIjtcclxuICAgICAgICBiLnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICB2YXIgYiA9IG5ldyBRdWVzdGlvbigpO1xyXG4gICAgICAgIGIuaWQgPSAxO1xyXG4gICAgICAgIGIucXVlc3Rpb24gPSBcInRlc3RlIGRlIHF1ZXN0YW8gcmFkaW8yXCI7XHJcbiAgICAgICAgYi50eXBlID0gXCJyYWRpb1wiO1xyXG4gICAgICAgIGIudmFsdWVzID0gXCJTaW07TsOjbztUYWx2ZXo7XCI7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzWzBdLnF1ZXN0aW9ucy5wdXNoKGEpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=

