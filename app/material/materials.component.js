"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_service_1 = require("../patient/patient.service");
var MaterialsComponent = (function () {
    function MaterialsComponent(patientService, route) {
        this.patientService = patientService;
        this.route = route;
    }
    MaterialsComponent.prototype.ngOnInit = function () {
        var id = +this.route.snapshot.params["id"];
        var idx = +this.route.snapshot.params["id_need"];
        this.patient = this.patientService.patients.filter(function (patient) { return patient.id === id; })[0];
        // criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //	this.need = this.patient.needs.filter(need => need.id === idx)[0];
        //	this.materials = this.need.materials;
        console.log("MATERIALS : " + JSON.stringify(this.materials, null, 4));
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
        this.materials = materials_temp;
    };
    MaterialsComponent.prototype.autoavaliarCuidador = function (id) {
        //rota para o formulario - teddy
        //let material = this.materialsToDisplay.filter(material => material.id === id)[0];
        //openUrl(material.url);
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
        router_1.ActivatedRoute])
], MaterialsComponent);
exports.MaterialsComponent = MaterialsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFLakQsOERBQTREO0FBZ0I1RCxJQUFhLGtCQUFrQjtJQUs5Qiw0QkFDUyxjQUE4QixFQUM5QixLQUFxQjtRQURyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFDMUIsQ0FBQztJQUVMLHFDQUFRLEdBQVI7UUFFQyxJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEYsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBUWpDLHFFQUFxRTtRQUNyRSx3Q0FBd0M7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRFLGlDQUFpQztRQUNqQyxnRkFBZ0Y7UUFDaEY7Ozs7Ozs7Ozs7VUFVRTtJQUVILENBQUM7SUFJRCxzREFBeUIsR0FBekI7UUFDQyxJQUFJLGNBQTBCLENBQUM7UUFDL0IsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsZUFBZTtnQkFDckMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3JDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLElBQUksR0FBRSxJQUFJLENBQUMsV0FBVyxHQUFFLElBQUksQ0FBQztnQkFDbkUsd0VBQXdFO2dCQUN4RSx1Q0FBdUM7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsRUFBRSxLQUFLLGVBQWUsQ0FBQyxFQUFFLEVBQWxDLENBQWtDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEYsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxFQUFFLEtBQUssZUFBZSxDQUFDLEVBQUUsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNqSSxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNQLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7WUFFRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7SUFDakMsQ0FBQztJQUVELGdEQUFtQixHQUFuQixVQUFvQixFQUFFO1FBQ3JCLGdDQUFnQztRQUNoQyxtRkFBbUY7UUFFbkYsd0JBQXdCO0lBQ3pCLENBQUM7SUFFRix5QkFBQztBQUFELENBQUMsQUE3RUQsSUE2RUM7QUE3RVksa0JBQWtCO0lBUDlCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztLQUN4QyxDQUFDO3FDQVF3QixnQ0FBYztRQUN2Qix1QkFBYztHQVBsQixrQkFBa0IsQ0E2RTlCO0FBN0VZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gXCIuLi9wYXRpZW50L3BhdGllbnRcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vbWF0ZXJpYWwvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgTmVlZCB9IGZyb20gXCIuLi9uZWVkL25lZWRcIjtcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50LnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5cclxuXHJcbmltcG9ydCB7IG9wZW5BcHAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW9wZW4tYXBwXCI7XHJcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ21hdGVyaWFscycsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogJy4vbWF0ZXJpYWxzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9tYXRlcmlhbHMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRwYXRpZW50OiBQYXRpZW50O1xyXG5cdG5lZWQ6IE5lZWQ7XHJcblx0bWF0ZXJpYWxzOiBNYXRlcmlhbFtdO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuXHQpIHsgfVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcblx0XHRjb25zdCBpZCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xyXG5cdFx0Y29uc3QgaWR4ID0gK3RoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRfbmVlZFwiXTtcclxuXHJcblx0XHR0aGlzLnBhdGllbnQgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuXHJcblx0XHQvLyBjcmlhciBsaXN0YSBkZSBtYXRlcmlhaXMgY29tIHByb3ByaWFkYWRlIGFkaWNpb25hbCBuZWVkIG5hbWUgYW5kIG5lZWQgZGVzY3JpcHRpb25cclxuXHRcdHRoaXMuYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHRcdC8vXHR0aGlzLm5lZWQgPSB0aGlzLnBhdGllbnQubmVlZHMuZmlsdGVyKG5lZWQgPT4gbmVlZC5pZCA9PT0gaWR4KVswXTtcclxuXHRcdC8vXHR0aGlzLm1hdGVyaWFscyA9IHRoaXMubmVlZC5tYXRlcmlhbHM7XHJcblx0XHRjb25zb2xlLmxvZyhcIk1BVEVSSUFMUyA6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRlcmlhbHMsIG51bGwsIDQpKTtcclxuXHJcblx0XHQvL29wZW5BcHAoXCJjb20uZmFjZWJvb2sua2F0YW5hXCIpO1xyXG5cdFx0Ly9vcGVuVXJsKFwiaHR0cDovLzE5Mi4xNjguOTkuMTAwL2NhcmVnaXZlcnMvcHVibGljL21hdGVyaWFsc0FQSS8yMS9zaG93Q29udGVudFwiKVxyXG5cdFx0LypsZXQgaTtcclxuXHRcdGxldCBjb250cm9sID0gZmFsc2U7XHJcblx0XHRpZighY29udHJvbClcclxuXHRcdGZvcihpPTA7aTx0aGlzLm1hdGVyaWFscy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0aWYodGhpcy5tYXRlcmlhbHNbaV0udXJsICYmIHRoaXMubWF0ZXJpYWxzW2ldLnBhdGgpIHtcclxuXHRcdFx0XHR0aGlzLm1hdGVyaWFsc1tpXS51cmwrPXRoaXMubWF0ZXJpYWxzW2ldLnBhdGg7XHJcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHNbaV0ucGF0aCA9ICcnO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnRyb2wgPSB0cnVlO1x0XHRcclxuXHRcdH1cclxuXHRcdCovXHJcblxyXG5cdH1cclxuXHJcblxyXG5cclxuXHRhZGRQcm9wZXJ0eU5lZWRPbk1hdGVyaWFsKCkge1xyXG5cdFx0bGV0IG1hdGVyaWFsc190ZW1wOiBNYXRlcmlhbFtdO1xyXG5cdFx0bWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuXHJcblx0XHR0aGlzLnBhdGllbnQubmVlZHMuZm9yRWFjaChuZWVkID0+IHtcclxuXHRcdFx0bmVlZC5tYXRlcmlhbHMuZm9yRWFjaChtYXRlcmlhbE9mYU5lZWQgPT4ge1xyXG5cdFx0XHRcdG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfaWRcIl0gPSBuZWVkLmlkO1xyXG5cdFx0XHRcdG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfZGVzY3JpcHRpb25cIl0gPSBcIlsgXCIgK25lZWQuZGVzY3JpcHRpb24gK1wiIF1cIjtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiTUFURVJJQUwgOiBcIiArIEpTT04uc3RyaW5naWZ5KG1hdGVyaWFsT2ZhTmVlZCwgbnVsbCwgNCkpO1xyXG5cdFx0XHRcdC8vdGVzdGFyIHNlIG8gbWF0ZXJpYWwgamEgZXN0w6EgbmEgbGlzdGFcclxuXHRcdFx0XHRpZiAobWF0ZXJpYWxzX3RlbXAuZmlsdGVyKG1hdGVyaWFsID0+IG1hdGVyaWFsLmlkID09PSBtYXRlcmlhbE9mYU5lZWQuaWQpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdG1hdGVyaWFsc190ZW1wLmZpbHRlcihtYXRlcmlhbCA9PiBtYXRlcmlhbC5pZCA9PT0gbWF0ZXJpYWxPZmFOZWVkLmlkKVswXVtcIm5lZWRfZGVzY3JpcHRpb25cIl0gKz0gXCIgWyBcIiArIG5lZWQuZGVzY3JpcHRpb24gKyBcIiBdXCI7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdG1hdGVyaWFsc190ZW1wLnB1c2gobWF0ZXJpYWxPZmFOZWVkKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWxzID0gbWF0ZXJpYWxzX3RlbXA7XHJcblx0fVxyXG5cclxuXHRhdXRvYXZhbGlhckN1aWRhZG9yKGlkKSB7XHJcblx0XHQvL3JvdGEgcGFyYSBvIGZvcm11bGFyaW8gLSB0ZWRkeVxyXG5cdFx0Ly9sZXQgbWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsc1RvRGlzcGxheS5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IGlkKVswXTtcclxuXHJcblx0XHQvL29wZW5VcmwobWF0ZXJpYWwudXJsKTtcclxuXHR9XHJcblxyXG59Il19