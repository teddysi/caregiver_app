"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var utils_1 = require("utils/utils");
require("nativescript-pdf-view");
var MaterialDetailComponent = (function () {
    function MaterialDetailComponent(patientService, route) {
        this.patientService = patientService;
        this.route = route;
    }
    MaterialDetailComponent.prototype.ngOnInit = function () {
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
    return MaterialDetailComponent;
}());
MaterialDetailComponent = __decorate([
    core_1.Component({
        selector: "material-details",
        moduleId: module.id,
        templateUrl: "./material-detail.component.html",
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.ActivatedRoute])
], MaterialDetailComponent);
exports.MaterialDetailComponent = MaterialDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsOERBQTREO0FBVzVELHFDQUFzQztBQUd0QyxpQ0FBK0I7QUFPL0IsSUFBYSx1QkFBdUI7SUFPaEMsaUNBQ1ksY0FBOEIsRUFDOUIsS0FBcUI7UUFEckIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQzdCLENBQUM7SUFFTCwwQ0FBUSxHQUFSO1FBRUksSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUUsRUFBRSxHQUFHLGNBQWMsR0FBRSxHQUFHLENBQUMsQ0FBQTtRQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ2pDLDJGQUEyRjtRQUMzRixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFGLG1GQUFtRjtRQUNwRixrRkFBa0Y7UUFDakYsNkJBQTZCO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLGtCQUFrQixHQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQzNELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxrQkFBa0IsR0FBQyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFdEQsQ0FBQztRQUVGLHdEQUF3RDtRQUV2RCxpQ0FBaUM7UUFDakMsZ0ZBQWdGO1FBQ3RGOzs7Ozs7Ozs7O1VBVUU7SUFFQSxDQUFDO0lBRUQsMkRBQXlCLEdBQXpCO1FBQ0ksSUFBSSxjQUEwQixDQUFDO1FBQy9CLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLGVBQWU7Z0JBQ2xDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNyQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUN2RCx3RUFBd0U7Z0JBQ3hFLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxjQUFjLENBQUM7SUFDOUMsQ0FBQztJQUVELCtDQUFhLEdBQWIsVUFBYyxFQUFFO1FBQ1osSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakYsZUFBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQUFDLEFBekVELElBeUVDO0FBekVZLHVCQUF1QjtJQUxuQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLGtDQUFrQztLQUNsRCxDQUFDO3FDQVM4QixnQ0FBYztRQUN2Qix1QkFBYztHQVR4Qix1QkFBdUIsQ0F5RW5DO0FBekVZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudFwiO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcblxyXG5pbXBvcnQgYXBwID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xyXG5pbXBvcnQgcGxhdGZvcm0gPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcblxyXG5pbXBvcnQgYnV0dG9uTW9kdWxlID0gcmVxdWlyZShcInVpL2J1dHRvblwiKTtcclxuXHJcblxyXG5pbXBvcnQgeyBvcGVuQXBwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1vcGVuLWFwcFwiO1xyXG5pbXBvcnQgeyBvcGVuVXJsIH0gZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcblxyXG5cclxuaW1wb3J0ICduYXRpdmVzY3JpcHQtcGRmLXZpZXcnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtYXRlcmlhbC1kZXRhaWxzXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRlcmlhbC1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHBhdGllbnQ6IFBhdGllbnQ7XHJcbiAgICBuZWVkOiBOZWVkO1xyXG4gICAgbWF0ZXJpYWxzT2ZBbGxOZWVkczogTWF0ZXJpYWxbXTtcclxuICAgIG1hdGVyaWFsUGFyZW50OiBNYXRlcmlhbDtcclxuICAgIG1hdGVyaWFsc1RvRGlzcGxheTogTWF0ZXJpYWxbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgY29uc3QgaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuICAgICAgICBjb25zdCBpZHggPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZF9tYXRlcmlhbFwiXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIklEIFBBQ0lFTlRFIFwiICtpZCArIFwiIElEIE1BVEVSSUFMXCIgK2lkeClcclxuICAgICAgICB0aGlzLnBhdGllbnQgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuICAgICAgICAvLyBjcmlhciBsaXN0YSBkZSBtYXRlcmlhaXMgY29tIHByb3ByaWFkYWRlIGFkaWNpb25hbCBuZWVkIG5hbWUgYW5kIG5lZWQgZGVzY3JpcHRpb25cclxuICAgICAgICB0aGlzLmFkZFByb3BlcnR5TmVlZE9uTWF0ZXJpYWwoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUxPRkFMTE5FRURTIDogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdGVyaWFsc09mQWxsTmVlZHMsIG51bGwsIDQpKTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsUGFyZW50ID0gdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzLmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWR4KVswXTtcclxuICAgICAgICBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tOiBcIik7XHJcbiAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUxQYXJlbnQgOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMubWF0ZXJpYWxQYXJlbnQsIG51bGwsIDQpKTtcclxuICAgICAgICAvL3ZlcmlmaWNhciBzZSDDqSB1bSBjb21wb3NpdGVcclxuICAgICAgICBpZiAodGhpcy5tYXRlcmlhbFBhcmVudC50eXBlID09IFwiY29tcG9zaXRlXCIpIHsvL21hdGVyaWFsIGNvbXBvc3RvIC0+IGNhcnJlZ2FyIG8gYXJyYXkgXHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5PSB0aGlzLm1hdGVyaWFsUGFyZW50Lm1hdGVyaWFsczsgICAgICAgICBcclxuICAgICAgICB9IGVsc2Ugey8vbWF0ZXJpYWwgc2ltcGxlcyBiYXN0YSBjYXJyZWdhciBwYXJhIHZpc3RhXHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5PVtdO1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5wdXNoKHRoaXMubWF0ZXJpYWxQYXJlbnQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbHMsIG51bGwsIDQpKTtcclxuXHJcbiAgICAgICAgLy9vcGVuQXBwKFwiY29tLmZhY2Vib29rLmthdGFuYVwiKTtcclxuICAgICAgICAvL29wZW5VcmwoXCJodHRwOi8vMTkyLjE2OC45OS4xMDAvY2FyZWdpdmVycy9wdWJsaWMvbWF0ZXJpYWxzQVBJLzIxL3Nob3dDb250ZW50XCIpXHJcblx0XHQvKmxldCBpO1xyXG5cdFx0bGV0IGNvbnRyb2wgPSBmYWxzZTtcclxuXHRcdGlmKCFjb250cm9sKVxyXG5cdFx0Zm9yKGk9MDtpPHRoaXMubWF0ZXJpYWxzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRpZih0aGlzLm1hdGVyaWFsc1tpXS51cmwgJiYgdGhpcy5tYXRlcmlhbHNbaV0ucGF0aCkge1xyXG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzW2ldLnVybCs9dGhpcy5tYXRlcmlhbHNbaV0ucGF0aDtcclxuXHRcdFx0XHR0aGlzLm1hdGVyaWFsc1tpXS5wYXRoID0gJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29udHJvbCA9IHRydWU7XHRcdFxyXG5cdFx0fVxyXG5cdFx0Ki9cclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWxzX3RlbXA6IE1hdGVyaWFsW107XHJcbiAgICAgICAgbWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50Lm5lZWRzLmZvckVhY2gobmVlZCA9PiB7XHJcbiAgICAgICAgICAgIG5lZWQubWF0ZXJpYWxzLmZvckVhY2gobWF0ZXJpYWxPZmFOZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfaWRcIl0gPSBuZWVkLmlkO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9kZXNjcmlwdGlvblwiXSA9IG5lZWQuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTUFURVJJQUwgOiBcIiArIEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsT2ZhTmVlZCwgbnVsbCwgNCkpO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzX3RlbXAucHVzaChtYXRlcmlhbE9mYU5lZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHNPZkFsbE5lZWRzID0gbWF0ZXJpYWxzX3RlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgb3Blbk9uQnJvd3NlcihpZCkge1xyXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzVG9EaXNwbGF5LmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gaWQpWzBdO1xyXG5cclxuICAgICAgICBvcGVuVXJsKG1hdGVyaWFsLnVybCk7XHJcbiAgICB9XHJcbn1cclxuIl19