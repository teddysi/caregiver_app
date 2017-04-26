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
        console.log("#### ID " + id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFJakQsOERBQTREO0FBUzVELElBQWEsa0JBQWtCO0lBRzlCLDRCQUNTLGNBQThCLEVBQzlCLEtBQXFCO1FBRHJCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUMxQixDQUFDO0lBRUwscUNBQVEsR0FBUjtRQUNDLElBQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbkQsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSxrQkFBa0I7SUFQOUIsZ0JBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO0tBQ3hDLENBQUM7cUNBTXdCLGdDQUFjO1FBQ3ZCLHVCQUFjO0dBTGxCLGtCQUFrQixDQWM5QjtBQWRZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuXHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ21hdGVyaWFscycsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogJy4vbWF0ZXJpYWxzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9tYXRlcmlhbHMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRwYXRpZW50OiBQYXRpZW50O1xyXG4gXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuXHRcdHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlXHJcblx0KSB7IH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHRjb25zdCBpZCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xyXG5cdFx0Y29uc29sZS5sb2coXCIjIyMjIElEIFwiICtpZCk7XHJcblx0XHR0aGlzLnBhdGllbnQgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnQoaWQpO1xyXG5cclxuXHR9XHJcbn0iXX0=