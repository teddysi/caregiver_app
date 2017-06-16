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
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService, connector_service_1.ConnectorService, user_service_1.UserService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxpQ0FBK0I7QUFFL0IsK0NBQThDO0FBQzlDLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsNERBQTBEO0FBQzFELDJFQUF5RTtBQUN6RSw0REFBMEQ7QUFFMUQsb0NBQXVDO0FBRXZDLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUIsSUFBYSxjQUFjO0lBTXZCLHdCQUFvQixJQUFVLEVBQVUsV0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxXQUF3QjtRQUExSCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUksOENBQThDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELHVDQUFjLEdBQWQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFDRCxvQ0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsdUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRU0sb0NBQVcsR0FBbEIsVUFBbUIsUUFBUTtR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LFdBQUksRUFBdUIsMEJBQVcsRUFBNEIsb0NBQWdCLEVBQXVCLDBCQUFXO0dBTnJJLGNBQWMsQ0ErSzFCO0FBL0tZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IFF1ZXN0aW9ubmFpcmUgfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9xdWVzdGlvbm5haXJlXCI7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25cIjtcclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4vcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tIFwiLi9ub3RpZmljYXRpb25cIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxuXHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudFNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBwYXRpZW50czogUGF0aWVudFtdO1xyXG4gICAgLy9wdWJsaWMgY2FyZWdpdmVyUXVlc3Rpb25haXJlczogUXVlc3Rpb25uYWlyZVtdO1xyXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZSwgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdJbnN0YW5jaW91IC0gUGF0aWVudFNlcnZpY2UhJyk7XHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5pbml0TWVzc2FnZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Nvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNGaXJzdFJlcXVlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuaXNQYXRpZW50c1JlcXVlc3REb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmdldFBhdGllbnRzRGF0YSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0UGF0aWVudHNfQkQoKSB7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0UGF0aWVudHNEYXRhKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFBhdGllbnRzKHBhdGllbnRzKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRQYXRpZW50c0RhdGEocGF0aWVudHMpO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSBwYXRpZW50cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXRpZW50KGlkOiBudW1iZXIpOiBQYXRpZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLy90ZW1wXHJcblxyXG4gICAgc2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMoY2FyZWdpdmVyUXVlc3Rpb25haXJlcykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UXVpenMoY2FyZWdpdmVyUXVlc3Rpb25haXJlcyk7IFxyXG4gICAgICAgIC8vdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzID0gY2FyZWdpdmVyUXVlc3Rpb25haXJlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmdldFF1aXpzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGhhc0V2YWx1YXRpb25zVG9EbygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuICAgIC8qXHJcbiAgICAgICAgaWYodGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICovXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbm5haXJlX3RvX3NlbmQgPSBbXTtcclxuICAgICAgICBxdWVzdGlvbm5haXJlX3RvX3NlbmQucHVzaChxdWVzdGlvbm5haXJlKTtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlKTtcclxuICAgICAgICBpZih0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSl7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZV90b19zZW5kKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25TZW50U3VjY2VzcyhxdWVzdGlvbm5haXJlX3RvX3NlbmQsIHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vblNlbnRFcnJvcihxdWVzdGlvbm5haXJlX3RvX3NlbmQsIGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25TZW50U3VjY2VzcyhxdWVzdGlvbm5haXJlX3RvX3NlbmQsIHJlc3VsdCkge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXN0aW9uw6FyaW8gZW52aWFkbzpcIik7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5kZWxldGVRdWVzdGlvbm5haXJlKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImVudmlvdSBxdWVzdGlvbsOhcmlvIGNvbSBzdWNlc3NvXCIpO1xyXG4gICAgfVxyXG4gICAgb25TZW50RXJyb3IocXVlc3Rpb25uYWlyZV90b19zZW5kLCBlcnJvcikge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJFUlJPUjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkVSUk9SIExFTkdUSDogXCIgKyBlcnJvci5sZW5ndGgpO1xyXG4gICAgICAgIGlmKGVycm9yLmxlbmd0aCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUXVlc3Rpb27DoXJpbyBlbnZpYWRvOlwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlX3RvX3NlbmQsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5kZWxldGVRdWVzdGlvbm5haXJlKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJlbnZpb3UgcXVlc3Rpb27DoXJpbyBjb20gc3VjZXNzb1wiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3RoaXMuZGF0YVNlcnZpY2UuYWRkUXVlc3Rpb25uYWlyZVRvREIocXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFUlJPIE5PIEVOVklPIERPIFFVRVNUXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZmFsaG91IGVudmlvIGRvIHF1ZXN0aW9uw6FyaW9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgdXNlck91dGRhdGVkKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlRGF0YSgndXNlcicpO1xyXG4gICAgfVxyXG4gICAgaW5pdE1lc3NhZ2VzKCkge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtcclxuICAgICAgICAgICAgbmV3IE5vdGlmaWNhdGlvbigncGVuZGluZyBldmFsdWF0aW9ucycsICdBdmlzbyAtIEF2YWxpYcOnw7VlcycsICdFeGlzdGVtIGF2YWxpYcOnw7VlcyBwZW5kZW50ZXMuIFBvciBmYXZvciBhY2VkYSDDoHMgYXZhbGlhw6fDtWVzIG5vIGNhbnRvIHN1cGVyaW9yIGRpcmVpdG8uJywgZmFsc2UpLFxyXG4gICAgICAgICAgICBuZXcgTm90aWZpY2F0aW9uKCdlcnJvci1hdXRoJywgJ0F2aXNvIC0gQXV0ZW50aWNhw6fDo28nLCAnTyBhY2Vzc28gYW9zIHBhY2llbnRlcyBuw6NvIGZvaSBhdXRvcml6YWRvLiBQb3IgZmF2b3IgcmVpbmljaWUgYSBhcGxpY2HDp8Ojby4nLCBmYWxzZSlcclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IHRoaXMubm90aWZpY2F0aW9ucy5maWx0ZXIoZnVuY3Rpb24oIG9iaiApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iai5pZCA9PT0gaWQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBub3RpZmljYXRpb25bMF07XHJcbiAgICB9XHJcbiAgICBkaXNwbGF5Tm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbiA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKGlkKTtcclxuICAgICAgICBpZighbm90aWZpY2F0aW9uLmRvbmUpIHtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7IFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG5vdGlmaWNhdGlvbi50aXRsZSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG5vdGlmaWNhdGlvbi5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb25lID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNoZWNrUXVpenNUb1N1Ym1pdCgpIHtcclxuICAgICAgICBsZXQgcXVpenMgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFF1aXpzKCk7XHJcbiAgICAgICAgbGV0IHF1aXpzX3RvX3NlbmQgPSBbXTtcclxuXHJcbiAgICAgICAgaWYocXVpenMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJRVUlaUyBHVUFSREFET1M6IFwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenMsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgcXVpenMuZm9yRWFjaChxdWl6ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHF1aXouZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1aXpzX3RvX3NlbmQucHVzaChxdWl6KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUVVJWlMgR1VBUkRBRE9TIFBBUkEgRU5WSU86IFwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVpenNfdG9fc2VuZCwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICBpZihxdWl6c190b19zZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyhxdWl6c190b19zZW5kKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vblNlbnRTdWNjZXNzKHF1aXpzX3RvX3NlbmQsIHJlc3VsdCksXHJcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uU2VudEVycm9yKHF1aXpzX3RvX3NlbmQsIGVycm9yKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlZ2lzdGVyQWNlc3NlZE1hdGVyaWFsKHBhdGllbnQsIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgdmFyIHVzZXIgPSB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnNlbmRBY2Vzc2VkTWF0ZXJpYWwocGF0aWVudCwgdXNlcixtYXRlcmlhbCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLnJlZ2lzdGVyZWRTdWNjZXNzZnVsbHkocmVzdWx0LCBtYXRlcmlhbCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5yZWdpc3RlcmVkRmFpbGVkKGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZWdpc3RlcmVkU3VjY2Vzc2Z1bGx5KHJlc3VsdCwgbWF0ZXJpYWwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdG91IGFjZXNzbyBhbyBtYXRlcmlhbDogSUQgLSBcIiArIG1hdGVyaWFsLmlkICsgJy0nICsgbWF0ZXJpYWwubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJlZEZhaWxlZChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLG51bGwsNCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFsaG91IHJlZ2lzdG8gZGUgYWNlc3NvIGFvIG1hdGVyaWFsXCIpO1xyXG4gICAgfVxyXG4gICAgc2VuZFJhdGluZyhyYXRpbmcpIHtcclxuICAgICAgICAgdmFyIHVzZXIgPSB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnNlbmRNYXRlcmlhbFJhdGluZyh1c2VyLHJhdGluZykuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLmV2YWx1YXRpb25TZW50U3VjY2Vzc2Z1bGx5KHJlc3VsdCwgcmF0aW5nKSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmV2YWx1YXRpb25TZW50RmFpbChlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZXZhbHVhdGlvblNlbnRTdWNjZXNzZnVsbHkocmVzdWx0LCByYXRpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVudmlvdSByYXRpbmcgZG8gbWF0ZXJpYWwgY29tIHN1Y2Vzc29cIik7XHJcbiAgICB9XHJcblxyXG4gICAgZXZhbHVhdGlvblNlbnRGYWlsKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IsbnVsbCw0KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWxob3UgZW52aW8gZG8gcmF0aW5nIGRvIG1hdGVyaWFsXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=