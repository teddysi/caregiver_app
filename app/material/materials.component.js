"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../shared/data/data.service");
var patient_service_1 = require("../patient/patient.service");
var page_1 = require("ui/page");
var connector_service_1 = require("../shared/connector/connector.service");
var router_2 = require("@angular/router");
var MaterialsComponent = (function () {
    function MaterialsComponent(patientService, route, router, page, dataService, connectorService) {
        this.patientService = patientService;
        this.route = route;
        this.router = router;
        this.page = page;
        this.dataService = dataService;
        this.connectorService = connectorService;
    }
    MaterialsComponent.prototype.ngOnInit = function () {
        console.log("# COMPONENT MATERIALS");
        var id = +this.route.snapshot.params["id"];
        var idx = +this.route.snapshot.params["id_need"];
        //return to patients List if do not have connection
        if (!this.connectorService.isConnected) {
            this.router.navigate(['/patients']);
        }
        this.patientService.getPatients_BD();
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
        //evaluations
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo;
    };
    /**
     * Function to set color of ratting on materials list
     *
     * @param {any} rating
     * @returns
     *
     * @memberof MaterialsComponent
     */
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
    /**
     * Function to add properties of the "parent" need to the "child" material
     *
     *
     * @memberof MaterialsComponent
     */
    MaterialsComponent.prototype.addPropertyNeedOnMaterial = function () {
        var materials_temp;
        materials_temp = [];
        this.patient.needs.forEach(function (need) {
            need.materials.forEach(function (materialOfaNeed) {
                materialOfaNeed["need_id"] = need.id;
                materialOfaNeed["need_description"] = "[ " + need.description + " ]";
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
        router_1.ActivatedRoute,
        router_2.Router,
        page_1.Page,
        data_service_1.DataService,
        connector_service_1.ConnectorService])
], MaterialsComponent);
exports.MaterialsComponent = MaterialsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFLakQsNERBQTBEO0FBQzFELDhEQUE0RDtBQUc1RCxnQ0FBK0I7QUFLL0IsMkVBQXlFO0FBQ3pFLDBDQUF5QztBQVV6QyxJQUFhLGtCQUFrQjtJQU85Qiw0QkFDUyxjQUE4QixFQUM5QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsSUFBVSxFQUNWLFdBQXdCLEVBQ3hCLGdCQUFrQztRQUxsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQ3ZDLENBQUM7SUFFTCxxQ0FBUSxHQUFSO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1FBQ3BDLElBQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELG1EQUFtRDtRQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBR0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEYsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBRWpDLHFFQUFxRTtRQUNyRSx3Q0FBd0M7UUFDeEMsd0VBQXdFO1FBRXhFLGlDQUFpQztRQUNqQyxnRkFBZ0Y7UUFDaEY7Ozs7Ozs7Ozs7VUFVRTtRQUVGLGFBQWE7UUFDYixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQztJQUNsRSxDQUFDO0lBSUQ7Ozs7Ozs7T0FPRztJQUNILDJDQUFjLEdBQWQsVUFBZSxNQUFNO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7WUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSyxHQUFHO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3ZCLE1BQU0sQ0FBQyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxDQUFDO2dCQUN6QyxLQUFLLElBQUk7b0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDeEIsTUFBTSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQ3RDLEtBQUssR0FBRztvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQixNQUFNLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQztnQkFDeEM7b0JBQ0MsTUFBTSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUM7WUFDekMsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0lBSUQ7Ozs7O09BS0c7SUFDSCxzREFBeUIsR0FBekI7UUFDQyxJQUFJLGNBQTBCLENBQUM7UUFDL0IsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsZUFBZTtnQkFDckMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3JDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDckUsdUNBQXVDO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEVBQUUsS0FBSyxlQUFlLENBQUMsRUFBRSxFQUFsQyxDQUFrQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RGLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsRUFBRSxLQUFLLGVBQWUsQ0FBQyxFQUFFLEVBQWxDLENBQWtDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDakksQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO1lBRUYsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO0lBQ2pDLENBQUM7SUFHRix5QkFBQztBQUFELENBQUMsQUFySEQsSUFxSEM7QUFySFksa0JBQWtCO0lBUDlCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztLQUN4QyxDQUFDO3FDQVV3QixnQ0FBYztRQUN2Qix1QkFBYztRQUNiLGVBQU07UUFDUixXQUFJO1FBQ0csMEJBQVc7UUFDTixvQ0FBZ0I7R0FiL0Isa0JBQWtCLENBcUg5QjtBQXJIWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuaW1wb3J0IHsgb3BlbkFwcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtb3Blbi1hcHBcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ21hdGVyaWFscycsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogJy4vbWF0ZXJpYWxzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9tYXRlcmlhbHMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRwYXRpZW50OiBQYXRpZW50O1xyXG5cdG5lZWQ6IE5lZWQ7XHJcblx0bWF0ZXJpYWxzOiBNYXRlcmlhbFtdO1xyXG5cdHJhdGluZ19jb2xvcnM6IHt9O1xyXG5cdGhhc0V2YWx1YXRpb25zVG9EbzogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuXHRcdHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG5cdFx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuXHRcdHByaXZhdGUgcGFnZTogUGFnZSxcclxuXHRcdHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlXHJcblx0KSB7IH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHRjb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5UIE1BVEVSSUFMU1wiKVxyXG5cdFx0Y29uc3QgaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuXHRcdGNvbnN0IGlkeCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkX25lZWRcIl07XHJcblxyXG5cdFx0Ly9yZXR1cm4gdG8gcGF0aWVudHMgTGlzdCBpZiBkbyBub3QgaGF2ZSBjb25uZWN0aW9uXHJcblx0XHRpZiAoIXRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCkge1xyXG5cdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wYXRpZW50cyddKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0dGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50c19CRCgpO1xyXG5cclxuXHRcdHRoaXMucGF0aWVudCA9IHRoaXMucGF0aWVudFNlcnZpY2UucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG5cclxuXHRcdC8vIGNyaWFyIGxpc3RhIGRlIG1hdGVyaWFpcyBjb20gcHJvcHJpYWRhZGUgYWRpY2lvbmFsIG5lZWQgbmFtZSBhbmQgbmVlZCBkZXNjcmlwdGlvblxyXG5cdFx0dGhpcy5hZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCk7XHJcblxyXG5cdFx0Ly9cdHRoaXMubmVlZCA9IHRoaXMucGF0aWVudC5uZWVkcy5maWx0ZXIobmVlZCA9PiBuZWVkLmlkID09PSBpZHgpWzBdO1xyXG5cdFx0Ly9cdHRoaXMubWF0ZXJpYWxzID0gdGhpcy5uZWVkLm1hdGVyaWFscztcclxuXHRcdC8vY29uc29sZS5sb2coXCJNQVRFUklBTFMgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxzLCBudWxsLCA0KSk7XHJcblxyXG5cdFx0Ly9vcGVuQXBwKFwiY29tLmZhY2Vib29rLmthdGFuYVwiKTtcclxuXHRcdC8vb3BlblVybChcImh0dHA6Ly8xOTIuMTY4Ljk5LjEwMC9jYXJlZ2l2ZXJzL3B1YmxpYy9tYXRlcmlhbHNBUEkvMjEvc2hvd0NvbnRlbnRcIilcclxuXHRcdC8qbGV0IGk7XHJcblx0XHRsZXQgY29udHJvbCA9IGZhbHNlO1xyXG5cdFx0aWYoIWNvbnRyb2wpXHJcblx0XHRmb3IoaT0wO2k8dGhpcy5tYXRlcmlhbHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdGlmKHRoaXMubWF0ZXJpYWxzW2ldLnVybCAmJiB0aGlzLm1hdGVyaWFsc1tpXS5wYXRoKSB7XHJcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHNbaV0udXJsKz10aGlzLm1hdGVyaWFsc1tpXS5wYXRoO1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnBhdGggPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb250cm9sID0gdHJ1ZTtcdFx0XHJcblx0XHR9XHJcblx0XHQqL1xyXG5cclxuXHRcdC8vZXZhbHVhdGlvbnNcclxuXHRcdHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG87XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEZ1bmN0aW9uIHRvIHNldCBjb2xvciBvZiByYXR0aW5nIG9uIG1hdGVyaWFscyBsaXN0XHJcblx0ICogXHJcblx0ICogQHBhcmFtIHthbnl9IHJhdGluZyBcclxuXHQgKiBAcmV0dXJucyBcclxuXHQgKiBcclxuXHQgKiBAbWVtYmVyb2YgTWF0ZXJpYWxzQ29tcG9uZW50XHJcblx0ICovXHJcblx0Z2V0Qm9yZGVyQ29sb3IocmF0aW5nKSB7XHJcblx0XHRpZiAocmF0aW5nKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdBIHZlcmZpY2FyIHJhdGluZyBleGlzdGVudGUgZG9zIG1hdGVyaWFpcycpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyYXRpbmcsIG51bGwsIDQpKTtcclxuXHJcblx0XHRcdHN3aXRjaCAocmF0aW5nLmV2YWx1YXRpb24pIHtcclxuXHRcdFx0XHRjYXNlICcwJzpcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdBbWFyZWxvJyk7XHJcblx0XHRcdFx0XHRyZXR1cm4geyAnYmFja2dyb3VuZC1jb2xvcic6ICd5ZWxsb3cnIH07XHJcblx0XHRcdFx0Y2FzZSAnLTEnOlxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1Zlcm1lbGhvJyk7XHJcblx0XHRcdFx0XHRyZXR1cm4geyAnYmFja2dyb3VuZC1jb2xvcic6ICdyZWQnIH07XHJcblx0XHRcdFx0Y2FzZSAnMSc6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnVmVyZGUnKTtcclxuXHRcdFx0XHRcdHJldHVybiB7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJ2dyZWVuJyB9O1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4geyAnYmFja2dyb3VuZC1jb2xvcic6ICdibGFjaycgfTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBGdW5jdGlvbiB0byBhZGQgcHJvcGVydGllcyBvZiB0aGUgXCJwYXJlbnRcIiBuZWVkIHRvIHRoZSBcImNoaWxkXCIgbWF0ZXJpYWxcclxuXHQgKiBcclxuXHQgKiBcclxuXHQgKiBAbWVtYmVyb2YgTWF0ZXJpYWxzQ29tcG9uZW50XHJcblx0ICovXHJcblx0YWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpIHtcclxuXHRcdGxldCBtYXRlcmlhbHNfdGVtcDogTWF0ZXJpYWxbXTtcclxuXHRcdG1hdGVyaWFsc190ZW1wID0gW107XHJcblxyXG5cdFx0dGhpcy5wYXRpZW50Lm5lZWRzLmZvckVhY2gobmVlZCA9PiB7XHJcblx0XHRcdG5lZWQubWF0ZXJpYWxzLmZvckVhY2gobWF0ZXJpYWxPZmFOZWVkID0+IHtcclxuXHRcdFx0XHRtYXRlcmlhbE9mYU5lZWRbXCJuZWVkX2lkXCJdID0gbmVlZC5pZDtcclxuXHRcdFx0XHRtYXRlcmlhbE9mYU5lZWRbXCJuZWVkX2Rlc2NyaXB0aW9uXCJdID0gXCJbIFwiICsgbmVlZC5kZXNjcmlwdGlvbiArIFwiIF1cIjtcclxuXHRcdFx0XHQvL3Rlc3RhciBzZSBvIG1hdGVyaWFsIGphIGVzdMOhIG5hIGxpc3RhXHJcblx0XHRcdFx0aWYgKG1hdGVyaWFsc190ZW1wLmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gbWF0ZXJpYWxPZmFOZWVkLmlkKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRtYXRlcmlhbHNfdGVtcC5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IG1hdGVyaWFsT2ZhTmVlZC5pZClbMF1bXCJuZWVkX2Rlc2NyaXB0aW9uXCJdICs9IFwiIFsgXCIgKyBuZWVkLmRlc2NyaXB0aW9uICsgXCIgXVwiO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtYXRlcmlhbHNfdGVtcC5wdXNoKG1hdGVyaWFsT2ZhTmVlZCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLm1hdGVyaWFscyA9IG1hdGVyaWFsc190ZW1wO1xyXG5cdH1cclxuXHJcblxyXG59Il19