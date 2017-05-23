"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../shared/data/data.service");
var patient_service_1 = require("../patient/patient.service");
var page_1 = require("ui/page");
var MaterialsComponent = (function () {
    function MaterialsComponent(patientService, route, page, dataService) {
        this.patientService = patientService;
        this.route = route;
        this.page = page;
        this.dataService = dataService;
    }
    MaterialsComponent.prototype.ngOnInit = function () {
        var id = +this.route.snapshot.params["id"];
        var idx = +this.route.snapshot.params["id_need"];
        this.patient = this.patientService.patients.filter(function (patient) { return patient.id === id; })[0];
        // criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //	this.need = this.patient.needs.filter(need => need.id === idx)[0];
        //	this.materials = this.need.materials;
        //console.log("MATERIALS : " + JSON.stringify(this.materials, null, 4));
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
    MaterialsComponent.prototype.getBorderColor = function (rating) {
        console.log('ENTROU!!!!!!!!!!!!!!!!!!!');
        if (rating) {
            console.log(JSON.stringify(rating[0], null, 4));
        }
        switch (rating) {
            case '0':
                return 'yellow';
            case '-1':
                return 'red';
            case '1':
                return 'green';
            default:
                return 'black';
        }
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
        //console.log(JSON.stringify(materials_temp, null, 4));
        //this.materials = this.dataService.getNeedMaterials();
        //console.log(JSON.stringify(this.dataService.getNeedMaterials()[0], null, 4));
        //console.log(JSON.stringify(materials_temp[0], null, 4));
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
        router_1.ActivatedRoute,
        page_1.Page,
        data_service_1.DataService])
], MaterialsComponent);
exports.MaterialsComponent = MaterialsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFLakQsNERBQTBEO0FBQzFELDhEQUE0RDtBQUc1RCxnQ0FBK0I7QUFhL0IsSUFBYSxrQkFBa0I7SUFNOUIsNEJBQ1MsY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsSUFBVSxFQUNWLFdBQXdCO1FBSHhCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDN0IsQ0FBQztJQUVMLHFDQUFRLEdBQVI7UUFFQyxJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEYsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBRWpDLHFFQUFxRTtRQUNyRSx3Q0FBd0M7UUFDeEMsd0VBQXdFO1FBRXhFLGlDQUFpQztRQUNqQyxnRkFBZ0Y7UUFDaEY7Ozs7Ozs7Ozs7VUFVRTtJQUNILENBQUM7SUFFRCwyQ0FBYyxHQUFkLFVBQWUsTUFBTTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUE7UUFDeEMsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxHQUFHO2dCQUNQLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDakIsS0FBSyxJQUFJO2dCQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDZCxLQUFLLEdBQUc7Z0JBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNoQjtnQkFDQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pCLENBQUM7SUFDRixDQUFDO0lBQ0Qsc0RBQXlCLEdBQXpCO1FBQ0MsSUFBSSxjQUEwQixDQUFDO1FBQy9CLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLGVBQWU7Z0JBQ3JDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNyQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsR0FBRyxJQUFJLEdBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRSxJQUFJLENBQUM7Z0JBQ25FLHdFQUF3RTtnQkFDeEUsdUNBQXVDO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEVBQUUsS0FBSyxlQUFlLENBQUMsRUFBRSxFQUFsQyxDQUFrQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RGLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsRUFBRSxLQUFLLGVBQWUsQ0FBQyxFQUFFLEVBQWxDLENBQWtDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDakksQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO1lBRUYsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILHVEQUF1RDtRQUN2RCx1REFBdUQ7UUFDdkQsK0VBQStFO1FBRS9FLDBEQUEwRDtRQUMxRCxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztJQUNqQyxDQUFDO0lBTUYseUJBQUM7QUFBRCxDQUFDLEFBMUZELElBMEZDO0FBMUZZLGtCQUFrQjtJQVA5QixnQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7S0FDeEMsQ0FBQztxQ0FTd0IsZ0NBQWM7UUFDdkIsdUJBQWM7UUFDZixXQUFJO1FBQ0csMEJBQVc7R0FWckIsa0JBQWtCLENBMEY5QjtBQTFGWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuaW1wb3J0IHsgb3BlbkFwcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtb3Blbi1hcHBcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbWF0ZXJpYWxzJyxcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9tYXRlcmlhbHMuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL21hdGVyaWFscy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdHBhdGllbnQ6IFBhdGllbnQ7XHJcblx0bmVlZDogTmVlZDtcclxuXHRtYXRlcmlhbHM6IE1hdGVyaWFsW107XHJcblx0cmF0aW5nX2NvbG9yczoge307XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcblx0XHRwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuXHRcdHByaXZhdGUgcGFnZTogUGFnZSxcclxuXHRcdHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlXHJcblx0KSB7IH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG5cdFx0Y29uc3QgaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuXHRcdGNvbnN0IGlkeCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkX25lZWRcIl07XHJcblxyXG5cdFx0dGhpcy5wYXRpZW50ID0gdGhpcy5wYXRpZW50U2VydmljZS5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcblxyXG5cdFx0Ly8gY3JpYXIgbGlzdGEgZGUgbWF0ZXJpYWlzIGNvbSBwcm9wcmlhZGFkZSBhZGljaW9uYWwgbmVlZCBuYW1lIGFuZCBuZWVkIGRlc2NyaXB0aW9uXHJcblx0XHR0aGlzLmFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKTtcclxuXHRcdFxyXG5cdFx0Ly9cdHRoaXMubmVlZCA9IHRoaXMucGF0aWVudC5uZWVkcy5maWx0ZXIobmVlZCA9PiBuZWVkLmlkID09PSBpZHgpWzBdO1xyXG5cdFx0Ly9cdHRoaXMubWF0ZXJpYWxzID0gdGhpcy5uZWVkLm1hdGVyaWFscztcclxuXHRcdC8vY29uc29sZS5sb2coXCJNQVRFUklBTFMgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxzLCBudWxsLCA0KSk7XHJcblxyXG5cdFx0Ly9vcGVuQXBwKFwiY29tLmZhY2Vib29rLmthdGFuYVwiKTtcclxuXHRcdC8vb3BlblVybChcImh0dHA6Ly8xOTIuMTY4Ljk5LjEwMC9jYXJlZ2l2ZXJzL3B1YmxpYy9tYXRlcmlhbHNBUEkvMjEvc2hvd0NvbnRlbnRcIilcclxuXHRcdC8qbGV0IGk7XHJcblx0XHRsZXQgY29udHJvbCA9IGZhbHNlO1xyXG5cdFx0aWYoIWNvbnRyb2wpXHJcblx0XHRmb3IoaT0wO2k8dGhpcy5tYXRlcmlhbHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdGlmKHRoaXMubWF0ZXJpYWxzW2ldLnVybCAmJiB0aGlzLm1hdGVyaWFsc1tpXS5wYXRoKSB7XHJcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHNbaV0udXJsKz10aGlzLm1hdGVyaWFsc1tpXS5wYXRoO1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnBhdGggPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb250cm9sID0gdHJ1ZTtcdFx0XHJcblx0XHR9XHJcblx0XHQqL1xyXG5cdH1cclxuXHJcblx0Z2V0Qm9yZGVyQ29sb3IocmF0aW5nKSB7XHJcblx0XHRjb25zb2xlLmxvZygnRU5UUk9VISEhISEhISEhISEhISEhISEhIScpXHJcblx0XHRpZihyYXRpbmcpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmF0aW5nWzBdLCBudWxsLCA0KSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHN3aXRjaCAocmF0aW5nKSB7XHJcblx0XHRcdGNhc2UgJzAnOiBcclxuXHRcdFx0XHRyZXR1cm4gJ3llbGxvdyc7XHJcblx0XHRcdGNhc2UgJy0xJzogXHJcblx0XHRcdFx0cmV0dXJuICdyZWQnO1xyXG5cdFx0XHRjYXNlICcxJzogXHJcblx0XHRcdFx0cmV0dXJuICdncmVlbic7XHRcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gJ2JsYWNrJztcclxuXHRcdH1cdFxyXG5cdH1cclxuXHRhZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCkge1xyXG5cdFx0bGV0IG1hdGVyaWFsc190ZW1wOiBNYXRlcmlhbFtdO1xyXG5cdFx0bWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wYXRpZW50Lm5lZWRzLmZvckVhY2gobmVlZCA9PiB7XHJcblx0XHRcdG5lZWQubWF0ZXJpYWxzLmZvckVhY2gobWF0ZXJpYWxPZmFOZWVkID0+IHtcclxuXHRcdFx0XHRtYXRlcmlhbE9mYU5lZWRbXCJuZWVkX2lkXCJdID0gbmVlZC5pZDtcclxuXHRcdFx0XHRtYXRlcmlhbE9mYU5lZWRbXCJuZWVkX2Rlc2NyaXB0aW9uXCJdID0gXCJbIFwiICtuZWVkLmRlc2NyaXB0aW9uICtcIiBdXCI7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcIk1BVEVSSUFMIDogXCIgKyBKU09OLnN0cmluZ2lmeShtYXRlcmlhbE9mYU5lZWQsIG51bGwsIDQpKTtcclxuXHRcdFx0XHQvL3Rlc3RhciBzZSBvIG1hdGVyaWFsIGphIGVzdMOhIG5hIGxpc3RhXHJcblx0XHRcdFx0aWYgKG1hdGVyaWFsc190ZW1wLmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gbWF0ZXJpYWxPZmFOZWVkLmlkKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRtYXRlcmlhbHNfdGVtcC5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IG1hdGVyaWFsT2ZhTmVlZC5pZClbMF1bXCJuZWVkX2Rlc2NyaXB0aW9uXCJdICs9IFwiIFsgXCIgKyBuZWVkLmRlc2NyaXB0aW9uICsgXCIgXVwiO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtYXRlcmlhbHNfdGVtcC5wdXNoKG1hdGVyaWFsT2ZhTmVlZCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0Ly9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtYXRlcmlhbHNfdGVtcCwgbnVsbCwgNCkpO1xyXG5cdFx0Ly90aGlzLm1hdGVyaWFscyA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0TmVlZE1hdGVyaWFscygpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFTZXJ2aWNlLmdldE5lZWRNYXRlcmlhbHMoKVswXSwgbnVsbCwgNCkpO1xyXG5cdFx0XHJcblx0XHQvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsc190ZW1wWzBdLCBudWxsLCA0KSk7XHJcblx0XHR0aGlzLm1hdGVyaWFscyA9IG1hdGVyaWFsc190ZW1wO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHJcblxyXG59Il19