"use strict";
var core_1 = require("@angular/core");
var patient_service_1 = require("./patient.service");
var PatientsComponent = (function () {
    function PatientsComponent(patientService) {
        this.patientService = patientService;
    }
    PatientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //subscrever o a lista de pacientes
        this.patientService.getPatients()
            .subscribe(function (result) { return _this.onGetDataSuccess(result); }, function (error) { return _this.onGetDataError(error); });
    };
    PatientsComponent.prototype.onGetDataSuccess = function (res) {
        //tratar resposta
        this.patients = res;
        console.log("this.patients " + this.patients);
        //adicionar items à lista de pacientes do service
        this.patientService.setPatients(this.patients);
    };
    /**
     
     * @private
     * @param {(Response | any)} error
     *
     * @memberOf ItemsComponent
     */
    PatientsComponent.prototype.onGetDataError = function (error) {
        var body = error.json() || "";
        var err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    };
    return PatientsComponent;
}());
PatientsComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./patients.component.html",
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientsComponent);
exports.PatientsComponent = PatientsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFLbEQscURBQW1EO0FBUW5ELElBQWEsaUJBQWlCO0lBRzFCLDJCQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFFbEQsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBDLG1DQUFtQztRQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRTthQUM1QixTQUFTLENBQ1YsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQTdCLENBQTZCLEVBQ3pDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBMUIsQ0FBMEIsQ0FDcEMsQ0FBQztJQUVWLENBQUM7SUFJTyw0Q0FBZ0IsR0FBeEIsVUFBeUIsR0FBRztRQUN4QixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDN0MsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUdsRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssMENBQWMsR0FBdEIsVUFBdUIsS0FBcUI7UUFDeEMsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDO0FBekNZLGlCQUFpQjtJQUw3QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSwyQkFBMkI7S0FDM0MsQ0FBQztxQ0FJc0MsZ0NBQWM7R0FIekMsaUJBQWlCLENBeUM3QjtBQXpDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xuXG5cbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4vcGF0aWVudC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4vcGF0aWVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYXRpZW50cy5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBQYXRpZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcGF0aWVudHM6IFBhdGllbnRbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlKSB7IFxuICAgICAgICBcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgIC8vc3Vic2NyZXZlciBvIGEgbGlzdGEgZGUgcGFjaWVudGVzXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZ2V0UGF0aWVudHMoKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpLFxuICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKVxuICAgICAgICAgICAgKTtcblxuICAgIH1cblxuXG4gICAgXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICAvL3RyYXRhciByZXNwb3N0YVxuICAgICAgICB0aGlzLnBhdGllbnRzID0gcmVzO1xuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMucGF0aWVudHMgXCIgKyB0aGlzLnBhdGllbnRzKVxuICAgICAgICAvL2FkaWNpb25hciBpdGVtcyDDoCBsaXN0YSBkZSBwYWNpZW50ZXMgZG8gc2VydmljZVxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnNldFBhdGllbnRzKHRoaXMucGF0aWVudHMpXG4gICAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgIFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsoUmVzcG9uc2UgfCBhbnkpfSBlcnJvciBcbiAgICAgKiBcbiAgICAgKiBAbWVtYmVyT2YgSXRlbXNDb21wb25lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8IFwiXCI7XG4gICAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgZXJyKTtcbiAgICB9XG59XG4iXX0=