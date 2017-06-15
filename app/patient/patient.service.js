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
        var questionnaire_to_send = [];
        questionnaire_to_send.push(questionnaire);
        this.dataService.updateQuizStatus(questionnaire);
        if (this.connectorService.isConnected()) {
            this.connectorService.updateQuizStatus(questionnaire_to_send).subscribe(function (result) { return _this.onSentSuccess(questionnaire_to_send, result); }, function (error) { return _this.onSentError(questionnaire_to_send, error); });
        }
    };
    PatientService.prototype.onSentSuccess = function (questionnaire_to_send, result) {
        this.dataService.deleteQuestionnaire(questionnaire_to_send);
        //console.log("enviou questionário com sucesso");
    };
    PatientService.prototype.onSentError = function (questionnaire_to_send, error) {
        //console.log("ERROR: " + error);
        //console.log("ERROR LENGTH: " + error.length);
        if (error.length == undefined) {
            //console.log("Questionário enviado:");
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
        if (this.connectorService.isConnected()) {
            var quizs = this.dataService.getQuizs();
            var quizs_to_send_1 = [];
            if (quizs) {
                //console.log("QUIZS GUARDADOS PARA ENVIO: ");
                //console.log(JSON.stringify(quizs, null, 4));
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
    PatientService.prototype.registerAcessedMaterial = function (patient, material) {
        var _this = this;
        var user = this.userService.getUser();
        this.connectorService.sendAcessedMaterial(patient, user, material).subscribe(function (result) { return _this.registeredSuccessfully(result, material); }, function (error) { return _this.registeredFailed(error); });
    };
    PatientService.prototype.registeredSuccessfully = function (result, material) {
        console.log("Registou acesso ao material: ID - " + material.id + '-' + material.name);
    };
    PatientService.prototype.registeredFailed = function (error) {
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
        console.log("Falhou envio do rating do material");
    };
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService, connector_service_1.ConnectorService, user_service_1.UserService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxpQ0FBK0I7QUFFL0IsK0NBQThDO0FBQzlDLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsNERBQTBEO0FBQzFELDJFQUF5RTtBQUN6RSw0REFBMEQ7QUFFMUQsb0NBQXVDO0FBRXZDLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUIsSUFBYSxjQUFjO0lBTXZCLHdCQUFvQixJQUFVLEVBQVUsV0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxXQUF3QjtRQUExSCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUksOENBQThDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELHVDQUFjLEdBQWQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFDRCxvQ0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsdUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRU0sb0NBQVcsR0FBbEIsVUFBbUIsUUFBUTtR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QUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQzNELFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBL0MsQ0FBK0MsRUFDM0QsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQTlCLENBQThCLENBQzVDLENBQUM7SUFDTixDQUFDO0lBQ0QsbURBQTBCLEdBQTFCLFVBQTJCLE1BQU0sRUFBRSxNQUFNO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsMkNBQWtCLEdBQWxCLFVBQW1CLEtBQUs7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUE5S0QsSUE4S0M7QUE5S1ksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQU9pQixXQUFJLEVBQXVCLDBCQUFXLEVBQTRCLG9DQUFnQixFQUF1QiwwQkFBVztHQU5ySSxjQUFjLENBOEsxQjtBQTlLWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBRdWVzdGlvbm5haXJlIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25uYWlyZVwiO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuL3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSBcIi4vbm90aWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcblxyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIC8vcHVibGljIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXM6IFF1ZXN0aW9ubmFpcmVbXTtcclxuICAgIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnSW5zdGFuY2lvdSAtIFBhdGllbnRTZXJ2aWNlIScpO1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdE1lc3NhZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRmlyc3RSZXF1ZXN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmlzUGF0aWVudHNSZXF1ZXN0RG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0UGF0aWVudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzX0JEKCkge1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFBhdGllbnRzRGF0YSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQYXRpZW50cyhwYXRpZW50cykge1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UGF0aWVudHNEYXRhKHBhdGllbnRzKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gcGF0aWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudChpZDogbnVtYmVyKTogUGF0aWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdGVtcFxyXG5cclxuICAgIHNldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFF1aXpzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpOyBcclxuICAgICAgICAvL3RoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcyA9IGNhcmVnaXZlclF1ZXN0aW9uYWlyZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5nZXRRdWl6cygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG8oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCk7XHJcbiAgICAvKlxyXG4gICAgICAgIGlmKHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAqL1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25uYWlyZV90b19zZW5kID0gW107XHJcbiAgICAgICAgcXVlc3Rpb25uYWlyZV90b19zZW5kLnB1c2gocXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgaWYodGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpe1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS51cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uU2VudFN1Y2Nlc3MocXVlc3Rpb25uYWlyZV90b19zZW5kLCByZXN1bHQpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25TZW50RXJyb3IocXVlc3Rpb25uYWlyZV90b19zZW5kLCBlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uU2VudFN1Y2Nlc3MocXVlc3Rpb25uYWlyZV90b19zZW5kLCByZXN1bHQpIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZVF1ZXN0aW9ubmFpcmUocXVlc3Rpb25uYWlyZV90b19zZW5kKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW52aW91IHF1ZXN0aW9uw6FyaW8gY29tIHN1Y2Vzc29cIik7XHJcbiAgICB9XHJcbiAgICBvblNlbnRFcnJvcihxdWVzdGlvbm5haXJlX3RvX3NlbmQsIGVycm9yKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVSUk9SOiBcIiArIGVycm9yKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiRVJST1IgTEVOR1RIOiBcIiArIGVycm9yLmxlbmd0aCk7XHJcbiAgICAgICAgaWYoZXJyb3IubGVuZ3RoID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlF1ZXN0aW9uw6FyaW8gZW52aWFkbzpcIik7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVlc3Rpb25uYWlyZV90b19zZW5kLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlUXVlc3Rpb25uYWlyZShxdWVzdGlvbm5haXJlX3RvX3NlbmQpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW52aW91IHF1ZXN0aW9uw6FyaW8gY29tIHN1Y2Vzc29cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy90aGlzLmRhdGFTZXJ2aWNlLmFkZFF1ZXN0aW9ubmFpcmVUb0RCKHF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRVJSTyBOTyBFTlZJTyBETyBRVUVTVFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImZhbGhvdSBlbnZpbyBkbyBxdWVzdGlvbsOhcmlvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHVzZXJPdXRkYXRlZCgpIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZURhdGEoJ3VzZXInKTtcclxuICAgIH1cclxuICAgIGluaXRNZXNzYWdlcygpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBOb3RpZmljYXRpb24oJ3BlbmRpbmcgZXZhbHVhdGlvbnMnLCAnQXZpc28gLSBBdmFsaWHDp8O1ZXMnLCAnRXhpc3RlbSBhdmFsaWHDp8O1ZXMgcGVuZGVudGVzLiBQb3IgZmF2b3IgYWNlZGEgw6BzIGF2YWxpYcOnw7VlcyBubyBjYW50byBzdXBlcmlvciBkaXJlaXRvLicsIGZhbHNlKSxcclxuICAgICAgICAgICAgbmV3IE5vdGlmaWNhdGlvbignZXJyb3ItYXV0aCcsICdBdmlzbyAtIEF1dGVudGljYcOnw6NvJywgJ08gYWNlc3NvIGFvcyBwYWNpZW50ZXMgbsOjbyBmb2kgYXV0b3JpemFkby4gUG9yIGZhdm9yIHJlaW5pY2llIGEgYXBsaWNhw6fDo28uJywgZmFsc2UpXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGdldE5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgICAgIHZhciBub3RpZmljYXRpb24gPSB0aGlzLm5vdGlmaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKCBvYmogKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmouaWQgPT09IGlkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9uWzBdO1xyXG4gICAgfVxyXG4gICAgZGlzcGxheU5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgICAgIGxldCBub3RpZmljYXRpb24gPSB0aGlzLmdldE5vdGlmaWNhdGlvbihpZCk7XHJcbiAgICAgICAgaWYoIW5vdGlmaWNhdGlvbi5kb25lKSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoeyBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBub3RpZmljYXRpb24udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBub3RpZmljYXRpb24ubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub3RpZmljYXRpb24uZG9uZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBjaGVja1F1aXpzVG9TdWJtaXQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgICAgbGV0IHF1aXpzID0gdGhpcy5kYXRhU2VydmljZS5nZXRRdWl6cygpO1xyXG4gICAgICAgICAgICBsZXQgcXVpenNfdG9fc2VuZCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJRVUlaUyBHVUFSREFET1MgUEFSQSBFTlZJTzogXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWl6cywgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAgICAgcXVpenMuZm9yRWFjaChxdWl6ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihxdWl6LmRvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVpenNfdG9fc2VuZC5wdXNoKHF1aXopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHF1aXpzX3RvX3NlbmQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS51cGRhdGVRdWl6U3RhdHVzKHF1aXpzX3RvX3NlbmQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uU2VudFN1Y2Nlc3MocXVpenNfdG9fc2VuZCwgcmVzdWx0KSxcclxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25TZW50RXJyb3IocXVpenNfdG9fc2VuZCwgZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJBY2Vzc2VkTWF0ZXJpYWwocGF0aWVudCwgbWF0ZXJpYWwpIHtcclxuICAgICAgICB2YXIgdXNlciA9IHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2Uuc2VuZEFjZXNzZWRNYXRlcmlhbChwYXRpZW50LCB1c2VyLG1hdGVyaWFsKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMucmVnaXN0ZXJlZFN1Y2Nlc3NmdWxseShyZXN1bHQsIG1hdGVyaWFsKSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLnJlZ2lzdGVyZWRGYWlsZWQoZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyZWRTdWNjZXNzZnVsbHkocmVzdWx0LCBtYXRlcmlhbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0b3UgYWNlc3NvIGFvIG1hdGVyaWFsOiBJRCAtIFwiICsgbWF0ZXJpYWwuaWQgKyAnLScgKyBtYXRlcmlhbC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RlcmVkRmFpbGVkKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWxob3UgcmVnaXN0byBkZSBhY2Vzc28gYW8gbWF0ZXJpYWxcIik7XHJcbiAgICB9XHJcbiAgICBzZW5kUmF0aW5nKHJhdGluZykge1xyXG4gICAgICAgICB2YXIgdXNlciA9IHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2Uuc2VuZE1hdGVyaWFsUmF0aW5nKHVzZXIscmF0aW5nKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMuZXZhbHVhdGlvblNlbnRTdWNjZXNzZnVsbHkocmVzdWx0LCByYXRpbmcpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuZXZhbHVhdGlvblNlbnRGYWlsKGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBldmFsdWF0aW9uU2VudFN1Y2Nlc3NmdWxseShyZXN1bHQsIHJhdGluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRW52aW91IHJhdGluZyBkbyBtYXRlcmlhbCBjb20gc3VjZXNzb1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBldmFsdWF0aW9uU2VudEZhaWwoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZhbGhvdSBlbnZpbyBkbyByYXRpbmcgZG8gbWF0ZXJpYWxcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==