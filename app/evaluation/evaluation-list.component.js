"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var evaluation_1 = require("../evaluation/evaluation");
var patient_service_1 = require("../patient/patient.service");
var EvaluationListComponent = (function () {
    function EvaluationListComponent(patientService, route) {
        this.patientService = patientService;
        this.route = route;
    }
    EvaluationListComponent.prototype.ngOnInit = function () {
        console.log("# COMPONENT LIST EVALUATIONS ");
        //************************************************************************* */
        //para teste -> depois substituir pelo formulario que vem do servidor
        this.evaluations = [];
        this.evaluations.push(new evaluation_1.Evaluation());
        this.evaluations[0].id = 0;
        this.evaluations[0].description = "Nivel de facilidade";
        this.evaluations.push(new evaluation_1.Evaluation());
        this.evaluations[1].id = 1;
        this.evaluations[1].description = "Esta apto para continuar?";
        this.evaluations.push(new evaluation_1.Evaluation());
        this.evaluations[2].id = 2;
        this.evaluations[2].description = "Tem experiencia na aplicacao deste material ?";
        //****************************************************************************** */
        //router params
        var id = +this.route.snapshot.params["id"];
        var idx = +this.route.snapshot.params["id_material"];
        //Get Patient
        this.patient = this.patientService.patients.filter(function (patient) { return patient.id === id; })[0];
        //criar lista de materiais com propriadade adicional need name and need description
        this.addPropertyNeedOnMaterial();
        //Select material
        this.materialParent = this.materialsOfAllNeeds.filter(function (material) { return material.id === idx; })[0];
    };
    /**
     *
     *
     *
     * @memberof EvaluationComponent
     */
    EvaluationListComponent.prototype.addPropertyNeedOnMaterial = function () {
        var materials_temp;
        materials_temp = [];
        this.patient.needs.forEach(function (need) {
            need.materials.forEach(function (materialOfaNeed) {
                materialOfaNeed["need_id"] = need.id;
                materialOfaNeed["need_description"] = need.description;
                materials_temp.push(materialOfaNeed);
            });
        });
        this.materialsOfAllNeeds = materials_temp;
    };
    /**
     *
     *
     *
     * @memberof EvaluationComponent
     */
    EvaluationListComponent.prototype.submeterAvaliacao = function () {
        console.log("# Evaluation 0 -> " + this.evaluations[0].response);
        console.log("# Evaluation 1 -> " + this.evaluations[1].response);
    };
    return EvaluationListComponent;
}());
EvaluationListComponent = __decorate([
    core_1.Component({
        selector: 'evaluation-list',
        moduleId: module.id,
        templateUrl: './evaluation-list.component.html',
        styleUrls: ['./evaluation-list.component.css']
    }),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        router_1.ActivatedRoute])
], EvaluationListComponent);
exports.EvaluationListComponent = EvaluationListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV2YWx1YXRpb24tbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFHakQsdURBQXNEO0FBRXRELDhEQUE0RDtBQWE1RCxJQUFhLHVCQUF1QjtJQU9oQyxpQ0FDWSxjQUE4QixFQUM5QixLQUFxQjtRQURyQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFDN0IsQ0FBQztJQUVMLDBDQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUE7UUFFNUMsOEVBQThFO1FBQzlFLHFFQUFxRTtRQUNyRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQztRQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRywyQkFBMkIsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRywrQ0FBK0MsQ0FBQztRQUNsRixtRkFBbUY7UUFFbkYsZUFBZTtRQUNmLElBQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELGFBQWE7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsbUZBQW1GO1FBQ25GLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ2pDLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNILDJEQUF5QixHQUF6QjtRQUNJLElBQUksY0FBMEIsQ0FBQztRQUMvQixjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxlQUFlO2dCQUNsQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDckMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDdkQsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBR0Q7Ozs7O09BS0c7SUFDSCxtREFBaUIsR0FBakI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3BFLENBQUM7SUFFTCw4QkFBQztBQUFELENBQUMsQUExRUQsSUEwRUM7QUExRVksdUJBQXVCO0lBUG5DLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO0tBQ2pELENBQUM7cUNBVThCLGdDQUFjO1FBQ3ZCLHVCQUFjO0dBVHhCLHVCQUF1QixDQTBFbkM7QUExRVksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tIFwiLi4vcGF0aWVudC9wYXRpZW50XCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcIi4uL21hdGVyaWFsL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IEV2YWx1YXRpb24gfSBmcm9tIFwiLi4vZXZhbHVhdGlvbi9ldmFsdWF0aW9uXCI7XHJcbmltcG9ydCB7IE5lZWQgfSBmcm9tIFwiLi4vbmVlZC9uZWVkXCI7XHJcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3BhdGllbnQvcGF0aWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCBidXR0b25Nb2R1bGUgPSByZXF1aXJlKFwidWkvYnV0dG9uXCIpO1xyXG5pbXBvcnQgeyBvcGVuQXBwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1vcGVuLWFwcFwiO1xyXG5pbXBvcnQgeyBvcGVuVXJsIH0gZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2V2YWx1YXRpb24tbGlzdCcsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2V2YWx1YXRpb24tbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9ldmFsdWF0aW9uLWxpc3QuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRXZhbHVhdGlvbkxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcGF0aWVudDogUGF0aWVudDtcclxuICAgIG5lZWQ6IE5lZWQ7XHJcbiAgICBtYXRlcmlhbHNPZkFsbE5lZWRzOiBNYXRlcmlhbFtdO1xyXG4gICAgbWF0ZXJpYWxQYXJlbnQ6IE1hdGVyaWFsOyAvL8OpIG8gbWF0ZXJpYWxcclxuICAgIGV2YWx1YXRpb25zOiBFdmFsdWF0aW9uW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIjIENPTVBPTkVOVCBMSVNUIEVWQUxVQVRJT05TIFwiKVxyXG5cclxuICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICAgICAgICAvL3BhcmEgdGVzdGUgLT4gZGVwb2lzIHN1YnN0aXR1aXIgcGVsbyBmb3JtdWxhcmlvIHF1ZSB2ZW0gZG8gc2Vydmlkb3JcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9ucy5wdXNoKG5ldyBFdmFsdWF0aW9uKCkpXHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9uc1swXS5pZCA9IDA7XHJcbiAgICAgICAgdGhpcy5ldmFsdWF0aW9uc1swXS5kZXNjcmlwdGlvbiA9IFwiTml2ZWwgZGUgZmFjaWxpZGFkZVwiO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnMucHVzaChuZXcgRXZhbHVhdGlvbigpKVxyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnNbMV0uaWQgPSAxO1xyXG4gICAgICAgIHRoaXMuZXZhbHVhdGlvbnNbMV0uZGVzY3JpcHRpb24gPSBcIkVzdGEgYXB0byBwYXJhIGNvbnRpbnVhcj9cIjtcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zLnB1c2gobmV3IEV2YWx1YXRpb24oKSlcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zWzJdLmlkID0gMjtcclxuICAgICAgICB0aGlzLmV2YWx1YXRpb25zWzJdLmRlc2NyaXB0aW9uID0gXCJUZW0gZXhwZXJpZW5jaWEgbmEgYXBsaWNhY2FvIGRlc3RlIG1hdGVyaWFsID9cIjtcclxuICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgICAgICAvL3JvdXRlciBwYXJhbXNcclxuICAgICAgICBjb25zdCBpZCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xyXG4gICAgICAgIGNvbnN0IGlkeCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkX21hdGVyaWFsXCJdO1xyXG4gICAgICAgIC8vR2V0IFBhdGllbnRcclxuICAgICAgICB0aGlzLnBhdGllbnQgPSB0aGlzLnBhdGllbnRTZXJ2aWNlLnBhdGllbnRzLmZpbHRlcihwYXRpZW50ID0+IHBhdGllbnQuaWQgPT09IGlkKVswXTtcclxuICAgICAgICAvL2NyaWFyIGxpc3RhIGRlIG1hdGVyaWFpcyBjb20gcHJvcHJpYWRhZGUgYWRpY2lvbmFsIG5lZWQgbmFtZSBhbmQgbmVlZCBkZXNjcmlwdGlvblxyXG4gICAgICAgIHRoaXMuYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpO1xyXG4gICAgICAgIC8vU2VsZWN0IG1hdGVyaWFsXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbFBhcmVudCA9IHRoaXMubWF0ZXJpYWxzT2ZBbGxOZWVkcy5maWx0ZXIobWF0ZXJpYWwgPT4gbWF0ZXJpYWwuaWQgPT09IGlkeClbMF07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlcm9mIEV2YWx1YXRpb25Db21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYWRkUHJvcGVydHlOZWVkT25NYXRlcmlhbCgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWxzX3RlbXA6IE1hdGVyaWFsW107XHJcbiAgICAgICAgbWF0ZXJpYWxzX3RlbXAgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRpZW50Lm5lZWRzLmZvckVhY2gobmVlZCA9PiB7XHJcbiAgICAgICAgICAgIG5lZWQubWF0ZXJpYWxzLmZvckVhY2gobWF0ZXJpYWxPZmFOZWVkID0+IHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsT2ZhTmVlZFtcIm5lZWRfaWRcIl0gPSBuZWVkLmlkO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxPZmFOZWVkW1wibmVlZF9kZXNjcmlwdGlvblwiXSA9IG5lZWQuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbHNfdGVtcC5wdXNoKG1hdGVyaWFsT2ZhTmVlZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm1hdGVyaWFsc09mQWxsTmVlZHMgPSBtYXRlcmlhbHNfdGVtcDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWVtYmVyb2YgRXZhbHVhdGlvbkNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBzdWJtZXRlckF2YWxpYWNhbygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMgRXZhbHVhdGlvbiAwIC0+IFwiICsgdGhpcy5ldmFsdWF0aW9uc1swXS5yZXNwb25zZSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiMgRXZhbHVhdGlvbiAxIC0+IFwiICsgdGhpcy5ldmFsdWF0aW9uc1sxXS5yZXNwb25zZSlcclxuICAgIH1cclxuXHJcbn0iXX0=