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
        if (rating) {
            console.log('A verficar rating existente dos materiais');
            console.log(JSON.stringify(rating, null, 4));
            switch (rating.evaluation) {
                case '0':
                    console.log('Amarelo');
                    return { 'background-color': 'yellow' };
                case '-1':
                    console.log('Vermelho');
                    return { 'background-color': 'red' };
                case '1':
                    console.log('Verde');
                    return { 'background-color': 'green' };
                default:
                    return { 'background-color': 'black' };
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFLakQsNERBQTBEO0FBQzFELDhEQUE0RDtBQUc1RCxnQ0FBK0I7QUFhL0IsSUFBYSxrQkFBa0I7SUFNOUIsNEJBQ1MsY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsSUFBVSxFQUNWLFdBQXdCO1FBSHhCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDN0IsQ0FBQztJQUVMLHFDQUFRLEdBQVI7UUFFQyxJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEYsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBRWpDLHFFQUFxRTtRQUNyRSx3Q0FBd0M7UUFDeEMsd0VBQXdFO1FBRXhFLGlDQUFpQztRQUNqQyxnRkFBZ0Y7UUFDaEY7Ozs7Ozs7Ozs7VUFVRTtJQUNILENBQUM7SUFFRCwyQ0FBYyxHQUFkLFVBQWUsTUFBTTtRQUNwQixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUssR0FBRztvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN0QixNQUFNLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsQ0FBQztnQkFDMUMsS0FBSyxJQUFJO29CQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUN0QyxLQUFLLEdBQUc7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckIsTUFBTSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUM7Z0JBQ3hDO29CQUNFLE1BQU0sQ0FBQyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDO1lBQzFDLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztJQUNELHNEQUF5QixHQUF6QjtRQUNDLElBQUksY0FBMEIsQ0FBQztRQUMvQixjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxlQUFlO2dCQUNyQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDckMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxHQUFFLElBQUksQ0FBQyxXQUFXLEdBQUUsSUFBSSxDQUFDO2dCQUNuRSx3RUFBd0U7Z0JBQ3hFLHVDQUF1QztnQkFDdkMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxFQUFFLEtBQUssZUFBZSxDQUFDLEVBQUUsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RixjQUFjLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEVBQUUsS0FBSyxlQUFlLENBQUMsRUFBRSxFQUFsQyxDQUFrQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ2pJLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztZQUVGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCx1REFBdUQ7UUFDdkQsdURBQXVEO1FBQ3ZELCtFQUErRTtRQUUvRSwwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7SUFDakMsQ0FBQztJQU1GLHlCQUFDO0FBQUQsQ0FBQyxBQTdGRCxJQTZGQztBQTdGWSxrQkFBa0I7SUFQOUIsZ0JBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO0tBQ3hDLENBQUM7cUNBU3dCLGdDQUFjO1FBQ3ZCLHVCQUFjO1FBQ2YsV0FBSTtRQUNHLDBCQUFXO0dBVnJCLGtCQUFrQixDQTZGOUI7QUE3RlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbC9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ21hdGVyaWFscycsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogJy4vbWF0ZXJpYWxzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9tYXRlcmlhbHMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRwYXRpZW50OiBQYXRpZW50O1xyXG5cdG5lZWQ6IE5lZWQ7XHJcblx0bWF0ZXJpYWxzOiBNYXRlcmlhbFtdO1xyXG5cdHJhdGluZ19jb2xvcnM6IHt9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcblx0XHRwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZVxyXG5cdCkgeyB9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuXHRcdGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcblx0XHRjb25zdCBpZHggPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZF9uZWVkXCJdO1xyXG5cclxuXHRcdHRoaXMucGF0aWVudCA9IHRoaXMucGF0aWVudFNlcnZpY2UucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG5cclxuXHRcdC8vIGNyaWFyIGxpc3RhIGRlIG1hdGVyaWFpcyBjb20gcHJvcHJpYWRhZGUgYWRpY2lvbmFsIG5lZWQgbmFtZSBhbmQgbmVlZCBkZXNjcmlwdGlvblxyXG5cdFx0dGhpcy5hZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCk7XHJcblx0XHRcclxuXHRcdC8vXHR0aGlzLm5lZWQgPSB0aGlzLnBhdGllbnQubmVlZHMuZmlsdGVyKG5lZWQgPT4gbmVlZC5pZCA9PT0gaWR4KVswXTtcclxuXHRcdC8vXHR0aGlzLm1hdGVyaWFscyA9IHRoaXMubmVlZC5tYXRlcmlhbHM7XHJcblx0XHQvL2NvbnNvbGUubG9nKFwiTUFURVJJQUxTIDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFscywgbnVsbCwgNCkpO1xyXG5cclxuXHRcdC8vb3BlbkFwcChcImNvbS5mYWNlYm9vay5rYXRhbmFcIik7XHJcblx0XHQvL29wZW5VcmwoXCJodHRwOi8vMTkyLjE2OC45OS4xMDAvY2FyZWdpdmVycy9wdWJsaWMvbWF0ZXJpYWxzQVBJLzIxL3Nob3dDb250ZW50XCIpXHJcblx0XHQvKmxldCBpO1xyXG5cdFx0bGV0IGNvbnRyb2wgPSBmYWxzZTtcclxuXHRcdGlmKCFjb250cm9sKVxyXG5cdFx0Zm9yKGk9MDtpPHRoaXMubWF0ZXJpYWxzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRpZih0aGlzLm1hdGVyaWFsc1tpXS51cmwgJiYgdGhpcy5tYXRlcmlhbHNbaV0ucGF0aCkge1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnVybCs9dGhpcy5tYXRlcmlhbHNbaV0ucGF0aDtcclxuXHRcdFx0XHR0aGlzLm1hdGVyaWFsc1tpXS5wYXRoID0gJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29udHJvbCA9IHRydWU7XHRcdFxyXG5cdFx0fVxyXG5cdFx0Ki9cclxuXHR9XHJcblxyXG5cdGdldEJvcmRlckNvbG9yKHJhdGluZykge1x0XHJcblx0XHRpZihyYXRpbmcpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ0EgdmVyZmljYXIgcmF0aW5nIGV4aXN0ZW50ZSBkb3MgbWF0ZXJpYWlzJyk7XHRcclxuXHRcdFx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmF0aW5nLCBudWxsLCA0KSk7XHJcblx0XHRcdFxyXG5cdFx0XHRzd2l0Y2ggKHJhdGluZy5ldmFsdWF0aW9uKSB7XHJcblx0XHRcdFx0Y2FzZSAnMCc6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnQW1hcmVsbycpO1xyXG5cdFx0XHRcdFx0IHJldHVybiB7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3llbGxvdycgfTtcclxuXHRcdFx0XHRjYXNlICctMSc6IFxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1Zlcm1lbGhvJyk7XHJcblx0XHRcdFx0XHRyZXR1cm4geyAnYmFja2dyb3VuZC1jb2xvcic6ICdyZWQnIH07XHJcblx0XHRcdFx0Y2FzZSAnMSc6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnVmVyZGUnKTsgXHJcblx0XHRcdFx0XHRyZXR1cm4geyAnYmFja2dyb3VuZC1jb2xvcic6ICdncmVlbicgfTtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0IHJldHVybiB7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJ2JsYWNrJyB9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHRcclxuXHR9XHJcblx0YWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpIHtcclxuXHRcdGxldCBtYXRlcmlhbHNfdGVtcDogTWF0ZXJpYWxbXTtcclxuXHRcdG1hdGVyaWFsc190ZW1wID0gW107XHJcblx0XHRcclxuXHRcdHRoaXMucGF0aWVudC5uZWVkcy5mb3JFYWNoKG5lZWQgPT4ge1xyXG5cdFx0XHRuZWVkLm1hdGVyaWFscy5mb3JFYWNoKG1hdGVyaWFsT2ZhTmVlZCA9PiB7XHJcblx0XHRcdFx0bWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9pZFwiXSA9IG5lZWQuaWQ7XHJcblx0XHRcdFx0bWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9kZXNjcmlwdGlvblwiXSA9IFwiWyBcIiArbmVlZC5kZXNjcmlwdGlvbiArXCIgXVwiO1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJNQVRFUklBTCA6IFwiICsgSlNPTi5zdHJpbmdpZnkobWF0ZXJpYWxPZmFOZWVkLCBudWxsLCA0KSk7XHJcblx0XHRcdFx0Ly90ZXN0YXIgc2UgbyBtYXRlcmlhbCBqYSBlc3TDoSBuYSBsaXN0YVxyXG5cdFx0XHRcdGlmIChtYXRlcmlhbHNfdGVtcC5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IG1hdGVyaWFsT2ZhTmVlZC5pZCkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0bWF0ZXJpYWxzX3RlbXAuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBtYXRlcmlhbE9mYU5lZWQuaWQpWzBdW1wibmVlZF9kZXNjcmlwdGlvblwiXSArPSBcIiBbIFwiICsgbmVlZC5kZXNjcmlwdGlvbiArIFwiIF1cIjtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bWF0ZXJpYWxzX3RlbXAucHVzaChtYXRlcmlhbE9mYU5lZWQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobWF0ZXJpYWxzX3RlbXAsIG51bGwsIDQpKTtcclxuXHRcdC8vdGhpcy5tYXRlcmlhbHMgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldE5lZWRNYXRlcmlhbHMoKTtcclxuXHRcdC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhU2VydmljZS5nZXROZWVkTWF0ZXJpYWxzKClbMF0sIG51bGwsIDQpKTtcclxuXHRcdFxyXG5cdFx0Ly9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShtYXRlcmlhbHNfdGVtcFswXSwgbnVsbCwgNCkpO1xyXG5cdFx0dGhpcy5tYXRlcmlhbHMgPSBtYXRlcmlhbHNfdGVtcDtcclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxufSJdfQ==