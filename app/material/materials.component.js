"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var utils_1 = require("utils/utils");
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
        //openApp("com.facebook.katana");
        //openUrl("http://192.168.99.100/caregivers/public/materialsAPI/21/showContent")
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
    MaterialsComponent.prototype.openOnBrowser = function (id) {
        var material = this.materials.filter(function (material) { return material.id === id; })[0];
        utils_1.openUrl(material.url);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFLakQsOERBQTREO0FBTTVELHFDQUFzQztBQVV0QyxJQUFhLGtCQUFrQjtJQUs5Qiw0QkFDUyxjQUE4QixFQUM5QixLQUFxQjtRQURyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFDMUIsQ0FBQztJQUVMLHFDQUFRLEdBQVI7UUFFQyxJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUluRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBZixDQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJELGlDQUFpQztRQUNqQyxnRkFBZ0Y7UUFDaEY7Ozs7Ozs7Ozs7VUFVRTtJQUVILENBQUM7SUFFRCwwQ0FBYSxHQUFiLFVBQWMsRUFBRTtRQUNmLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RSxlQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUEzQ0QsSUEyQ0M7QUEzQ1ksa0JBQWtCO0lBUDlCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztLQUN4QyxDQUFDO3FDQVF3QixnQ0FBYztRQUN2Qix1QkFBYztHQVBsQixrQkFBa0IsQ0EyQzlCO0FBM0NZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWwvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgTmVlZCB9IGZyb20gXCIuLi9uZWVkL25lZWRcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5cclxuXHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ21hdGVyaWFscycsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogJy4vbWF0ZXJpYWxzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9tYXRlcmlhbHMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRwYXRpZW50OiBQYXRpZW50O1xyXG5cdG5lZWQ6IE5lZWQ7XHJcblx0bWF0ZXJpYWxzOiBNYXRlcmlhbCBbXTtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuXHRcdHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlXHJcblx0KSB7IH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHRcclxuXHRcdGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcblx0XHRjb25zdCBpZHggPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZF9uZWVkXCJdO1xyXG5cclxuXHRcdFxyXG5cclxuXHRcdHRoaXMucGF0aWVudCA9IHRoaXMucGF0aWVudFNlcnZpY2UucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG5cdFx0dGhpcy5uZWVkID0gdGhpcy5wYXRpZW50Lm5lZWRzLmZpbHRlcihuZWVkID0+IG5lZWQuaWQgPT09IGlkeClbMF07XHJcblx0XHR0aGlzLm1hdGVyaWFscyA9IHRoaXMubmVlZC5tYXRlcmlhbHM7XHJcblx0XHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFscywgbnVsbCwgNCkpO1xyXG5cclxuXHRcdC8vb3BlbkFwcChcImNvbS5mYWNlYm9vay5rYXRhbmFcIik7XHJcblx0XHQvL29wZW5VcmwoXCJodHRwOi8vMTkyLjE2OC45OS4xMDAvY2FyZWdpdmVycy9wdWJsaWMvbWF0ZXJpYWxzQVBJLzIxL3Nob3dDb250ZW50XCIpXHJcblx0XHQvKmxldCBpO1xyXG5cdFx0bGV0IGNvbnRyb2wgPSBmYWxzZTtcclxuXHRcdGlmKCFjb250cm9sKVxyXG5cdFx0Zm9yKGk9MDtpPHRoaXMubWF0ZXJpYWxzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRpZih0aGlzLm1hdGVyaWFsc1tpXS51cmwgJiYgdGhpcy5tYXRlcmlhbHNbaV0ucGF0aCkge1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnVybCs9dGhpcy5tYXRlcmlhbHNbaV0ucGF0aDtcclxuXHRcdFx0XHR0aGlzLm1hdGVyaWFsc1tpXS5wYXRoID0gJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29udHJvbCA9IHRydWU7XHRcdFxyXG5cdFx0fVxyXG5cdFx0Ki9cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0b3Blbk9uQnJvd3NlcihpZCkge1xyXG5cdFx0bGV0IG1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbHMuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBpZClbMF07XHJcblxyXG5cdFx0b3BlblVybChtYXRlcmlhbC51cmwpO1xyXG5cdH1cclxufSJdfQ==