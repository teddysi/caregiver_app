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
                    console.log('Amarelo');
                    return { 'background-color': 'yellow' };
                case -1:
                    console.log('Vermelho');
                    return { 'background-color': 'red' };
                case 1:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsaUNBQW9DO0FBS3BDLDREQUEwRDtBQUMxRCw4REFBNEQ7QUFHNUQsZ0NBQStCO0FBSy9CLDJFQUF5RTtBQUN6RSwwQ0FBeUM7QUFVekMsSUFBYSxrQkFBa0I7SUFPOUIsNEJBQ1MsY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLElBQVUsRUFDVixXQUF3QixFQUN4QixnQkFBa0M7UUFMbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUN2QyxDQUFDO0lBRUwscUNBQVEsR0FBUjtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUNwQyxJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRCxtREFBbUQ7UUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBR0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFj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SixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO0lBQ2pDLENBQUM7SUFFRCw0Q0FBZSxHQUFmO1FBQ0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRixDQUFDO0lBQ0YsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDQyxvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRixDQUFDO0lBQ0YsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxzQ0FBUyxHQUFULFVBQVUsSUFBSTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE1BQU0sQ0FBQztJQUVSLENBQUM7SUFFRix5QkFBQztBQUFELENBQUMsQUFoSkQsSUFnSkM7QUFoSlksa0JBQWtCO0lBUDlCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztLQUN4QyxDQUFDO3FDQVV3QixnQ0FBYztRQUN2Qix1QkFBYztRQUNiLGVBQU07UUFDUixXQUFJO1FBQ0csMEJBQVc7UUFDTixvQ0FBZ0I7R0FiL0Isa0JBQWtCLENBZ0o5QjtBQWhKWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuXHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuaW1wb3J0IHsgb3BlbkFwcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtb3Blbi1hcHBcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ21hdGVyaWFscycsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogJy4vbWF0ZXJpYWxzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9tYXRlcmlhbHMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRwYXRpZW50OiBQYXRpZW50O1xyXG5cdG5lZWQ6IE5lZWQ7XHJcblx0bWF0ZXJpYWxzOiBNYXRlcmlhbFtdO1xyXG5cdHJhdGluZ19jb2xvcnM6IHt9O1xyXG5cdGhhc0V2YWx1YXRpb25zVG9EbzogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuXHRcdHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG5cdFx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuXHRcdHByaXZhdGUgcGFnZTogUGFnZSxcclxuXHRcdHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlXHJcblx0KSB7IH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHRjb25zb2xlLmxvZyhcIiMgQ09NUE9ORU5UIE1BVEVSSUFMU1wiKVxyXG5cdFx0Y29uc3QgaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuXHRcdGNvbnN0IGlkeCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkX25lZWRcIl07XHJcblxyXG5cdFx0Ly9yZXR1cm4gdG8gcGF0aWVudHMgTGlzdCBpZiBkbyBub3QgaGF2ZSBjb25uZWN0aW9uXHJcblx0XHRpZiAoIXRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcblx0XHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3BhdGllbnRzJ10pO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHR0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFBhdGllbnRzX0JEKCk7XHJcblxyXG5cdFx0dGhpcy5wYXRpZW50ID0gdGhpcy5wYXRpZW50U2VydmljZS5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcblxyXG5cdFx0Ly8gY3JpYXIgbGlzdGEgZGUgbWF0ZXJpYWlzIGNvbSBwcm9wcmlhZGFkZSBhZGljaW9uYWwgbmVlZCBuYW1lIGFuZCBuZWVkIGRlc2NyaXB0aW9uXHJcblx0XHR0aGlzLmFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKTtcclxuXHJcblx0XHQvL1x0dGhpcy5uZWVkID0gdGhpcy5wYXRpZW50Lm5lZWRzLmZpbHRlcihuZWVkID0+IG5lZWQuaWQgPT09IGlkeClbMF07XHJcblx0XHQvL1x0dGhpcy5tYXRlcmlhbHMgPSB0aGlzLm5lZWQubWF0ZXJpYWxzO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhcIk1BVEVSSUFMUyA6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbHMsIG51bGwsIDQpKTtcclxuXHJcblx0XHQvL29wZW5BcHAoXCJjb20uZmFjZWJvb2sua2F0YW5hXCIpO1xyXG5cdFx0Ly9vcGVuVXJsKFwiaHR0cDovLzE5Mi4xNjguOTkuMTAwL2NhcmVnaXZlcnMvcHVibGljL21hdGVyaWFsc0FQSS8yMS9zaG93Q29udGVudFwiKVxyXG5cdFx0LypsZXQgaTtcclxuXHRcdGxldCBjb250cm9sID0gZmFsc2U7XHJcblx0XHRpZighY29udHJvbClcclxuXHRcdGZvcihpPTA7aTx0aGlzLm1hdGVyaWFscy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0aWYodGhpcy5tYXRlcmlhbHNbaV0udXJsICYmIHRoaXMubWF0ZXJpYWxzW2ldLnBhdGgpIHtcclxuXHRcdFx0XHR0aGlzLm1hdGVyaWFsc1tpXS51cmwrPXRoaXMubWF0ZXJpYWxzW2ldLnBhdGg7XHJcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHNbaV0ucGF0aCA9ICcnO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnRyb2wgPSB0cnVlO1x0XHRcclxuXHRcdH1cclxuXHRcdCovXHJcblxyXG5cdFx0Ly9ldmFsdWF0aW9uc1xyXG5cdFx0dGhpcy5oYXNFdmFsdWF0aW9uc1RvRG8gPSB0aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbygpO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBGdW5jdGlvbiB0byBzZXQgY29sb3Igb2YgcmF0dGluZyBvbiBtYXRlcmlhbHMgbGlzdFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7YW55fSByYXRpbmcgXHJcblx0ICogQHJldHVybnMgXHJcblx0ICogXHJcblx0ICogQG1lbWJlcm9mIE1hdGVyaWFsc0NvbXBvbmVudFxyXG5cdCAqL1xyXG5cdGdldEJvcmRlckNvbG9yKG1hdGVyaWFsKSB7XHJcblx0XHRpZiAobWF0ZXJpYWwuZXZhbHVhdGlvbiA9PSAwIHx8IG1hdGVyaWFsLmV2YWx1YXRpb24gPT0gMSB8fCBtYXRlcmlhbC5ldmFsdWF0aW9uID09IC0xKSB7XHJcblx0XHRcdC8vY29uc29sZS5sb2coJ0EgdmVyZmljYXIgcmF0aW5nIGV4aXN0ZW50ZSBkb3MgbWF0ZXJpYWlzJyk7XHJcblx0XHRcdC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobWF0ZXJpYWwsIG51bGwsIDQpKTtcclxuXHRcdFxyXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiTUFURVJJQUwgRVZBTFVBVElPTjogXCIgKyBtYXRlcmlhbC5ldmFsdWF0aW9uKTtcclxuXHRcdFx0c3dpdGNoIChtYXRlcmlhbC5ldmFsdWF0aW9uKSB7XHJcblx0XHRcdFx0Y2FzZSAwOlxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ0FtYXJlbG8nKTtcclxuXHRcdFx0XHRcdHJldHVybiB7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3llbGxvdycgfTtcclxuXHRcdFx0XHRjYXNlIC0xOlxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1Zlcm1lbGhvJyk7XHJcblx0XHRcdFx0XHRyZXR1cm4geyAnYmFja2dyb3VuZC1jb2xvcic6ICdyZWQnIH07XHJcblx0XHRcdFx0Y2FzZSAxOlxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1ZlcmRlJyk7XHJcblx0XHRcdFx0XHRyZXR1cm4geyAnYmFja2dyb3VuZC1jb2xvcic6ICdncmVlbicgfTtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cmV0dXJuIHsgJ2JhY2tncm91bmQtY29sb3InOiAnYmxhY2snIH07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogRnVuY3Rpb24gdG8gYWRkIHByb3BlcnRpZXMgb2YgdGhlIFwicGFyZW50XCIgbmVlZCB0byB0aGUgXCJjaGlsZFwiIG1hdGVyaWFsXHJcblx0ICogXHJcblx0ICogXHJcblx0ICogQG1lbWJlcm9mIE1hdGVyaWFsc0NvbXBvbmVudFxyXG5cdCAqL1xyXG5cdGFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKSB7XHJcblx0XHRsZXQgbWF0ZXJpYWxzX3RlbXA6IE1hdGVyaWFsW107XHJcblx0XHRtYXRlcmlhbHNfdGVtcCA9IFtdO1xyXG5cclxuXHRcdHRoaXMucGF0aWVudC5uZWVkcy5mb3JFYWNoKG5lZWQgPT4ge1xyXG5cdFx0XHRuZWVkLm1hdGVyaWFscy5mb3JFYWNoKG1hdGVyaWFsT2ZhTmVlZCA9PiB7XHJcblx0XHRcdFx0bWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9pZFwiXSA9IG5lZWQuaWQ7XHJcblx0XHRcdFx0bWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9kZXNjcmlwdGlvblwiXSA9IFwiWyBcIiArIG5lZWQuZGVzY3JpcHRpb24gKyBcIiBdXCI7XHJcblx0XHRcdFx0Ly90ZXN0YXIgc2UgbyBtYXRlcmlhbCBqYSBlc3TDoSBuYSBsaXN0YVxyXG5cdFx0XHRcdGlmIChtYXRlcmlhbHNfdGVtcC5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IG1hdGVyaWFsT2ZhTmVlZC5pZCkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0bWF0ZXJpYWxzX3RlbXAuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBtYXRlcmlhbE9mYU5lZWQuaWQpWzBdW1wibmVlZF9kZXNjcmlwdGlvblwiXSArPSBcIiBbIFwiICsgbmVlZC5kZXNjcmlwdGlvbiArIFwiIF1cIjtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bWF0ZXJpYWxzX3RlbXAucHVzaChtYXRlcmlhbE9mYU5lZWQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbHMgPSBtYXRlcmlhbHNfdGVtcDtcclxuXHR9XHJcblxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdGlmIChhcHAuYW5kcm9pZCkge1xyXG5cdFx0XHRhcHAuYW5kcm9pZC5vbihhcHAuQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcy5iYWNrRXZlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHQvLyBjbGVhbmluZyB1cCByZWZlcmVuY2VzL2xpc3RlbmVycy5cclxuXHRcdGlmIChhcHAuYW5kcm9pZCkge1xyXG5cdFx0XHRhcHAuYW5kcm9pZC5vZmYoYXBwLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMuYmFja0V2ZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZ1bmN0aW9uIHRvIGRpc2FibGUgYmFjayBidXR0b24gb24gYW5kcm9pZFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7YW55fSBhcmdzIFxyXG5cdCAqIEByZXR1cm5zIFxyXG5cdCAqIFxyXG5cdCAqIEBtZW1iZXJvZiBQYXRpZW50c0NvbXBvbmVudFxyXG5cdCAqL1xyXG5cdGJhY2tFdmVudChhcmdzKSB7XHJcblx0XHRhcmdzLmNhbmNlbCA9IHRydWU7XHJcblx0XHRyZXR1cm47XHJcblxyXG5cdH1cclxuXHJcbn0iXX0=