"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var data_service_1 = require("../shared/data/data.service");
var rating_1 = require("./rating");
var utils_1 = require("utils/utils");
require("nativescript-pdf-view");
var MaterialDetailComponent = (function () {
    //ratings.push(new Rating("1", "Mau"));
    // ratings = [Rating("1", "Mau"), Rating("2", "Medio")]
    function MaterialDetailComponent(patientService, route, dataService) {
        this.patientService = patientService;
        this.route = route;
        this.dataService = dataService;
        this.ratings = [];
    }
    MaterialDetailComponent.prototype.ngOnInit = function () {
        //rating test
        var id = +this.route.snapshot.params["id"];
        var idx = +this.route.snapshot.params["id_material"];
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
    };
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
    MaterialDetailComponent.prototype.openOnBrowser = function (id) {
        var material = this.materialsToDisplay.filter(function (material) { return material.id === id; })[0];
        utils_1.openUrl(material.url);
    };
    //rating
    MaterialDetailComponent.prototype.evaluateMaterial = function (level) {
        var rating = new rating_1.Rating();
        rating.id = Date.now();
        rating.evaluation = level;
        rating.id_material = this.materialParent.id;
        this.ratings.push(rating);
        this.dataService.setRating(rating);
    };
    MaterialDetailComponent.prototype.ononMaterialPicker = function () {
        console.log("MAterial picado");
    };
    MaterialDetailComponent.prototype.getRatings = function () {
        return this.ratings;
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
        data_service_1.DataService])
], MaterialDetailComponent);
exports.MaterialDetailComponent = MaterialDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBQzVELDREQUEwRDtBQUUxRCxtQ0FBa0M7QUFVbEMscUNBQXNDO0FBR3RDLGlDQUErQjtBQU8vQixJQUFhLHVCQUF1QjtJQVFoQyx1Q0FBdUM7SUFDeEMsdURBQXVEO0lBRXRELGlDQUNZLGNBQThCLEVBQzlCLEtBQXFCLEVBQ3JCLFdBQXdCO1FBRnhCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUYsMENBQVEsR0FBUjtRQUNJLGFBQWE7UUFLYixJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRSxFQUFFLEdBQUcsY0FBYyxHQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRixvRkFBb0Y7UUFDcEYsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDakMsMkZB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LDBCQUFXO0dBZDNCLHVCQUF1QixDQTBHbkM7QUExR1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFJhdGluZyB9IGZyb20gXCIuL3JhdGluZ1wiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG5cclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5cclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcblxyXG5cclxuaW1wb3J0IHsgb3BlbkFwcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtb3Blbi1hcHBcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5cclxuXHJcbmltcG9ydCAnbmF0aXZlc2NyaXB0LXBkZi12aWV3JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibWF0ZXJpYWwtZGV0YWlsc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbERldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwYXRpZW50OiBQYXRpZW50O1xyXG4gICAgbmVlZDogTmVlZDtcclxuICAgIG1hdGVyaWFsc09mQWxsTmVlZHM6IE1hdGVyaWFsW107XHJcbiAgICBtYXRlcmlhbFBhcmVudDogTWF0ZXJpYWw7XHJcbiAgICBtYXRlcmlhbHNUb0Rpc3BsYXk6IE1hdGVyaWFsW107XHJcblxyXG4gICAgcmF0aW5nczogUmF0aW5nW107XHJcbiAgICAvL3JhdGluZ3MucHVzaChuZXcgUmF0aW5nKFwiMVwiLCBcIk1hdVwiKSk7XHJcbiAgIC8vIHJhdGluZ3MgPSBbUmF0aW5nKFwiMVwiLCBcIk1hdVwiKSwgUmF0aW5nKFwiMlwiLCBcIk1lZGlvXCIpXVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yYXRpbmdzID0gW107XHJcbiAgICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vcmF0aW5nIHRlc3RcclxuICAgICBcclxuICAgICBcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGlkID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcbiAgICAgICAgY29uc3QgaWR4ID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRfbWF0ZXJpYWxcIl07XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJRCBQQUNJRU5URSBcIiAraWQgKyBcIiBJRCBNQVRFUklBTFwiICtpZHgpXHJcbiAgICAgICAgdGhpcy5wYXRpZW50ID0gdGhpcy5wYXRpZW50U2VydmljZS5wYXRpZW50cy5maWx0ZXIocGF0aWVudCA9PiBwYXRpZW50LmlkID09PSBpZClbMF07XHJcbiAgICAgICAgLy8gY3JpYXIgbGlzdGEgZGUgbWF0ZXJpYWlzIGNvbSBwcm9wcmlhZGFkZSBhZGljaW9uYWwgbmVlZCBuYW1lIGFuZCBuZWVkIGRlc2NyaXB0aW9uXHJcbiAgICAgICAgdGhpcy5hZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMT0ZBTExORUVEUyA6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzLCBudWxsLCA0KSk7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbFBhcmVudCA9IHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcy5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IGlkeClbMF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTogXCIpO1xyXG4gICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMUGFyZW50IDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFsUGFyZW50LCBudWxsLCA0KSk7XHJcbiAgICAgICAgLy92ZXJpZmljYXIgc2Ugw6kgdW0gY29tcG9zaXRlXHJcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWxQYXJlbnQudHlwZSA9PSBcImNvbXBvc2l0ZVwiKSB7Ly9tYXRlcmlhbCBjb21wb3N0byAtPiBjYXJyZWdhciBvIGFycmF5IFxyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheT0gdGhpcy5tYXRlcmlhbFBhcmVudC5tYXRlcmlhbHM7ICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHsvL21hdGVyaWFsIHNpbXBsZXMgYmFzdGEgY2FycmVnYXIgcGFyYSB2aXN0YVxyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheT1bXTtcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkucHVzaCh0aGlzLm1hdGVyaWFsUGFyZW50KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxzLCBudWxsLCA0KSk7XHJcblxyXG4gICAgICAgIC8vb3BlbkFwcChcImNvbS5mYWNlYm9vay5rYXRhbmFcIik7XHJcbiAgICAgICAgLy9vcGVuVXJsKFwiaHR0cDovLzE5Mi4xNjguOTkuMTAwL2NhcmVnaXZlcnMvcHVibGljL21hdGVyaWFsc0FQSS8yMS9zaG93Q29udGVudFwiKVxyXG5cdFx0LypsZXQgaTtcclxuXHRcdGxldCBjb250cm9sID0gZmFsc2U7XHJcblx0XHRpZighY29udHJvbClcclxuXHRcdGZvcihpPTA7aTx0aGlzLm1hdGVyaWFscy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0aWYodGhpcy5tYXRlcmlhbHNbaV0udXJsICYmIHRoaXMubWF0ZXJpYWxzW2ldLnBhdGgpIHtcclxuXHRcdFx0XHR0aGlzLm1hdGVyaWFsc1tpXS51cmwrPXRoaXMubWF0ZXJpYWxzW2ldLnBhdGg7XHJcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHNbaV0ucGF0aCA9ICcnO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnRyb2wgPSB0cnVlO1x0XHRcclxuXHRcdH1cclxuXHRcdCovXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKSB7XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsc190ZW1wOiBNYXRlcmlhbFtdO1xyXG4gICAgICAgIG1hdGVyaWFsc190ZW1wID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucGF0aWVudC5uZWVkcy5mb3JFYWNoKG5lZWQgPT4ge1xyXG4gICAgICAgICAgICBuZWVkLm1hdGVyaWFscy5mb3JFYWNoKG1hdGVyaWFsT2ZhTmVlZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbE9mYU5lZWRbXCJuZWVkX2lkXCJdID0gbmVlZC5pZDtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfZGVzY3JpcHRpb25cIl0gPSBuZWVkLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1BVEVSSUFMIDogXCIgKyBKU09OLnN0cmluZ2lmeShtYXRlcmlhbE9mYU5lZWQsIG51bGwsIDQpKTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsc190ZW1wLnB1c2gobWF0ZXJpYWxPZmFOZWVkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcyA9IG1hdGVyaWFsc190ZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5PbkJyb3dzZXIoaWQpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IGlkKVswXTtcclxuXHJcbiAgICAgICAgb3BlblVybChtYXRlcmlhbC51cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmF0aW5nXHJcbiAgICBldmFsdWF0ZU1hdGVyaWFsKGxldmVsKSB7XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgcmF0aW5nID0gbmV3IFJhdGluZygpO1xyXG4gICAgICAgIHJhdGluZy5pZCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgcmF0aW5nLmV2YWx1YXRpb24gPSBsZXZlbDtcclxuICAgICAgICByYXRpbmcuaWRfbWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsUGFyZW50LmlkO1xyXG5cclxuICAgICAgICB0aGlzLnJhdGluZ3MucHVzaChyYXRpbmcpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNldFJhdGluZyhyYXRpbmcpO1xyXG5cclxuICAgIH1cclxuICAgIG9ub25NYXRlcmlhbFBpY2tlcigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTUF0ZXJpYWwgcGljYWRvXCIpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFJhdGluZ3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmF0aW5ncztcclxuICAgIH1cclxufVxyXG4iXX0=