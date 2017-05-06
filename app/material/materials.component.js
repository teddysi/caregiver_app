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
        //
        var id = +this.route.snapshot.params["id"];
        var idx = +this.route.snapshot.params["id_need"];
        //this.patient = this.patientService.getPatient(id);
        this.patient = this.patientService.patients.filter(function (patient) { return patient.id === id; })[0];
        this.need = this.patient.needs.filter(function (need) { return need.id === idx; })[0];
        //this.need = this.patient.needs[idx];
        this.materials = this.need.materials;
        console.log('>>>>> ' + this.materials);
        var i;
        for (i = 0; i < this.materials.length; i++) {
            if (this.materials[i].type == 'imagem' || this.materials[i].type == 'video') {
                this.materials[i].url += this.materials[i].path;
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFLakQsOERBQTREO0FBUzVELElBQWEsa0JBQWtCO0lBUTlCLDRCQUNTLGNBQThCLEVBQzlCLEtBQXFCO1FBRHJCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUMxQixDQUFDO0lBRUwscUNBQVEsR0FBUjtRQU1DLEVBQUU7UUFFRixJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxvREFBb0Q7UUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQWYsQ0FBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxDQUFDO1FBRU4sR0FBRyxDQUFBLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUNwQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBRSxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUUsT0FBTyxDQUFDLENBQUEsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDOUMsQ0FBQztRQUNGLENBQUM7SUFJRixDQUFDO0lBQ0YseUJBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDO0FBekNZLGtCQUFrQjtJQVA5QixnQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7S0FDeEMsQ0FBQztxQ0FXd0IsZ0NBQWM7UUFDdkIsdUJBQWM7R0FWbEIsa0JBQWtCLENBeUM5QjtBQXpDWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ21hdGVyaWFscycsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogJy4vbWF0ZXJpYWxzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9tYXRlcmlhbHMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRwYXRpZW50OiBQYXRpZW50O1xyXG5cdG5lZWQ6IE5lZWQ7XHJcblx0bWF0ZXJpYWxzOiBNYXRlcmlhbCBbXTtcclxuXHJcblxyXG5cclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuXHRcdHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlXHJcblx0KSB7IH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG5cdFx0XHJcblxyXG5cdFxyXG5cclxuXHRcdC8vXHJcblx0XHRcclxuXHRcdGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcblx0XHRjb25zdCBpZHggPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZF9uZWVkXCJdO1xyXG5cdFx0Ly90aGlzLnBhdGllbnQgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnQoaWQpO1xyXG5cdFx0dGhpcy5wYXRpZW50ID0gdGhpcy5wYXRpZW50U2VydmljZS5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcblx0XHJcblx0XHR0aGlzLm5lZWQgPSB0aGlzLnBhdGllbnQubmVlZHMuZmlsdGVyKG5lZWQgPT4gbmVlZC5pZCA9PT0gaWR4KVswXTtcclxuXHRcdC8vdGhpcy5uZWVkID0gdGhpcy5wYXRpZW50Lm5lZWRzW2lkeF07XHJcblx0XHR0aGlzLm1hdGVyaWFscyA9IHRoaXMubmVlZC5tYXRlcmlhbHM7XHJcblx0XHRjb25zb2xlLmxvZygnPj4+Pj4gJyArIHRoaXMubWF0ZXJpYWxzKTtcclxuXHRcdGxldCBpO1xyXG5cdFx0XHJcblx0XHRmb3IoaT0wO2k8dGhpcy5tYXRlcmlhbHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdGlmKHRoaXMubWF0ZXJpYWxzW2ldLnR5cGU9PSdpbWFnZW0nIHx8IHRoaXMubWF0ZXJpYWxzW2ldLnR5cGU9PSd2aWRlbycpe1xyXG5cdFx0XHR0aGlzLm1hdGVyaWFsc1tpXS51cmwrPXRoaXMubWF0ZXJpYWxzW2ldLnBhdGg7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHJcblxyXG5cdH1cclxufSJdfQ==