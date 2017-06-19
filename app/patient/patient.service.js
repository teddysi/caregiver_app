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
        if (this.connectorService.isConnected()) {
            this.connectorService.updateQuizStatus(questionnaire_to_send).subscribe(function (result) { return _this.onSentSuccess(questionnaire_to_send, result); }, function (error) { return _this.onSentError(questionnaire_to_send, error); });
        }
        else {
            this.dataService.updateQuizStatus(questionnaire);
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
            new notification_1.Notification('error-auth', 'Aviso - Autenticação', 'O acesso aos pacientes não foi autorizado. Por favor reinicie a aplicação.', false),
            new notification_1.Notification('no net quizs', 'Aviso - Avaliações', 'Encontra-se sem acesso à internet. O seu questionário apenas será submetido quando tiver acesso.', false)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxpQ0FBK0I7QUFFL0IsK0NBQThDO0FBQzlDLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsNERBQTBEO0FBQzFELDJFQUF5RTtBQUN6RSw0REFBMEQ7QUFFMUQsb0NBQXVDO0FBRXZDLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUIsSUFBYSxjQUFjO0lBTXZCLHdCQUFvQixJQUFVLEVBQVUsV0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxXQUF3QjtRQUExSCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUksOENBQThDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELHVDQUFjLEdBQWQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFDRCxvQ0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsdUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRU0sb0NBQVcsR0FBbEIsVUFBbUIsUUFBUTtR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QUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELG1EQUEwQixHQUExQixVQUEyQixlQUFlO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVMsWUFBWTtZQUMzQyxFQUFFLENBQUEsQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLFlBQVksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzlCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFyTEQsSUFxTEM7QUFyTFksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQU9pQixXQUFJLEVBQXVCLDBCQUFXLEVBQTRCLG9DQUFnQixFQUF1QiwwQkFBVztHQU5ySSxjQUFjLENBcUwxQjtBQXJMWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBRdWVzdGlvbm5haXJlIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25uYWlyZVwiO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuL3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSBcIi4vbm90aWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcblxyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIC8vcHVibGljIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXM6IFF1ZXN0aW9ubmFpcmVbXTtcclxuICAgIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnSW5zdGFuY2lvdSAtIFBhdGllbnRTZXJ2aWNlIScpO1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdE1lc3NhZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRmlyc3RSZXF1ZXN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmlzUGF0aWVudHNSZXF1ZXN0RG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0UGF0aWVudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzX0JEKCkge1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFBhdGllbnRzRGF0YSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQYXRpZW50cyhwYXRpZW50cykge1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UGF0aWVudHNEYXRhKHBhdGllbnRzKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gcGF0aWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudChpZDogbnVtYmVyKTogUGF0aWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgfVxyXG4gICAgc2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMoY2FyZWdpdmVyUXVlc3Rpb25haXJlcykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UXVpenMoY2FyZWdpdmVyUXVlc3Rpb25haXJlcyk7IFxyXG4gICAgICAgIC8vdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzID0gY2FyZWdpdmVyUXVlc3Rpb25haXJlcztcclxuICAgIH1cclxuICAgIGdldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuZ2V0UXVpenMoKTtcclxuICAgIH0gIFxyXG4gICAgaGFzRXZhbHVhdGlvbnNUb0RvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG4gICAgLypcclxuICAgICAgICBpZih0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcy5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKi9cclxuICAgIH1cclxuICAgIHVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVlc3Rpb25uYWlyZSwgbnVsbCwgNCkpO1xyXG4gICAgICAgIHZhciBxdWVzdGlvbm5haXJlX3RvX3NlbmQgPSBbXTtcclxuICAgICAgICBxdWVzdGlvbm5haXJlX3RvX3NlbmQucHVzaChxdWVzdGlvbm5haXJlKTtcclxuICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKXtcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlX3RvX3NlbmQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vblNlbnRTdWNjZXNzKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgcmVzdWx0KSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uU2VudEVycm9yKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25TZW50U3VjY2VzcyhxdWVzdGlvbm5haXJlX3RvX3NlbmQsIHJlc3VsdCkge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXN0aW9uw6FyaW8gZW52aWFkbzpcIik7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5kZWxldGVRdWVzdGlvbm5haXJlKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImVudmlvdSBxdWVzdGlvbsOhcmlvIGNvbSBzdWNlc3NvXCIpO1xyXG4gICAgfVxyXG4gICAgb25TZW50RXJyb3IocXVlc3Rpb25uYWlyZV90b19zZW5kLCBlcnJvcikge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJFUlJPUjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVSUk9SIExFTkdUSDogXCIgKyBlcnJvci5sZW5ndGgpO1xyXG4gICAgICAgIGlmKGVycm9yLmxlbmd0aCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUXVlc3Rpb27DoXJpbyBlbnZpYWRvOlwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlX3RvX3NlbmQsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5kZWxldGVRdWVzdGlvbm5haXJlKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJlbnZpb3UgcXVlc3Rpb27DoXJpbyBjb20gc3VjZXNzb1wiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3RoaXMuZGF0YVNlcnZpY2UuYWRkUXVlc3Rpb25uYWlyZVRvREIocXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFUlJPIE5PIEVOVklPIERPIFFVRVNUXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZmFsaG91IGVudmlvIGRvIHF1ZXN0aW9uw6FyaW9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHVzZXJPdXRkYXRlZCgpIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZURhdGEoJ3VzZXInKTtcclxuICAgIH1cclxuICAgIGluaXRNZXNzYWdlcygpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBOb3RpZmljYXRpb24oJ3BlbmRpbmcgZXZhbHVhdGlvbnMnLCAnQXZpc28gLSBBdmFsaWHDp8O1ZXMnLCAnRXhpc3RlbSBhdmFsaWHDp8O1ZXMgcGVuZGVudGVzLiBQb3IgZmF2b3IgYWNlZGEgw6BzIGF2YWxpYcOnw7VlcyBubyBjYW50byBzdXBlcmlvciBkaXJlaXRvLicsIGZhbHNlKSxcclxuICAgICAgICAgICAgbmV3IE5vdGlmaWNhdGlvbignZXJyb3ItYXV0aCcsICdBdmlzbyAtIEF1dGVudGljYcOnw6NvJywgJ08gYWNlc3NvIGFvcyBwYWNpZW50ZXMgbsOjbyBmb2kgYXV0b3JpemFkby4gUG9yIGZhdm9yIHJlaW5pY2llIGEgYXBsaWNhw6fDo28uJywgZmFsc2UpLFxyXG4gICAgICAgICAgICBuZXcgTm90aWZpY2F0aW9uKCdubyBuZXQgcXVpenMnLCAnQXZpc28gLSBBdmFsaWHDp8O1ZXMnLCAnRW5jb250cmEtc2Ugc2VtIGFjZXNzbyDDoCBpbnRlcm5ldC4gTyBzZXUgcXVlc3Rpb27DoXJpbyBhcGVuYXMgc2Vyw6Egc3VibWV0aWRvIHF1YW5kbyB0aXZlciBhY2Vzc28uJywgZmFsc2UpXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGdldE5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgICAgIHZhciBub3RpZmljYXRpb24gPSB0aGlzLm5vdGlmaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKCBvYmogKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmouaWQgPT09IGlkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9uWzBdO1xyXG4gICAgfVxyXG4gICAgZGlzcGxheU5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgICAgIGxldCBub3RpZmljYXRpb24gPSB0aGlzLmdldE5vdGlmaWNhdGlvbihpZCk7XHJcbiAgICAgICAgaWYoIW5vdGlmaWNhdGlvbi5kb25lKSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoeyBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBub3RpZmljYXRpb24udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBub3RpZmljYXRpb24ubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub3RpZmljYXRpb24uZG9uZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBjaGVja1F1aXpzVG9TdWJtaXQoKSB7XHJcbiAgICAgICAgbGV0IHF1aXpzID0gdGhpcy5kYXRhU2VydmljZS5nZXRRdWl6cygpO1xyXG4gICAgICAgIGxldCBxdWl6c190b19zZW5kID0gW107XHJcblxyXG4gICAgICAgIGlmKHF1aXpzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUVVJWlMgR1VBUkRBRE9TOiBcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHF1aXpzLmZvckVhY2gocXVpeiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihxdWl6LmRvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWl6c190b19zZW5kLnB1c2gocXVpeik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlFVSVpTIEdVQVJEQURPUyBQQVJBIEVOVklPOiBcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzX3RvX3NlbmQsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgaWYocXVpenNfdG9fc2VuZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnVwZGF0ZVF1aXpTdGF0dXMocXVpenNfdG9fc2VuZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25TZW50U3VjY2VzcyhxdWl6c190b19zZW5kLCByZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vblNlbnRFcnJvcihxdWl6c190b19zZW5kLCBlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZWdpc3RlckFjZXNzZWRNYXRlcmlhbChwYXRpZW50LCBtYXRlcmlhbCkge1xyXG4gICAgICAgIHZhciB1c2VyID0gdGhpcy51c2VyU2VydmljZS5nZXRVc2VyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS5zZW5kQWNlc3NlZE1hdGVyaWFsKHBhdGllbnQsIHVzZXIsbWF0ZXJpYWwpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5yZWdpc3RlcmVkU3VjY2Vzc2Z1bGx5KHJlc3VsdCwgbWF0ZXJpYWwpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMucmVnaXN0ZXJlZEZhaWxlZChlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJlZFN1Y2Nlc3NmdWxseShyZXN1bHQsIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RvdSBhY2Vzc28gYW8gbWF0ZXJpYWw6IElEIC0gXCIgKyBtYXRlcmlhbC5pZCArICctJyArIG1hdGVyaWFsLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyZWRGYWlsZWQoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcixudWxsLDQpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZhbGhvdSByZWdpc3RvIGRlIGFjZXNzbyBhbyBtYXRlcmlhbFwiKTtcclxuICAgIH1cclxuICAgIHNlbmRSYXRpbmcocmF0aW5nKSB7XHJcbiAgICAgICAgIHZhciB1c2VyID0gdGhpcy51c2VyU2VydmljZS5nZXRVc2VyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS5zZW5kTWF0ZXJpYWxSYXRpbmcodXNlcixyYXRpbmcpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5ldmFsdWF0aW9uU2VudFN1Y2Nlc3NmdWxseShyZXN1bHQsIHJhdGluZyksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5ldmFsdWF0aW9uU2VudEZhaWwoZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGV2YWx1YXRpb25TZW50U3VjY2Vzc2Z1bGx5KHJlc3VsdCwgcmF0aW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFbnZpb3UgcmF0aW5nIGRvIG1hdGVyaWFsIGNvbSBzdWNlc3NvXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGV2YWx1YXRpb25TZW50RmFpbChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLG51bGwsNCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFsaG91IGVudmlvIGRvIHJhdGluZyBkbyBtYXRlcmlhbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXROb3RpZmljYXRpb25Ub1Nob3dBZ2Fpbihub3RpZmljYXRpb25faWQpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG5vdGlmaWNhdGlvbikge1xyXG4gICAgICAgICAgICBpZihub3RpZmljYXRpb24uaWQgPT09IG5vdGlmaWNhdGlvbl9pZCkge1xyXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmRvbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=