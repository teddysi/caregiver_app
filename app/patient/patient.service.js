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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxpQ0FBK0I7QUFFL0Isc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUV4RCw0REFBMEQ7QUFDMUQsMkVBQXlFO0FBR3pFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUIsSUFBYSxjQUFjO0lBTXZCLHdCQUFvQixJQUFVLEVBQVUsV0FBd0IsRUFBVSxnQkFBa0M7UUFBeEYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN4RyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELHVDQUFjLEdBQWQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFDRCxvQ0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsdUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRU0sb0NBQVcsR0FBbEIsVUFBbUIsUUFBUTtRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUQsbUNBQVUsR0FBVixVQUFXLEVBQVU7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsTUFBTTtJQUVOLG1EQUEwQixHQUExQixVQUEyQixzQkFBc0I7UUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUM7SUFDekQsQ0FBQztJQUVELG1EQUEwQixHQUExQjtRQUNHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrRUw7UUFDTSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBM0dELElBMkdDO0FBM0dZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtxQ0FPaUIsV0FBSSxFQUF1QiwwQkFBVyxFQUE0QixvQ0FBZ0I7R0FObkcsY0FBYyxDQTJHMUI7QUEzR1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgUXVlc3Rpb25uYWlyZSB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9ubmFpcmVcIjtcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvblwiO1xyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudFNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBwYXRpZW50czogUGF0aWVudFtdO1xyXG4gICAgcHVibGljIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXM6IFF1ZXN0aW9ubmFpcmVbXTtcclxuICAgIHB1YmxpYyBoYXNFdmFsdWF0aW9uc1RvRG86IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBQYXRpZW50U2VydmljZSEnKTtcclxuICAgIH1cclxuICAgIGlzRmlyc3RSZXF1ZXN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmlzUGF0aWVudHNSZXF1ZXN0RG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0UGF0aWVudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzX0JEKCkge1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFBhdGllbnRzRGF0YSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGF0aWVudHMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQYXRpZW50cyhwYXRpZW50cykge1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UGF0aWVudHNEYXRhKHBhdGllbnRzKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gcGF0aWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudChpZDogbnVtYmVyKTogUGF0aWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdGVtcFxyXG5cclxuICAgIHNldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpe1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UXVpenMoY2FyZWdpdmVyUXVlc3Rpb25haXJlcyk7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzID0gY2FyZWdpdmVyUXVlc3Rpb25haXJlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcygpeyAvLyB0ZW1wb3JhcmlvIHBhcmEgZnV0dXJhbWVudGUgYWx0ZXJhclxyXG4gICAgICAgLyogdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzPVtdO1xyXG4gICAgICAgIHZhciBxdWVzdF8gPSBuZXcgUXVlc3Rpb25uYWlyZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF09cXVlc3RfO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1swXS5pZD0wO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1swXS5uYW1lPVwicXVlc3Rpb25hcmlvIHRlc3RlIGRlIGNhcmVnaXZlclwiO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1swXS5yZWZlcmVuY2U9XCJjYXJlZ2l2ZXJcIjtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF0ucmVmZXJlbmNlX2lkPVwiMVwiO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1swXS5yZWZfcXVlc3Rpb25uYWlyZT1cIjFcIjsgLy9yZWZlcmVuY2lhIGludGVybmFcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF0ucXVlc3Rpb25zPVtdO1xyXG4gICAgICAgIHZhciBhPW5ldyBRdWVzdGlvbigpO1xyXG4gICAgICAgIGEuaWQ9MDtcclxuICAgICAgICBhLnF1ZXN0aW9uPVwidGVzdGUgZGUgcXVlc3RhbyB0dWRvIGJlbVwiO1xyXG4gICAgICAgIGEudHlwZT1cInRleHRcIjtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgYj0gbmV3IFF1ZXN0aW9uKCk7XHJcbiAgICAgICAgYi5pZCA9IDE7XHJcbiAgICAgICAgYi5xdWVzdGlvbiA9IFwidGVzdGUgZGUgcXVlc3RhbyByYWRpb1wiO1xyXG4gICAgICAgIGIudHlwZSA9IFwicmFkaW9cIjtcclxuICAgICAgICBiLnZhbHVlcyA9IFwiU2ltO07Do287VGFsdmV6O1wiO1xyXG4gICAgICAgIHZhciBjID0gbmV3IFF1ZXN0aW9uKCk7XHJcbiAgICAgIGMuaWQgPSAwO1xyXG4gICAgICBjLnF1ZXN0aW9uID0gXCJ0ZXN0ZSBkZSBxdWVzdGFvIHR1ZG8gYmVtMlwiO1xyXG4gICAgICBjLnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICB2YXIgZCA9IG5ldyBRdWVzdGlvbigpO1xyXG4gICAgICAgIGQuaWQgPSAxO1xyXG4gICAgICAgIGQucXVlc3Rpb24gPSBcInRlc3RlIGRlIHF1ZXN0YW8gcmFkaW8yXCI7XHJcbiAgICAgICAgZC50eXBlID0gXCJyYWRpb1wiO1xyXG4gICAgICAgIGQudmFsdWVzID0gXCJTaW07TsOjbztUYWx2ZXo7XCI7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzWzBdLnF1ZXN0aW9ucy5wdXNoKGEpO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1swXS5xdWVzdGlvbnMucHVzaChiKTtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMF0ucXVlc3Rpb25zLnB1c2goYyk7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzWzBdLnF1ZXN0aW9ucy5wdXNoKGQpO1xyXG4gICAgICAgIHZhciBxdWVzdF8xPSBuZXcgUXVlc3Rpb25uYWlyZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHF1ZXN0XzEuaWQgPSAwO1xyXG4gICAgICAgIHF1ZXN0XzEubmFtZSA9IFwicXVlc3Rpb25hcmlvIHRlc3RlIGRlIG1hdGVyaWFsXCI7XHJcbiAgICAgICAgcXVlc3RfMS5yZWZlcmVuY2UgPSBcIm1hdGVyaWFsXCI7XHJcbiAgICAgICAgcXVlc3RfMS5yZWZlcmVuY2VfaWQgPSBcIjFcIjtcclxuICAgICAgICBxdWVzdF8xLnJlZl9xdWVzdGlvbm5haXJlID0gXCIyXCI7IC8vcmVmZXJlbmNpYSBpbnRlcm5hXHJcbiAgICAgICAgcXVlc3RfMS5xdWVzdGlvbnMgPSBbXTtcclxuICAgICAgICB2YXIgYSA9IG5ldyBRdWVzdGlvbigpO1xyXG4gICAgICAgIGEuaWQgPSAwO1xyXG4gICAgICAgIGEucXVlc3Rpb24gPSBcInRlc3RlIGRlIHF1ZXN0YW8gdHVkbyBiZW1cIjtcclxuICAgICAgICBhLnR5cGUgPSBcInRleHRcIjtcclxuXHJcbiAgICAgICAgdmFyIGIgPSBuZXcgUXVlc3Rpb24oKTtcclxuICAgICAgICBiLmlkID0gMTtcclxuICAgICAgICBiLnF1ZXN0aW9uID0gXCJ0ZXN0ZSBkZSBxdWVzdGFvIHJhZGlvXCI7XHJcbiAgICAgICAgYi50eXBlID0gXCJyYWRpb1wiO1xyXG4gICAgICAgIGIudmFsdWVzID0gXCJTaW07TsOjbztUYWx2ZXo7XCI7XHJcbiAgICAgICAgdmFyIGMgPSBuZXcgUXVlc3Rpb24oKTtcclxuICAgICAgICBjLmlkID0gMDtcclxuICAgICAgICBjLnF1ZXN0aW9uID0gXCJ0ZXN0ZSBkZSBxdWVzdGFvIHR1ZG8gYmVtMlwiO1xyXG4gICAgICAgIGMudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIHZhciBkPSBuZXcgUXVlc3Rpb24oKTtcclxuICAgICAgICBkLmlkID0gMTtcclxuICAgICAgICBkLnF1ZXN0aW9uID0gXCJ0ZXN0ZSBkZSBxdWVzdGFvIHJhZGlvMlwiO1xyXG4gICAgICAgIGQudHlwZSA9IFwicmFkaW9cIjtcclxuICAgICAgICBkLnZhbHVlcyA9IFwiU2ltO07Do287VGFsdmV6O1wiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5wdXNoKHF1ZXN0XzEpO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1sxXS5xdWVzdGlvbnMucHVzaChhKTtcclxuICAgICAgICB0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXNbMV0ucXVlc3Rpb25zLnB1c2goYik7XHJcbiAgICAgICAgdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzWzFdLnF1ZXN0aW9ucy5wdXNoKGMpO1xyXG4gICAgICAgIHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlc1sxXS5xdWVzdGlvbnMucHVzaChkKTtcclxuKi9cclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5nZXRRdWl6cygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=