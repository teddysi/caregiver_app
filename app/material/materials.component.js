"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app = require("application");
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
        if (!this.connectorService.isConnected()) {
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
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
    };
    /**
     * Function to set color of ratting on materials list
     *
     * @param {any} rating
     * @returns
     *
     * @memberof MaterialsComponent
     */
    MaterialsComponent.prototype.getBorderColor = function (material) {
        if (material.evaluation == 0 || material.evaluation == 1 || material.evaluation == -1) {
            //console.log('A verficar rating existente dos materiais');
            //console.log(JSON.stringify(material, null, 4));
            //console.log("MATERIAL EVALUATION: " + material.evaluation);
            switch (material.evaluation) {
                case 0:
                    //console.log('Amarelo');
                    return { 'background-color': 'yellow' };
                case -1:
                    //console.log('Vermelho');
                    return { 'background-color': 'red' };
                case 1:
                    //console.log('Verde');
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
    MaterialsComponent.prototype.ngAfterViewInit = function () {
        if (app.android) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    };
    MaterialsComponent.prototype.ngOnDestroy = function () {
        // cleaning up references/listeners.
        if (app.android) {
            app.android.off(app.AndroidApplication.activityBackPressedEvent, this.backEvent);
        }
    };
    /**
     * Function to disable back button on android
     *
     * @param {any} args
     * @returns
     *
     * @memberof PatientsComponent
     */
    MaterialsComponent.prototype.backEvent = function (args) {
        args.cancel = true;
        return;
    };
    MaterialsComponent.prototype.getIcon = function (materialType) {
        switch (materialType) {
            case 'text': return '\uf044';
            case 'image': return '\uf083';
            case 'video': return '\uf008';
            case 'composite': return '\uf26c';
            case 'emergencyContact': return '\uf0f9';
            default:
                break;
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
        router_1.ActivatedRoute,
        router_2.Router,
        page_1.Page,
        data_service_1.DataService,
        connector_service_1.ConnectorService])
], MaterialsComponent);
exports.MaterialsComponent = MaterialsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsaUNBQW9DO0FBS3BDLDREQUEwRDtBQUMxRCw4REFBNEQ7QUFHNUQsZ0NBQStCO0FBSy9CLDJFQUF5RTtBQUN6RSwwQ0FBeUM7QUFVekMsSUFBYSxrQkFBa0I7SUFPOUIsNEJBQ1MsY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLElBQVUsRUFDVixXQUF3QixFQUN4QixnQkFBa0M7UUFMbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUN2QyxDQUFDO0lBRUwscUNBQVEsR0FBUjtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUNwQyxJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRCxtREFBbUQ7UUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBR0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEYsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBRWpDLHFFQUFxRTtRQUNyRSx3Q0FBd0M7UUFDeEMsd0VBQXdFO1FBRXhFLGlDQUFpQztRQUNqQyxnRkFBZ0Y7UUFDaEY7Ozs7Ozs7Ozs7VUFVRTtRQUVGLGFBQWE7UUFDYixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3BFLENBQUM7SUFJRDs7Ozs7OztPQU9HO0lBQ0gsMkNBQWMsR0FBZCxVQUFlLFFBQVE7UUFDdEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsMkRBQTJEO1lBQzNELGlEQUFpRDtZQUVqRCw2REFBNkQ7WUFDN0QsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEtBQUssQ0FBQztvQkFDTCx5QkFBeUI7b0JBQ3pCLE1BQU0sQ0FBQyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxDQUFDO2dCQUN6QyxLQUFLLENBQUMsQ0FBQztvQkFDTiwwQkFBMEI7b0JBQzFCLE1BQU0sQ0FBQyxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUN0QyxLQUFLLENBQUM7b0JBQ0wsdUJBQXVCO29CQUN2QixNQUFNLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQztnQkFDeEM7b0JBQ0MsTUFBTSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUM7WUFDekMsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0lBSUQ7Ozs7O09BS0c7SUFDSCxzREFBeUIsR0FBekI7UUFDQyxJQUFJLGNBQTBCLENBQUM7UUFDL0IsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsZUFBZTtnQkFDckMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3JDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDckUsdUNBQXVDO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEVBQUUsS0FBSyxlQUFlLENBQUMsRUFBRSxFQUFsQyxDQUFrQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RGLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsRUFBRSxLQUFLLGVBQWUsQ0FBQyxFQUFFLEVBQWxDLENBQWtDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDakksQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO1lBRUYsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO0lBQ2pDLENBQUM7SUFFRCw0Q0FBZSxHQUFmO1FBQ0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRixDQUFDO0lBQ0YsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDQyxvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRixDQUFDO0lBQ0YsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxzQ0FBUyxHQUFULFVBQVUsSUFBSTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE1BQU0sQ0FBQztJQUVSLENBQUM7SUFFRCxvQ0FBTyxHQUFQLFVBQVEsWUFBWTtRQUNuQixNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUssTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDN0IsS0FBSyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUM5QixLQUFLLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzlCLEtBQUssV0FBVyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDbEMsS0FBSyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3pDO2dCQUNDLEtBQUssQ0FBQztRQUNSLENBQUM7SUFDRixDQUFDO0lBRUYseUJBQUM7QUFBRCxDQUFDLEFBNUpELElBNEpDO0FBNUpZLGtCQUFrQjtJQVA5QixnQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7S0FDeEMsQ0FBQztxQ0FVd0IsZ0NBQWM7UUFDdkIsdUJBQWM7UUFDYixlQUFNO1FBQ1IsV0FBSTtRQUNHLDBCQUFXO1FBQ04sb0NBQWdCO0dBYi9CLGtCQUFrQixDQTRKOUI7QUE1SlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcblxyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9tYXRlcmlhbC9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcbmltcG9ydCB7IENvbm5lY3RvclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nvbm5lY3Rvci9jb25uZWN0b3Iuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdtYXRlcmlhbHMnLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6ICcuL21hdGVyaWFscy5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vbWF0ZXJpYWxzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0cGF0aWVudDogUGF0aWVudDtcclxuXHRuZWVkOiBOZWVkO1xyXG5cdG1hdGVyaWFsczogTWF0ZXJpYWxbXTtcclxuXHRyYXRpbmdfY29sb3JzOiB7fTtcclxuXHRoYXNFdmFsdWF0aW9uc1RvRG86IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcblx0XHRwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuXHRcdHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcblx0XHRwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuXHRcdHByaXZhdGUgY29ubmVjdG9yU2VydmljZTogQ29ubmVjdG9yU2VydmljZVxyXG5cdCkgeyB9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0Y29uc29sZS5sb2coXCIjIENPTVBPTkVOVCBNQVRFUklBTFNcIilcclxuXHRcdGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcblx0XHRjb25zdCBpZHggPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZF9uZWVkXCJdO1xyXG5cclxuXHRcdC8vcmV0dXJuIHRvIHBhdGllbnRzIExpc3QgaWYgZG8gbm90IGhhdmUgY29ubmVjdGlvblxyXG5cdFx0aWYgKCF0aGlzLmNvbm5lY3RvclNlcnZpY2UuaXNDb25uZWN0ZWQoKSkge1xyXG5cdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wYXRpZW50cyddKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0dGhpcy5wYXRpZW50U2VydmljZS5nZXRQYXRpZW50c19CRCgpO1xyXG5cclxuXHRcdHRoaXMucGF0aWVudCA9IHRoaXMucGF0aWVudFNlcnZpY2UucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG5cclxuXHRcdC8vIGNyaWFyIGxpc3RhIGRlIG1hdGVyaWFpcyBjb20gcHJvcHJpYWRhZGUgYWRpY2lvbmFsIG5lZWQgbmFtZSBhbmQgbmVlZCBkZXNjcmlwdGlvblxyXG5cdFx0dGhpcy5hZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCk7XHJcblxyXG5cdFx0Ly9cdHRoaXMubmVlZCA9IHRoaXMucGF0aWVudC5uZWVkcy5maWx0ZXIobmVlZCA9PiBuZWVkLmlkID09PSBpZHgpWzBdO1xyXG5cdFx0Ly9cdHRoaXMubWF0ZXJpYWxzID0gdGhpcy5uZWVkLm1hdGVyaWFscztcclxuXHRcdC8vY29uc29sZS5sb2coXCJNQVRFUklBTFMgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxzLCBudWxsLCA0KSk7XHJcblxyXG5cdFx0Ly9vcGVuQXBwKFwiY29tLmZhY2Vib29rLmthdGFuYVwiKTtcclxuXHRcdC8vb3BlblVybChcImh0dHA6Ly8xOTIuMTY4Ljk5LjEwMC9jYXJlZ2l2ZXJzL3B1YmxpYy9tYXRlcmlhbHNBUEkvMjEvc2hvd0NvbnRlbnRcIilcclxuXHRcdC8qbGV0IGk7XHJcblx0XHRsZXQgY29udHJvbCA9IGZhbHNlO1xyXG5cdFx0aWYoIWNvbnRyb2wpXHJcblx0XHRmb3IoaT0wO2k8dGhpcy5tYXRlcmlhbHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdGlmKHRoaXMubWF0ZXJpYWxzW2ldLnVybCAmJiB0aGlzLm1hdGVyaWFsc1tpXS5wYXRoKSB7XHJcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHNbaV0udXJsKz10aGlzLm1hdGVyaWFsc1tpXS5wYXRoO1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnBhdGggPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb250cm9sID0gdHJ1ZTtcdFx0XHJcblx0XHR9XHJcblx0XHQqL1xyXG5cclxuXHRcdC8vZXZhbHVhdGlvbnNcclxuXHRcdHRoaXMuaGFzRXZhbHVhdGlvbnNUb0RvID0gdGhpcy5wYXRpZW50U2VydmljZS5oYXNFdmFsdWF0aW9uc1RvRG8oKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogRnVuY3Rpb24gdG8gc2V0IGNvbG9yIG9mIHJhdHRpbmcgb24gbWF0ZXJpYWxzIGxpc3RcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge2FueX0gcmF0aW5nIFxyXG5cdCAqIEByZXR1cm5zIFxyXG5cdCAqIFxyXG5cdCAqIEBtZW1iZXJvZiBNYXRlcmlhbHNDb21wb25lbnRcclxuXHQgKi9cclxuXHRnZXRCb3JkZXJDb2xvcihtYXRlcmlhbCkge1xyXG5cdFx0aWYgKG1hdGVyaWFsLmV2YWx1YXRpb24gPT0gMCB8fCBtYXRlcmlhbC5ldmFsdWF0aW9uID09IDEgfHwgbWF0ZXJpYWwuZXZhbHVhdGlvbiA9PSAtMSkge1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKCdBIHZlcmZpY2FyIHJhdGluZyBleGlzdGVudGUgZG9zIG1hdGVyaWFpcycpO1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsLCBudWxsLCA0KSk7XHJcblx0XHRcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcIk1BVEVSSUFMIEVWQUxVQVRJT046IFwiICsgbWF0ZXJpYWwuZXZhbHVhdGlvbik7XHJcblx0XHRcdHN3aXRjaCAobWF0ZXJpYWwuZXZhbHVhdGlvbikge1xyXG5cdFx0XHRcdGNhc2UgMDpcclxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ0FtYXJlbG8nKTtcclxuXHRcdFx0XHRcdHJldHVybiB7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3llbGxvdycgfTtcclxuXHRcdFx0XHRjYXNlIC0xOlxyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnVmVybWVsaG8nKTtcclxuXHRcdFx0XHRcdHJldHVybiB7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3JlZCcgfTtcclxuXHRcdFx0XHRjYXNlIDE6XHJcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCdWZXJkZScpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHsgJ2JhY2tncm91bmQtY29sb3InOiAnZ3JlZW4nIH07XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybiB7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJ2JsYWNrJyB9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEZ1bmN0aW9uIHRvIGFkZCBwcm9wZXJ0aWVzIG9mIHRoZSBcInBhcmVudFwiIG5lZWQgdG8gdGhlIFwiY2hpbGRcIiBtYXRlcmlhbFxyXG5cdCAqIFxyXG5cdCAqIFxyXG5cdCAqIEBtZW1iZXJvZiBNYXRlcmlhbHNDb21wb25lbnRcclxuXHQgKi9cclxuXHRhZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCkge1xyXG5cdFx0bGV0IG1hdGVyaWFsc190ZW1wOiBNYXRlcmlhbFtdO1xyXG5cdFx0bWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuXHJcblx0XHR0aGlzLnBhdGllbnQubmVlZHMuZm9yRWFjaChuZWVkID0+IHtcclxuXHRcdFx0bmVlZC5tYXRlcmlhbHMuZm9yRWFjaChtYXRlcmlhbE9mYU5lZWQgPT4ge1xyXG5cdFx0XHRcdG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfaWRcIl0gPSBuZWVkLmlkO1xyXG5cdFx0XHRcdG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfZGVzY3JpcHRpb25cIl0gPSBcIlsgXCIgKyBuZWVkLmRlc2NyaXB0aW9uICsgXCIgXVwiO1xyXG5cdFx0XHRcdC8vdGVzdGFyIHNlIG8gbWF0ZXJpYWwgamEgZXN0w6EgbmEgbGlzdGFcclxuXHRcdFx0XHRpZiAobWF0ZXJpYWxzX3RlbXAuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBtYXRlcmlhbE9mYU5lZWQuaWQpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdG1hdGVyaWFsc190ZW1wLmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gbWF0ZXJpYWxPZmFOZWVkLmlkKVswXVtcIm5lZWRfZGVzY3JpcHRpb25cIl0gKz0gXCIgWyBcIiArIG5lZWQuZGVzY3JpcHRpb24gKyBcIiBdXCI7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdG1hdGVyaWFsc190ZW1wLnB1c2gobWF0ZXJpYWxPZmFOZWVkKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWxzID0gbWF0ZXJpYWxzX3RlbXA7XHJcblx0fVxyXG5cclxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XHJcblx0XHRpZiAoYXBwLmFuZHJvaWQpIHtcclxuXHRcdFx0YXBwLmFuZHJvaWQub24oYXBwLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0V2ZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0Ly8gY2xlYW5pbmcgdXAgcmVmZXJlbmNlcy9saXN0ZW5lcnMuXHJcblx0XHRpZiAoYXBwLmFuZHJvaWQpIHtcclxuXHRcdFx0YXBwLmFuZHJvaWQub2ZmKGFwcC5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzLmJhY2tFdmVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGdW5jdGlvbiB0byBkaXNhYmxlIGJhY2sgYnV0dG9uIG9uIGFuZHJvaWRcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge2FueX0gYXJncyBcclxuXHQgKiBAcmV0dXJucyBcclxuXHQgKiBcclxuXHQgKiBAbWVtYmVyb2YgUGF0aWVudHNDb21wb25lbnRcclxuXHQgKi9cclxuXHRiYWNrRXZlbnQoYXJncykge1xyXG5cdFx0YXJncy5jYW5jZWwgPSB0cnVlO1xyXG5cdFx0cmV0dXJuO1xyXG5cclxuXHR9XHJcblxyXG5cdGdldEljb24obWF0ZXJpYWxUeXBlKSB7XHJcblx0XHRzd2l0Y2ggKG1hdGVyaWFsVHlwZSkge1xyXG5cdFx0XHRjYXNlICd0ZXh0JzogcmV0dXJuICdcXHVmMDQ0JztcclxuXHRcdFx0Y2FzZSAnaW1hZ2UnOiByZXR1cm4gJ1xcdWYwODMnO1xyXG5cdFx0XHRjYXNlICd2aWRlbyc6IHJldHVybiAnXFx1ZjAwOCc7XHJcblx0XHRcdGNhc2UgJ2NvbXBvc2l0ZSc6IHJldHVybiAnXFx1ZjI2Yyc7XHJcblx0XHRcdGNhc2UgJ2VtZXJnZW5jeUNvbnRhY3QnOiByZXR1cm4gJ1xcdWYwZjknO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0iXX0=