"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var data_service_1 = require("../shared/data/data.service");
var rating_1 = require("./rating");
var router_2 = require("@angular/router");
var utils_1 = require("utils/utils");
require("nativescript-pdf-view");
var MaterialDetailComponent = (function () {
    //ratings.push(new Rating("1", "Mau"));
    // ratings = [Rating("1", "Mau"), Rating("2", "Medio")]
    function MaterialDetailComponent(patientService, route, router, dataService) {
        this.patientService = patientService;
        this.route = route;
        this.router = router;
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
        //Evaluations
        this.hasEvaluationsToDo = this.patientService.hasEvaluationsToDo;
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
    MaterialDetailComponent.prototype.avaliarCuidador = function (id) {
        //rota para o formulario - teddy
        //let material = this.materialsToDisplay.filter(material => material.id === id)[0];
        //openUrl(material.url);
        this.router.navigate(['/patient', this.patient.id, 'material', id, "evaluation"]);
    };
    MaterialDetailComponent.prototype.getRatings = function () {
        return this.ratings;
    };
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
        router_1.ActivatedRoute, router_2.Router, data_service_1.DataService])
], MaterialDetailComponent);
exports.MaterialDetailComponent = MaterialDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBQzVELDREQUEwRDtBQUUxRCxtQ0FBa0M7QUFRbEMsMENBQXlDO0FBSXpDLHFDQUFzQztBQUd0QyxpQ0FBK0I7QUFPL0IsSUFBYSx1QkFBdUI7SUFVaEMsdUNBQXVDO0lBQ3hDLHVEQUF1RDtJQUV0RCxpQ0FDWSxjQUE4QixFQUU5QixLQUFxQixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUYvRSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFJdkYsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUdGLDBDQUFRLEdBQVI7UUFDSSxhQUFhO1FBS2IsSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUUsRUFBRSxHQUFHLGNBQWMsR0FBRSxHQUFHLENBQUMsQ0FBQTtRQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsb0ZB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LE9BQU8sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFTCw0Q0FBVSxHQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNELG1EQUFpQixHQUFqQixVQUFrQixpQkFBaUI7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTCw4QkFBQztBQUFELENBQUMsQUEvSEQsSUErSEM7QUEvSFksdUJBQXVCO0lBTG5DLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsa0NBQWtDO0tBQ2xELENBQUM7cUNBZThCLGdDQUFjO1FBRXZCLHVCQUFjLEVBQWtCLGVBQU0sRUFBdUIsMEJBQVc7R0FoQmxGLHVCQUF1QixDQStIbkM7QUEvSFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFJhdGluZyB9IGZyb20gXCIuL3JhdGluZ1wiO1xyXG5pbXBvcnQgeyBOZWVkIH0gZnJvbSBcIi4uL25lZWQvbmVlZFwiO1xyXG5cclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IHBsYXRmb3JtID0gcmVxdWlyZShcInBsYXRmb3JtXCIpO1xyXG5cclxuaW1wb3J0IGJ1dHRvbk1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9idXR0b25cIik7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgb3BlbkFwcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtb3Blbi1hcHBcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5cclxuXHJcbmltcG9ydCAnbmF0aXZlc2NyaXB0LXBkZi12aWV3JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibWF0ZXJpYWwtZGV0YWlsc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbERldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwYXRpZW50OiBQYXRpZW50O1xyXG4gICAgbmVlZDogTmVlZDtcclxuICAgIG1hdGVyaWFsc09mQWxsTmVlZHM6IE1hdGVyaWFsW107XHJcbiAgICBtYXRlcmlhbFBhcmVudDogTWF0ZXJpYWw7XHJcbiAgICBtYXRlcmlhbHNUb0Rpc3BsYXk6IE1hdGVyaWFsW107XHJcblxyXG4gICAgaGFzRXZhbHVhdGlvbnNUb0RvOiBib29sZWFuO1xyXG5cclxuICAgIHJhdGluZ3M6IFJhdGluZ1tdO1xyXG4gICAgLy9yYXRpbmdzLnB1c2gobmV3IFJhdGluZyhcIjFcIiwgXCJNYXVcIikpO1xyXG4gICAvLyByYXRpbmdzID0gW1JhdGluZyhcIjFcIiwgXCJNYXVcIiksIFJhdGluZyhcIjJcIiwgXCJNZWRpb1wiKV1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gIFxyXG4gICAgICAgIFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yYXRpbmdzID0gW107XHJcbiAgICAgfVxyXG5cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvL3JhdGluZyB0ZXN0XHJcbiAgICAgXHJcbiAgICAgXHJcblxyXG5cclxuICAgICAgICBjb25zdCBpZCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xyXG4gICAgICAgIGNvbnN0IGlkeCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkX21hdGVyaWFsXCJdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSUQgUEFDSUVOVEUgXCIgK2lkICsgXCIgSUQgTUFURVJJQUxcIiAraWR4KVxyXG4gICAgICAgIHRoaXMucGF0aWVudCA9IHRoaXMucGF0aWVudFNlcnZpY2UucGF0aWVudHMuZmlsdGVyKHBhdGllbnQgPT4gcGF0aWVudC5pZCA9PT0gaWQpWzBdO1xyXG4gICAgICAgIC8vIGNyaWFyIGxpc3RhIGRlIG1hdGVyaWFpcyBjb20gcHJvcHJpYWRhZGUgYWRpY2lvbmFsIG5lZWQgbmFtZSBhbmQgbmVlZCBkZXNjcmlwdGlvblxyXG4gICAgICAgIHRoaXMuYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJNQVRFUklBTE9GQUxMTkVFRFMgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcywgbnVsbCwgNCkpO1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxQYXJlbnQgPSB0aGlzLm1hdGVyaWFsc09mQWxsTmVlZHMuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBpZHgpWzBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS06IFwiKTtcclxuICAgICAgIC8vY29uc29sZS5sb2coXCJNQVRFUklBTFBhcmVudCA6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbFBhcmVudCwgbnVsbCwgNCkpO1xyXG4gICAgICAgIC8vdmVyaWZpY2FyIHNlIMOpIHVtIGNvbXBvc2l0ZVxyXG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsUGFyZW50LnR5cGUgPT0gXCJjb21wb3NpdGVcIikgey8vbWF0ZXJpYWwgY29tcG9zdG8gLT4gY2FycmVnYXIgbyBhcnJheSBcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXk9IHRoaXMubWF0ZXJpYWxQYXJlbnQubWF0ZXJpYWxzOyAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7Ly9tYXRlcmlhbCBzaW1wbGVzIGJhc3RhIGNhcnJlZ2FyIHBhcmEgdmlzdGFcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXk9W107XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5LnB1c2godGhpcy5tYXRlcmlhbFBhcmVudCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFscywgbnVsbCwgNCkpO1xyXG5cclxuICAgICAgICAvL29wZW5BcHAoXCJjb20uZmFjZWJvb2sua2F0YW5hXCIpO1xyXG4gICAgICAgIC8vb3BlblVybChcImh0dHA6Ly8xOTIuMTY4Ljk5LjEwMC9jYXJlZ2l2ZXJzL3B1YmxpYy9tYXRlcmlhbHNBUEkvMjEvc2hvd0NvbnRlbnRcIilcclxuXHRcdC8qbGV0IGk7XHJcblx0XHRsZXQgY29udHJvbCA9IGZhbHNlO1xyXG5cdFx0aWYoIWNvbnRyb2wpXHJcblx0XHRmb3IoaT0wO2k8dGhpcy5tYXRlcmlhbHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdGlmKHRoaXMubWF0ZXJpYWxzW2ldLnVybCAmJiB0aGlzLm1hdGVyaWFsc1tpXS5wYXRoKSB7XHJcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHNbaV0udXJsKz10aGlzLm1hdGVyaWFsc1tpXS5wYXRoO1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnBhdGggPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb250cm9sID0gdHJ1ZTtcdFx0XHJcblx0XHR9XHJcblx0XHQqL1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vRXZhbHVhdGlvbnNcclxuICAgICAgICB0aGlzLmhhc0V2YWx1YXRpb25zVG9Ebz10aGlzLnBhdGllbnRTZXJ2aWNlLmhhc0V2YWx1YXRpb25zVG9EbztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWxzX3RlbXA6IE1hdGVyaWFsW107XHJcbiAgICAgICAgbWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50Lm5lZWRzLmZvckVhY2gobmVlZCA9PiB7XHJcbiAgICAgICAgICAgIG5lZWQubWF0ZXJpYWxzLmZvckVhY2gobWF0ZXJpYWxPZmFOZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfaWRcIl0gPSBuZWVkLmlkO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9kZXNjcmlwdGlvblwiXSA9IG5lZWQuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUwgOiBcIiArIEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsT2ZhTmVlZCwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzX3RlbXAucHVzaChtYXRlcmlhbE9mYU5lZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzID0gbWF0ZXJpYWxzX3RlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgb3Blbk9uQnJvd3NlcihpZCkge1xyXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5LmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWQpWzBdO1xyXG5cclxuICAgICAgICBvcGVuVXJsKG1hdGVyaWFsLnVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9yYXRpbmdcclxuICAgIGV2YWx1YXRlTWF0ZXJpYWwobGV2ZWwpIHtcclxuICAgICAgIFxyXG4gICAgICAgIGxldCByYXRpbmcgPSBuZXcgUmF0aW5nKCk7XHJcbiAgICAgICAgcmF0aW5nLmlkID0gRGF0ZS5ub3coKTtcclxuICAgICAgICByYXRpbmcuZXZhbHVhdGlvbiA9IGxldmVsO1xyXG4gICAgICAgIHJhdGluZy5pZF9tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxQYXJlbnQuaWQ7XHJcblxyXG4gICAgICAgIHRoaXMucmF0aW5ncy5wdXNoKHJhdGluZyk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0UmF0aW5nKHJhdGluZyk7XHJcblxyXG4gICAgfVxyXG4gICAgb25vbk1hdGVyaWFsUGlja2VyKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNQXRlcmlhbCBwaWNhZG9cIilcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgXHRhdmFsaWFyQ3VpZGFkb3IoaWQpIHtcclxuICAgICAgICAgICAgLy9yb3RhIHBhcmEgbyBmb3JtdWxhcmlvIC0gdGVkZHlcclxuICAgICAgICAgICAgLy9sZXQgbWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IGlkKVswXTtcclxuXHJcbiAgICAgICAgICAgIC8vb3BlblVybChtYXRlcmlhbC51cmwpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wYXRpZW50JywgdGhpcy5wYXRpZW50LmlkLCAnbWF0ZXJpYWwnLCBpZCxcImV2YWx1YXRpb25cIl0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBnZXRSYXRpbmdzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhdGluZ3M7XHJcbiAgICB9XHJcbiAgICBmaWxsUXVlc3Rpb25uYWlyZShyZWZfcXVlc3Rpb25uYWlyZSl7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZXZhbHVhdGlvbicsIHJlZl9xdWVzdGlvbm5haXJlXSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==