"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var data_service_1 = require("../shared/data/data.service");
var rating_1 = require("./rating");
var router_2 = require("@angular/router");
var utils_1 = require("utils/utils");
var connector_service_1 = require("../shared/connector/connector.service");
require("nativescript-pdf-view");
var MaterialDetailComponent = (function () {
    //ratings.push(new Rating("1", "Mau"));
    // ratings = [Rating("1", "Mau"), Rating("2", "Medio")]
    function MaterialDetailComponent(patientService, route, router, dataService, connectorService) {
        this.patientService = patientService;
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.connectorService = connectorService;
        this.ratings = [];
    }
    MaterialDetailComponent.prototype.ngOnInit = function () {
        console.log("# COMPONENTE MATERIAL-DETAIL");
        //rating test
        var id = +this.route.snapshot.params["id"];
        var idx = +this.route.snapshot.params["id_material"];
        //return to patients List if do not have connection
        if (!this.connectorService.isConnected()) {
            this.router.navigate(['/patients']);
        }
        console.log("ID PACIENTE " + id + " ID MATERIAL" + idx);
        this.patient = this.patientService.patients.filter(function (patient) { return patient.id === id; })[0];
        // criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //console.log("MATERIALOFALLNEEDS : " + JSON.stringify(this.materialsOfAllNeeds, null, 4));
        this.materialParent = this.materialsOfAllNeeds.filter(function (material) { return material.id === idx; })[0];
        //console.log("---------------------------------------------------------------: ");
        //console.log("MATERIALParent : " + JSON.stringify(this.materialParent, null, 4));
        //verificar se é um composite
        if (this.materialParent.type == "composite") {
            this.materialsToDisplay = this.materialParent.materials;
        }
        else {
            this.materialsToDisplay = [];
            this.materialsToDisplay.push(this.materialParent);
        }
        // console.log(JSON.stringify(this.materials, null, 4));
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
        //Evaluations
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo();
    };
    /**
     * Function to add properties of the "parent" need to the "child" material
     *
     *
     * @memberof MaterialDetailComponent
     */
    MaterialDetailComponent.prototype.addPropertyNeedOnMaterial = function () {
        var materials_temp;
        materials_temp = [];
        this.patient.needs.forEach(function (need) {
            need.materials.forEach(function (materialOfaNeed) {
                materialOfaNeed["need_id"] = need.id;
                materialOfaNeed["need_description"] = need.description;
                //console.log("MATERIAL : " + JSON.stringify(materialOfaNeed, null, 4));
                materials_temp.push(materialOfaNeed);
            });
        });
        this.materialsOfAllNeeds = materials_temp;
    };
    /**
     * Function to open external materials [pdf ...]
     *
     * @param {any} id
     *
     * @memberof MaterialDetailComponent
     */
    MaterialDetailComponent.prototype.openOnBrowser = function (id) {
        var material = this.materialsToDisplay.filter(function (material) { return material.id === id; })[0];
        utils_1.openUrl(material.url);
    };
    /**
     * Function to rate material [red,yellow,green]
     *
     * @param {any} level
     *
     * @memberof MaterialDetailComponent
     */
    MaterialDetailComponent.prototype.evaluateMaterial = function (level) {
        var rating = new rating_1.Rating();
        rating.id = Date.now();
        rating.evaluation = level;
        rating.id_material = this.materialParent.id;
        this.ratings.push(rating);
        this.dataService.setRating(rating);
    };
    /*
     ononMaterialPicker(){
         console.log("MAterial picado")
 
     }
 
     
         avaliarCuidador(id) {
             //rota para o formulario - teddy
             //let material = this.materialsToDisplay.filter(material => material.id === id)[0];
 
             //openUrl(material.url);
             this.router.navigate(['/patient', this.patient.id, 'material', id,"evaluation"]);
         }*/
    MaterialDetailComponent.prototype.getRatings = function () {
        return this.ratings;
    };
    /**
     * function to navigate to the material questionnaire
     *
     * @param {any} ref_questionnaire
     *
     * @memberof MaterialDetailComponent
     */
    MaterialDetailComponent.prototype.fillQuestionnaire = function (ref_questionnaire) {
        this.router.navigate(['/evaluation', ref_questionnaire]);
    };
    return MaterialDetailComponent;
}());
MaterialDetailComponent = __decorate([
    core_1.Component({
        selector: "material-details",
        moduleId: module.id,
        templateUrl: "./material-detail.component.html",
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.ActivatedRoute,
        router_2.Router,
        data_service_1.DataService,
        connector_service_1.ConnectorService])
], MaterialDetailComponent);
exports.MaterialDetailComponent = MaterialDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBQzVELDREQUEwRDtBQUUxRCxtQ0FBa0M7QUFRbEMsMENBQXlDO0FBSXpDLHFDQUFzQztBQUV0QywyRUFBeUU7QUFFekUsaUNBQStCO0FBTy9CLElBQWEsdUJBQXVCO0lBVWhDLHVDQUF1QztJQUN2Qyx1REFBdUQ7SUFFdkQsaUNBQ1ksY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLFdBQXdCLEVBQ3hCLGdCQUFrQztRQUpsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFFMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUdELDBDQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUE7UUFDM0MsYUFBYTtRQUViLElBQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXZELG1EQUFtRDtRQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FB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LENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV2QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7WUFhUTtJQUlSLDRDQUFVLEdBQVY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBSUQ7Ozs7OztPQU1HO0lBQ0gsbURBQWlCLEdBQWpCLFVBQWtCLGlCQUFpQjtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVMLDhCQUFDO0FBQUQsQ0FBQyxBQXpLRCxJQXlLQztBQXpLWSx1QkFBdUI7SUFMbkMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxrQ0FBa0M7S0FDbEQsQ0FBQztxQ0FlOEIsZ0NBQWM7UUFDdkIsdUJBQWM7UUFDYixlQUFNO1FBQ0QsMEJBQVc7UUFDTixvQ0FBZ0I7R0FsQnJDLHVCQUF1QixDQXlLbkM7QUF6S1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFJhdGluZyB9IGZyb20gXCIuL3JhdGluZ1wiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG5cclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5cclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgb3BlbkFwcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtb3Blbi1hcHBcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5cclxuaW1wb3J0IHsgQ29ubmVjdG9yU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdG9yL2Nvbm5lY3Rvci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgJ25hdGl2ZXNjcmlwdC1wZGYtdmlldyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1hdGVyaWFsLWRldGFpbHNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21hdGVyaWFsLWRldGFpbC5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcGF0aWVudDogUGF0aWVudDtcclxuICAgIG5lZWQ6IE5lZWQ7XHJcbiAgICBtYXRlcmlhbHNPZkFsbE5lZWRzOiBNYXRlcmlhbFtdO1xyXG4gICAgbWF0ZXJpYWxQYXJlbnQ6IE1hdGVyaWFsO1xyXG4gICAgbWF0ZXJpYWxzVG9EaXNwbGF5OiBNYXRlcmlhbFtdO1xyXG5cclxuICAgIGhhc0V2YWx1YXRpb25zVG9EbzogYm9vbGVhbjtcclxuXHJcbiAgICByYXRpbmdzOiBSYXRpbmdbXTtcclxuICAgIC8vcmF0aW5ncy5wdXNoKG5ldyBSYXRpbmcoXCIxXCIsIFwiTWF1XCIpKTtcclxuICAgIC8vIHJhdGluZ3MgPSBbUmF0aW5nKFwiMVwiLCBcIk1hdVwiKSwgUmF0aW5nKFwiMlwiLCBcIk1lZGlvXCIpXVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0b3JTZXJ2aWNlOiBDb25uZWN0b3JTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJhdGluZ3MgPSBbXTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTkVOVEUgTUFURVJJQUwtREVUQUlMXCIpXHJcbiAgICAgICAgLy9yYXRpbmcgdGVzdFxyXG5cclxuICAgICAgICBjb25zdCBpZCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xyXG4gICAgICAgIGNvbnN0IGlkeCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkX21hdGVyaWFsXCJdO1xyXG5cclxuICAgICAgICAvL3JldHVybiB0byBwYXRpZW50cyBMaXN0IGlmIGRvIG5vdCBoYXZlIGNvbm5lY3Rpb25cclxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdG9yU2VydmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3BhdGllbnRzJ10pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSUQgUEFDSUVOVEUgXCIgKyBpZCArIFwiIElEIE1BVEVSSUFMXCIgKyBpZHgpXHJcbiAgICAgICAgdGhpcy5wYXRpZW50ID0gdGhpcy5wYXRpZW50U2VydmljZS5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcbiAgICAgICAgLy8gY3JpYXIgbGlzdGEgZGUgbWF0ZXJpYWlzIGNvbSBwcm9wcmlhZGFkZSBhZGljaW9uYWwgbmVlZCBuYW1lIGFuZCBuZWVkIGRlc2NyaXB0aW9uXHJcbiAgICAgICAgdGhpcy5hZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMT0ZBTExORUVEUyA6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbFBhcmVudCA9IHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcy5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IGlkeClbMF07XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS06IFwiKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUxQYXJlbnQgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxQYXJlbnQsIG51bGwsIDQpKTtcclxuICAgICAgICAvL3ZlcmlmaWNhciBzZSDDqSB1bSBjb21wb3NpdGVcclxuICAgICAgICBpZiAodGhpcy5tYXRlcmlhbFBhcmVudC50eXBlID09IFwiY29tcG9zaXRlXCIpIHsvL21hdGVyaWFsIGNvbXBvc3RvIC0+IGNhcnJlZ2FyIG8gYXJyYXkgXHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5ID0gdGhpcy5tYXRlcmlhbFBhcmVudC5tYXRlcmlhbHM7XHJcbiAgICAgICAgfSBlbHNlIHsvL21hdGVyaWFsIHNpbXBsZXMgYmFzdGEgY2FycmVnYXIgcGFyYSB2aXN0YVxyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5wdXNoKHRoaXMubWF0ZXJpYWxQYXJlbnQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxzLCBudWxsLCA0KSk7XHJcblxyXG4gICAgICAgIC8vb3BlbkFwcChcImNvbS5mYWNlYm9vay5rYXRhbmFcIik7XHJcbiAgICAgICAgLy9vcGVuVXJsKFwiaHR0cDovLzE5Mi4xNjguOTkuMTAwL2NhcmVnaXZlcnMvcHVibGljL21hdGVyaWFsc0FQSS8yMS9zaG93Q29udGVudFwiKVxyXG5cdFx0LypsZXQgaTtcclxuXHRcdGxldCBjb250cm9sID0gZmFsc2U7XHJcblx0XHRpZighY29udHJvbClcclxuXHRcdGZvcihpPTA7aTx0aGlzLm1hdGVyaWFscy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0aWYodGhpcy5tYXRlcmlhbHNbaV0udXJsICYmIHRoaXMubWF0ZXJpYWxzW2ldLnBhdGgpIHtcclxuXHRcdFx0XHR0aGlzLm1hdGVyaWFsc1tpXS51cmwrPXRoaXMubWF0ZXJpYWxzW2ldLnBhdGg7XHJcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHNbaV0ucGF0aCA9ICcnO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnRyb2wgPSB0cnVlO1x0XHRcclxuXHRcdH1cclxuXHRcdCovXHJcblxyXG4gICAgICAgIC8vRXZhbHVhdGlvbnNcclxuICAgICAgICB0aGlzLmhhc0V2YWx1YXRpb25zVG9EbyA9IHRoaXMucGF0aWVudFNlcnZpY2UuaGFzRXZhbHVhdGlvbnNUb0RvKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGFkZCBwcm9wZXJ0aWVzIG9mIHRoZSBcInBhcmVudFwiIG5lZWQgdG8gdGhlIFwiY2hpbGRcIiBtYXRlcmlhbFxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBhZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCkge1xyXG4gICAgICAgIGxldCBtYXRlcmlhbHNfdGVtcDogTWF0ZXJpYWxbXTtcclxuICAgICAgICBtYXRlcmlhbHNfdGVtcCA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnBhdGllbnQubmVlZHMuZm9yRWFjaChuZWVkID0+IHtcclxuICAgICAgICAgICAgbmVlZC5tYXRlcmlhbHMuZm9yRWFjaChtYXRlcmlhbE9mYU5lZWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9pZFwiXSA9IG5lZWQuaWQ7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbE9mYU5lZWRbXCJuZWVkX2Rlc2NyaXB0aW9uXCJdID0gbmVlZC5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJNQVRFUklBTCA6IFwiICsgSlNPTi5zdHJpbmdpZnkobWF0ZXJpYWxPZmFOZWVkLCBudWxsLCA0KSk7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbHNfdGVtcC5wdXNoKG1hdGVyaWFsT2ZhTmVlZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm1hdGVyaWFsc09mQWxsTmVlZHMgPSBtYXRlcmlhbHNfdGVtcDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gb3BlbiBleHRlcm5hbCBtYXRlcmlhbHMgW3BkZiAuLi5dXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBpZCBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIG9wZW5PbkJyb3dzZXIoaWQpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IGlkKVswXTtcclxuICAgICAgICBvcGVuVXJsKG1hdGVyaWFsLnVybCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIHJhdGUgbWF0ZXJpYWwgW3JlZCx5ZWxsb3csZ3JlZW5dXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBsZXZlbCBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGV2YWx1YXRlTWF0ZXJpYWwobGV2ZWwpIHtcclxuXHJcbiAgICAgICAgbGV0IHJhdGluZyA9IG5ldyBSYXRpbmcoKTtcclxuICAgICAgICByYXRpbmcuaWQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHJhdGluZy5ldmFsdWF0aW9uID0gbGV2ZWw7XHJcbiAgICAgICAgcmF0aW5nLmlkX21hdGVyaWFsID0gdGhpcy5tYXRlcmlhbFBhcmVudC5pZDtcclxuXHJcbiAgICAgICAgdGhpcy5yYXRpbmdzLnB1c2gocmF0aW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRSYXRpbmcocmF0aW5nKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBvbm9uTWF0ZXJpYWxQaWNrZXIoKXtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJNQXRlcmlhbCBwaWNhZG9cIilcclxuIFxyXG4gICAgIH1cclxuIFxyXG4gICAgIFxyXG4gICAgICAgICBhdmFsaWFyQ3VpZGFkb3IoaWQpIHtcclxuICAgICAgICAgICAgIC8vcm90YSBwYXJhIG8gZm9ybXVsYXJpbyAtIHRlZGR5XHJcbiAgICAgICAgICAgICAvL2xldCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5LmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWQpWzBdO1xyXG4gXHJcbiAgICAgICAgICAgICAvL29wZW5VcmwobWF0ZXJpYWwudXJsKTtcclxuICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3BhdGllbnQnLCB0aGlzLnBhdGllbnQuaWQsICdtYXRlcmlhbCcsIGlkLFwiZXZhbHVhdGlvblwiXSk7XHJcbiAgICAgICAgIH0qL1xyXG5cclxuXHJcblxyXG4gICAgZ2V0UmF0aW5ncygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYXRpbmdzO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBmdW5jdGlvbiB0byBuYXZpZ2F0ZSB0byB0aGUgbWF0ZXJpYWwgcXVlc3Rpb25uYWlyZVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVmX3F1ZXN0aW9ubmFpcmUgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJvZiBNYXRlcmlhbERldGFpbENvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBmaWxsUXVlc3Rpb25uYWlyZShyZWZfcXVlc3Rpb25uYWlyZSkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2V2YWx1YXRpb24nLCByZWZfcXVlc3Rpb25uYWlyZV0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=