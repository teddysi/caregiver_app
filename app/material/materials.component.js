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
        // criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //	this.need = this.patient.needs.filter(need => need.id === idx)[0];
        //	this.materials = this.need.materials;
        console.log("MATERIALS : " + JSON.stringify(this.materials, null, 4));
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
    MaterialsComponent.prototype.addPropertyNeedOnMaterial = function () {
        var materials_temp;
        materials_temp = [];
        this.patient.needs.forEach(function (need) {
            need.materials.forEach(function (materialOfaNeed) {
                materialOfaNeed["need_id"] = need.id;
                materialOfaNeed["need_description"] = "[ " + need.description + " ]";
                //console.log("MATERIAL : " + JSON.stringify(materialOfaNeed, null, 4));
                //testar se o material ja está na lista
                if (materials_temp.filter(function (material) { return material.id === materialOfaNeed.id; }).length > 0) {
                    materials_temp.filter(function (material) { return material.id === materialOfaNeed.id; })[0]["need_description"] += " [ " + need.description + " ]";
                }
                else {
                    materials_temp.push(materialOfaNeed);
                }
            });
        });
        this.materials = materials_temp;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFLakQsOERBQTREO0FBZ0I1RCxJQUFhLGtCQUFrQjtJQUs5Qiw0QkFDUyxjQUE4QixFQUM5QixLQUFxQjtRQURyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFDMUIsQ0FBQztJQUVMLHFDQUFRLEdBQVI7UUFFQyxJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEYsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBUWpDLHFFQUFxRTtRQUNyRSx3Q0FBd0M7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRFLGlDQUFpQztRQUNqQyxnRkFBZ0Y7UUFDaEY7Ozs7Ozs7Ozs7VUFVRTtJQUVILENBQUM7SUFJRCxzREFBeUIsR0FBekI7UUFDQyxJQUFJLGNBQTBCLENBQUM7UUFDL0IsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsZUFBZTtnQkFDckMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3JDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLElBQUksR0FBRSxJQUFJLENBQUMsV0FBVyxHQUFFLElBQUksQ0FBQztnQkFDbkUsd0VBQXdFO2dCQUN4RSx1Q0FBdUM7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsRUFBRSxLQUFLLGVBQWUsQ0FBQyxFQUFFLEVBQWxDLENBQWtDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEYsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxFQUFFLEtBQUssZUFBZSxDQUFDLEVBQUUsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNqSSxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNQLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7WUFFRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7SUFDakMsQ0FBQztJQUlGLHlCQUFDO0FBQUQsQ0FBQyxBQXhFRCxJQXdFQztBQXhFWSxrQkFBa0I7SUFQOUIsZ0JBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO0tBQ3hDLENBQUM7cUNBUXdCLGdDQUFjO1FBQ3ZCLHVCQUFjO0dBUGxCLGtCQUFrQixDQXdFOUI7QUF4RVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbC9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcblxyXG5cclxuaW1wb3J0IHsgb3BlbkFwcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtb3Blbi1hcHBcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbWF0ZXJpYWxzJyxcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9tYXRlcmlhbHMuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL21hdGVyaWFscy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdHBhdGllbnQ6IFBhdGllbnQ7XHJcblx0bmVlZDogTmVlZDtcclxuXHRtYXRlcmlhbHM6IE1hdGVyaWFsW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcblx0XHRwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxyXG5cdCkgeyB9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuXHRcdGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcblx0XHRjb25zdCBpZHggPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZF9uZWVkXCJdO1xyXG5cclxuXHRcdHRoaXMucGF0aWVudCA9IHRoaXMucGF0aWVudFNlcnZpY2UucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG5cclxuXHRcdC8vIGNyaWFyIGxpc3RhIGRlIG1hdGVyaWFpcyBjb20gcHJvcHJpYWRhZGUgYWRpY2lvbmFsIG5lZWQgbmFtZSBhbmQgbmVlZCBkZXNjcmlwdGlvblxyXG5cdFx0dGhpcy5hZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cdFx0Ly9cdHRoaXMubmVlZCA9IHRoaXMucGF0aWVudC5uZWVkcy5maWx0ZXIobmVlZCA9PiBuZWVkLmlkID09PSBpZHgpWzBdO1xyXG5cdFx0Ly9cdHRoaXMubWF0ZXJpYWxzID0gdGhpcy5uZWVkLm1hdGVyaWFscztcclxuXHRcdGNvbnNvbGUubG9nKFwiTUFURVJJQUxTIDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFscywgbnVsbCwgNCkpO1xyXG5cclxuXHRcdC8vb3BlbkFwcChcImNvbS5mYWNlYm9vay5rYXRhbmFcIik7XHJcblx0XHQvL29wZW5VcmwoXCJodHRwOi8vMTkyLjE2OC45OS4xMDAvY2FyZWdpdmVycy9wdWJsaWMvbWF0ZXJpYWxzQVBJLzIxL3Nob3dDb250ZW50XCIpXHJcblx0XHQvKmxldCBpO1xyXG5cdFx0bGV0IGNvbnRyb2wgPSBmYWxzZTtcclxuXHRcdGlmKCFjb250cm9sKVxyXG5cdFx0Zm9yKGk9MDtpPHRoaXMubWF0ZXJpYWxzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRpZih0aGlzLm1hdGVyaWFsc1tpXS51cmwgJiYgdGhpcy5tYXRlcmlhbHNbaV0ucGF0aCkge1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnVybCs9dGhpcy5tYXRlcmlhbHNbaV0ucGF0aDtcclxuXHRcdFx0XHR0aGlzLm1hdGVyaWFsc1tpXS5wYXRoID0gJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29udHJvbCA9IHRydWU7XHRcdFxyXG5cdFx0fVxyXG5cdFx0Ki9cclxuXHJcblx0fVxyXG5cclxuXHJcblxyXG5cdGFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKSB7XHJcblx0XHRsZXQgbWF0ZXJpYWxzX3RlbXA6IE1hdGVyaWFsW107XHJcblx0XHRtYXRlcmlhbHNfdGVtcCA9IFtdO1xyXG5cclxuXHRcdHRoaXMucGF0aWVudC5uZWVkcy5mb3JFYWNoKG5lZWQgPT4ge1xyXG5cdFx0XHRuZWVkLm1hdGVyaWFscy5mb3JFYWNoKG1hdGVyaWFsT2ZhTmVlZCA9PiB7XHJcblx0XHRcdFx0bWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9pZFwiXSA9IG5lZWQuaWQ7XHJcblx0XHRcdFx0bWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9kZXNjcmlwdGlvblwiXSA9IFwiWyBcIiArbmVlZC5kZXNjcmlwdGlvbiArXCIgXVwiO1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJNQVRFUklBTCA6IFwiICsgSlNPTi5zdHJpbmdpZnkobWF0ZXJpYWxPZmFOZWVkLCBudWxsLCA0KSk7XHJcblx0XHRcdFx0Ly90ZXN0YXIgc2UgbyBtYXRlcmlhbCBqYSBlc3TDoSBuYSBsaXN0YVxyXG5cdFx0XHRcdGlmIChtYXRlcmlhbHNfdGVtcC5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IG1hdGVyaWFsT2ZhTmVlZC5pZCkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0bWF0ZXJpYWxzX3RlbXAuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBtYXRlcmlhbE9mYU5lZWQuaWQpWzBdW1wibmVlZF9kZXNjcmlwdGlvblwiXSArPSBcIiBbIFwiICsgbmVlZC5kZXNjcmlwdGlvbiArIFwiIF1cIjtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bWF0ZXJpYWxzX3RlbXAucHVzaChtYXRlcmlhbE9mYU5lZWQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbHMgPSBtYXRlcmlhbHNfdGVtcDtcclxuXHR9XHJcblxyXG5cclxuXHJcbn0iXX0=