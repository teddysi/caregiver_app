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
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService, connector_service_1.ConnectorService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxpQ0FBK0I7QUFFL0IsK0NBQThDO0FBQzlDLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsNERBQTBEO0FBQzFELDJFQUF5RTtBQUd6RSxvQ0FBdUM7QUFFdkMsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUc5QixJQUFhLGNBQWM7SUFNdkIsd0JBQW9CLElBQVUsRUFBVSxXQUF3QixFQUFVLGdCQUFrQztRQUF4RixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3hHLDhDQUE4QztRQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCx1Q0FBYyxHQUFkO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBQ0Qsb0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUNELHVDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVNLG9DQUFXLEdBQWxCLFVBQW1CLFFBQVE7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7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LE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsZUFBYSxFQUFFLE1BQU0sQ0FBQyxFQUF6QyxDQUF5QyxFQUNyRCxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsZUFBYSxFQUFFLEtBQUssQ0FBQyxFQUF0QyxDQUFzQyxDQUNwRCxDQUFDO2dCQUNOLENBQUM7WUFDRCxDQUFDO1FBRUwsQ0FBQztJQUNMLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFoSkQsSUFnSkM7QUFoSlksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQU9pQixXQUFJLEVBQXVCLDBCQUFXLEVBQTRCLG9DQUFnQjtHQU5uRyxjQUFjLENBZ0oxQjtBQWhKWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBRdWVzdGlvbm5haXJlIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25uYWlyZVwiO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuL3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSBcIi4vbm90aWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcblxyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIC8vcHVibGljIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXM6IFF1ZXN0aW9ubmFpcmVbXTtcclxuICAgIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdJbnN0YW5jaW91IC0gUGF0aWVudFNlcnZpY2UhJyk7XHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5pbml0TWVzc2FnZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Nvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmlzQ29ubmVjdGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNGaXJzdFJlcXVlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuaXNQYXRpZW50c1JlcXVlc3REb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXRQYXRpZW50cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3JTZXJ2aWNlLmdldFBhdGllbnRzRGF0YSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0UGF0aWVudHNfQkQoKSB7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0UGF0aWVudHNEYXRhKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFBhdGllbnRzKHBhdGllbnRzKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRQYXRpZW50c0RhdGEocGF0aWVudHMpO1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSBwYXRpZW50cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYXRpZW50KGlkOiBudW1iZXIpOiBQYXRpZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLy90ZW1wXHJcblxyXG4gICAgc2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMoY2FyZWdpdmVyUXVlc3Rpb25haXJlcykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UXVpenMoY2FyZWdpdmVyUXVlc3Rpb25haXJlcyk7IFxyXG4gICAgICAgIC8vdGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzID0gY2FyZWdpdmVyUXVlc3Rpb25haXJlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYXJlZ2l2ZXJRdWVzdGlvbm5haXJlcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmdldFF1aXpzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGhhc0V2YWx1YXRpb25zVG9EbygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuICAgIC8qXHJcbiAgICAgICAgaWYodGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhcmVnaXZlclF1ZXN0aW9uYWlyZXMubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICovXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbm5haXJlX3RvX3NlbmQgPSBbXTtcclxuICAgICAgICBxdWVzdGlvbm5haXJlX3RvX3NlbmQucHVzaChxdWVzdGlvbm5haXJlKTtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlKTtcclxuICAgICAgICBpZih0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSl7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnVwZGF0ZVF1aXpTdGF0dXMocXVlc3Rpb25uYWlyZV90b19zZW5kKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25TZW50U3VjY2VzcyhxdWVzdGlvbm5haXJlX3RvX3NlbmQsIHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vblNlbnRFcnJvcihxdWVzdGlvbm5haXJlX3RvX3NlbmQsIGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25TZW50U3VjY2VzcyhxdWVzdGlvbm5haXJlX3RvX3NlbmQsIHJlc3VsdCkge1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlUXVlc3Rpb25uYWlyZShxdWVzdGlvbm5haXJlX3RvX3NlbmQpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJlbnZpb3UgcXVlc3Rpb27DoXJpbyBjb20gc3VjZXNzb1wiKTtcclxuICAgIH1cclxuICAgIG9uU2VudEVycm9yKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCwgZXJyb3IpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiRVJST1I6IFwiICsgZXJyb3IpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJFUlJPUiBMRU5HVEg6IFwiICsgZXJyb3IubGVuZ3RoKTtcclxuICAgICAgICBpZihlcnJvci5sZW5ndGggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiUXVlc3Rpb27DoXJpbyBlbnZpYWRvOlwiKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShxdWVzdGlvbm5haXJlX3RvX3NlbmQsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5kZWxldGVRdWVzdGlvbm5haXJlKHF1ZXN0aW9ubmFpcmVfdG9fc2VuZCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJlbnZpb3UgcXVlc3Rpb27DoXJpbyBjb20gc3VjZXNzb1wiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3RoaXMuZGF0YVNlcnZpY2UuYWRkUXVlc3Rpb25uYWlyZVRvREIocXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJFUlJPIE5PIEVOVklPIERPIFFVRVNUXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZmFsaG91IGVudmlvIGRvIHF1ZXN0aW9uw6FyaW9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgdXNlck91dGRhdGVkKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlRGF0YSgndXNlcicpO1xyXG4gICAgfVxyXG4gICAgaW5pdE1lc3NhZ2VzKCkge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtcclxuICAgICAgICAgICAgbmV3IE5vdGlmaWNhdGlvbigncGVuZGluZyBldmFsdWF0aW9ucycsICdBdmlzbyAtIEF2YWxpYcOnw7VlcycsICdFeGlzdGVtIGF2YWxpYcOnw7VlcyBwZW5kZW50ZXMuIFBvciBmYXZvciBhY2VkYSDDoHMgYXZhbGlhw6fDtWVzIG5vIGNhbnRvIHN1cGVyaW9yIGRpcmVpdG8uJywgZmFsc2UpLFxyXG4gICAgICAgICAgICBuZXcgTm90aWZpY2F0aW9uKCdlcnJvci1hdXRoJywgJ0F2aXNvIC0gQXV0ZW50aWNhw6fDo28nLCAnTyBhY2Vzc28gYW9zIHBhY2llbnRlcyBuw6NvIGZvaSBhdXRvcml6YWRvLiBQb3IgZmF2b3IgcmVpbmljaWUgYSBhcGxpY2HDp8Ojby4nLCBmYWxzZSlcclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IHRoaXMubm90aWZpY2F0aW9ucy5maWx0ZXIoZnVuY3Rpb24oIG9iaiApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iai5pZCA9PT0gaWQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBub3RpZmljYXRpb25bMF07XHJcbiAgICB9XHJcbiAgICBkaXNwbGF5Tm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbiA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKGlkKTtcclxuICAgICAgICBpZighbm90aWZpY2F0aW9uLmRvbmUpIHtcclxuICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7IFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG5vdGlmaWNhdGlvbi50aXRsZSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG5vdGlmaWNhdGlvbi5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb25lID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNoZWNrUXVpenNUb1N1Ym1pdCgpIHtcclxuICAgICAgICBpZih0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICBsZXQgcXVpenMgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFF1aXpzKCk7XHJcbiAgICAgICAgICAgIGxldCBxdWl6c190b19zZW5kID0gW107XHJcblxyXG4gICAgICAgICAgICBpZihxdWl6cykge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlFVSVpTIEdVQVJEQURPUyBQQVJBIEVOVklPOiBcIik7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHF1aXpzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgICAgICBxdWl6cy5mb3JFYWNoKHF1aXogPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHF1aXouZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWl6c190b19zZW5kLnB1c2gocXVpeik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYocXVpenNfdG9fc2VuZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXJ2aWNlLnVwZGF0ZVF1aXpTdGF0dXMocXVpenNfdG9fc2VuZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25TZW50U3VjY2VzcyhxdWl6c190b19zZW5kLCByZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vblNlbnRFcnJvcihxdWl6c190b19zZW5kLCBlcnJvcilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==