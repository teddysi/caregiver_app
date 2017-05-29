"use strict";
require("rxjs/add/operator/map");
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
    PatientService.prototype.isConnected = function () {
        return this.connectorService.isConnected();
    };
    PatientService.prototype.isFirstRequest = function () {
        return this.dataService.isPatientsRequestDone();
    };
    PatientService.prototype.getPatients = function () {
        return this.connectorService.getPatientsData();
    };
    PatientService.prototype.getPatients_BD = function () {
        this.patients = this.dataService.getPatientsData();
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
    PatientService.prototype.setCaregiverQuestionnaires = function (caregiverQuestionaires) {
        this.dataService.setQuizs(caregiverQuestionaires);
        this.caregiverQuestionaires = caregiverQuestionaires;
    };
    PatientService.prototype.getCaregiverQuestionnaires = function () {
        /* this.caregiverQuestionaires=[];
         var quest_ = new Questionnaire();
 
         this.caregiverQuestionaires[0]=quest_;
         this.caregiverQuestionaires[0].id=0;
         this.caregiverQuestionaires[0].name="questionario teste de caregiver";
         this.caregiverQuestionaires[0].reference="caregiver";
         this.caregiverQuestionaires[0].reference_id="1";
         this.caregiverQuestionaires[0].ref_questionnaire="1"; //referencia interna
         this.caregiverQuestionaires[0].questions=[];
         var a=new Question();
         a.id=0;
         a.question="teste de questao tudo bem";
         a.type="text";
         
         var b= new Question();
         b.id = 1;
         b.question = "teste de questao radio";
         b.type = "radio";
         b.values = "Sim;Não;Talvez;";
         var c = new Question();
       c.id = 0;
       c.question = "teste de questao tudo bem2";
       c.type = "text";
         var d = new Question();
         d.id = 1;
         d.question = "teste de questao radio2";
         d.type = "radio";
         d.values = "Sim;Não;Talvez;";
         this.caregiverQuestionaires[0].questions.push(a);
         this.caregiverQuestionaires[0].questions.push(b);
         this.caregiverQuestionaires[0].questions.push(c);
         this.caregiverQuestionaires[0].questions.push(d);
         var quest_1= new Questionnaire();
         
         quest_1.id = 0;
         quest_1.name = "questionario teste de material";
         quest_1.reference = "material";
         quest_1.reference_id = "1";
         quest_1.ref_questionnaire = "2"; //referencia interna
         quest_1.questions = [];
         var a = new Question();
         a.id = 0;
         a.question = "teste de questao tudo bem";
         a.type = "text";
 
         var b = new Question();
         b.id = 1;
         b.question = "teste de questao radio";
         b.type = "radio";
         b.values = "Sim;Não;Talvez;";
         var c = new Question();
         c.id = 0;
         c.question = "teste de questao tudo bem2";
         c.type = "text";
         var d= new Question();
         d.id = 1;
         d.question = "teste de questao radio2";
         d.type = "radio";
         d.values = "Sim;Não;Talvez;";
         
         this.caregiverQuestionaires.push(quest_1);
         this.caregiverQuestionaires[1].questions.push(a);
         this.caregiverQuestionaires[1].questions.push(b);
         this.caregiverQuestionaires[1].questions.push(c);
         this.caregiverQuestionaires[1].questions.push(d);
 */
        return this.dataService.getQuizs();
    };
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService, connector_service_1.ConnectorService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxpQ0FBK0I7QUFFL0Isc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUV4RCw0REFBMEQ7QUFDMUQsMkVBQXlFO0FBR3pFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUIsSUFBYSxjQUFjO0lBTXZCLHdCQUFvQixJQUFVLEVBQVUsV0FBd0IsRUFBVSxnQkFBa0M7UUFBeEYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN4RyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCx1Q0FBYyxHQUFkO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBQ0Qsb0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUNELHVDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVNLG9DQUFXLEdBQWxCLFVBQW1CLFFBQVE7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxFQUFVO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELE1BQU07SUFFTixtREFBMEIsR0FBMUIsVUFBMkIsc0JBQXNCO1FBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO0lBQ3pELENBQUM7SUFFRCxtREFBMEIsR0FBMUI7UUFDRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0VMO1FBQ00sTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQS9HRCxJQStHQztBQS9HWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBT2lCLFdBQUksRUFBdUIsMEJBQVcsRUFBNEIsb0NBQWdCO0dBTm5HLGNBQWMsQ0ErRzFCO0FBL0dZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IFF1ZXN0aW9ubmFpcmUgfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvbm5haXJlXCI7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25cIjtcclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4vcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIHB1YmxpYyBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzOiBRdWVzdGlvbm5haXJlW107XHJcbiAgICBwdWJsaWMgaGFzRXZhbHVhdGlvbnNUb0RvOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdJbnN0YW5jaW91IC0gUGF0aWVudFNlcnZpY2UhJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRmlyc3RSZXF1ZXN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmlzUGF0aWVudHNSZXF1ZXN0RG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0UGF0aWVudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzX0JEKCkge1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFBhdGllbnRzRGF0YSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQYXRpZW50cyhwYXRpZW50cykge1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UGF0aWVudHNEYXRhKHBhdGllbnRzKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gcGF0aWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudChpZDogbnVtYmVyKTogUGF0aWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdGVtcFxyXG5cclxuICAgIHNldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpe1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UXVpenMoY2FyZWdpdmVyUXVlc3Rpb25haXJlcyk7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzID0gY2FyZWdpdmVyUXVlc3Rpb25haXJlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcygpeyAvLyB0ZW1wb3JhcmlvIHBhcmEgZnV0dXJhbWVudGUgYWx0ZXJhclxyXG4gICAgICAgLyogdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzPVtdO1xyXG4gICAgICAgIHZhciBxdWVzdF8gPSBuZXcgUXVlc3Rpb25uYWlyZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF09cXVlc3RfO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1swXS5pZD0wO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1swXS5uYW1lPVwicXVlc3Rpb25hcmlvIHRlc3RlIGRlIGNhcmVnaXZlclwiO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1swXS5yZWZlcmVuY2U9XCJjYXJlZ2l2ZXJcIjtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF0ucmVmZXJlbmNlX2lkPVwiMVwiO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1swXS5yZWZfcXVlc3Rpb25uYWlyZT1cIjFcIjsgLy9yZWZlcmVuY2lhIGludGVybmFcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF0ucXVlc3Rpb25zPVtdO1xyXG4gICAgICAgIHZhciBhPW5ldyBRdWVzdGlvbigpO1xyXG4gICAgICAgIGEuaWQ9MDtcclxuICAgICAgICBhLnF1ZXN0aW9uPVwidGVzdGUgZGUgcXVlc3RhbyB0dWRvIGJlbVwiO1xyXG4gICAgICAgIGEudHlwZT1cInRleHRcIjtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgYj0gbmV3IFF1ZXN0aW9uKCk7XHJcbiAgICAgICAgYi5pZCA9IDE7XHJcbiAgICAgICAgYi5xdWVzdGlvbiA9IFwidGVzdGUgZGUgcXVlc3RhbyByYWRpb1wiO1xyXG4gICAgICAgIGIudHlwZSA9IFwicmFkaW9cIjtcclxuICAgICAgICBiLnZhbHVlcyA9IFwiU2ltO07Do287VGFsdmV6O1wiO1xyXG4gICAgICAgIHZhciBjID0gbmV3IFF1ZXN0aW9uKCk7XHJcbiAgICAgIGMuaWQgPSAwO1xyXG4gICAgICBjLnF1ZXN0aW9uID0gXCJ0ZXN0ZSBkZSBxdWVzdGFvIHR1ZG8gYmVtMlwiO1xyXG4gICAgICBjLnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICB2YXIgZCA9IG5ldyBRdWVzdGlvbigpO1xyXG4gICAgICAgIGQuaWQgPSAxO1xyXG4gICAgICAgIGQucXVlc3Rpb24gPSBcInRlc3RlIGRlIHF1ZXN0YW8gcmFkaW8yXCI7XHJcbiAgICAgICAgZC50eXBlID0gXCJyYWRpb1wiO1xyXG4gICAgICAgIGQudmFsdWVzID0gXCJTaW07TsOjbztUYWx2ZXo7XCI7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzWzBdLnF1ZXN0aW9ucy5wdXNoKGEpO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1swXS5xdWVzdGlvbnMucHVzaChiKTtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF0ucXVlc3Rpb25zLnB1c2goYyk7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzWzBdLnF1ZXN0aW9ucy5wdXNoKGQpO1xyXG4gICAgICAgIHZhciBxdWVzdF8xPSBuZXcgUXVlc3Rpb25uYWlyZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHF1ZXN0XzEuaWQgPSAwO1xyXG4gICAgICAgIHF1ZXN0XzEubmFtZSA9IFwicXVlc3Rpb25hcmlvIHRlc3RlIGRlIG1hdGVyaWFsXCI7XHJcbiAgICAgICAgcXVlc3RfMS5yZWZlcmVuY2UgPSBcIm1hdGVyaWFsXCI7XHJcbiAgICAgICAgcXVlc3RfMS5yZWZlcmVuY2VfaWQgPSBcIjFcIjtcclxuICAgICAgICBxdWVzdF8xLnJlZl9xdWVzdGlvbm5haXJlID0gXCIyXCI7IC8vcmVmZXJlbmNpYSBpbnRlcm5hXHJcbiAgICAgICAgcXVlc3RfMS5xdWVzdGlvbnMgPSBbXTtcclxuICAgICAgICB2YXIgYSA9IG5ldyBRdWVzdGlvbigpO1xyXG4gICAgICAgIGEuaWQgPSAwO1xyXG4gICAgICAgIGEucXVlc3Rpb24gPSBcInRlc3RlIGRlIHF1ZXN0YW8gdHVkbyBiZW1cIjtcclxuICAgICAgICBhLnR5cGUgPSBcInRleHRcIjtcclxuXHJcbiAgICAgICAgdmFyIGIgPSBuZXcgUXVlc3Rpb24oKTtcclxuICAgICAgICBiLmlkID0gMTtcclxuICAgICAgICBiLnF1ZXN0aW9uID0gXCJ0ZXN0ZSBkZSBxdWVzdGFvIHJhZGlvXCI7XHJcbiAgICAgICAgYi50eXBlID0gXCJyYWRpb1wiO1xyXG4gICAgICAgIGIudmFsdWVzID0gXCJTaW07TsOjbztUYWx2ZXo7XCI7XHJcbiAgICAgICAgdmFyIGMgPSBuZXcgUXVlc3Rpb24oKTtcclxuICAgICAgICBjLmlkID0gMDtcclxuICAgICAgICBjLnF1ZXN0aW9uID0gXCJ0ZXN0ZSBkZSBxdWVzdGFvIHR1ZG8gYmVtMlwiO1xyXG4gICAgICAgIGMudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIHZhciBkPSBuZXcgUXVlc3Rpb24oKTtcclxuICAgICAgICBkLmlkID0gMTtcclxuICAgICAgICBkLnF1ZXN0aW9uID0gXCJ0ZXN0ZSBkZSBxdWVzdGFvIHJhZGlvMlwiO1xyXG4gICAgICAgIGQudHlwZSA9IFwicmFkaW9cIjtcclxuICAgICAgICBkLnZhbHVlcyA9IFwiU2ltO07Do287VGFsdmV6O1wiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5wdXNoKHF1ZXN0XzEpO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1sxXS5xdWVzdGlvbnMucHVzaChhKTtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMV0ucXVlc3Rpb25zLnB1c2goYik7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzWzFdLnF1ZXN0aW9ucy5wdXNoKGMpO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1sxXS5xdWVzdGlvbnMucHVzaChkKTtcclxuKi9cclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5nZXRRdWl6cygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=