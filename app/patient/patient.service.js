"use strict";
require("rxjs/add/operator/map");
var notification_1 = require("./notification");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var data_service_1 = require("../shared/data/data.service");
var connector_service_1 = require("../shared/connector/connector.service");
var user_service_1 = require("../shared/user/user.service");
var dialogs = require("ui/dialogs");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var PatientService = (function () {
    function PatientService(http, dataService, connectorService, userService) {
        this.http = http;
        this.dataService = dataService;
        this.connectorService = connectorService;
        this.userService = userService;
        //console.log('Instanciou - PatientService!');
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
        //console.log(JSON.stringify(questionnaire, null, 4));
        var questionnaire_to_send = [];
        questionnaire_to_send.push(questionnaire);
        this.dataService.updateQuizStatus(questionnaire);
        if (this.connectorService.isConnected()) {
            this.connectorService.updateQuizStatus(questionnaire_to_send).subscribe(function (result) { return _this.onSentSuccess(questionnaire_to_send, result); }, function (error) { return _this.onSentError(questionnaire_to_send, error); });
        }
    };
    PatientService.prototype.onSentSuccess = function (questionnaire_to_send, result) {
        console.log("Questionário enviado:");
        this.dataService.deleteQuestionnaire(questionnaire_to_send);
        //console.log("enviou questionário com sucesso");
    };
    PatientService.prototype.onSentError = function (questionnaire_to_send, error) {
        //console.log("ERROR: " + error);
        //console.log("ERROR LENGTH: " + error.length);
        if (error.length == undefined) {
            console.log("Questionário enviado:");
            //console.log(JSON.stringify(questionnaire_to_send, null, 4));
            this.dataService.deleteQuestionnaire(questionnaire_to_send);
        }
        else {
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
        var quizs = this.dataService.getQuizs();
        var quizs_to_send = [];
        if (quizs) {
            console.log("QUIZS GUARDADOS: ");
            console.log(JSON.stringify(quizs, null, 4));
            quizs.forEach(function (quiz) {
                if (quiz.done) {
                    quizs_to_send.push(quiz);
                }
            });
            console.log("QUIZS GUARDADOS PARA ENVIO: ");
            console.log(JSON.stringify(quizs_to_send, null, 4));
            if (quizs_to_send) {
                this.connectorService.updateQuizStatus(quizs_to_send).subscribe(function (result) { return _this.onSentSuccess(quizs_to_send, result); }, function (error) { return _this.onSentError(quizs_to_send, error); });
            }
        }
    };
    PatientService.prototype.registerAcessedMaterial = function (patient, material) {
        var _this = this;
        var user = this.userService.getUser();
        this.connectorService.sendAcessedMaterial(patient, user, material).subscribe(function (result) { return _this.registeredSuccessfully(result, material); }, function (error) { return _this.registeredFailed(error); });
    };
    PatientService.prototype.registeredSuccessfully = function (result, material) {
        console.log("Registou acesso ao material: ID - " + material.id + '-' + material.name);
    };
    PatientService.prototype.registeredFailed = function (error) {
        console.log(JSON.stringify(error, null, 4));
        console.log("Falhou registo de acesso ao material");
    };
    PatientService.prototype.sendRating = function (rating) {
        var _this = this;
        var user = this.userService.getUser();
        this.connectorService.sendMaterialRating(user, rating).subscribe(function (result) { return _this.evaluationSentSuccessfully(result, rating); }, function (error) { return _this.evaluationSentFail(error); });
    };
    PatientService.prototype.evaluationSentSuccessfully = function (result, rating) {
        console.log("Enviou rating do material com sucesso");
    };
    PatientService.prototype.evaluationSentFail = function (error) {
        console.log(JSON.stringify(error, null, 4));
        console.log("Falhou envio do rating do material");
    };
    PatientService.prototype.setNotificationToShowAgain = function (notification_id) {
        this.notifications.filter(function (notification) {
            if (notification.id === notification_id) {
                notification.done = false;
            }
        });
    };
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService, connector_service_1.ConnectorService, user_service_1.UserService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxpQ0FBK0I7QUFFL0IsK0NBQThDO0FBQzlDLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsNERBQTBEO0FBQzFELDJFQUF5RTtBQUN6RSw0REFBMEQ7QUFFMUQsb0NBQXVDO0FBRXZDLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUIsSUFBYSxjQUFjO0lBTXZCLHdCQUFvQixJQUFVLEVBQVUsV0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxXQUF3QjtRQUExSCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUksOENBQThDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELHVDQUFjLEdBQWQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFDRCxvQ0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsdUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRU0sb0NBQVcsR0FBbEIsVUFBbUIsUUFBUTtR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LE1BQU0sQ0FBQyxVQUFTLFlBQVk7WUFDM0MsRUFBRSxDQUFBLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxZQUFZLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBekxELElBeUxDO0FBekxZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtxQ0FPaUIsV0FBSSxFQUF1QiwwQkFBVyxFQUE0QixvQ0FBZ0IsRUFBdUIsMEJBQVc7R0FOckksY0FBYyxDQXlMMUI7QUF6TFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgUXVlc3Rpb25uYWlyZSB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9ubmFpcmVcIjtcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvblwiO1xyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gXCIuL25vdGlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5cclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQYXRpZW50U2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzOiBQYXRpZW50W107XHJcbiAgICAvL3B1YmxpYyBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzOiBRdWVzdGlvbm5haXJlW107XHJcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBQYXRpZW50U2VydmljZSEnKTtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmluaXRNZXNzYWdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQ29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0ZpcnN0UmVxdWVzdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5pc1BhdGllbnRzUmVxdWVzdERvbmUoKTtcclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvclNlcnZpY2UuZ2V0UGF0aWVudHNEYXRhKCk7XHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50c19CRCgpIHtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gdGhpcy5kYXRhU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRpZW50cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UGF0aWVudHMocGF0aWVudHMpIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFBhdGllbnRzRGF0YShwYXRpZW50cyk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHBhdGllbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBhdGllbnQoaWQ6IG51bWJlcik6IFBhdGllbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuICAgIH1cclxuXHJcbiAgICAvL3RlbXBcclxuXHJcbiAgICBzZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcyhjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRRdWl6cyhjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzKTsgXHJcbiAgICAgICAgLy90aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMgPSBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuZ2V0UXVpenMoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaGFzRXZhbHVhdGlvbnNUb0RvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG4gICAgLypcclxuICAgICAgICBpZih0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKi9cclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlLCBudWxsLCA0KSk7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCA9IFtdO1xyXG4gICAgICAgIHF1ZXN0aW9ubmFpcmVfdG9fc2VuZC5wdXNoKHF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS51cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKXtcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlX3RvX3NlbmQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vblNlbnRTdWNjZXNzKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgcmVzdWx0KSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uU2VudEVycm9yKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblNlbnRTdWNjZXNzKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgcmVzdWx0KSB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiUXVlc3Rpb27DoXJpbyBlbnZpYWRvOlwiKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZVF1ZXN0aW9ubmFpcmUocXVlc3Rpb25uYWlyZV90b19zZW5kKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW52aW91IHF1ZXN0aW9uw6FyaW8gY29tIHN1Y2Vzc29cIik7XHJcbiAgICB9XHJcbiAgICBvblNlbnRFcnJvcihxdWVzdGlvbm5haXJlX3RvX3NlbmQsIGVycm9yKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVSUk9SOiBcIiArIGVycm9yKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiRVJST1IgTEVOR1RIOiBcIiArIGVycm9yLmxlbmd0aCk7XHJcbiAgICAgICAgaWYoZXJyb3IubGVuZ3RoID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJRdWVzdGlvbsOhcmlvIGVudmlhZG86XCIpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZVF1ZXN0aW9ubmFpcmUocXVlc3Rpb25uYWlyZV90b19zZW5kKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImVudmlvdSBxdWVzdGlvbsOhcmlvIGNvbSBzdWNlc3NvXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kYXRhU2VydmljZS5hZGRRdWVzdGlvbm5haXJlVG9EQihxdWVzdGlvbm5haXJlKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVSUk8gTk8gRU5WSU8gRE8gUVVFU1RcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJmYWxob3UgZW52aW8gZG8gcXVlc3Rpb27DoXJpb1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXNlck91dGRhdGVkKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlRGF0YSgndXNlcicpO1xyXG4gICAgfVxyXG4gICAgaW5pdE1lc3NhZ2VzKCkge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtcclxuICAgICAgICAgICAgbmV3IE5vdGlmaWNhdGlvbigncGVuZGluZyBldmFsdWF0aW9ucycsICdBdmlzbyAtIEF2YWxpYcOnw7VlcycsICdFeGlzdGVtIGF2YWxpYcOnw7VlcyBwZW5kZW50ZXMuIFBvciBmYXZvciBhY2VkYSDDoHMgYXZhbGlhw6fDtWVzIG5vIGNhbnRvIHN1cGVyaW9yIGRpcmVpdG8uJywgZmFsc2UpLFxyXG4gICAgICAgICAgICBuZXcgTm90aWZpY2F0aW9uKCdlcnJvci1hdXRoJywgJ0F2aXNvIC0gQXV0ZW50aWNhw6fDo28nLCAnTyBhY2Vzc28gYW9zIHBhY2llbnRlcyBuw6NvIGZvaSBhdXRvcml6YWRvLiBQb3IgZmF2b3IgcmVpbmljaWUgYSBhcGxpY2HDp8Ojby4nLCBmYWxzZSlcclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IHRoaXMubm90aWZpY2F0aW9ucy5maWx0ZXIoZnVuY3Rpb24oIG9iaiApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iai5pZCA9PT0gaWQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBub3RpZmljYXRpb25bMF07XHJcbiAgICB9XHJcbiAgICBkaXNwbGF5Tm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbiA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKGlkKTtcclxuICAgICAgICBpZighbm90aWZpY2F0aW9uLmRvbmUpIHtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7IFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG5vdGlmaWNhdGlvbi50aXRsZSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG5vdGlmaWNhdGlvbi5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb25lID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNoZWNrUXVpenNUb1N1Ym1pdCgpIHtcclxuICAgICAgICBsZXQgcXVpenMgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFF1aXpzKCk7XHJcbiAgICAgICAgbGV0IHF1aXpzX3RvX3NlbmQgPSBbXTtcclxuXHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJRVUlaUyBHVUFSREFET1M6IFwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChxdWl6ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHF1aXouZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1aXpzX3RvX3NlbmQucHVzaChxdWl6KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUVVJWlMgR1VBUkRBRE9TIFBBUkEgRU5WSU86IFwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenNfdG9fc2VuZCwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBpZihxdWl6c190b19zZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyhxdWl6c190b19zZW5kKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vblNlbnRTdWNjZXNzKHF1aXpzX3RvX3NlbmQsIHJlc3VsdCksXHJcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uU2VudEVycm9yKHF1aXpzX3RvX3NlbmQsIGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlZ2lzdGVyQWNlc3NlZE1hdGVyaWFsKHBhdGllbnQsIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgdmFyIHVzZXIgPSB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnNlbmRBY2Vzc2VkTWF0ZXJpYWwocGF0aWVudCwgdXNlcixtYXRlcmlhbCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLnJlZ2lzdGVyZWRTdWNjZXNzZnVsbHkocmVzdWx0LCBtYXRlcmlhbCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5yZWdpc3RlcmVkRmFpbGVkKGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZWdpc3RlcmVkU3VjY2Vzc2Z1bGx5KHJlc3VsdCwgbWF0ZXJpYWwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdG91IGFjZXNzbyBhbyBtYXRlcmlhbDogSUQgLSBcIiArIG1hdGVyaWFsLmlkICsgJy0nICsgbWF0ZXJpYWwubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJlZEZhaWxlZChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLG51bGwsNCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFsaG91IHJlZ2lzdG8gZGUgYWNlc3NvIGFvIG1hdGVyaWFsXCIpO1xyXG4gICAgfVxyXG4gICAgc2VuZFJhdGluZyhyYXRpbmcpIHtcclxuICAgICAgICAgdmFyIHVzZXIgPSB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnNlbmRNYXRlcmlhbFJhdGluZyh1c2VyLHJhdGluZykuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLmV2YWx1YXRpb25TZW50U3VjY2Vzc2Z1bGx5KHJlc3VsdCwgcmF0aW5nKSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmV2YWx1YXRpb25TZW50RmFpbChlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZXZhbHVhdGlvblNlbnRTdWNjZXNzZnVsbHkocmVzdWx0LCByYXRpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVudmlvdSByYXRpbmcgZG8gbWF0ZXJpYWwgY29tIHN1Y2Vzc29cIik7XHJcbiAgICB9XHJcblxyXG4gICAgZXZhbHVhdGlvblNlbnRGYWlsKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IsbnVsbCw0KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWxob3UgZW52aW8gZG8gcmF0aW5nIGRvIG1hdGVyaWFsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE5vdGlmaWNhdGlvblRvU2hvd0FnYWluKG5vdGlmaWNhdGlvbl9pZCkge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5maWx0ZXIoZnVuY3Rpb24obm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvbi5pZCA9PT0gbm90aWZpY2F0aW9uX2lkKSB7XHJcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uZG9uZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==