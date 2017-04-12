"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var MaterialsComponent = (function () {
    function MaterialsComponent(patientService, route) {
        this.patientService = patientService;
        this.route = route;
    }
    MaterialsComponent.prototype.ngOnInit = function () {
        var id = +this.route.snapshot.params["id"];
        this.patient = this.patientService.getPatient(id);
    };
    return MaterialsComponent;
}());
MaterialsComponent = __decorate([
    core_1.Component({
        selector: 'materials',
        moduleId: module.id,
        templateUrl: './materials.component.html',
        styleUrls: ['./materials.component.css']
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.ActivatedRoute])
], MaterialsComponent);
exports.MaterialsComponent = MaterialsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBUzVELElBQWEsa0JBQWtCO0lBRzlCLDRCQUNTLGNBQThCLEVBQzlCLEtBQXFCO1FBRHJCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUMxQixDQUFDO0lBRUwscUNBQVEsR0FBUjtRQUNDLElBQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxrQkFBa0I7SUFQOUIsZ0JBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO0tBQ3hDLENBQUM7cUNBTXdCLGdDQUFjO1FBQ3ZCLHVCQUFjO0dBTGxCLGtCQUFrQixDQVk5QjtBQVpZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ21hdGVyaWFscycsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiAnLi9tYXRlcmlhbHMuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9tYXRlcmlhbHMuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0cGF0aWVudDogUGF0aWVudDtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcblx0XHRwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuXHQpIHsgfVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XG5cdFx0dGhpcy5wYXRpZW50ID0gdGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50KGlkKTtcblx0fVxufSJdfQ==