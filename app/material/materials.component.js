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
        var idx = +this.route.snapshot.params["id_need"];
        this.patient = this.patientService.patients.filter(function (patient) { return patient.id === id; })[0];
        this.need = this.patient.needs.filter(function (need) { return need.id === idx; })[0];
        this.materials = this.need.materials;
        console.log(JSON.stringify(this.materials, null, 4));
        /*let i;
        let control = false;
        if(!control)
        for(i=0;i<this.materials.length;i++){
            if(this.materials[i].url && this.materials[i].path) {
                this.materials[i].url+=this.materials[i].path;
                this.materials[i].path = '';
            }
            control = true;
        }
        */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFLakQsOERBQTREO0FBUzVELElBQWEsa0JBQWtCO0lBSzlCLDRCQUNTLGNBQThCLEVBQzlCLEtBQXFCO1FBRHJCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUMxQixDQUFDO0lBRUwscUNBQVEsR0FBUjtRQUVDLElBQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFmLENBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckQ7Ozs7Ozs7Ozs7VUFVRTtJQUVILENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7QUFqQ1ksa0JBQWtCO0lBUDlCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztLQUN4QyxDQUFDO3FDQVF3QixnQ0FBYztRQUN2Qix1QkFBYztHQVBsQixrQkFBa0IsQ0FpQzlCO0FBakNZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWwvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgTmVlZCB9IGZyb20gXCIuLi9uZWVkL25lZWRcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbWF0ZXJpYWxzJyxcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9tYXRlcmlhbHMuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL21hdGVyaWFscy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdHBhdGllbnQ6IFBhdGllbnQ7XHJcblx0bmVlZDogTmVlZDtcclxuXHRtYXRlcmlhbHM6IE1hdGVyaWFsIFtdO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuXHQpIHsgfVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdFxyXG5cdFx0Y29uc3QgaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuXHRcdGNvbnN0IGlkeCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkX25lZWRcIl07XHJcblxyXG5cdFx0dGhpcy5wYXRpZW50ID0gdGhpcy5wYXRpZW50U2VydmljZS5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcblx0XHR0aGlzLm5lZWQgPSB0aGlzLnBhdGllbnQubmVlZHMuZmlsdGVyKG5lZWQgPT4gbmVlZC5pZCA9PT0gaWR4KVswXTtcclxuXHRcdHRoaXMubWF0ZXJpYWxzID0gdGhpcy5uZWVkLm1hdGVyaWFscztcclxuXHRcdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxzLCBudWxsLCA0KSk7XHJcblx0XHRcclxuXHRcdC8qbGV0IGk7XHJcblx0XHRsZXQgY29udHJvbCA9IGZhbHNlO1xyXG5cdFx0aWYoIWNvbnRyb2wpXHJcblx0XHRmb3IoaT0wO2k8dGhpcy5tYXRlcmlhbHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdGlmKHRoaXMubWF0ZXJpYWxzW2ldLnVybCAmJiB0aGlzLm1hdGVyaWFsc1tpXS5wYXRoKSB7XHJcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHNbaV0udXJsKz10aGlzLm1hdGVyaWFsc1tpXS5wYXRoO1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnBhdGggPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb250cm9sID0gdHJ1ZTtcdFx0XHJcblx0XHR9XHJcblx0XHQqL1xyXG5cdFx0XHJcblx0fVxyXG59Il19