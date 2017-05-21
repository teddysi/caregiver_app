"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var router_2 = require("@angular/router");
var utils_1 = require("utils/utils");
require("nativescript-pdf-view");
var MaterialDetailComponent = (function () {
    //ratings.push(new Rating("1", "Mau"));
    // ratings = [Rating("1", "Mau"), Rating("2", "Medio")]
    function MaterialDetailComponent(patientService, route, router) {
        this.patientService = patientService;
        this.route = route;
        this.router = router;
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
    MaterialDetailComponent.prototype.onGreen = function () {
        console.log("GREEN");
    };
    MaterialDetailComponent.prototype.onYellow = function () {
        console.log("Yellow");
    };
    MaterialDetailComponent.prototype.onRed = function () {
        console.log("Red");
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
    return MaterialDetailComponent;
}());
MaterialDetailComponent = __decorate([
    core_1.Component({
        selector: "material-details",
        moduleId: module.id,
        templateUrl: "./material-detail.component.html",
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.ActivatedRoute, router_2.Router])
], MaterialDetailComponent);
exports.MaterialDetailComponent = MaterialDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBVTVELDBDQUF5QztBQUl6QyxxQ0FBc0M7QUFHdEMsaUNBQStCO0FBTy9CLElBQWEsdUJBQXVCO0lBUWhDLHVDQUF1QztJQUN4Qyx1REFBdUQ7SUFFdEQsaUNBQ1ksY0FBOEIsRUFDOUIsS0FBcUIsRUFBVSxNQUFjO1FBRDdDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDckQsQ0FBQztJQUVMLDBDQUFRLEdBQVI7UUFDSSxhQUFhO1FBS2IsSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUUsRUFBRSxHQUFHLGNBQWMsR0FBRSxHQUFHLENBQUMsQ0FBQTtRQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ2pDLDJGQUEyRjtRQUMzRixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxN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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBSYXRpbmcgfSBmcm9tIFwiLi9yYXRpbmdcIjtcclxuaW1wb3J0IHsgTmVlZCB9IGZyb20gXCIuLi9uZWVkL25lZWRcIjtcclxuXHJcbmltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJwbGF0Zm9ybVwiKTtcclxuXHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuXHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcblxyXG5pbXBvcnQgJ25hdGl2ZXNjcmlwdC1wZGYtdmlldyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1hdGVyaWFsLWRldGFpbHNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21hdGVyaWFsLWRldGFpbC5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcGF0aWVudDogUGF0aWVudDtcclxuICAgIG5lZWQ6IE5lZWQ7XHJcbiAgICBtYXRlcmlhbHNPZkFsbE5lZWRzOiBNYXRlcmlhbFtdO1xyXG4gICAgbWF0ZXJpYWxQYXJlbnQ6IE1hdGVyaWFsO1xyXG4gICAgbWF0ZXJpYWxzVG9EaXNwbGF5OiBNYXRlcmlhbFtdO1xyXG5cclxuICAgIHJhdGluZ3M6IFJhdGluZ1tdO1xyXG4gICAgLy9yYXRpbmdzLnB1c2gobmV3IFJhdGluZyhcIjFcIiwgXCJNYXVcIikpO1xyXG4gICAvLyByYXRpbmdzID0gW1JhdGluZyhcIjFcIiwgXCJNYXVcIiksIFJhdGluZyhcIjJcIiwgXCJNZWRpb1wiKV1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy9yYXRpbmcgdGVzdFxyXG4gICAgIFxyXG4gICAgIFxyXG5cclxuXHJcbiAgICAgICAgY29uc3QgaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuICAgICAgICBjb25zdCBpZHggPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZF9tYXRlcmlhbFwiXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIklEIFBBQ0lFTlRFIFwiICtpZCArIFwiIElEIE1BVEVSSUFMXCIgK2lkeClcclxuICAgICAgICB0aGlzLnBhdGllbnQgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuICAgICAgICAvLyBjcmlhciBsaXN0YSBkZSBtYXRlcmlhaXMgY29tIHByb3ByaWFkYWRlIGFkaWNpb25hbCBuZWVkIG5hbWUgYW5kIG5lZWQgZGVzY3JpcHRpb25cclxuICAgICAgICB0aGlzLmFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUxPRkFMTE5FRURTIDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFsc09mQWxsTmVlZHMsIG51bGwsIDQpKTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsUGFyZW50ID0gdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzLmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWR4KVswXTtcclxuICAgICAgICBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tOiBcIik7XHJcbiAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUxQYXJlbnQgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxQYXJlbnQsIG51bGwsIDQpKTtcclxuICAgICAgICAvL3ZlcmlmaWNhciBzZSDDqSB1bSBjb21wb3NpdGVcclxuICAgICAgICBpZiAodGhpcy5tYXRlcmlhbFBhcmVudC50eXBlID09IFwiY29tcG9zaXRlXCIpIHsvL21hdGVyaWFsIGNvbXBvc3RvIC0+IGNhcnJlZ2FyIG8gYXJyYXkgXHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5PSB0aGlzLm1hdGVyaWFsUGFyZW50Lm1hdGVyaWFsczsgICAgICAgICBcclxuICAgICAgICB9IGVsc2Ugey8vbWF0ZXJpYWwgc2ltcGxlcyBiYXN0YSBjYXJyZWdhciBwYXJhIHZpc3RhXHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5PVtdO1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5wdXNoKHRoaXMubWF0ZXJpYWxQYXJlbnQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbHMsIG51bGwsIDQpKTtcclxuXHJcbiAgICAgICAgLy9vcGVuQXBwKFwiY29tLmZhY2Vib29rLmthdGFuYVwiKTtcclxuICAgICAgICAvL29wZW5VcmwoXCJodHRwOi8vMTkyLjE2OC45OS4xMDAvY2FyZWdpdmVycy9wdWJsaWMvbWF0ZXJpYWxzQVBJLzIxL3Nob3dDb250ZW50XCIpXHJcblx0XHQvKmxldCBpO1xyXG5cdFx0bGV0IGNvbnRyb2wgPSBmYWxzZTtcclxuXHRcdGlmKCFjb250cm9sKVxyXG5cdFx0Zm9yKGk9MDtpPHRoaXMubWF0ZXJpYWxzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRpZih0aGlzLm1hdGVyaWFsc1tpXS51cmwgJiYgdGhpcy5tYXRlcmlhbHNbaV0ucGF0aCkge1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnVybCs9dGhpcy5tYXRlcmlhbHNbaV0ucGF0aDtcclxuXHRcdFx0XHR0aGlzLm1hdGVyaWFsc1tpXS5wYXRoID0gJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29udHJvbCA9IHRydWU7XHRcdFxyXG5cdFx0fVxyXG5cdFx0Ki9cclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWxzX3RlbXA6IE1hdGVyaWFsW107XHJcbiAgICAgICAgbWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50Lm5lZWRzLmZvckVhY2gobmVlZCA9PiB7XHJcbiAgICAgICAgICAgIG5lZWQubWF0ZXJpYWxzLmZvckVhY2gobWF0ZXJpYWxPZmFOZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfaWRcIl0gPSBuZWVkLmlkO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9kZXNjcmlwdGlvblwiXSA9IG5lZWQuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUwgOiBcIiArIEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsT2ZhTmVlZCwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzX3RlbXAucHVzaChtYXRlcmlhbE9mYU5lZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzID0gbWF0ZXJpYWxzX3RlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgb3Blbk9uQnJvd3NlcihpZCkge1xyXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5LmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWQpWzBdO1xyXG5cclxuICAgICAgICBvcGVuVXJsKG1hdGVyaWFsLnVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9yYXRpbmdcclxuICAgIG9uR3JlZW4oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdSRUVOXCIpXHJcblxyXG4gICAgfVxyXG4gICAgb25ZZWxsb3coKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlllbGxvd1wiKVxyXG5cclxuICAgIH1cclxuICAgIG9uUmVkKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWRcIilcclxuXHJcbiAgICB9XHJcbiAgICBvbm9uTWF0ZXJpYWxQaWNrZXIoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1BdGVyaWFsIHBpY2Fkb1wiKVxyXG5cclxuICAgIH1cclxuICAgIFxyXG4gIFx0YXZhbGlhckN1aWRhZG9yKGlkKSB7XHJcbiAgICAgICAgICAgIC8vcm90YSBwYXJhIG8gZm9ybXVsYXJpbyAtIHRlZGR5XHJcbiAgICAgICAgICAgIC8vbGV0IG1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbHNUb0Rpc3BsYXkuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBpZClbMF07XHJcblxyXG4gICAgICAgICAgICAvL29wZW5VcmwobWF0ZXJpYWwudXJsKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcGF0aWVudCcsIHRoaXMucGF0aWVudC5pZCwgJ21hdGVyaWFsJywgaWQsXCJldmFsdWF0aW9uXCJdKTtcclxuICAgICAgICB9XHJcbn1cclxuIl19