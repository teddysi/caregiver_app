"use strict";
require("rxjs/add/operator/map");
var notification_1 = require("./notification");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var data_service_1 = require("../shared/data/data.service");
var connector_service_1 = require("../shared/connector/connector.service");
var dialogs = require("ui/dialogs");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var PatientService = (function () {
    function PatientService(http, dataService, connectorService) {
        this.http = http;
        this.dataService = dataService;
        this.connectorService = connectorService;
        console.log('Instanciou - PatientService!');
        this.notifications = [];
        this.initMessages();
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
        //this.caregiverQuestionaires = caregiverQuestionaires;
    };
    PatientService.prototype.getCaregiverQuestionnaires = function () {
        return this.dataService.getQuizs();
    };
    PatientService.prototype.hasEvaluationsToDo = function () {
        return this.dataService.hasEvaluationsToDo();
        /*
            if(this.caregiverQuestionaires) {
                if (this.caregiverQuestionaires.length>0) {
                    return true;
                }else{
                    return false;
                }
            }
        */
    };
    PatientService.prototype.updateQuizStatus = function (questionnaire) {
        var _this = this;
        var questionnaire_to_send = [];
        questionnaire_to_send.push(questionnaire);
        this.dataService.updateQuizStatus(questionnaire);
        if (this.connectorService.isConnected()) {
            this.connectorService.updateQuizStatus(questionnaire_to_send).subscribe(function (result) { return _this.onSentSuccess(questionnaire_to_send, result); }, function (error) { return _this.onSentError(questionnaire_to_send, error); });
        }
    };
    PatientService.prototype.onSentSuccess = function (questionnaire_to_send, result) {
        this.dataService.deleteQuestionnaire(questionnaire_to_send);
        console.log("enviou questionário com sucesso");
    };
    PatientService.prototype.onSentError = function (questionnaire_to_send, error) {
        console.log("ERROR: " + error);
        console.log("ERROR LENGTH: " + error.length);
        if (error.length == undefined) {
            console.log("Questionário enviado:");
            console.log(JSON.stringify(questionnaire_to_send, null, 4));
            this.dataService.deleteQuestionnaire(questionnaire_to_send);
            console.log("enviou questionário com sucesso");
        }
        else {
            //this.dataService.addQuestionnaireToDB(questionnaire);
            console.log("ERRO NO ENVIO DO QUEST" + JSON.stringify(error, null, 4));
            console.log("falhou envio do questionário");
        }
    };
    PatientService.prototype.userOutdated = function () {
        this.dataService.deleteData('user');
    };
    PatientService.prototype.initMessages = function () {
        this.notifications = [
            new notification_1.Notification('pending evaluations', 'Aviso - Avaliações', 'Existem avaliações pendentes. Por favor aceda às avaliações no canto superior direito.', false),
            new notification_1.Notification('error-auth', 'Aviso - Autenticação', 'O acesso aos pacientes não foi autorizado. Por favor reinicie a aplicação.', false)
        ];
    };
    PatientService.prototype.getNotification = function (id) {
        var notification = this.notifications.filter(function (obj) {
            return obj.id === id;
        });
        return notification[0];
    };
    PatientService.prototype.displayNotification = function (id) {
        var notification = this.getNotification(id);
        if (!notification.done) {
            dialogs.alert({
                title: notification.title,
                message: notification.message,
                okButtonText: "OK"
            });
        }
        notification.done = true;
    };
    PatientService.prototype.checkQuizsToSubmit = function () {
        var _this = this;
        if (this.connectorService.isConnected()) {
            var quizs = this.dataService.getQuizs();
            var quizs_to_send_1 = [];
            if (quizs) {
                console.log("QUIZS GUARDADOS PARA ENVIO: ");
                console.log(JSON.stringify(quizs, null, 4));
                quizs.forEach(function (quiz) {
                    if (quiz.done) {
                        quizs_to_send_1.push(quiz);
                    }
                });
                if (quizs_to_send_1) {
                    this.connectorService.updateQuizStatus(quizs_to_send_1).subscribe(function (result) { return _this.onSentSuccess(quizs_to_send_1, result); }, function (error) { return _this.onSentError(quizs_to_send_1, error); });
                }
            }
        }
    };
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService, connector_service_1.ConnectorService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxpQ0FBK0I7QUFFL0IsK0NBQThDO0FBQzlDLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsNERBQTBEO0FBQzFELDJFQUF5RTtBQUd6RSxvQ0FBdUM7QUFFdkMsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUc5QixJQUFhLGNBQWM7SUFNdkIsd0JBQW9CLElBQVUsRUFBVSxXQUF3QixFQUFVLGdCQUFrQztRQUF4RixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3hHLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCx1Q0FBYyxHQUFkO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBQ0Qsb0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUNELHVDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVNLG9DQUFXLEdBQWxCLFVBQW1CLFFBQVE7UUFDdkIsSUFBSSxDQUFDLFdBQVcs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clxuaW1wb3J0IHsgUXVlc3Rpb25uYWlyZSB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9ubmFpcmVcIjtcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvblwiO1xyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gXCIuL25vdGlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5cclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQYXRpZW50U2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzOiBQYXRpZW50W107XHJcbiAgICAvL3B1YmxpYyBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzOiBRdWVzdGlvbm5haXJlW107XHJcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBQYXRpZW50U2VydmljZSEnKTtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmluaXRNZXNzYWdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQ29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0ZpcnN0UmVxdWVzdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5pc1BhdGllbnRzUmVxdWVzdERvbmUoKTtcclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvclNlcnZpY2UuZ2V0UGF0aWVudHNEYXRhKCk7XHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50c19CRCgpIHtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gdGhpcy5kYXRhU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRpZW50cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UGF0aWVudHMocGF0aWVudHMpIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFBhdGllbnRzRGF0YShwYXRpZW50cyk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHBhdGllbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBhdGllbnQoaWQ6IG51bWJlcik6IFBhdGllbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuICAgIH1cclxuXHJcbiAgICAvL3RlbXBcclxuXHJcbiAgICBzZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyhjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRRdWl6cyhjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzKTsgXHJcbiAgICAgICAgLy90aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMgPSBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuZ2V0UXVpenMoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaGFzRXZhbHVhdGlvbnNUb0RvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG4gICAgLypcclxuICAgICAgICBpZih0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKi9cclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCA9IFtdO1xyXG4gICAgICAgIHF1ZXN0aW9ubmFpcmVfdG9fc2VuZC5wdXNoKHF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS51cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKXtcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlX3RvX3NlbmQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vblNlbnRTdWNjZXNzKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgcmVzdWx0KSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uU2VudEVycm9yKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblNlbnRTdWNjZXNzKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgcmVzdWx0KSB7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5kZWxldGVRdWVzdGlvbm5haXJlKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlbnZpb3UgcXVlc3Rpb27DoXJpbyBjb20gc3VjZXNzb1wiKTtcclxuICAgIH1cclxuICAgIG9uU2VudEVycm9yKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBcIiArIGVycm9yKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIExFTkdUSDogXCIgKyBlcnJvci5sZW5ndGgpO1xyXG4gICAgICAgIGlmKGVycm9yLmxlbmd0aCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUXVlc3Rpb27DoXJpbyBlbnZpYWRvOlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVlc3Rpb25uYWlyZV90b19zZW5kLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlUXVlc3Rpb25uYWlyZShxdWVzdGlvbm5haXJlX3RvX3NlbmQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVudmlvdSBxdWVzdGlvbsOhcmlvIGNvbSBzdWNlc3NvXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kYXRhU2VydmljZS5hZGRRdWVzdGlvbm5haXJlVG9EQihxdWVzdGlvbm5haXJlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPIE5PIEVOVklPIERPIFFVRVNUXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhbGhvdSBlbnZpbyBkbyBxdWVzdGlvbsOhcmlvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHVzZXJPdXRkYXRlZCgpIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZURhdGEoJ3VzZXInKTtcclxuICAgIH1cclxuICAgIGluaXRNZXNzYWdlcygpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBOb3RpZmljYXRpb24oJ3BlbmRpbmcgZXZhbHVhdGlvbnMnLCAnQXZpc28gLSBBdmFsaWHDp8O1ZXMnLCAnRXhpc3RlbSBhdmFsaWHDp8O1ZXMgcGVuZGVudGVzLiBQb3IgZmF2b3IgYWNlZGEgw6BzIGF2YWxpYcOnw7VlcyBubyBjYW50byBzdXBlcmlvciBkaXJlaXRvLicsIGZhbHNlKSxcclxuICAgICAgICAgICAgbmV3IE5vdGlmaWNhdGlvbignZXJyb3ItYXV0aCcsICdBdmlzbyAtIEF1dGVudGljYcOnw6NvJywgJ08gYWNlc3NvIGFvcyBwYWNpZW50ZXMgbsOjbyBmb2kgYXV0b3JpemFkby4gUG9yIGZhdm9yIHJlaW5pY2llIGEgYXBsaWNhw6fDo28uJywgZmFsc2UpXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGdldE5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgICAgIHZhciBub3RpZmljYXRpb24gPSB0aGlzLm5vdGlmaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKCBvYmogKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmouaWQgPT09IGlkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9uWzBdO1xyXG4gICAgfVxyXG4gICAgZGlzcGxheU5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgICAgIGxldCBub3RpZmljYXRpb24gPSB0aGlzLmdldE5vdGlmaWNhdGlvbihpZCk7XHJcbiAgICAgICAgaWYoIW5vdGlmaWNhdGlvbi5kb25lKSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoeyBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBub3RpZmljYXRpb24udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBub3RpZmljYXRpb24ubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub3RpZmljYXRpb24uZG9uZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBjaGVja1F1aXpzVG9TdWJtaXQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgbGV0IHF1aXpzID0gdGhpcy5kYXRhU2VydmljZS5nZXRRdWl6cygpO1xyXG4gICAgICAgICAgICBsZXQgcXVpenNfdG9fc2VuZCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUVVJWlMgR1VBUkRBRE9TIFBBUkEgRU5WSU86IFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgICAgICBxdWl6cy5mb3JFYWNoKHF1aXogPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHF1aXouZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWl6c190b19zZW5kLnB1c2gocXVpeik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYocXVpenNfdG9fc2VuZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnVwZGF0ZVF1aXpTdGF0dXMocXVpenNfdG9fc2VuZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25TZW50U3VjY2VzcyhxdWl6c190b19zZW5kLCByZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vblNlbnRFcnJvcihxdWl6c190b19zZW5kLCBlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==