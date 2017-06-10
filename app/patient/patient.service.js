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
            this.connectorService.updateQuizStatus(questionnaire_to_send).subscribe(function (result) { return _this.onSentSuccess(questionnaire, result); }, function (error) { return _this.onSentError(questionnaire, error); });
        }
    };
    PatientService.prototype.onSentSuccess = function (questionnaire, result) {
        this.dataService.deleteQuestionnaire(questionnaire);
        console.log("enviou questionário com sucesso");
    };
    PatientService.prototype.onSentError = function (questionnaire, error) {
        if (error.length == 0) {
            this.dataService.deleteQuestionnaire(questionnaire);
            console.log("enviou questionário com sucesso");
        }
        this.dataService.addQuestionnaireToDB(questionnaire);
        console.log("ERRO NO ENVIO DO QUEST" + JSON.stringify(error, null, 4));
        console.log("falhou envio do questionário");
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
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService, connector_service_1.ConnectorService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxpQ0FBK0I7QUFFL0IsK0NBQThDO0FBQzlDLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsNERBQTBEO0FBQzFELDJFQUF5RTtBQUd6RSxvQ0FBdUM7QUFFdkMsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUc5QixJQUFhLGNBQWM7SUFNdkIsd0JBQW9CLElBQVUsRUFBVSxXQUF3QixFQUFVLGdCQUFrQztRQUF4RixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3hHLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCx1Q0FBYyxHQUFkO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBQ0Qsb0NBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUNELHVDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVNLG9DQUFXLEdBQWxCLFVBQW1CLFFBQVE7UUFDdkIsSUFBSSxDQUFDLFdBQVcs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QUFFLDRFQUE0RSxFQUFFLEtBQUssQ0FBQztTQUM5SSxDQUFBO0lBQ0wsQ0FBQztJQUVELHdDQUFlLEdBQWYsVUFBZ0IsRUFBRTtRQUNkLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRztZQUN0RCxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCw0Q0FBbUIsR0FBbkIsVUFBb0IsRUFBRTtRQUNsQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7Z0JBQ3pCLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTztnQkFDN0IsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFqSEQsSUFpSEM7QUFqSFksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQU9pQixXQUFJLEVBQXVCLDBCQUFXLEVBQTRCLG9DQUFnQjtHQU5uRyxjQUFjLENBaUgxQjtBQWpIWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBRdWVzdGlvbm5haXJlIH0gZnJvbSBcIi4uL2V2YWx1YXRpb24vcXVlc3Rpb25uYWlyZVwiO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi9ldmFsdWF0aW9uL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuL3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSBcIi4vbm90aWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcblxyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIC8vcHVibGljIGNhcmVnaXZlclF1ZXN0aW9uYWlyZXM6IFF1ZXN0aW9ubmFpcmVbXTtcclxuICAgIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIGNvbm5lY3RvclNlcnZpY2U6IENvbm5lY3RvclNlcnZpY2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnSW5zdGFuY2lvdSAtIFBhdGllbnRTZXJ2aWNlIScpO1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdE1lc3NhZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRmlyc3RSZXF1ZXN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmlzUGF0aWVudHNSZXF1ZXN0RG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0UGF0aWVudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yU2VydmljZS5nZXRQYXRpZW50c0RhdGEoKTtcclxuICAgIH1cclxuICAgIGdldFBhdGllbnRzX0JEKCkge1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFBhdGllbnRzRGF0YSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQYXRpZW50cyhwYXRpZW50cykge1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UGF0aWVudHNEYXRhKHBhdGllbnRzKTtcclxuICAgICAgICB0aGlzLnBhdGllbnRzID0gcGF0aWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudChpZDogbnVtYmVyKTogUGF0aWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdGVtcFxyXG5cclxuICAgIHNldENhcmVnaXZlclF1ZXN0aW9ubmFpcmVzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFF1aXpzKGNhcmVnaXZlclF1ZXN0aW9uYWlyZXMpOyBcclxuICAgICAgICAvL3RoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcyA9IGNhcmVnaXZlclF1ZXN0aW9uYWlyZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2FyZWdpdmVyUXVlc3Rpb25uYWlyZXMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5nZXRRdWl6cygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoYXNFdmFsdWF0aW9uc1RvRG8oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCk7XHJcbiAgICAvKlxyXG4gICAgICAgIGlmKHRoaXMuY2FyZWdpdmVyUXVlc3Rpb25haXJlcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYXJlZ2l2ZXJRdWVzdGlvbmFpcmVzLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAqL1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmUpIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25uYWlyZV90b19zZW5kID0gW107XHJcbiAgICAgICAgcXVlc3Rpb25uYWlyZV90b19zZW5kLnB1c2gocXVlc3Rpb25uYWlyZSk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS51cGRhdGVRdWl6U3RhdHVzKHF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKXtcclxuICAgICAgICB0aGlzLmNvbm5lY3RvclNlcnZpY2UudXBkYXRlUXVpelN0YXR1cyhxdWVzdGlvbm5haXJlX3RvX3NlbmQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vblNlbnRTdWNjZXNzKHF1ZXN0aW9ubmFpcmUsIHJlc3VsdCksXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vblNlbnRFcnJvcihxdWVzdGlvbm5haXJlLCBlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uU2VudFN1Y2Nlc3MocXVlc3Rpb25uYWlyZSwgcmVzdWx0KSB7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5kZWxldGVRdWVzdGlvbm5haXJlKHF1ZXN0aW9ubmFpcmUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZW52aW91IHF1ZXN0aW9uw6FyaW8gY29tIHN1Y2Vzc29cIik7XHJcbiAgICB9XHJcbiAgICBvblNlbnRFcnJvcihxdWVzdGlvbm5haXJlLCBlcnJvcikge1xyXG4gICAgICAgIGlmKGVycm9yLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlUXVlc3Rpb25uYWlyZShxdWVzdGlvbm5haXJlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbnZpb3UgcXVlc3Rpb27DoXJpbyBjb20gc3VjZXNzb1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRRdWVzdGlvbm5haXJlVG9EQihxdWVzdGlvbm5haXJlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk8gTk8gRU5WSU8gRE8gUVVFU1RcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCA0KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJmYWxob3UgZW52aW8gZG8gcXVlc3Rpb27DoXJpb1wiKTtcclxuICAgIH1cclxuICAgIHVzZXJPdXRkYXRlZCgpIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZURhdGEoJ3VzZXInKTtcclxuICAgIH1cclxuICAgIGluaXRNZXNzYWdlcygpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBOb3RpZmljYXRpb24oJ3BlbmRpbmcgZXZhbHVhdGlvbnMnLCAnQXZpc28gLSBBdmFsaWHDp8O1ZXMnLCAnRXhpc3RlbSBhdmFsaWHDp8O1ZXMgcGVuZGVudGVzLiBQb3IgZmF2b3IgYWNlZGEgw6BzIGF2YWxpYcOnw7VlcyBubyBjYW50byBzdXBlcmlvciBkaXJlaXRvLicsIGZhbHNlKSxcclxuICAgICAgICAgICAgbmV3IE5vdGlmaWNhdGlvbignZXJyb3ItYXV0aCcsICdBdmlzbyAtIEF1dGVudGljYcOnw6NvJywgJ08gYWNlc3NvIGFvcyBwYWNpZW50ZXMgbsOjbyBmb2kgYXV0b3JpemFkby4gUG9yIGZhdm9yIHJlaW5pY2llIGEgYXBsaWNhw6fDo28uJywgZmFsc2UpXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGdldE5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgICAgIHZhciBub3RpZmljYXRpb24gPSB0aGlzLm5vdGlmaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKCBvYmogKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmouaWQgPT09IGlkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9uWzBdO1xyXG4gICAgfVxyXG4gICAgZGlzcGxheU5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgICAgIGxldCBub3RpZmljYXRpb24gPSB0aGlzLmdldE5vdGlmaWNhdGlvbihpZCk7XHJcbiAgICAgICAgaWYoIW5vdGlmaWNhdGlvbi5kb25lKSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoeyBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBub3RpZmljYXRpb24udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBub3RpZmljYXRpb24ubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub3RpZmljYXRpb24uZG9uZSA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==