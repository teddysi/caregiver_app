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
        //console.log(JSON.stringify(questionnaire, null, 4));
        var questionnaire_to_send = [];
        questionnaire_to_send.push(questionnaire);
        this.dataService.updateQuizStatus(questionnaire);
        /*
        if(this.connectorService.isConnected()){
        this.connectorService.updateQuizStatus(questionnaire_to_send).subscribe(
            (result) => this.onSentSuccess(questionnaire_to_send, result),
            (error) => this.onSentError(questionnaire_to_send, error)
        );
        } else {
            
        }
        */
    };
    PatientService.prototype.onSentSuccess = function (questionnaire_to_send, result) {
        console.log("Questionário enviado");
        this.dataService.deleteQuestionnaire(questionnaire_to_send);
        //console.log("enviou questionário com sucesso");
    };
    PatientService.prototype.onSentError = function (questionnaire_to_send, error) {
        //console.log("ERROR: " + error);
        //console.log("ERROR LENGTH: " + error.length);
        if (error.length == undefined) {
            console.log("Questionário enviado(erro)");
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
            //console.log("QUIZS GUARDADOS: ");
            //console.log(JSON.stringify(quizs, null, 4));
            quizs.forEach(function (quiz) {
                if (quiz.done) {
                    quizs_to_send.push(quiz);
                }
            });
            //console.log("QUIZS GUARDADOS PARA ENVIO: ");
            //console.log(JSON.stringify(quizs_to_send, null, 4));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxpQ0FBK0I7QUFFL0IsK0NBQThDO0FBQzlDLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsNERBQTBEO0FBQzFELDJFQUF5RTtBQUN6RSw0REFBMEQ7QUFFMUQsb0NBQXVDO0FBRXZDLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUIsSUFBYSxjQUFjO0lBTXZCLHdCQUFvQixJQUFVLEVBQVUsV0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxXQUF3QjtRQUExSCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUksOENBQThDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELHVDQUFjLEdBQWQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFDRCxvQ0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsdUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRU0sb0NBQVcsR0FBbEIsVUFBbUIsUUFBUTtR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MEIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQS9DLENBQStDLEVBQzNELFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUM1QyxDQUFDO0lBQ04sQ0FBQztJQUNELG1EQUEwQixHQUExQixVQUEyQixNQUFNLEVBQUUsTUFBTTtRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELDJDQUFrQixHQUFsQixVQUFtQixLQUFLO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxtREFBMEIsR0FBMUIsVUFBMkIsZUFBZTtRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFTLFlBQVk7WUFDM0MsRUFBRSxDQUFBLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxZQUFZLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBdkxELElBdUxDO0FBdkxZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtxQ0FPaUIsV0FBSSxFQUF1QiwwQkFBVyxFQUE0QixvQ0FBZ0IsRUFBdUIsMEJBQVc7R0FOckksY0FBYyxDQXVMMUI7QUF2TFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgUXVlc3Rpb25uYWlyZSB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9ubmFpcmVcIjtcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvblwiO1xyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gXCIuL25vdGlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3JTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0b3IvY29ubmVjdG9yLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG5cclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQYXRpZW50U2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIHBhdGllbnRzOiBQYXRpZW50W107XHJcbiAgICAvL3B1YmxpYyBjYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzOiBRdWVzdGlvbm5haXJlW107XHJcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0luc3RhbmNpb3UgLSBQYXRpZW50U2VydmljZSEnKTtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmluaXRNZXNzYWdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQ29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0ZpcnN0UmVxdWVzdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5pc1BhdGllbnRzUmVxdWVzdERvbmUoKTtcclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RvclNlcnZpY2UuZ2V0UGF0aWVudHNEYXRhKCk7XHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50c19CRCgpIHtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gdGhpcy5kYXRhU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRpZW50cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UGF0aWVudHMocGF0aWVudHMpIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFBhdGllbnRzRGF0YShwYXRpZW50cyk7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHBhdGllbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBhdGllbnQoaWQ6IG51bWJlcik6IFBhdGllbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuICAgIH1cclxuICAgIHNldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFF1aXpzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpOyBcclxuICAgICAgICAvL3RoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcyA9IGNhcmVnaXZlclF1ZXN0aW9uYWlyZXM7XHJcbiAgICB9XHJcbiAgICBnZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmdldFF1aXpzKCk7XHJcbiAgICB9ICBcclxuICAgIGhhc0V2YWx1YXRpb25zVG9EbygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuICAgIC8qXHJcbiAgICAgICAgaWYodGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICovXHJcbiAgICB9XHJcbiAgICB1cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1ZXN0aW9ubmFpcmUsIG51bGwsIDQpKTtcclxuICAgICAgICB2YXIgcXVlc3Rpb25uYWlyZV90b19zZW5kID0gW107XHJcbiAgICAgICAgcXVlc3Rpb25uYWlyZV90b19zZW5kLnB1c2gocXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS51cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgaWYodGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpe1xyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS51cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLm9uU2VudFN1Y2Nlc3MocXVlc3Rpb25uYWlyZV90b19zZW5kLCByZXN1bHQpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25TZW50RXJyb3IocXVlc3Rpb25uYWlyZV90b19zZW5kLCBlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgfVxyXG4gICAgb25TZW50U3VjY2VzcyhxdWVzdGlvbm5haXJlX3RvX3NlbmQsIHJlc3VsdCkge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXN0aW9uw6FyaW8gZW52aWFkb1wiKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZVF1ZXN0aW9ubmFpcmUocXVlc3Rpb25uYWlyZV90b19zZW5kKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW52aW91IHF1ZXN0aW9uw6FyaW8gY29tIHN1Y2Vzc29cIik7XHJcbiAgICB9XHJcbiAgICBvblNlbnRFcnJvcihxdWVzdGlvbm5haXJlX3RvX3NlbmQsIGVycm9yKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVSUk9SOiBcIiArIGVycm9yKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiRVJST1IgTEVOR1RIOiBcIiArIGVycm9yLmxlbmd0aCk7XHJcbiAgICAgICAgaWYoZXJyb3IubGVuZ3RoID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJRdWVzdGlvbsOhcmlvIGVudmlhZG8oZXJybylcIik7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVlc3Rpb25uYWlyZV90b19zZW5kLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlUXVlc3Rpb25uYWlyZShxdWVzdGlvbm5haXJlX3RvX3NlbmQpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW52aW91IHF1ZXN0aW9uw6FyaW8gY29tIHN1Y2Vzc29cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy90aGlzLmRhdGFTZXJ2aWNlLmFkZFF1ZXN0aW9ubmFpcmVUb0RCKHF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRVJSTyBOTyBFTlZJTyBETyBRVUVTVFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImZhbGhvdSBlbnZpbyBkbyBxdWVzdGlvbsOhcmlvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICB1c2VyT3V0ZGF0ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5kZWxldGVEYXRhKCd1c2VyJyk7XHJcbiAgICB9XHJcbiAgICBpbml0TWVzc2FnZXMoKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zID0gW1xyXG4gICAgICAgICAgICBuZXcgTm90aWZpY2F0aW9uKCdwZW5kaW5nIGV2YWx1YXRpb25zJywgJ0F2aXNvIC0gQXZhbGlhw6fDtWVzJywgJ0V4aXN0ZW0gYXZhbGlhw6fDtWVzIHBlbmRlbnRlcy4gUG9yIGZhdm9yIGFjZWRhIMOgcyBhdmFsaWHDp8O1ZXMgbm8gY2FudG8gc3VwZXJpb3IgZGlyZWl0by4nLCBmYWxzZSksXHJcbiAgICAgICAgICAgIG5ldyBOb3RpZmljYXRpb24oJ2Vycm9yLWF1dGgnLCAnQXZpc28gLSBBdXRlbnRpY2HDp8OjbycsICdPIGFjZXNzbyBhb3MgcGFjaWVudGVzIG7Do28gZm9pIGF1dG9yaXphZG8uIFBvciBmYXZvciByZWluaWNpZSBhIGFwbGljYcOnw6NvLicsIGZhbHNlKSxcclxuICAgICAgICAgICAgbmV3IE5vdGlmaWNhdGlvbignbm8gbmV0IHF1aXpzJywgJ0F2aXNvIC0gQXZhbGlhw6fDtWVzJywgJ0VuY29udHJhLXNlIHNlbSBhY2Vzc28gw6AgaW50ZXJuZXQuIE8gc2V1IHF1ZXN0aW9uw6FyaW8gYXBlbmFzIHNlcsOhIHN1Ym1ldGlkbyBxdWFuZG8gdGl2ZXIgYWNlc3NvLicsIGZhbHNlKVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICBnZXROb3RpZmljYXRpb24oaWQpIHtcclxuICAgICAgICB2YXIgbm90aWZpY2F0aW9uID0gdGhpcy5ub3RpZmljYXRpb25zLmZpbHRlcihmdW5jdGlvbiggb2JqICkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqLmlkID09PSBpZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvblswXTtcclxuICAgIH1cclxuICAgIGRpc3BsYXlOb3RpZmljYXRpb24oaWQpIHtcclxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uID0gdGhpcy5nZXROb3RpZmljYXRpb24oaWQpO1xyXG4gICAgICAgIGlmKCFub3RpZmljYXRpb24uZG9uZSkge1xyXG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHsgXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbm90aWZpY2F0aW9uLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbm90aWZpY2F0aW9uLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgY2hlY2tRdWl6c1RvU3VibWl0KCkge1xyXG4gICAgICAgIGxldCBxdWl6cyA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0UXVpenMoKTtcclxuICAgICAgICBsZXQgcXVpenNfdG9fc2VuZCA9IFtdO1xyXG5cclxuICAgICAgICBpZihxdWl6cykge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUVVJWlMgR1VBUkRBRE9TOiBcIik7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChxdWl6ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHF1aXouZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1aXpzX3RvX3NlbmQucHVzaChxdWl6KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJRVUlaUyBHVUFSREFET1MgUEFSQSBFTlZJTzogXCIpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzX3RvX3NlbmQsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgaWYocXVpenNfdG9fc2VuZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnVwZGF0ZVF1aXpTdGF0dXMocXVpenNfdG9fc2VuZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25TZW50U3VjY2VzcyhxdWl6c190b19zZW5kLCByZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vblNlbnRFcnJvcihxdWl6c190b19zZW5kLCBlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZWdpc3RlckFjZXNzZWRNYXRlcmlhbChwYXRpZW50LCBtYXRlcmlhbCkge1xyXG4gICAgICAgIHZhciB1c2VyID0gdGhpcy51c2VyU2VydmljZS5nZXRVc2VyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS5zZW5kQWNlc3NlZE1hdGVyaWFsKHBhdGllbnQsIHVzZXIsbWF0ZXJpYWwpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5yZWdpc3RlcmVkU3VjY2Vzc2Z1bGx5KHJlc3VsdCwgbWF0ZXJpYWwpLFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMucmVnaXN0ZXJlZEZhaWxlZChlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJlZFN1Y2Nlc3NmdWxseShyZXN1bHQsIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RvdSBhY2Vzc28gYW8gbWF0ZXJpYWw6IElEIC0gXCIgKyBtYXRlcmlhbC5pZCArICctJyArIG1hdGVyaWFsLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyZWRGYWlsZWQoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcixudWxsLDQpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZhbGhvdSByZWdpc3RvIGRlIGFjZXNzbyBhbyBtYXRlcmlhbFwiKTtcclxuICAgIH1cclxuICAgIHNlbmRSYXRpbmcocmF0aW5nKSB7XHJcbiAgICAgICAgIHZhciB1c2VyID0gdGhpcy51c2VyU2VydmljZS5nZXRVc2VyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdG9yU2VydmljZS5zZW5kTWF0ZXJpYWxSYXRpbmcodXNlcixyYXRpbmcpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5ldmFsdWF0aW9uU2VudFN1Y2Nlc3NmdWxseShyZXN1bHQsIHJhdGluZyksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5ldmFsdWF0aW9uU2VudEZhaWwoZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGV2YWx1YXRpb25TZW50U3VjY2Vzc2Z1bGx5KHJlc3VsdCwgcmF0aW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFbnZpb3UgcmF0aW5nIGRvIG1hdGVyaWFsIGNvbSBzdWNlc3NvXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGV2YWx1YXRpb25TZW50RmFpbChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLG51bGwsNCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFsaG91IGVudmlvIGRvIHJhdGluZyBkbyBtYXRlcmlhbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXROb3RpZmljYXRpb25Ub1Nob3dBZ2Fpbihub3RpZmljYXRpb25faWQpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG5vdGlmaWNhdGlvbikge1xyXG4gICAgICAgICAgICBpZihub3RpZmljYXRpb24uaWQgPT09IG5vdGlmaWNhdGlvbl9pZCkge1xyXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmRvbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=